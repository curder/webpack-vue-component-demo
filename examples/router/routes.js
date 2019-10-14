function page(path) {
  return () => import( /* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

export default [
  { path: "/", name: "home", component: page('Home.vue') },
  { path: "/example-component", name: "example-component", component: page('ExampleComponent.vue') },

  { path: '*', component: page('errors/404.vue') }
]
