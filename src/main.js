import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import {store} from './store'
import DateFilter from './filter/date'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created (){
    firebase.initializeApp( {
      apiKey: 'AIzaSyCKAmcbdmY-d1ZPyubPE3ZZymIQOLmQ7QM',
      authDomain: 'projekt-3bc4d.firebaseapp.com',
      databaseURL: 'https://projekt-3bc4d.firebaseio.com',
      projectId: 'projekt-3bc4d',
      storageBucket: 'projekt-3bc4d.appspot.com',
      messagingSenderId: '645059064666'
    })
    this.$store.dispatch('loadMeetups')
  }
})