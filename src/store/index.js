import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import http from "@/util/http-commons";

Vue.use(Vuex);

const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default new Vuex.Store({
  state: {
    acceccToken: null,
    userId: '',
    userName: '',
    houses: [],
    optionsGu: [],
  },
  getters: {
    houses(state) {
      return state.houses;
    },
    optionsGu(state) {
      console.log("=====get 구 목록=======");
      return state.optionsGu;
    },
    getAccessToken(state) {
      if (state.accessToken !== null) return state.accessToken;
      return localStorage.accessToken;
    },
    getUserId(state) {
      if (state.userId !== "") return state.userId;
      return localStorage.userId;
    },
    getUserName(state) {
      if (state.userName !== "") return state.userName;
      return localStorage.userName;
    },
  },
  mutations: {
    setHouses(state, payload) {
      state.houses = payload;
      console.log("=======비동기 통신 완료/매물목록========");
    },
    setOptionsGu(state, payload) {
      // value랑 text를 알아서 메핑하나부네 신기하다
      // payload.forEach((guName) => {
      //   var tmp = new Object();
      //   tmp.text = guName;
      //   tmp.value = guName;
      //   state.optionsGu.push(tmp);
      // });
      state.optionsGu = payload;
      console.log("=======비동기 통신 완료/구목록==========");
    },
    LOGIN(state, payload) {
      state.accessToken = payload["auth-token"];
      state.userId = payload["user-id"];
      state.userName = payload["user-name"];
      localStorage.accessToken = payload["auth-token"];
      localStorage.userId = payload["user-id"];
      localStorage.userName = payload["user-name"];
    },
    LOGOUT(state) {
      state.accessToken = null;
      delete localStorage.accessToken;
      delete localStorage.userId;
      delete localStorage.userName;
      state.userId = '';
      state.userName = '';
    },
  },
  actions: {
    getMap() {
      console.log("지도 불러오는듕sss");

      // const SERVICE_KEY = "fwt204pk0p";
      // const SERVICE_URL =
      //   "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + SERVICE_KEY;
      // axios.get(SERVICE_URL);
    },

    // 전체 구 목록 불러오기
    getOptionsGu({ commit }) {
      console.log("========비동기통신 시작/구 목록=========");
      http.get("/api/house/optionsGu").then((resp) => {
        // console.log("받은거 1" + JSON.stringify(resp));

        // console.log("받은거 " + resp.data.key);
        commit("setOptionsGu", resp.data);
      });
    },
    // 전체 houseinfo 매물 불러오기
    getHouses({ commit }) {
      console.log("=====비동기 통신 시작/매물목록========");
      http.get("/api/house/houseinfo").then((resp) => {
        commit("setHouses", resp.data);
      });
    },
      LOGIN(context, user) {
        return axios
          .post(`${SERVER_URL}/member/confirm/login`, user)
          .then((response) => {
            if (response.data.message == "로그인 실패") {
              return "fail";
            } else {
              context.commit("LOGIN", response.data);
              axios.defaults.headers.common["auth-token"] = `${response.data["auth-token"]}`;
              return "success";
            }
          })
          .catch(({ message }) => alert(message));
      },
      LOGOUT(context) {
        axios.defaults.headers.common["auth-token"] = undefined;
        context.commit("LOGOUT");
      },
  },
  modules: {},
});
