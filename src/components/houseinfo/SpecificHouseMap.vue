<template>
  <div class="content">
      반경 50m 원으로 표시
    <div id="mapSpecific" style="width:100%;height:200px;"></div>
  </div>
</template>

<script>

export default {
    name:'SpecificHouseMap',
    props:['selectedHouseDealLatLng'],
    data(){
        return{
            mapOption:{}
        }
    },
    methods:{
        setMap(){
            console.log('현재 래트랭 ? '+JSON.stringify(this.selectedHouseDealLatLng))
         var map =  new naver.maps.Map('mapSpecific',this.mapOption);
        //   집 마커 찍기
        new naver.maps.Marker({
            position: new naver.maps.LatLng(this.selectedHouseDealLatLng.lat,this.selectedHouseDealLatLng.lng),
            map: map,
            icon:{
                url: './img/house.png',
                scaledSize: new naver.maps.Size(30, 30),

            }
        })

        // 집 기준 오버레이
         new naver.maps.Circle({
    map: map,
    center: new naver.maps.LatLng(this.selectedHouseDealLatLng.lat,this.selectedHouseDealLatLng.lng),
    radius: 45,
    fillColor: '#2e8b57',
    fillOpacity: 0.5,
    strokeWeight:0
});

        }
    },
    mounted(){
        var tmp = JSON.stringify(this.selectedHouseDealLatLng);
        console.log('@@@@@@@@@@@@@'+tmp)
        console.log(typeof(tmp))

        if(tmp == '{}' ||this.selectedHouseDealLatLng == null){
                  this.mapOption = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 17
    };
        }
        else{

            this.mapOption = {
                //   center: new naver.maps.LatLng(37.3595704, 127.105399),
            center: new naver.maps.LatLng(this.selectedHouseDealLatLng.lat, this.selectedHouseDealLatLng.lng),
      zoom: 17
    };
          }
        this.setMap();
    },
    watch:{
        selectedHouseDealLatLng: function(){
            console.log('@@@@@@@@집정보당@@@@@@@'+JSON.stringify(this.selectedHouseDealLatLng));
        this.mapOption = {
        center: new naver.maps.LatLng(this.selectedHouseDealLatLng.lat, this.selectedHouseDealLatLng.lng),
          zoom: 17
      };
            this.setMap();
        }
    }
}
</script>