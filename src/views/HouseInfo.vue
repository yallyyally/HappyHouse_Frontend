<template>
    <b-container>
        <!-- 제목 -->
    <div class="title">
        <strong><h2>선택 지역 매물 조회</h2></strong>
        <h5> <b-icon icon="geo-alt-fill" scale="1" ></b-icon> 서울특별시의 매물정보 조회</h5>
    </div>
    <!-- 검색칸 -->
    <search-house></search-house>
    <!-- 지도맵 -->
    <house-map :school="school" :kindergarten="kindergarten" :cameraPos="cameraPos" :houses="houses" :subway="subway" :bus="bus" :publicbicycle="publicbicycle"></house-map>
    <!-- 매물정보 -->
    <house-list></house-list>
    </b-container>


</template>
<script>
import SearchHouse from '../components/houseinfo/SearchHouse.vue';
import HouseMap from '../components/houseinfo/HouseMap.vue';
// import {HouseList} from '../componets/houseinfo/HouseList.vue';
// 중괄호 절대 no,,,,
import HouseList from '../components/houseinfo/HouseList';
import { mapGetters } from 'vuex';
// import {mapState} from 'vuex';

export default {
    computed:{
        ...mapGetters(['school','kindergarten','cameraPos','houses','subway','bus','publicbicycle']),
        combined(){
            return this.school && this.kindergarten && this.cameraPos && this.houses && this.subway && this.bus && this.publicbicycle;
        }

    },
    watch:{
        combined(value){
            if(value){
                console.log('세개 다 바낌.')
                // console.log('카메라 '+JSON.stringify(this.cameraPos))
                // console.log('학교제발 '+JSON.stringify(this.school))
            }
        }
    },
    data(){
        return{

        }
    },
    components:{
        SearchHouse,
        HouseMap,
        HouseList
    }
}
</script>
<style scoped>
    .title{
        margin-top:50px;
        margin-bottom:20px;
        text-align: center;
    }
</style>