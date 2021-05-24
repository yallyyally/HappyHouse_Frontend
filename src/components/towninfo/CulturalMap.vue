<template>

  <div class="content">
    <div id="map" style="width:100%;height:400px;"></div>
  </div>
</template>

<script>
export default {
    props:['guLat','guLng','culturalSpaces'],
    methods:{
      drawMarker(){
            //   지도 설정
      var mapOptions = {
        center: new naver.maps.LatLng(this.guLat, this.guLng),
          zoom: 14
      };
      var map = new naver.maps.Map('map', mapOptions);
      var markers = [];
        var picture = './img/';
        var icon='';
      this.culturalSpaces.forEach((item)=>{
        if(item.subject == '미술관'){
          icon = picture+'canvas.png';
        }
        else if(item.subject == '도서관'){
          icon = picture+'book.png';
        }
        else if(item.subject =='박물관/기념관'){
          icon = picture +'museum.png';
        }
        else if(item.subject == '기타'){
          icon = picture+'mandala.png';
        }
        else{
          icon = picture + 'theater.png';
        }
        var newMarkerOptions = {
          position: new naver.maps.LatLng(item.lat,item.lng),
          map:map,
                    icon:{
            //   size: new naver.maps.Size(25, 34),
                      scaledSize: new naver.maps.Size(45, 54),

              url:icon,
          }
        }
        markers.push(new naver.maps.Marker(newMarkerOptions));
      })
      console.log('@@@@@@@@@@@마커@@@@@@@@@@@@@')
      console.log(markers)
      }
    },
  mounted () {
    this.drawMarker();
  },
    watch:{
        culturalSpaces: function () {
        this.drawMarker();
      }
      }
}
</script>