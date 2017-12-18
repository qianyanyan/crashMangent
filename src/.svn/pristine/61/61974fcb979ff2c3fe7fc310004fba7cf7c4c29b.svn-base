import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // render: h => h(App)
  template: '<App/>',
  components: { App }
})

router.beforeEach((to, from, next) => {
  // if (to.path === '/login') {
  //   store.commit('deleteUserId')
  // }
  // let user = sessionStorage.user
  let user = localStorage.getItem('userId')
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})


