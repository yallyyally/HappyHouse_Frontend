import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default new Vuex.Store({
  state: {
    // acceccToken: null,
    // userId: "",
    // userName: "",
  },
  getters: {
    // getAccessToken(state) {
    //   if (state.accessToken !== null) return state.accessToken;
    //   return localStorage.accessToken;
    // },
    // getUserId(state) {
    //   if (state.userId !== "") return state.userId;
    //   return localStorage.userId;
    // },
    // getUserName(state) {
    //   if (state.userName !== "") return state.userName;
    //   return localStorage.userName;
    // },
  },
  mutations: {
    // LOGIN(state, payload) {
    //   state.accessToken = payload["auth-token"];
    //   state.userId = payload["user-id"];
    //   state.userName = payload["user-name"];
    //   localStorage.accessToken = payload["auth-token"];
    //   localStorage.userId = payload["user-id"];
    //   localStorage.userName = payload["user-name"];
    // },
    // LOGOUT(state) {
    //   state.accessToken = null;
    //   delete localStorage.accessToken;
    //   delete localStorage.userId;
    //   delete localStorage.userName;
    //   state.userId = "";
    //   state.userName = "";
    // },
  },
  actions: {
    getMap() {
      console.log("지도 불러오는듕sss");

      const SERVICE_KEY = "fwt204pk0p";
      const SERVICE_URL =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + SERVICE_KEY;
      axios.get(SERVICE_URL);
    },
  //   LOGIN(context, user) {
  //     return axios
  //       .post(`${SERVER_URL}/user/confirm/login`, user)
  //       .then((response) => {
  //         if (response.data.message == "로그인 실패") {
  //           return "fail";
  //         } else {
  //           context.commit("LOGIN", response.data);
  //           axios.defaults.headers.common["auth-token"] = `${response.data["auth-token"]}`;
  //           return "success";
  //         }
  //       })
  //       .catch(({ message }) => alert(message));
  //   },
  //   LOGOUT(context) {
  //     axios.defaults.headers.common["auth-token"] = undefined;
  //     context.commit("LOGOUT");
  //   },
  },
  modules: {},
});
