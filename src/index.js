import './assets/sass/index.scss';
import ExampleComponent from './components/ExampleComponent.vue'

const Plugin = {
  // eslint-disable-next-line
  install(Vue, params = {}) {
    Vue.component('example-component', ExampleComponent)
  }
}

export default Plugin
