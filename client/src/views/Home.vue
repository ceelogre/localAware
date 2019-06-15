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
@media screen and(max-width: 799px){
 #app {
   flex-direction: colum;
   justify-content: center;
   align-items: center;
  }
}
@media screen and(min-width: 800px) {
  #body {
    margin: 0 auto;
    max-width: 50em;
  }
  #app {
    align-items: center;
    justify-content: space-around;
    justify-content: space-evenly;
    padding: 3rem;
  }
}

</style>
