<template>
  <div id="app">
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
  color: hsl(4, 3, 2)

#nav 
  padding: 30px


#nav a 
  font-weight: bold
  color: #2c3e50


#nav a.router-link-exact-active 
  color: #42b983

</style>
