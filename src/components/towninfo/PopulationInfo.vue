<template>
<b-container v-if= "selectComplete">
    <h4><strong>
     <b-icon icon="people" scale="1" aria-hidden="true"></b-icon>
     인구정보</strong></h4>
     <div class="content">
         <h4>{{selectedGu}}의 인구는 <strong>{{totalPopulation}}</strong>명 입니다.</h4>
        <totalpopulation-chart :barColor= "barColor" :chartoptions = "{responsive: true, maintainAspectRatio: false}" :populations= "populations" :dongs= "dongs" >

    </totalpopulation-chart>
     </div>
</b-container>
</template>
<script>
import TotalpopulationChart from './TotalpopulationChart.js';
import {mapGetters} from "vuex"
import {mapActions} from "vuex"
export default{
    name: 'PopulationInfo',
    components:{
        TotalpopulationChart
    },
    methods:{
        ...mapActions(['makeCompleteFalse'])
    },
    created(){
        this.makeCompleteFalse();
    },
    computed:{
        ...mapGetters(['selectedGu','populations','dongs','totalPopulation','selectComplete','barColor'])
    },


}
</script>

<style scoped>

.content{
    text-align:center;
}
</style>