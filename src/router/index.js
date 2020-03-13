import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/index.vue'
import login from '../views/login/index.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: login
},
{
  path: '/home',
  name: 'home',
  component: home

}
]

const router = new VueRouter({
  routes
})

export default router
