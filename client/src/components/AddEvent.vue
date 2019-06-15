<template>
  <div>
    <h1>Register a new event</h1>
    <form @submit.prevent="addEvent">
      <div class="field">
        <p class="control has-icons-left">
          <input type="text" v-model="eventName" class="input is-rounded" placeholder="Event name" v-on:keyup = "canSubmit()">
          <span class="icon is-small is-left">
            <i class="fas fa-event"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input type="text" v-model="eventLocation" class="input is-rounded" placeholder="Event location" v-on:keyup = "canSubmit()">
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input type="text" v-model="eventOrganizer" class="input is-rounded" placeholder="Organizer" v-on:keyup = "canSubmit()">
          <span class="icon is-small is-left">
            <i class="fas fa-human"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input type="datetime-local" v-model="eventDate" class="input is-rounded" placeholder="Event date" v-on:change = "canSubmit()">
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <div class="control">
          <button :disabled="cannotSubmit" class="button is-link">Add event</button>
        </div>
        </div>
    </form>
  </div>
</template>

<script>
import apiService from '../routes'
export default {
  data() {
    return {
      eventName: '',
      eventLocation: '',
      eventOrganizer: '',
      eventDate: '',
      cannotSubmit: true,
      errors: []
    }
  },
  methods: {
    canSubmit () {
      // Show or hide the submit button
      if (!this.anyOfTheFieldIsEmpty()) {
        this.cannotSubmit = false
      } else {
        this.cannotSubmit = true
      }
    },
    anyOfTheFieldIsEmpty () {
      return this.eventName === '' || this.eventLocation === '' || this.eventOrganizer === ''|| this.eventDate === ''
    },
    addEvent () {
      // Pass
      let eventDetails = {
        name: this.eventName,
        location: this.eventLocation,
        happeningOn: this.eventDate,
        organizedBy: this.eventOrganizer
      }
      apiService.createEvent(eventDetails)
      .then(
        response => {
          this.$store.commit('addEvent', response.data)
          console.log(response.data)
        }
      )
      .catch(
        err => {
          if (err.response.request.status === 403) {
            // Token was not sent with the request
            this.errors.push(err.response.data)
          } else if (err.response.request.status === 401) {
            // Token was sent but was not valid
            debugger
            this.$router.replace('/re-signin')
          }
          console.log(err.response.request.status)
        }
      )
    }
  }
}
</script>


<style>

</style>
