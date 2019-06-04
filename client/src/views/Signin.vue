<template>
  <div class="signin-main">
    <div class="columns">
      <div class="column"></div>
      <div class="column"></div>
      <div class="column main">
        <div class="control">
          <div v-for="(error, index) in errors" :key="index">
            <p @click="dismissError()" class="help is-danger">{{ error }} </p>
          </div>
        </div>
        <form @submit.prevent="signin">
          <div class="field">
            <p class="control has-icons-left">
              <input type="text" v-model="handle" v-on:keyup="isHandleValid()"  v-bind:class="{'is-danger':handleInvalid}" class="input is-rounded" placeholder="Username">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input type="password" v-model="key" v-bind:class="classObject" v-on:keyup="isKeyValid()" class="input is-rounded" placeholder="Password">
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <div class="control">
              <button :disabled="cannotSubmit" class="button is-link">Login</button>
            </div>
          </div>
        </form>
        <router-link to='/signup'>Register</router-link>
      </div>
      <div class="column"></div>
      <div class="column"></div>
</div>
  </div>
</template>

<script>
import routesService from "../routes";
export default {
  name: 'signup',
  data() {
    return {
      handle: '',
      key: '',
      handleInvalid: '',
      keyInvalid: '',
      cannotSubmit: true,
      errors: []
    }
  },
  watch: {
    handleInvalid: function () {
      if (this.handleInvalid === false && this.keyInvalid === false) {
        this.cannotSubmit = false
      } else {
        this.cannotSubmit = true
      }
    },
    keyInvalid: function () {
      if (this.handleInvalid === false && this.keyInvalid === false) {
        this.cannotSubmit = false
      } else {
        this.cannotSubmit = true
      }
    }
  },
  methods: {
    isHandleValid () {
      if(this.handle.length < 3) {
        this.handleInvalid = true
      } else {
        this.handleInvalid = false
      }
    },
    isKeyValid () {
      if(this.key.length < 4) {
        this.keyInvalid = true
      } else {
        this.keyInvalid = false
      }
    },
    dismissError() {
      this.errors.pop()
    },
    signin () {
      let user = {
        handle: this.handle,
        key: this.key
      }
      routesService.signin(user)
      .then(
        response => {
          // Successfully authenticated
          if(response.data.token) {
            window.localStorage.setItem('uToken', response.data.token)
            window.localStorage.setItem('handle', this.handle)
            this.$router.push('/dashboard')
          } else {
            //Error could be anything :), ask them to try again
            this.errors.push('Something went wrong, please try again.')
          }
        }
      )
      .catch(
        error => {
          if (error.response.data.Error) {
            // Show the error
            this.errors.push(error.response.data.Error)
            setTimeout( () => {
              this.errors.pop()
            }, 3000)
          } else {
          console.log(error)
          }
        }
      )
    }
  },
  computed: {
    classObject: function () {
      return {
        'is-danger': this.keyInvalid === true
      }
    },
    canSubmit () {
      if(this.keyInvalid === false && this.handleInvalid === false) {
        this.cannotSubmit = false
      }
    }
  }

}
</script>
<style lang="sass" scoped>
.main
  margin-top: 10em
  margin-bottom: 10em
</style>
