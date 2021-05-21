import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    getMap() {
      console.log("지도 불러오는듕");

      const SERVICE_KEY = "fwt204pk0p";
      const SERVICE_URL =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + SERVICE_KEY;
      axios.get(SERVICE_URL);
    },
  },
  modules: {},
});
