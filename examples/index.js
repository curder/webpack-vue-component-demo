import './assets/sass/index.scss'

import Vue from 'vue'
import App from './App.vue'

import Plugin from '../src/index.js'
Vue.use(Plugin)

new Vue({
  render: h => h(App)
}).$mount('#app')
