<template>
  <div id="app">
    <nav class="navbar has-shadow" >
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="chat.png" alt="Octopact">
        </a>
        <div class="navbar-burger burger">
          <span></span>
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            <small>Vein blood</small>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link">
              Lonely Road
            </div>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                <span class="icon is-small">
                  <i class="fa fa-user-circle-o"></i>
                </span> Profile
              </a>
              <a class="navbar-item">
                <span class="icon is-small">
                  <i class="fa fa-bug"></i>
                </span> Report it
              </a>
              <a class="navbar-item">
                <span class="icon is-small">
                  <i class="fa fa-sign-out"></i>
                </span> Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="section">
      <div class="columns">
        <div class="column is-4-tablet is-3-desktop is-2-widescreen">
          <aside class="menu">
            <p class="menu-label">Menu</p>
            <ul class="menu-list">
              <li>
                <router-link to="/signup">
                <span class="icon">
                  <i class="fa fa-tachometer"></i>
                </span> Register
                </router-link>
              </li>
              <li>
                <router-link to="/signin">
                <span class="icon">
                  <i class="fa fa-book"></i>
                </span> Login
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
