import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: '',
        id: '',
        title: '',
        boss: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
        category: ''
      }
    ],
    user: null
  },
  mutations: {
    setLoadedMeetups (state, payload){
        state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
        const meetup = state.loadedMeetups.find(meetup => {
          return meetup.id === payload.id
        })
        if (payload.title) {
          meetup.title = payload.title
        }
        if (payload.description) {
          meetup.description = payload.description
        }
        if (payload.location) {
          meetup.location = payload.location
        }
        if (payload.date) {
          meetup.date = payload.date
        }
      },
    removeMeetup(state, payload){
      state.loadedMeetups.remove(payload)
    }
  },
  actions: {
    loadMeetups ({commit}){
        firebase.database().ref('meetups').once('value')
            .then((data)=>{
                const meetups = []
                const obj = data.val()
                for (let key in obj ){
                    meetups.push({
                        id: key,
                        title: obj[key].title,
                        description: obj[key].description,
                        imageUrl: obj[key].imageUrl,
                        location: obj[key].location,
                        boss: obj[key].boss,
                        startDate: obj[key].startDate,
                        endDate: obj[key].endDate,
                        creatorId: obj[key].creatorId,
                        category: obj[key].category
                    })
                }
                commit('setLoadedMeetups', meetups)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        startDate: payload.startDate.toISOString(),
        endDate: payload.endDate.toISOString(),
        imageUrl: payload.imageUrl,
        location: payload.location,
        boss: payload.boss,
        category: payload.category
      }
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
            const key = data.key
            commit('createMeetup', {
                ...meetup,
                id: key
            })
        })
        .catch((error) => {
            console.log(error)
        })     
    },
    updateMeetupData ({commit}, payload) {
    
        const updateObj = {}
        if (payload.title) {
          updateObj.title = payload.title
        }
        if (payload.description) {
          updateObj.description = payload.description
        }
        if (payload.location){
          updateObj.location = payload.location
        }
        firebase.database().ref('meetups').child(payload.id).update(updateObj)
          .then(() => {
            commit('updateMeetup', payload)
          })
          .catch(error => {
            console.log(error)
          })
      },
      removeMeetupData ({commit}, payload){
        firebase.database().ref('meetups').child(payload.id).remove()
              .then(() => {
                commit('updateMeetup', payload)
              })
              .catch(error => {
                console.log(error)
              })
      }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }

  }
})