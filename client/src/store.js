import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: []
  },
  mutations: {
    addEvent (state, element) {
      state.events.push(element)
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
