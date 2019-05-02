<template>
  <div id="app">
    <section id="nav">
      <router-link class="button" to="/">Home</router-link> |
      <router-link class="button" to="/about">About</router-link>
      <div class="columns">
  <div class="column">1</div>
  <div class="column">2</div>
  <div class="column">3</div>
  <div class="column">4</div>
  <div class="column">5</div>
</div>
    </section>
    <router-view/>
  </div>
</template>

<style lang="sass">
@import '../node_modules/bulma/sass/utilities/initial-variables'
@import '../node_modules/bulma/sass/utilities/functions'
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  $color: $dark

#nav 
  padding: 30px


#nav a 
  font-weight: bold
  color: #2c3e50


#nav a.router-link-exact-active 
  color: #42b983

</style>
