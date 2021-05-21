<template>
    <b-container>
    <!-- 검색칸 -->
    <search-house></search-house>
    <!-- 지도맵 -->
    <house-map></house-map>
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
export default {
    components:{
        SearchHouse,
        HouseMap,
        HouseList
    }
}
</script>
<style scoped>

</style>