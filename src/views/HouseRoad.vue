<template>
<b-container>
    <!-- 제목 -->
       <div class="title">
        <strong><h2>매물별 길찾기</h2></strong>
        <h5> <b-icon icon="truck" scale="1" ></b-icon> 이 집에서 직장까지 가려면 얼마나 걸릴까?</h5>
    </div>
    <!-- 검색 -->
    <search-house></search-house>
    <!-- 지도맵 -->
    <houseroad-map :selectedDong="selectedDong" :cameraPos="cameraPos"></houseroad-map>
    <!-- 선택 지역 길찾기 정보 -->
    <!-- 맨처음에 false-null-null  -->
    <!-- 선택되면 true-...어쩌구 ...&& 저쩌꾸 -->
    <road-info :companySelect="companySelect" :companyCameraPos="companyCameraPos" :houses="houses"></road-info>
</b-container>
</template>

<script>
import SearchHouse from '../components/houseinfo/SearchHouse'
import HouseroadMap from '../components/houseroad/HouseroadMap';
import RoadInfo from '../components/houseroad/RoadInfo';

import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default{
    components:{
        SearchHouse,
        HouseroadMap,
        RoadInfo
    },    // 부모가 companyCameraPos, companyselect,houses 감시하다가 넘겨줄거임
    methods:{
        ...mapActions(['getHousesByDong'])
    },
    computed:{
        ...mapGetters(['selectedDong','cameraPos','companySelect','houses','companyCameraPos']),
        combined(){
            // 회사가 선택된 상태에만 두가지 조건 적용.
            // 아니면 걍 디폴트 상태로 있음.(안보임)
            if(this.companySelect)  {
                console.log('houseroad@@@@@@@@@@@combined@@@@@@@@@@@@')
                // house가 null이다 ? 디폴트 위치인겨
                // if(this.houses.length == 0){
                //     this.getHousesByDong('역삼동');
                // }
                return this.houses && this.companyCameraPos.lat;
            }
        }
    },
    watch:{
        combined(value){
            if(value){
                console.log('houseroad @@@@@@@@@@@@watch@@@@@@@@@@@@@')
                console.log(this.companySelect+" "+JSON.stringify(this.houses),this.companyCameraPos);
            }
        }
    }

}
</script>