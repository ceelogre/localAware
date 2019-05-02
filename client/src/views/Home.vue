<template>
  <div class="hello">
    <button v-on:click="getLocation">Start loc</button>
    <h2> {{ geo}} </h2>
  </div>
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
        }, error => { alert('ERRR', error)})
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
