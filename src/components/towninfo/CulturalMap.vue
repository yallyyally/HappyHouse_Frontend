<template>

  <div class="content">
    <div id="map" style="width:100%;height:400px;"></div>
  </div>
</template>

<script>
export default {
    props:['guLat','guLng'],
  mounted () {
      var HOME_PATH = window.HOME_PATH || '.';
    //   지도 설정
      var mapOptions = {
        center: new naver.maps.LatLng(this.guLat, this.guLng),
          zoom: 15
      };
      var map = new naver.maps.Map('map', mapOptions);
    //   마커 설정
      var position = new naver.maps.LatLng(this.guLat, this.guLng);
    //   console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@'+HOME_PATH);
      var markerOptions={
          position:position,
          map:map,
          title:'냐냐',
          icon:{
            //   size: new naver.maps.Size(25, 34),
                      scaledSize: new naver.maps.Size(40, 54),

              url:'./img/banner.jpg',
          }
      };
      var marker = new naver.maps.Marker(markerOptions);

  }
}
</script>