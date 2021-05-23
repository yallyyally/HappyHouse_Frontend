import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// bootstrap-vue 추가
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// vuetify 추가
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import vuetify from './plugins/vuetify';
// // 네이버 지도
// import { VueGoogleMap } from "vuejs-google-maps";
// import "vuejs-google-maps/dist/vuejs-google-maps.css";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// 지도
// Vue.use(VueGoogleMap, {
//   load: {
//     apiKey: "AIzaSyDNna32oJUn6UdTKxNHPJChz9Q75kxCZJY",
//   },
// });
// install vuetify
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
