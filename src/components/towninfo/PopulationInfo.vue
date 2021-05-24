<template>
<b-container v-if= "selectComplete">
    <h4><strong>
     <b-icon icon="people" scale="1" aria-hidden="true"></b-icon>
     인구정보</strong></h4>
     <div class="content">
         {{selectedGu}}의 인구는 {{totalPopulation}} 입니다.
        <totalpopulation-chart :chartoptions = "{responsive: true, maintainAspectRatio: false}" :populations= "populations" :dongs= "dongs" >

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
        ...mapGetters(['selectedGu','populations','dongs','totalPopulation','selectComplete'])
    },


}
</script>

<style scoped>

.content{
    text-align:center;
}
</style>