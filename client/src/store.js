import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedInUser: {},
    events: []
  },
  mutations: {
    addEvent (state, element) {
      state.events.push(element)
    },
    saveUser (state, user) {
      state.loggedInUser = user
    }

  },
  getters: {
    getEvent (state) {
      return state.events.pop()
    }
  },
  actions: {

  }
})
