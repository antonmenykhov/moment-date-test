import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import 'moment/locale/ru';
moment.locale('ru')
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
