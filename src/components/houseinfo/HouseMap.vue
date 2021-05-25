<template>

  <div class="content">
    <div id="map" style="width:100%;height:400px;"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    var mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10
    };

    var map = new naver.maps.Map('map', mapOptions);
  }
}
</script>

<!-- 따릉이 대실패 코드....흑흑흑 -->
<!-- <template>

  <div class="content">
    <div id="map" style="width:100%;height:400px;"></div>
  </div>
</template>

<script>
export default {
  props:['guLat','guLng','publicbicycle'],
  methods: {
    drawMarker(){
      var mapOptions = {
        center : new naver.maps.LatLng(this.guLat, this.guLng),
        zoom: 14
      };

    var map = new naver.maps.Map('map', mapOptions);
    var markers = [];
    var picture = './img/'; // 임시 마커 아이콘
    var icon = picture+'mandala.png';
    var newMarkerOptions = {
      position: new naver.maps.LatLng(publicbicycle.lat,publicbicycle.lng),
      map: map,
      icon: {
        scaledSize: new naver.maps.Size(45,54),
        url: icon,
      }
    }
    markers.push(new naver.maps.markers(newMarkerOptions));
  console.log("따릉이 마커 잘들어가나????")
 }
  },
  mounted (){
    this.drawMarker();
  },
  watch:{
    publicbicycle: function () {
      this.drawMarker();
    }
  }
}
</script> -->