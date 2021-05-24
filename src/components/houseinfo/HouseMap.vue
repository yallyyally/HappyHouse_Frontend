<template>
<div>
  here is map
  <button @click="what">show map</button>
  <div id="map" style="width:100%;height:400px;"></div>
  end of map
</div>
</template>
<script>
export default {
  mounted () {
    
  },
  methods:{
    what(){
      alert('???');
var mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10
    };

    var map = new naver.maps.Map('map', mapOptions);
    }
  }
}