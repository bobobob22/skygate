<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <v-card-title>
            <h1 class="primary--text"> {{meetup.title }}</h1>
            <template>
              <v-btn color="error" @click="removeEvent(meetup)">Usuń</v-btn>
           
              <app-edit-meetup-details-dialog :meetup="meetup">
              </app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">Data: {{meetup.startDate | date}} do {{meetup.endDate | date}} - 
              <strong>{{meetup.location}}</strong></div>
            <div>{{meetup.description}}</div>
            <div>{{meetup.category}}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
    props: ['id'],
    computed: {
        meetup (){
            return this.$store.getters.loadedMeetup(this.id)
        }
    },
    methods: {
      removeEvent () {
        this.$store.dispatch('removeMeetupData', {
          id: this.meetup.id
        })
        this.$router.push('/')
      }
    }
}
</script>



