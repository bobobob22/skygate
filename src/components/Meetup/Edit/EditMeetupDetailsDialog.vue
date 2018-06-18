<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn color="warning" slot="activator">
      Edytuj
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edytuj wydarzenie</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Tytuł"
                id="title"
                v-model="editedTitle"
                required></v-text-field>
                <v-text-field
                name="location"
                label="lokalizacja"
                id="location"
                v-model="editLocation"
                required>
							</v-text-field>
              <v-text-field
                name="description"
                label="Opis"
                id="description"
                multi-line
                v-model="editedDescription"
                required></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                class="blue--text darken-1"
                @click="editDialog = false">Zamknij</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Zapisz</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        editDialog: false,
        editedTitle: this.meetup.title,
        editLocation: this.meetup.location,
        editedDescription: this.meetup.description
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription,
          location: this.editLocation
        })
      }
    }
  }
</script>