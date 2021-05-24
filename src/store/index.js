import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import http from "@/util/http-commons";

Vue.use(Vuex);

// const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default new Vuex.Store({
  state: {
    accessToken: null,
    userId: "",
    userName: "",
    houses: [],
    optionsGu: [],
    optionsDong: [],
    selectedHouseNo: "",
    selectedHouse: {},
    selectedHouseDeal: [],
    avgDealAmount: "",
    selectedHouseDealAmount: [],
    selectedHouseDealDate: [],
    cnt: 0,
    selectedGu: null,
    dongs: [],
    populations: [],
    totalPopulation: 0,
    selectComplete: false,
    barColor: [],
    moveData: [],
  },
  getters: {
    houses(state) {
      return state.houses;
    },
    optionsGu(state) {
      return state.optionsGu;
    },
    optionsDong(state) {
      return state.optionsDong;
    },
    getAccessToken(state) {
      console.log("겟 엑세스 토컨" + state.accessToken);
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
    selectedHouse(state) {
      return state.selectedHouse;
    },
    selectedHouseDeal(state) {
      return state.selectedHouseDeal;
    },
    avgDealAmount(state) {
      return state.avgDealAmount;
    },
    selectedHouseDealAmount(state) {
      console.log("거래액 그래프 get=====");
      console.log(state.selectedHouseDealAmount);
      return state.selectedHouseDealAmount;
    },
    selectedHouseDealDate(state) {
      console.log("거래날짜 그래프 get=====");
      console.log(state.selectedHouseDealDate);
      return state.selectedHouseDealDate;
    },
    cnt(state) {
      return state.cnt;
    },
    selectedGu(state) {
      return state.selectedGu;
    },
    selectComplete(state) {
      return state.selectComplete;
    },
    totalPopulation(state) {
      return state.totalPopulation;
    },
    dongs(state) {
      return state.dongs;
    },
    populations(state) {
      return state.populations;
    },
    barColor(state) {
      return state.barColor;
    },
    moveData(state) {
      return state.moveData;
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
    setOptionsDong(state, payload) {
      state.optionsDong = payload;
      console.log("==========비동기 완료/동목록=========");
    },
    LOGIN(state, payload) {
      state.accessToken = payload["auth-token"];
      console.log("중간점검 " + state.accessToken);
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
      state.userId = "";
      state.userName = "";
    },
    SET_SELECTED_HOUSE(state, payload) {
      state.selectedHouse = payload;
    },
    // 거래내역 -> 배열로 저장.
    SET_SELECTED_HOUSEDEAL(state, payload) {
      state.cnt = (state.cnt + 1) % 2;

      state.selectedHouseDeal = [];
      state.selectedHouseDealAmount = [];
      state.selectedHouseDealDate = [];
      var sum = 0;
      var cnt = 0;
      payload.forEach((item) => {
        var tmp = {
          층: item.floor,
          거래액: item.dealamount.replace(",", ""),
          거래일: item.dealyear + "." + item.dealmonth + "." + item.dealday,
          면적: item.area,
        };
        sum += parseInt(tmp["거래액"], 10);
        cnt++;
        state.selectedHouseDeal.push(tmp);
        state.selectedHouseDealAmount.push(parseInt(tmp["거래액"], 10));
        state.selectedHouseDealDate.push(tmp["거래일"]);
      });
      state.avgDealAmount = Math.floor(sum / cnt);
    },
    INIT_SELECTED_GU(state) {
      state.selectedGu = null;
    },
    SET_SELECTED_GU(state, payload) {
      state.selectedGu = payload;
      console.log(state.selectedGu + "선택됨.");
    },
    SET_POPULATION_INFO(state, payload) {
      state.dongs = [];
      state.populations = [];
      state.totalPopulation = 0;
      state.barColor = [];
      state.moveData = [];

      var letters = "0123456789ABCDEF".split("");
      payload.forEach((item) => {
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        state.dongs.push(item["dong"]);
        state.populations.push(item["population"]);
        state.totalPopulation += item["population"];
        state.barColor.push(color);
        state.moveData.push({
          동: item["dong"],
          전입: item["movein"],
          전출: item["moveout"],
          증감: parseInt(item["movein"], 10) - parseInt(item["moveout"], 10),
        });
      });
      state.selectComplete = true;
    },
    MAKE_COMPLETE_FALSE(state) {
      state.selectComplete = false;
    },
  },
  actions: {
    // getMap() {
    // console.log("지도 불러오는듕sss");

    // const SERVICE_KEY = "fwt204pk0p";
    // const SERVICE_URL =
    //   "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + SERVICE_KEY;
    // axios.get(SERVICE_URL);
    // },

    // 전체 구 목록 불러오기
    getOptionsGu({ commit }) {
      console.log("========비동기통신 시작/구 목록=========");
      http.get("/api/house/optionsGu").then((resp) => {
        // console.log("받은거 1" + JSON.stringify(resp));

        // console.log("받은거 " + resp.data.key);
        commit("setOptionsGu", resp.data);
      });
    },
    // 구 목록에 따른 동 목록 불러오기
    // 첫번째 인자는 디폴트로 무족건 context임에 유의
    getOptionsDong({ commit }, selectedGu) {
      console.log("=======비동기 통신 시작/동목록" + "구:" + selectedGu + "========");
      // pathvariable로 선택된 구 이름 주는 get방식으로 받아오자!
      http.get("/api/house/optionsDong/" + selectedGu).then((resp) => {
        commit("setOptionsDong", resp.data);
      });
    },
    // 전체 houseinfo 매물 불러오기
    getHouses({ commit }) {
      console.log("=====비동기 통신 시작/매물목록========");
      http.get("/api/house/houseinfo").then((resp) => {
        commit("setHouses", resp.data);
      });
    },
    setSelectedHouse({ commit }, obj) {
      // 선택된 번호의 매물 목록 가져오기~
      console.log("동 잘왔나 " + obj.dongName);
      console.log("아파트 잘왔나 " + obj.aptname);
      http
        .get("/api/house/housedeal", {
          params: {
            dong: obj.dongName,
            aptname: obj.aptname,
          },
        })
        .then((resp) => {
          console.log("거래 상세 내역");
          console.log(resp.data);
          commit("SET_SELECTED_HOUSE", resp.data[0]);
          commit("SET_SELECTED_HOUSEDEAL", resp.data);
        });
    },

    LOGIN(context, user) {
      return (
        axios
          // http
          // .post(`${SERVER_URL}/api/member/confirm/login`, user)
          .post("http://localhost:9999/vue/api/member/confirm/login", user)
          .then((response) => {
            if (response.data.message == "로그인 실패") {
              return "fail";
            } else {
              context.commit("LOGIN", response.data);
              axios.defaults.headers.common["auth-token"] = `${response.data["auth-token"]}`;
              return "success";
            }
          })
          .catch(({ message }) => alert(message))
      );
    },
    LOGOUT(context) {
      axios.defaults.headers.common["auth-token"] = undefined;
      context.commit("LOGOUT");
    },
    getHousesByDong({ commit }, dongName) {
      console.log("======비동기 통신 시작/" + dongName + "의 매물 불러오기======");
      http.get("/api/house/houseinfo/dong/" + dongName).then((resp) => {
        commit("setHouses", resp.data);
      });
    },
    getHousesByGu({ commit }, guName) {
      http.get("/api/house/houseinfo/gu/" + guName).then((resp) => {
        commit("setHouses", resp.data);
      });
    },
    initSelectedGu({ commit }) {
      commit("INIT_SELECTED_GU");
    },
    setSelectedGu({ commit }, tempSelectedGu) {
      commit("SET_SELECTED_GU", tempSelectedGu);
    },
    makeCompleteFalse({ commit }) {
      commit("MAKE_COMPLETE_FALSE");
    },
    // 검색 버튼 누르면
    getPopulationInfo({ commit }, selectedGu) {
      commit("MAKE_COMPLETE_FALSE");
      http.get("/api/town/population/" + selectedGu).then((resp) => {
        console.log("받은 인구 정보");
        console.log(resp.data);
        commit("SET_POPULATION_INFO", resp.data);
      });
    },
  },
  modules: {},
});
