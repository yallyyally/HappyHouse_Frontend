<template>
<b-container v-if= "selectComplete">
    <h4><strong>
     <b-icon icon="music-note-beamed" scale="1" aria-hidden="true"></b-icon>
     문화정보</strong></h4>
     <!-- 해당 구의 지도 우선 나타냄 -->
     <cultural-map :guLat= "guPosition['lat']" :guLng= "guPosition.lng" :culturalSpaces= "culturalSpaces"></cultural-map>
</b-container>
</template>
<script>
    import { mapGetters }  from "vuex"
    import CulturalMap from '../towninfo/CulturalMap';
    export default{
        name: 'CulturalInfo',
        components:{
            CulturalMap
        },

        computed: {
            ...mapGetters(['selectedGu','selectComplete','guPosition','culturalSpaces']),
        },
        created(){
            console.log('구 위치 ?@@@@@@@@@@@@@@@@@@?@'+this.guPosition['lat']+" "+this.guPosition.lng);
        }
    }
</script>