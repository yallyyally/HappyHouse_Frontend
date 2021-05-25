<template>
    <b-container>
             <b-table v-b-toggle.sidebar-no-header hover @row-clicked = "clickHouse($event)" :items= "houses" :fields= "fields">
             </b-table>
                 <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">
               <b-icon icon="building" aria-hidden="true"></b-icon>
               <b> {{selectedHouse.aptname}}</b></h4>
            <hr>
          <p >
            <b>건축년도</b> {{selectedHouse.buildyear}}<br/>
            <b>지번</b> {{selectedHouse.jibun}}<br/>
            <b>거래 평균 금액 </b>{{avgDealAmount}}원
          </p>
          <specific-house-map :school="school" :selectedHouseDealLatLng = "selectedHouseDealLatLng"></specific-house-map>
          <div style="margin-top:15px;">
          <h5> <b-icon icon="graph-up" aria-hidden="true"></b-icon>
          <b> 거래 내역</b></h5>
          </div>
          <!-- 거래내역 그래프로 -->
          <housedeal-chart :chartoptions = "{responsive: true, maintainAspectRatio: false}" :selectedHouseDealAmount= "selectedHouseDealAmount" :selectedHouseDealDate= "selectedHouseDealDate" ></housedeal-chart>
          <b-table :items= "selectedHouseDeal"></b-table>
          <b-button variant="secondary" block @click="hide">닫기</b-button>
        </div>
      </template>
    </b-sidebar>
    </b-container>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import HousedealChart from './HousedealChart.js';
import SpecificHouseMap from './SpecificHouseMap.vue';

export default{
    components:{
      HousedealChart,
      SpecificHouseMap
   },
    name:"HouseList",
    data(){
        return {
            sidebar: false,
            fields:
            [
            {key:'no',label:'순번'},
           {key:'dong',label:'동'},
           {key:'aptname', label:'아파트명'},
           {key:'low', label:'최저가'},
           {key:'high', label:'최고가'}
           ]
        }

    },
    computed:{
        ...mapGetters(['school','selectedHouseDealLatLng','cameraPos',"houses",'selectedHouse','selectedHouseDeal','avgDealAmount','selectedHouseDealAmount','selectedHouseDealDate'])
    },
    created(){
        // 페이지 로딩시 전체 매물 목록 불러오기
        console.log("created - 전체 집 불러오기시작");
        this.$store.dispatch("getHouses");
    },
    methods:{
        ...mapActions(['setSelectedHouse']),
        clickHouse(event){
            // this.sidebar = true,
            // json obj -> string으로 변환하고 전달해줘야 함
            const dongName=JSON.stringify(event.dong);
            console.log("선택한 동"+dongName)
            const aptname = JSON.stringify(event.aptname);
            console.log("선택아파트 "+aptname)
            var obj = new Object();
            obj.dongName=dongName;
            obj.aptname = aptname;
            this.setSelectedHouse(obj);

        }
    }
}

</script>