<template>
  <div class="signin-main">
    <h1>Romantic... </h1>
    <div class="columns">
      <div class="column"></div>
      <div class="column"></div>
      <div class="column">
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
      cannotSubmit: true
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
    signin () {
      let user = {
        handle: this.handle,
        key: this.key
      }
      routesService.signin(user)
      .then(
        response => {
          console.log(response)
        }
      )
      .catch(
        error => {
          console.log(error)
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
