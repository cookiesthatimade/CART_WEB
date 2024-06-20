import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index.js'
import App from './App.vue'
import User from './components/User.vue'
import Cart from './components/Cart.vue'
import Liked from './components/Liked.vue'
import Men from './components/MenProduct.vue';
import Women from './components/WomenProduct.vue'
import Modal from './components/Modal.vue'
import jQuery from 'jquery';


window.$ = window.jQuery = jQuery;

window.addEventListener('beforeunload', function(event) {
    event.returnValue = '??';
});

Vue.config.productionTip = false;


Vue.use(VueRouter)

const routes = [
  { path: '/', component: Men },
  { path: '/cart', component: Cart },
  { path: '/liked', component: Liked },
  { path: '/user', component: User },
  { path: '/women', component: Women },
  { path: '/modal', component: Modal },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  // 페이지 간 이동 시 Vuex 상태를 초기화하지 않도록 설정
  next();
});

export default router;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
