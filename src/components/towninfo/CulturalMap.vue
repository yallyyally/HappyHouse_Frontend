<template>

  <div class="content">
    <div id="map" style="width:100%;height:400px;"></div>
  </div>
</template>

<script>
export default {
    props:['guLat','guLng'],
  mounted () {
    var mapOptions = {
      center: new naver.maps.LatLng(this.guLat, this.guLng),
      zoom: 15
    };

    var map = new naver.maps.Map('map', mapOptions);
  }
}
</script>