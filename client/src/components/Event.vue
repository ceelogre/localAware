<template>
  <div>Events page WIP...</div>
</template>

<script>
import apiServices from '../routes.js'
export default {
  data () {
    return {

    }
  },
  created: function () {
    let user = this.$store.getters.getUser
    apiServices.getUserEvents(user._id)
    .then(
      response => {
        console.log(response.data)
      }
    )
    .catch(
      err => {
        console.log(err)
      }
    )
  }
}
</script>

<style>

</style>
