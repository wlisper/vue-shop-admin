import Vue from 'vue'
import App from './App.vue'

import router from './router'
import './assets/css/global.css'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icofont/icofont.min.css'

import axios from 'axios';
axios.defaults.baseURL="http://localhost:8888/api/private/v1";
// axios请求拦截器，设置http header.
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
});
Vue.prototype.$http=axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
