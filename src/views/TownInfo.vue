<template>
<div>
<!-- 검색칸 -->
 <search-town></search-town>
 <!-- 인구 정보 -->
 <population-info></population-info>
 <!-- 문화정보 -->
 <cultural-info></cultural-info>
</div>
</template>

<script>
import SearchTown from '../components/towninfo/SearchTown.vue'
import PopulationInfo from '../components/towninfo/PopulationInfo.vue';
import CulturalInfo from '../components/towninfo/CulturalInfo.vue';

export default{
    components:{
        SearchTown,
        PopulationInfo,
        CulturalInfo
    }
    
}
</script>