<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 >
         <h1>Wydarzenia:</h1>
          <v-text-field
          v-model="search"
          label="Sortuj wydarzenie"
          @change="filterEvents"
       ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap >
      <v-flex xs12 md6 xl4 v-for="meetup in meetups" :key="meetup.id">
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3 style="padding-top: 40px">
                <v-card-media
                  :src="meetup.imageUrl"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h2 class="white--text">{{meetup.title}} </h2>
                    <p><span> {{meetup.boss}}</span></p>
                    <div>
                    <p>start wydarzenia: {{ meetup.startDate | date }} </p> 
                    <p>koniec wydarzenia: {{ meetup.endDate | date }}</p> 
                    <p>kategoria: {{meetup.category}}</p>
                  </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn color="success" :to="'/meetups/' + meetup.id">
                    Pokaż więcej
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return{
      search: ""
    }
  },
  created () {

  },
	computed: {
    meetups (){
      return this.$store.getters.loadedMeetups
    }
  },
  methods: {
    filterEvents() {

      const meetups = this.$store.getters.loadedMeetups
      meetups.filter((meetup) => {
        return meetup.title.match(this.search)
      })

    }
  }
}


</script>
