<template>
  <div>
    <nav class="navbar has-shadow" >
        <div class="navbar-brand">
          <a class="navbar-item" href="#">
            <img src="../assets/chat.png" alt="Octopact">
          </a>
          <div class="navbar-burger burger">
            <span></span>
          </div>
        </div>

        <div class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item">
              <h3>Dista - Events</h3>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <div class="navbar-link">
                {{ handle }}
              </div>
              <div class="navbar-dropdown">
                <a class="navbar-item">
                  <span class="icon is-small">
                    <i class="fa fa-user-circle-o"></i>
                  </span> Profile
                </a>
                <a @click="endUserSession()" class="navbar-item">
                  <span class="icon is-small">
                    <i class="fa fa-sign-out"></i>
                  </span> Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      handle: window.localStorage.getItem('handle')
    }
  },
  methods: {
    endUserSession () {
      window.localStorage.removeItem('handle')
      window.localStorage.removeItem('uToken')
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
