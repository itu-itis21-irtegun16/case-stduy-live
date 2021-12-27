import Vue from 'vue'
import VueRouter from 'vue-router'
import Services from '../views/Services.vue'
import Questions from '../views/Questions.vue'
import SuccessPage from '../views/SuccessPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'services',
    component: Services
  },
  {
    path: '/questions',
    name: 'questions',
    component: Questions
  },
  {
    path: '/success-page',
    name: 'success-page',
    component: SuccessPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
