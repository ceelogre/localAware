<template>
 <div>
   <navHeader v-bind:handle=handle></navHeader>
 </div>
</template>

<script>
// @ is an alias for src
import header from '@/components/Nav.vue'
export default {
  name: "Home",
  props: {
    user: String,
  },
  components: {
    'navHeader': header
  },
  data: function() {
    return {
      geo: null,
      handle: 'Light'
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
    getHandle () {
      return this.props.handle
    }
  }
}
</script>
