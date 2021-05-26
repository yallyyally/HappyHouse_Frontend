<template>
<div style="text-align:center;">
    <span><strong>관심 있는 지점을 클릭해봐유</strong></span>
        <div id="map" style="width:100%;height:400px; margin-bottom:20px;"></div>
         <v-btn rounded color="primary" dark @click="setCompany()"> 선택 완료</v-btn>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default{
    props:['cameraPos'],
    computed:{
        ...mapGetters(['selectDongcomplete'])
    },
    name:'HouseroadMap',
    data(){
        return{
          mapOptions:{},
        map:'',
        marker:''
        }
    },
    methods:{
        // 직장 정보선택 완
        setCompany(){
            alert('마커 선택 완료')
        },
        // 마커 찍기
        setMarker(lat,lng){
            // 처음에 안보이다가
            console.log('@@@@@@@@@2'+JSON.stringify(this.cameraPos));
            if(lat == 0){
                
            }
var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    map: this.map
});

naver.maps.Event.addListener(this.map, 'click', function(e) {
    marker.setPosition(e.coord);
    console.log('현재위치 '+e.coord);
    
});

        },
        // 맵 초기화
        initMap(){
        this.mapOptions = {
        center: new naver.maps.LatLng(37.510740808403334, 127.04597817740535),
          zoom: 15
        };
          this.map =   new naver.maps.Map('map', this.mapOptions);
          this.setMarker(0,0);
        },
        // 카메라에 따라 맵 변경
        setMapCamera(){
            this.mapOptions.center = new naver.maps.LatLng(this.cameraPos.lat, this.cameraPos.lng);
            this.map = new naver.maps.Map('map',this.mapOptions);
            this.setMarker(this.cameraPos.lat,this.cameraPos.lng);
        }
    },
    mounted(){
        this.initMap();

    },
    watch:{
        // 변할때마다 지도 변경
        cameraPos(){
            this.setMapCamera();
        }
    }
    
}

</script>