<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Dista</h1>
      <p class="subtitle">Join <strong>only</strong> if you're here</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String
  },
  data: function() {
    return {
      geo: null
    };
  },
  methods: {
    getLocation() {
      if(navigator.geolocation){
        this.geo = navigator.geolocation.getCurrentPosition( x => {
          this.geo = x.coords.latitude
          console.log(process.env.NODE_ENV, ' s')
        }, error => { alert('Looks like location services isn\'t enabled on your device.', error)})
      }
    },
    askGeo(){
      if("geolocation" in navigator){
        alert('Yes')
      }
      else{
        alert('No');
      }
    },
  }
}
</script>
