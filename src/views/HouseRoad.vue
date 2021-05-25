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
    <houseroad-map :cameraPos="cameraPos"></houseroad-map>
</b-container>
</template>

<script>
import SearchHouse from '../components/houseinfo/SearchHouse'
import HouseroadMap from '../components/houseroad/HouseroadMap';
import {mapGetters} from 'vuex'
export default{
    components:{
        SearchHouse,
        HouseroadMap
    },
    computed:{
        ...mapGetters(['cameraPos'])
    }

}
</script>