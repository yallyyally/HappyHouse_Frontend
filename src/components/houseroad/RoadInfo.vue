<template>
  <b-container v-if="companySelect" style="text-align: center">
    <h4>선택한 위치 근처의 매물 정보</h4>
    <div id="map1" style="width: 100%; height: 360px; margin-bottom: 20px"></div>
    {{ JSON.stringify(this.houses) }}
    <!-- 검색 누르면 바뀌겠지만 compnaySelect가 false라서 아ㅏ직안나올듯 -->
  </b-container>
</template>
<script>
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
  // 부모가 companyCameraPos, companyselect,houses 감시하다가 넘겨줄거임
  props: ["companySelect", "houses", "companyCameraPos"],
  methods: {
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
          no: cnt++,
          lat: item.lat,
          lng: item.lng,
        });
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
