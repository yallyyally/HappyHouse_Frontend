import axios from "axios";

// 헤더 담은 객체 생성
export default axios.create({
  baseURL: "https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving",
  //   헤더에 api 키 정보
  headers: {
    "X-NCP-APIGW-API-KEY-ID": "ynpr8dsf9h",
    "X-NCP-APIGW-API-KEY": "DH66Nok2B5ETB3rgwHoInUktdi8U0ztwlPUAL17I",
  },
});
