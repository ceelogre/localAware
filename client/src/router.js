import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Event from './components/Event.vue'
import Signin from './views/Signin.vue'
import Dashboard from './views/Dashboard.vue'
import AddEvent from './components/AddEvent.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Signup
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/dashboard',
      name: 'user playground',
      component: Dashboard,
      beforeEnter: function (to, from, next) {
        if (window.localStorage.getItem('uToken')) {
          next()
        } else {
          next('/signin')
        }
      },
      children: [
        {
          path: '/create',
          name: 'Add event',
          component: AddEvent

        },
        {
          path: '/events',
          name: 'events',
          component: Event
        }
      ]
    },
    {
      path: '/re-signin',
      redirect: '/signin'
    }
  ]
})
