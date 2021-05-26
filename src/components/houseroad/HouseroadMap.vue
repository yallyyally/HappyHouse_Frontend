<template>
  <div style="text-align: center">
    <span><h5>관심있는 지점을 클릭해보세요!</h5></span>
    <div id="map0" style="width: 100%; height: 400px; margin-bottom: 20px"></div>
    <v-btn rounded color="primary" dark @click="setCompany()">매물 정보 보기</v-btn>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["cameraPos", "selectedDong"],
  computed: {
    ...mapGetters(["selectDongcomplete"]),
  },
  name: "HouseroadMap",
  data() {
    return {
      mapOptions: {},
      map: "",
      marker: "",
      companyPos: 0,
      // companySelect:false
    };
  },
  methods: {
    ...mapActions(["setCompanySelect", "setCompanyCameraPos"]),
    // 직장 정보선택 완
    setCompany() {
      console.log("선택완료 시 동" + this.selectedDong);
      if (this.selectedDong == undefined) {
        alert("동을 선택해주세요");
      } else if (this.companyPos == 0 || this.companyPos._lat == undefined) {
        alert("위치를 선택해주세요");
      } else {
        // alert(
        //   "선택 위치 근처의 매물을 불러옵니다." +
        //     this.companyPos._lat +
        //     " : " +
        //     this.companyPos._lng
        // );
        // 1. 선택되었음을 아래에 알린다.
        this.setCompanySelect(true);
        //  2. 선택된 회사 위치도 알린다.
        var companypos = { lat: this.companyPos._lat, lng: this.companyPos._lng };
        this.setCompanyCameraPos(companypos);
      }
    },
    // 마커 찍기 -> 카메라가 변화되서 this.map이 바뀔때마다 이벤트 등록해주기
    setMarkerEvent() {
      console.log("카메라가 바뀌어서 이벤트 다시등록함뉘당");
      // <static> addListener(target, eventName, listener)
      var outer = this;
      //    선택할때마다 data값 바뀌도록 해놓음.
      naver.maps.Event.addListener(this.map, "click", function (e) {
        outer.companyPos = e.coord;
        // 맵 초기화 -> 마커도 초기화?
        if (outer.marker.getAnimation() == null) {
          console.log("@@애니메이션 없다고 오리발내미는중->등록하자");
          outer.marker.setAnimation(naver.maps.Animation.BOUNCE);
        }
        console.log("과연?" + outer.companyPos);
        console.log("지금 은?" + outer.selectedDong);
      });
    },
    initMap() {
      this.mapOptions = {
        center: new naver.maps.LatLng(37.510740808403334, 127.04597817740535),
        zoom: 15,
        minzoom: 15,
        maxzoom: 15,
      };
      this.map = new naver.maps.Map("map0", this.mapOptions);
      console.log("@@@@@@@@@init map에서 latlng" + this.mapOptions["center"]);
      this.setMarkerEvent();
    },
    setMapCamera() {
      console.log("@@@@@@@카메라 변경스");
      this.mapOptions.center = new naver.maps.LatLng(this.cameraPos.lat, this.cameraPos.lng);
      // 카메라에 따라 맵 변경 -> position은 readonly라서 아예 새 지도 객체를 할당해야 함.
      this.map = new naver.maps.Map("map0", this.mapOptions);
      // 지도가 바뀌었으니 마커 이벤트도 다시 등록해야겟제
      this.marker.setMap(this.map);
      console.log("지도가 바낌 ->  마커 이벤트 재등록스 시작 ===");
      this.setMarkerEvent();
    },
  },
  created() {
    // 초기엔 아직 설정 안한 상태
    this.setCompanySelect(false);
  },
  mounted() {
    this.initMap();
    // 위치 빼고 세팅해주기 -> 처음에 아예안보이게
    this.marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(48, 48),
      // position: new naver.maps.LatLng(this.companyPos._lat,this.companyPos._lng),
      map: this.map,
      icon: {
        //   size: new naver.maps.Size(25, 34),
        scaledSize: new naver.maps.Size(80, 95),
        url: "./img/pin-map.svg",
        animation: naver.maps.Animation.BOUNCE,
      },
    });
  },
  computed: {},
  // computed는 새로운 데이터 선언시..``
  watch: {
    // 변할때마다 지도 변경
    cameraPos() {
      this.setMapCamera();
    },
    // 사용자 선택 갑 바뀔 때마다 마커 위치도 바뀌게 하기 위해 선택값 감시(data로 관리되며 실시간으로 바뀌는 중.)
    companyPos() {
      console.log("@@@@@@사용자 위치 바낌!!!!!!!!!!" + this.companyPos._lat);
      // var tmpLat = this.companyPos._lat;
      // var tmpLng = this.companyPos._lng;
      // console.log('더해지나 ' + (tmpLat+tmpLng))
      // 여러개 뜨지 않고 하나만 뜨도록
      // this.marker.setMap(this.map);
      this.marker.setPosition(this.companyPos);
    },
    selectedDong() {
      this.companyPos = 0;
    },
  },
};
</script>
