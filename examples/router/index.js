import Vue from 'vue'
import routes from './routes'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
