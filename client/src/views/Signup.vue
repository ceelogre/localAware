<template>
  <div class="signup-main">
    <h1>For you... </h1>
    <div class="columns">
      <div class="column"></div>
      <div class="column"></div>
      <div class="column">
        <div class="control">
          <div v-for="(error, index) in errors" :key="index">
            <p @click="dismissError()" class="help is-danger">{{ error }} </p>
          </div>
        </div>
        <form @submit.prevent="signup">
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
              <input type="password" v-model="key" v-bind:class="keyClass" v-on:keyup="isKeyValid()" class="input is-rounded" placeholder="Password">
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input type="password" v-model="keyClone" v-bind:class="keyCloneClass" v-on:keyup="isKeyCloneValid()" class="input is-rounded" placeholder="Repeat password">
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <div class="control">
              <button :disabled="cannotSubmit" class="button is-link">Register</button>
            </div>
          </div>
        </form>
        <router-link to='/signin'>Login</router-link>
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
      keyClone: '',
      handleInvalid: '',
      keyInvalid: '',
      keyCloneInvalid: '',
      cannotSubmit: true,
      errors: []
    }
  },

  /* Disable submit button so long as there's still an error
  All conditions are checked everytime because you
  Never know which order the user fills in the form */
  watch: {
    handleInvalid: function () {
      this.canSubmit()
    },
    keyInvalid: function () {
      this.canSubmit()
    },
    keyCloneInvalid: function () {
      this.canSubmit()
    }
  },
  methods: {

    /* The next three methods are called onkeyup while
    filling the form */
    
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
    isKeyCloneValid () {
      if(this.keyClone !== this.key) {
        this.keyCloneInvalid = true
      } else {
        this.keyCloneInvalid = false
      }
    },
    
    //Method for checking if the form is ready to be submitted
    canSubmit () {
      if (this.handleInvalid === false && this.keyInvalid === false && this.keyClone === this.key) {
        this.cannotSubmit = false
      } else {
        this.cannotSubmit = true
      }
    },
    // Method to submit the form to the backend
    signup () {
      let user = {
        handle: this.handle,
        key: this.key
      }
      routesService.createUser(user)
      .then(
        response => {
          if(response.data.handle) {
            this.$router.push('/create')
          } else if (response.data.Error) {
            // Show the error
            this.errors.push(response.data.Error)
            setTimeout( () => {
              this.errors.pop()
            }, 3000)
          } else {
            //Error could be anything :), ask them to try again
            this.errors.push('Something went wrong, please try again.')
          }
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
    // Methods to add danger class to form input fields
    keyClass: function () {
      return {
        'is-danger': this.keyInvalid === true
      }
    },
    keyCloneClass: function () {
      return {
        'is-danger': this.keyCloneInvalid === true
      }
    },
  }

}
</script>
