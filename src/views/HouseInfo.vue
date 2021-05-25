<template>
    <b-container>
    <!-- 검색칸 -->
    <search-house></search-house>
    <!-- 지도맵 -->
    <house-map :school="school" :cameraPos="cameraPos"></house-map>
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
        ...mapGetters(['school','cameraPos']),
        combined(){
            return this.school && this.cameraPos
        }

    },
    watch:{
        combined(value){
            if(value){
                console.log('둘이 바ㅣ낌?')
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

</style>