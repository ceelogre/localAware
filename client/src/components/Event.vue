<template>
  <div>
    <h1>Events created by you </h1>
    <table class="table">
      <thead>
        <tr>
          <td>Name</td>
          <td>Location</td>
          <td>Time</td>
          <td>Organizer</td>
        </tr>
      </thead>
      <tbody v-for="(event,index) in events" :key="index">
        <tr>
          <td>{{ event.name }}</td>
          <td>{{ event.location }}</td>
          <td>{{ event.happeningOn }}</td>
          <td>{{ event.organizedBy }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import apiServices from '../routes.js'
export default {
  data () {
    return {
      events: [],
      errors: []
    }
  },
  created: function () {
    let user = this.$store.getters.getUser
    apiServices.getUserEvents(user._id)
    .then(
      response => {
        let events = response.data
        events.forEach(event => {
          this.events.push(event)
        })
      }
    )
    .catch(
      err => {
        this.errors.push(err)
      }
    )
  }
}
</script>

<style>

</style>
