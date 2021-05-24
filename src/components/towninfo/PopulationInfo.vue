<template>
<b-container v-if= "selectComplete">
    <h4><strong>
     <b-icon icon="people" scale="1" aria-hidden="true"></b-icon>
     인구정보</strong></h4>
     <div class="content">
         <!-- 전체 인구 -->
         <h4>{{selectedGu}}의 인구는 <strong>{{totalPopulation}}</strong>명 입니다.</h4>
        <totalpopulation-chart :barColor= "barColor" :chartoptions = "{responsive: true, maintainAspectRatio: false}" :populations= "populations" :dongs= "dongs" >
    </totalpopulation-chart>
            <b-row style="margin-top:50px;">
            <!-- 전입, 전출 인구 -->
            <b-col><moveinout-table :moveData= "moveData"></moveinout-table></b-col>
            <!-- 가구별 인구수 -->
            <b-col>ab</b-col>
        </b-row>
     </div>
</b-container>
</template>
<script>
import TotalpopulationChart from './TotalpopulationChart.js';
import MoveinoutTable from './MoveinoutTable.vue'

import {mapGetters} from "vuex"
import {mapActions} from "vuex"

export default{
    name: 'PopulationInfo',
    components:{
        TotalpopulationChart,
        MoveinoutTable
    },
    methods:{
        ...mapActions(['makeCompleteFalse'])
    },
    created(){
        this.makeCompleteFalse();
    },
    computed:{
        ...mapGetters(['selectedGu','populations','dongs','totalPopulation','selectComplete','barColor','moveData'])
    },


}
</script>

<style scoped>

.content{
    text-align:center;
}
</style>