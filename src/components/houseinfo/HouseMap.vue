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