<template>
  <div class="content">
      <b>반경 200m 원으로 표시</b>
    <div id="mapSpecific" style="width:100%;height:200px;"></div>
  </div>
</template>

<script>

export default {
    name:'SpecificHouseMap',
    props:['selectedHouseDealLatLng','school'],
    data(){
        return{
            mapOption:{}
        }
    },
      computed:{
        combined(){
            return this.school && this.selectedHouseDealLatLng
        }

    },
   watch:{
        combined(value){
            if(value){
                console.log('그리기 시작22~~')
                this.setMap();

            }
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
                url: './img/house2.png',
                scaledSize: new naver.maps.Size(35, 35),

            }
        })
        //학교마커
              this.school.forEach((item)=>{
        // console.log('@@@@@@@@ 학교 정보 있자나...lat'+mitem.lat+' lng'+mitem.lng);
        new naver.maps.Marker({
          // 위경도 반대 주의!
          position: new naver.maps.LatLng(item.lng,item.lat),
          map:map,
          icon:{
            scaledSize: new naver.maps.Size(40, 40),
            url:'./img/school.png'
          }
        });
      })

        // 집 기준 오버레이
         new naver.maps.Circle({
    map: map,
    center: new naver.maps.LatLng(this.selectedHouseDealLatLng.lat,this.selectedHouseDealLatLng.lng),
    radius: 200,
    fillColor: '#ffa500',
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
      zoom: 15
    };
        }
        else{

            this.mapOption = {
                //   center: new naver.maps.LatLng(37.3595704, 127.105399),
            center: new naver.maps.LatLng(this.selectedHouseDealLatLng.lat, this.selectedHouseDealLatLng.lng),
      zoom: 15
    };
          }
        this.setMap();
    },
    watch:{
        selectedHouseDealLatLng: function(){
            console.log('@@@@@@@@집정보당@@@@@@@'+JSON.stringify(this.selectedHouseDealLatLng));
        this.mapOption = {
        center: new naver.maps.LatLng(this.selectedHouseDealLatLng.lat, this.selectedHouseDealLatLng.lng),
          zoom: 15
      };
            this.setMap();
        }
    }
}
</script>