import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './App.vue'
import ElementUI from 'element-ui'
import ECharts from 'echarts'
import './assets/style/reset.css'
import './assets/style/tableAnimation.css'
import './assets/style/csTransition.css'
import './components/csInput.less'
import './components/csButton.less'
import filterByAuthority from './router/filterByAuthority'
import routerMap from './router'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(ECharts)

const routes = filterByAuthority(routerMap)
// console.log('routes::: ' + JSON.stringify(routes))
// 指向默认路由(首页)
routes.unshift({
  path: '/',
  redirect: {name: routes[0].name}
})
console.log(routes)
const router = new VueRouter({
  // mode: 'history',
  routes
})

// 添加store的管理
// const manager = storeManager.start(ruleList, store)
router.beforeEach((to, from, next) => {
  // let url = to.fullPath
  // manager.updateStore(url)
  next()
})

// 注册全局事件总线
const Bus = new Vue()
new Vue({
  data () {
    return {
      Bus
    }
  },
  el: '#app',
  router,
  store,
  render: h => h(App),
})
