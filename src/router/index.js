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
  component: home,
  children: [{
    path: '/home/comment',
    component: () =>
      import('../views/comment/index.vue')
  }, {
    path: '/home/material',
    component: () =>
      import('../views/material/index.vue')
  }, {
    path: '/home/articles',
    component: () =>
      import('../views/article/index.vue')
  }]
}
]

const router = new VueRouter({
  routes
})

export default router
