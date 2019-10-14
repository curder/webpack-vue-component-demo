import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Plugin from '../src/index.js'
Vue.use(Plugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
