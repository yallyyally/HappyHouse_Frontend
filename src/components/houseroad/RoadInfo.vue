<template>
  <b-container v-if="companySelect" style="text-align: center">
    <h4>선택위치 근처 매물의 실시간 예상 이동시간/비용</h4>
    <div id="map1" style="width: 100%; height: 360px; margin-bottom: 20px"></div>
    <!-- {{ JSON.stringify(this.routeInfo) }} -->
    <div v-if="routeInfo.distance" style="width: 80%">
      <div class="row">
        <div class="col-4"><strong>소요시간(차) </strong></div>
        <div class="col">
          {{ Math.floor(this.routeInfo.duration / (1000 * 60 * 60)) }} 시간
          {{
            Math.floor(
              (this.routeInfo.duration -
                Math.floor(this.routeInfo.duration / (1000 * 60 * 60)) * 1000 * 60 * 60) /
                60000
            )
          }}분 소요 예상
        </div>
      </div>
      <div class="row">
        <div class="col-4"><strong>거리(m) </strong></div>
        <div class="col">{{ this.routeInfo.distance }}</div>
      </div>
      <div class="row">
        <div class="col-4"><strong>택시비 </strong></div>
        <div class="col">{{ this.routeInfo.taxiPrice }}원</div>
      </div>
      <div class="row">
        <div class="col-4"><strong>연료비 </strong></div>
        <div class="col">{{ this.routeInfo.fuelPrice }}원</div>
      </div>
    </div>
    <!-- 검색 누르면 바뀌겠지만 compnaySelect가 false라서 아ㅏ직안나올듯 -->
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "RoadInfo",
  data() {
    return {
      mapOptions: [],
      map1: "",
      markers: [],
      markersinfo: [],
    };
  },
  computed: {
    ...mapGetters(["routeInfo"]),
  },
  // 부모가 companyCameraPos, companyselect,houses 감시하다가 넘겨줄거임
  props: ["companySelect", "houses", "companyCameraPos"],
  methods: {
    ...mapActions(["getRouteInfo"]),
    getClickHandler(idx) {
      let outer = this;
      return function (e) {
        console.log("선택된 매물" + outer.markersinfo[idx].lat + ";" + outer.markersinfo[idx].lng);
        // 선택된 회사 위치와 선택한 매물 둘 다 위경도 보내줘야 함 -> start와 goal이 됨.
        outer.getRouteInfo([
          { lat: outer.companyCameraPos.lat, lng: outer.companyCameraPos.lng },
          { lat: outer.markersinfo[idx].lat, lng: outer.markersinfo[idx].lng },
        ]);
      };
    },
    setMap1() {
      console.log(
        "회사 중심 선택된거 받았니 ?" + this.companyCameraPos.lat + ":" + this.companyCameraPos.lng
      );

      this.mapOptions = {
        // center: new naver.maps.LatLng(this.companyCameraPos.lat, this.companyCameraPos.lng),
        center: new naver.maps.LatLng(this.companyCameraPos.lat, this.companyCameraPos.lng),

        zoom: 15,
        draggable: false,
        pinchZoom: false,
        scrollWheel: false,
        keyboardShortcuts: false,
        disableDoubleTapZoom: true,
        disableDoubleClickZoom: true,
        disableTwoFingerTapZoom: true,
      };
      this.map1 = new naver.maps.Map("map1", this.mapOptions);

      // 중심지 찍기
      var center = new naver.maps.Marker({
        position: new naver.maps.LatLng(this.companyCameraPos.lat, this.companyCameraPos.lng),
        map: this.map1,
        icon: {
          scaledSize: new naver.maps.Size(80, 95),
          url: "./img/pin-map.svg",
        },
      });
      // center.setContent("선택위치");
      //   집 마커 그리깅.companyCameraPos
      this.markers = [];
      this.markersinfo = [];
      var cnt = 0;
      this.houses.forEach((item) => {
        var newMarkerOptions = {
          position: new naver.maps.LatLng(item.lat, item.lng),
          map: this.map1,
          icon: {
            scaledSize: new naver.maps.Size(45, 54),
            url: "./img/house2.png",
          },
        };
        this.markers.push(new naver.maps.Marker(newMarkerOptions));
        this.markersinfo.push({
          lat: item.lat,
          lng: item.lng,
        });
        naver.maps.Event.addListener(this.markers[cnt], "click", this.getClickHandler(cnt++));
      });
      console.log("집찍기");
    },
  },
  mounted() {
    this.setMap1();
  },
  // 선택위치바뀔때마다 지도 위치 렌더링
  watch: {
    companyCameraPos: {
      deep: true,
      handler() {
        console.log("지도에서 watch @@@@@@@@@@@" + this.companyCameraPos.lat);
        this.setMap1();
      },
    },
  },
};
</script>
