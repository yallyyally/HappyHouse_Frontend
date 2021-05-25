<template>
<div>
  <div class="content">
    <div id="map" style="width:100%;height:400px;"></div>
    <span v-if= "selectedCultureNo">{{selectedCultureNo}}</span>
    <span v-else>업승ㅁ</span>
  </div>
  <b-container>
    <!-- 마커 이미지 설명 -->
    문화공간마커이미지설명
    <!-- <img src='' -->
  </b-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';

export default {
    props:['guLat','guLng','culturalSpaces'],
    data(){
      return{
        markers:[],
        mapOptions:{},
        markersinfo:[],
        infowindow:[]
      }
    },
    computed:{
      ...mapGetters(['selectedCultureNo'])
    },
    methods:{
      ...mapActions({
        setSelectedMarkerNo: 'setSelectedCultureNo',
      }),
      getClickHandler(seq){
     return function(e) {
        var markerTmp = markers[seq],
            infoWindow = this.infowindows[seq];

        if (infoWindow.getMap()) {
            infoWindow.close();
        } else {
            infoWindow.open(map, markerTmp);
        }
    }
      },
      drawMarker(){
        // this.selectedCultureNo초기화필요
        this.setSelectedMarkerNo(null);
        this.information = null;
        var idx = 0;
        this.markersinfo=[];
        this.markers = [];
        this.infowindows = []
      var map = new naver.maps.Map('map', this.mapOptions);
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
        this.markers.push(new naver.maps.Marker(newMarkerOptions));

        this.markersinfo.push({
          name:item.name,
          no:item.no,
          markerno:idx,
          addr:item.address,
          info:item.imformation,
          close:item.close
        })
        
    var tmp = new naver.maps.InfoWindow({
        content: '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"'+ item.imformation +'"</b>.</div>'
    });

    this.infowindows.push(tmp);
        naver.maps.Event.addListener(this.markers[idx],'click',this.getClickHandler(idx++));
      })
      console.log('@@@@@@@@@@@마커@@@@@@@@@@@@@')
      console.log(this.markers)
      }
    },
  mounted () {
    this.drawMarker();
    // this.selectedMarkerNo=null; 필요
    // this.se
  },
    watch:{
        culturalSpaces: function () {
      this.mapOptions = {
        center: new naver.maps.LatLng(this.guLat, this.guLng),
          zoom: 14
      };
      
        this.drawMarker();
      }
      },
      created(){
          // selectedMarkerNoNull피료
          this.information=null;
          this.setSelectedMarkerNo(null)
          this.mapOptions = {
        center: new naver.maps.LatLng(this.guLat, this.guLng),
          zoom: 14
      };
      }

}
</script>