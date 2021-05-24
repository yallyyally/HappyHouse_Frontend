<template>
<b-container v-if= "selectComplete">
    <h4><strong>
     <b-icon icon="people" scale="1" aria-hidden="true"></b-icon>
     인구정보</strong></h4>
     <div class="content">
         <!-- 전체 인구 -->
         <h4><strong>{{selectedGu}}</strong>의 인구는 <strong>{{totalPopulation}}</strong>명 입니다.</h4>
         <h5>서울시 평균은 웅앵</h5>
        <totalpopulation-chart :barColor= "barColor" :chartoptions = "{responsive: true, maintainAspectRatio: false}" :populations= "populations" :dongs= "dongs" >
    </totalpopulation-chart>
            <b-row style="margin-top:50px;">
            <!-- 전입, 전출 인구 -->
            <b-col>
             <h5><strong>{{selectedGu}}</strong>의 인구는 <strong>{{totalMoveInOut}}명</strong> <strong><span v-if= "increase"> 증가</span> <span v-else>감소</span></strong>하였습니다.</h5>
                <moveinout-table :moveData= "moveData"></moveinout-table>
                </b-col>
            <!-- 가구별 인구수 -->
            <b-col><strong>가구별 인원</strong>

                <b-form-select @change= "changeDong()" v-model = "tmpSelectedDong" :options= "dongs" class="mb-3">
                <b-form-select-option :value= "null" disabled >-- 동 선택 --</b-form-select-option>
                </b-form-select>

                <family-chart :familyData= "familyData" ></family-chart>
            </b-col>
        </b-row>
     </div>
</b-container>
</template>
<script>
import TotalpopulationChart from './TotalpopulationChart.js';
import MoveinoutTable from './MoveinoutTable.vue'
import FamilyChart from './FamilyChart.js';

import {mapGetters} from "vuex"
import {mapActions} from "vuex"

export default{
    name: 'PopulationInfo',
    components:{
        TotalpopulationChart,
        MoveinoutTable,
        FamilyChart
},
data(){
    return{
        tmpSelectedDong: null,
    }
},
    methods:{
        ...mapActions(['makeCompleteFalse']),
        changeDong(){
            console.log('선택된 동'+this.tmpSelectedDong);
            this.$store.commit('SET_SELECTED_DONG',this.tmpSelectedDong)
        }
    },
    created(){
        this.makeCompleteFalse();

    },
    computed:{
        ...mapGetters(['increase','totalMoveInOut','selectedDong','selectedGu','populations','dongs','totalPopulation','selectComplete','barColor','moveData','familyData'])
    },


}
</script>

<style scoped>

.content{
    text-align:center;
}
</style>