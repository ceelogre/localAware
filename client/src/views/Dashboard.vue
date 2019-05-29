<template>
 <div>
   <navHeader v-bind:handle=handle></navHeader>
    <section class="section">
      <div class="columns">
        <div class="column is-4-tablet is-3-desktop is-2-widescreen">
          <aside class="menu">
            <p class="menu-label">Menu</p>
            <ul class="menu-list">
              <li>
                <router-link to="/events">
                <span class="icon">
                  <i class="fa fa-tachometer"></i>
                </span> Your events
                </router-link>
              </li>
              <li>
                <router-link to="/create">
                <span class="icon">
                </span> Add event
                </router-link>
              </li>
            </ul>
          </aside>
        </div>
        <main class="column">
            <router-view/>
        </main>
      </div>
    </section>
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
