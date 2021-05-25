<template>

  <div class="content">
    <div id="map" style="width:100%;height:400px;"></div>
  </div>
</template>

<script>

export default {
  data(){
    return{
     mapOptions:{},
    //  map:'',
    //  schoolMarkers:[],
    //  schoolMarkerInfos:[],
    houseinfo:[]
    }

  },
  methods:{
    setMap(){

      // this.schoolMarkers = [];
      // this.schoolMarkerInfos  = [];
      // new naver.maps.Marker({
      //   position : new naver.maps.LatLng(this.cameraPos.lat,this.cameraPos.lng),
      //   map:map2,
      //   icon:{
      //       scaledSize: new naver.maps.Size(45, 54),
      //       url:'./img/school.png'

      //   }
      // });

      console.log('now location:'+this.cameraPos.lat+','+this.cameraPos.lng);
      // console.log(JSON.stringify(this.mapOptions))
      // 초반엔 학교, 집 정보가 null이므로 이를고려해줘야 한답.
      var map2;
      if(this.cameraPos.lat != 0){
            this.mapOptions = {
      center: new naver.maps.LatLng(this.cameraPos.lat,this.cameraPos.lng),
      zoom: 16
    };
      }else{
            this.mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10
    };
      }
        // 설정한대로 렌더링
        map2 = new naver.maps.Map('map', this.mapOptions);
      if(this.cameraPos.lat != 0){
      // 학교 정보 받아와서 마커 찍기
      this.school.forEach((item)=>{
        const mitem = JSON.parse(JSON.stringify(item));
        // console.log('@@@@@@@@ 학교 정보 있자나...lat'+mitem.lat+' lng'+mitem.lng);
        let tmpMarker =new naver.maps.Marker({
          // 위경도 반대 주의!
          position: new naver.maps.LatLng(mitem.lng,mitem.lat),
          map:map2,
          icon:{
            scaledSize: new naver.maps.Size(45, 54),
            url:'./img/school.png'
          }
        });
      })

      // 집 정보 받아와서 매물 찍기
      this.houseinfo = []
      var idx = 0;
      this.houses.forEach((item)=>{
        this.houseinfo.push({'idx':idx, 'houseno':item.no})
        new naver.maps.Marker({
          position: new naver.maps.LatLng(item.lat,item.lng),
          map:map2,
          icon:{
            scaledSize: new naver.maps.Size(45,54),
            url:'./img/house2.png'
          }
        })
        idx++;
      })
      }

      //   this.markers.push(new naver.maps.Marker(markOpt));
        // 그냥 마커정보 - 순번 메핑해서 디비에서 받아와도 될듯...
        // 이건 세부정보 저장용 (지도는 속성값이 정해져서 어쩔수x)
        // var schoolMarkerInfo = {
        //   name : item.name,
        //   telno: item.telno,
        //   info: item.info,
        //   highschoolkind: item.highschoolkind,
        //   addr: item.address,
        // }
        // this.schoolMarkerInfos.push(schoolMarkerInfo);
     // })//저장

            console.log('@@@@@@@@@@   끗   @@@@@@@@@@@@@')
      // console.log(this.markers)

    },
  },
  mounted () {
    // 지도 세팅

   this.setMap();
  },
  created(){
    // 기본위치 세팅
  },
  props:['school','cameraPos','houses'],
  // 카메라 위치 바뀔 때마다 계속 실행스
  computed:{
        combined(){
            return this.school && this.cameraPos && this.houses
        }

    },
   watch:{
        combined(value){
            if(value){
                // console.log('둘이 바ㅣ낌?')
                // console.log('카메라 2222'+JSON.stringify(this.cameraPos))
                // console.log('학교제발 2222'+JSON.stringify(this.school))
                this.mapOptions = {
                        center: new naver.maps.LatLng(this.cameraPos.lat, this.cameraPos.lng),
                        zoom: 15
                    };
                console.log('그리기 시작~~')
                this.setMap();

            }
        }
    },
    //카메라 위치, 학교 속성 둘다 바꼈을때만 렌더링하자

    // },
    // 문제점: 위치 바뀜 -> 카메라 설정 -> 마커찍기 -> 학교정보 받아옴
    // 해결방안: 카메라 설정 -> 학교정보 -> 마커 찍기

  // }
}
</script>

<!-- 따릉이 대실패 코드....흑흑흑 -->
<!-- <template>

  <div class="content">
    <div id="map" style="width:100%;height:400px;"></div>
  </div>
</template>

<script>
export default {
  props:['guLat','guLng','publicbicycle'],
  methods: {
    drawMarker(){
      var mapOptions = {
        center : new naver.maps.LatLng(this.guLat, this.guLng),
        zoom: 14
      };

    var map = new naver.maps.Map('map', mapOptions);
    var markers = [];
    var picture = './img/'; // 임시 마커 아이콘
    var icon = picture+'mandala.png';
    var newMarkerOptions = {
      position: new naver.maps.LatLng(publicbicycle.lat,publicbicycle.lng),
      map: map,
      icon: {
        scaledSize: new naver.maps.Size(45,54),
        url: icon,
      }
    }
    markers.push(new naver.maps.markers(newMarkerOptions));
  console.log("따릉이 마커 잘들어가나????")
 }
  },
  mounted (){
    this.drawMarker();
  },
  watch:{
    publicbicycle: function () {
      this.drawMarker();
    }
  }
}
</script> -->