<template>
<div>
  <div class="content">
  <b-container>
    <strong><span><img class="image" src='@/assets/book.png'/> 도서관 /</span>&nbsp;
    <span><img class="image" src='@/assets/canvas.png'/> 미술관 /</span>&nbsp;
    <span><img class="image" src='@/assets/museum.png'/> 박물관 /</span>&nbsp;
    <span><img class="image" src='@/assets/theater.png'/> 공연장 /</span>&nbsp;
    <span><img class="image" src='@/assets/mandala.png'/> 기타 </span></strong>
  </b-container>
    <div id="map" style="width:100%;height:400px;"></div>
    <span v-if= "showinfo">{{showinfo}}</span>
    <span v-else>업승ㅁ</span>
  </div>
  </div>
</template>
<style scoped>
  .image{
    width:35px;
  }
</style>


<script>
// import {mapGetters} from 'vuex';
// import {mapActions} from 'vuex';

export default {
    props:['guLat','guLng','culturalSpaces'],
    data(){
      return{
        markers:[],
        mapOptions:{},
        markersinfo:[],
        infowindow:[],
        showinfo:null
      }
    },

    methods:{
      getClickHandler(seq){
        let outer = this;
        return function(e) {
          outer.showinfo = outer.markersinfo[seq];
        }
      },
      drawMarker(){
        this.showinfo = null;
        // this.selectedCultureNo초기화필요
        // this.information = null;
        var idx = 0;
        this.markersinfo=[];
        this.markers = [];
        // this.infowindows = []
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

    // this.infowindows.push(tmp);
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
          // this.information=null;
          // this.setSelectedMarkerNo(null)
          this.mapOptions = {
        center: new naver.maps.LatLng(this.guLat, this.guLng),
          zoom: 14
      };
      }

}
</script>