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
    selectedDong: null,
    familyData: [], //동 하나당 데이터.
    overallFamilyData: [], //객체 배열
    totalMoveInOut: "",
    increase: true,
    guPosition: {},
    culturalSpaces: [],
    publicbicycle: [],
    school: [],
    kindergarten:[],
    cameraPos: { lat: 0, lng: 0 },
    selectedHouseDealLatLng: {},
    subway: [],
    bus: [],
    selectDongComplete: false,
  },
  getters: {
    selectDongComplete(state) {
      return state.selectDongComplete;
    },
    subway(state) {
      console.log("@@@@@@@@@@@@@지하철 get@@@@@@@@@@@");
      return state.subway;
    },
    bus(state) {
      console.log("@@@@@@@@@@@@@버스 get@@@@@@@@@@@");
      return state.bus;
    },
    publicbicycle(state) {
      console.log("나는 따릉이~~~!");
      return state.publicbicycle;
    },
    selectedHouseDealLatLng(state) {
      console.log("@@@@@@@@@@@@@래트랭 get@@@@@@@@@@@@@@@@@@@");
      console.log(state.selectedHouseDealLatLng);
      return state.selectedHouseDealLatLng;
    },
    cameraPos(state) {
      return state.cameraPos;
    },
    school(state) {
      console.log("@@@학교정보낸하!!" + state.school);
      return state.school;
    },
    kindergarten(state) {
      console.log("유치원 정보!!!!"  + state.kindergarten);
      return state.kindergarten;
    },
    increase(state) {
      return state.increase;
    },
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
      if (state.accessToken != null) return state.accessToken;
      return localStorage.accessToken;
    },
    getUserId(state) {
      console.log("1" + state.userId); //null -> 이게 왜 null일까 ?
      console.log("2" + localStorage.userId); //ab
      if (state.userId != null) return state.userId;
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
    selectedDong(state) {
      return state.selectedDong;
    },
    familyData(state) {
      return state.familyData;
    },
    totalMoveInOut(state) {
      if (state.totalMoveInOut >= 0) {
        state.increase = true;
      } else {
        state.increase = false;
      }
      return Math.abs(state.totalMoveInOut);
    },
    guPosition(state) {
      console.log("구 위치 얻기" + JSON.stringify(state.guPosition));
      return state.guPosition;
    },
    culturalSpaces(state) {
      return state.culturalSpaces;
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
      state.userId = payload["userid"];
      state.userName = payload["username"];
      console.log("중간점검2" + state.userId + " " + payload["username"]);
      localStorage.accessToken = payload["auth-token"];
      localStorage.userId = payload["userid"];
      localStorage.userName = payload["username"];
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
      state.selectedHouseDealLatLng = { lat: payload[0].lat, lng: payload[0].lng };
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
      state.selectedDong = null;
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
      state.selectedDong = null;
      state.overallFamilyData = [];
      state.totalMoveInOut = 0;
      var letters = "0123456789ABCDEF".split("");
      payload.forEach((item) => {
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        var dongName = item["dong"];
        state.dongs.push(dongName);
        state.populations.push(item["population"]);
        state.totalPopulation += item["population"];
        state.barColor.push(color);
        state.moveData.push({
          동: dongName,
          전입: item["movein"],
          전출: item["moveout"],
          증감: parseInt(item["movein"], 10) - parseInt(item["moveout"], 10),
        });
        state.totalMoveInOut += parseInt(item["movein"], 10) - parseInt(item["moveout"], 10);
        // 해싱 -> 동 이름으로 매핑
        state.overallFamilyData[dongName] = [];
        state.overallFamilyData[dongName].push(
          item["oneperson"],
          item["twoperson"],
          item["threeperson"],
          item["fourperson"],
          item["morethanfiveperson"]
        );
        console.log(dongName + "가구정보 " + state.overallFamilyData[dongName]);
      });
      state.selectComplete = true;
    },
    MAKE_COMPLETE_FALSE(state) {
      state.selectComplete = false;
      // 선택된 동 null
      state.selectedDong = null;
    },
    SET_SELECTED_DONG(state, payload) {
      // 동 바뀔때마다 familyData  바뀜
      state.selectedDong = payload;
      state.familyData = state.overallFamilyData[state.selectedDong];
      console.log("동 세팅 후 값도 ㅅ팅.->" + state.familyData);
    },
    // 구 중심위치 세팅
    SET_GU_POSITION(state, payload) {
      state.guPosition["lat"] = parseFloat(payload["lat"]);
      state.guPosition["lng"] = parseFloat(payload.lng);
      console.log("구 위치 세팅 " + JSON.stringify(state.guPosition));
    },
    // 문화공간 정보 받아오기
    SET_CULTURAL_SPACES(state, payload) {
      state.culturalSpaces = [];
      state.culturalSpaces = payload;
      // console.log("저장ㅅ" + JSON.stringify(state.culturalSpaces));
    },
    // 따릉이 정보 받아오기
    SET_PUBLICBICYCLE_INFO(state, payload) {
      state.publicbicycle = payload;
      console("따릉 정보 저장" + JSON.stringify(payload));
    },
    // 학교 정보 받아오기
    SET_SCHOOL_INFO(state, payload) {
      state.school = payload;
      console.log("학교 정보 저장 완 ");
      // console.log("학교저장" + JSON.stringify(state.school));
    },
    // 유치원 정보 받아오기
    SET_KINDERGARTEN_INFO(state, payload) {
      state.kindergarten = payload;
      console.log("유치원 정보 저장 완");
    },
    SET_SUBWAY_INFO(state, payload) {
      state.subway = payload;
      console.log("지하철정보세팅햇ㅅㅁ " + JSON.stringify(payload));
    },
    SET_BUS_INFO(state, payload) {
      state.bus = payload;
      console.log("버스 정보 저장" + JSON.stringify(payload));
    },
    // 카메라 위치.
    SET_CAMERA_POS(state, payload) {
      state.cameraPos = payload;
      console.log("카메라 정보 저장 완");
    },
    SET_SELECTDONG_COMPLETE(state, payload) {
      state.selectDongComplete = payload;
    },
  },
  actions: {
    // 전체 구 목록 불러오기
    getOptionsGu({ commit }) {
      // SET_SELECT;
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
              console.log("로그인 성공~~~~");
              context.commit("LOGIN", response.data);

              axios.defaults.headers.common["auth-token"] = `${response.data["auth-token"]}`;
              // axios.defaults.headers.common["auth-token"] = response.data["auth-token"];
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
      // 인구정보 받기
      http.get("/api/town/population/" + selectedGu).then((resp) => {
        console.log(resp.data);
        commit("SET_POPULATION_INFO", resp.data);
      });
      // 문화정보 받기 -> 구 위치 & 문화공간 정보 받아오기.
      http.get("/api/town/gupos/" + selectedGu).then((resp) => {
        commit("SET_GU_POSITION", resp.data);
      });
      http.get("/api/town/cultural/" + selectedGu).then((resp) => {
        commit("SET_CULTURAL_SPACES", resp.data);
      });
    },
    // 매물 검색 버튼 누르면 학교 목록 불러오기
    getSchoolInfo({ commit }, selectedGu) {
      console.log("학교 정보 받아오기 요청");
      http.get("api/house/school/" + selectedGu).then((resp) => {
        commit("SET_SCHOOL_INFO", resp.data);
      });
    },
    // 매물 검색 버튼 누르면 유치원 목록 불러오기
    getKindergartenInfo({ commit }, selectedGu) {
      console.log("유치원 정보 받아오기 요청");
      http.get("api/house/kindergarten/" + selectedGu).then((resp) => {
        commit("SET_KINDERGARTEN_INFO", resp.data);
      });
    },
    // 매물 검색 버튼 누르면 지하철 목록 불러오기
    getSubwayInfo({ commit }, selectedGu) {
      console.log("지하철 정보 받아오기 요청");
      http.get("api/house/subway/" + selectedGu).then((resp) => {
        commit("SET_SUBWAY_INFO", resp.data);
      });
    },
    // 매물 검색 버튼 누르면 지하철 목록 불러오기
    getBusInfo({ commit }, selectedGu) {
      console.log("버스 정보 받아오기 요청");
      http.get("api/house/bus/" + selectedGu).then((resp) => {
        commit("SET_BUS_INFO", resp.data);
      });
    },
    // 매물 검색 버튼 누르면 따릉이 목록 불러오기
    getPublicBicycleInfo({ commit }, selectedGu) {
      console.log("따릉이 정보 받아오기 요청");
      http.get("api/house/publicbicycle/" + selectedGu).then((resp) => {
        commit("SET_PUBLICBICYCLE_INFO", resp.data);
      });
    },
    // 동이 선택되면 그 위도 값을 받아온다.
    setCameraPos({ commit }, selectedDong) {
      // commit('SET_SELECTDONG_COPMLETE', false);
      http.get("api/house/houseinfo/camera/" + selectedDong).then((resp) => {
        console.log("카메라 위치 받음 " + JSON.stringify(resp.data));
        commit("SET_CAMERA_POS", resp.data);
      });
    },
    setSelectDongComplete({ commit }, bool) {
      commit("SET_SELECTDONG_COMPLETE", bool);
    },
  },
  modules: {},
});
