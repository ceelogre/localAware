<template>
  <div>
    <nav class="navbar">
      <div class="navbar-end">
        <div class="navbar-link">
        <router-link to='/signin'>Register an event</router-link>
        </div>
      </div>
    </nav>
    <section class="section">
      <div class="container">
        <h1 class="title">Dista</h1>
        <p class="subtitle">Join <strong>only</strong> if you're here</p>
      </div>
      <p v-if="events.length > 0"></p>
      <p v-else class="paragraph">There are currently no events listed</p>
      <p v-if="errors.length > 0">Somethig went wrong, please try again</p>
    </section>
  </div>
</template>

<script>
import apiService from '../routes'
export default {
  name: 'home',
  data () {
    return {
      events: [],
      errors: []
    }
  },
  created: function () {
    apiService.getEvents()
    .then(
      (response) => {
        let allEvents = response.data.events
        if(allEvents !== undefined) {
          allEvents.forEach(event => {
            this.events.push(event)
          });
        }
      }
    )
    .catch(
      (error) => {
        this.errors.push(error)
      }
    )
  }
}
</script>

<style>

</style>
