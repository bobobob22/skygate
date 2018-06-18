<template>
	<v-container grid-list-md>
		<v-layout row>
			<v-flex xs12>
				<h1 class="primary--text">
					Stwórz wydarzenie
				</h1>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<form @submit.prevent="onCreateMeetup">
					<v-layout row>
						<v-flex xs12 sm2>
							<v-text-field 
							name="title"
							label="tytuł"
							id="title"
							v-model="title"
							required>
							</v-text-field>
						</v-flex>
						<v-flex xs12 sm2>
							<v-text-field
							name="location"
							label="lokalizacja"
							id="location"
							v-model="location"
							required>
							</v-text-field>
						</v-flex>
						<v-flex xs12 sm2>
							<v-text-field
							name="boss"
							label="nazwa organizatora"
							id="boss"
							v-model="boss"
							required>
							</v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row wrap>
						<v-flex xs12 sm6>
							<v-text-field
							name="description"
							label="opis"
							id="description"
							multi-line
							v-model="description"
							required>
							</v-text-field>
							<v-text-field
							name="imageUrl"
							label="adres url obrazka"
							id="imageUrl"
							v-model="imageUrl"
							required>
							</v-text-field>
							<img :src="imageUrl" height="150">
						</v-flex>
					</v-layout>
					<v-layout>
						<v-flex xs12 sm6>
							 <v-select v-bind:items="category" label="Wybierz kategorie" v-model="category"></v-select>
						</v-flex>
					</v-layout>
					<v-layout>
						<v-flex xs12 sm6 lg3>
							<h2>Wybierz datę startu wydarzenia</h2>
							<v-date-picker v-model="startDate" format="24hr"></v-date-picker>
						</v-flex>
						<v-flex xs12 sm6 lg3>
							<h2 >Wybierz datę zakończenia wydarzenia</h2>
							<v-date-picker v-model="endDate" format="24hr"></v-date-picker>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 text-sm-center>
							<v-btn class="primary" 
							:disabled="!formIsValid"
							type="submit">
								Stwórz wydarzenie
							</v-btn>
						</v-flex>
					</v-layout>
				</form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data () {
		return {
			title: '',
			location: '',
			imageUrl: '',
			description: '',
			startDate: null,
			endDate: null,
			boss: '',
			category: ['sport', 'kultura', 'muzyka', 'rozrywka', 'jazz']
		}
	},
	computed : {
		formIsValid (){
			return this.title !== '' && 
			this.location !== '' && 
			this.imageUrl !== '' && 
			this.description !== '' &&
			this.boss !== ''
		},
		startDateTime() {
			const startDate = new Date (this.startDate)
			return startDate
		},
		endDateTime() {
			const endDate = new Date (this.endDate)
			return endDate
		},
	},
	methods: {
		onCreateMeetup () {
			if(!this.formIsValid){
				return 
			}
			const meetupData = {
				title: this.title,
				location: this.location,
				imageUrl: this.imageUrl,
				description: this.description,
				boss: this.boss,
				startDate: this.startDateTime,
				endDate: this.endDateTime,
				category: this.category
				
			}
			this.$store.dispatch('createMeetup', meetupData)
			this.$router.push('/')
		}
	}
}
</script>
