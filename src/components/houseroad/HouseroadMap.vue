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

        }
    },
    methods:{
        // 직장 정보선택 완
        setCompany(){
            alert('마커 선택 완료')
        },
        // 맵 초기화
        initMap(){
                    this.mapOptions = {
        center: new naver.maps.LatLng(37.510740808403334, 127.04597817740535),
          zoom: 15
      };
     new naver.maps.Map('map', this.mapOptions);

        },
        // 카메라에 따라 맵 변경
        setMapCamera(){
            this.mapOptions.center = new naver.maps.LatLng(this.cameraPos.lat, this.cameraPos.lng);
            new naver.maps.Map('map',this.mapOptions);
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