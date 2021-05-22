<template>
<b-container>

    <!-- 시군구 선택박스 -->
    <div class="title">
        <h2>선택 지역 매물 조회</h2>
        <h5> <b-icon icon="geo-alt-fill" scale="1" ></b-icon> 서울특별시의 매물정보 조회</h5>
    </div>
  
    <div class="content">
        <span class="selectbox">
            <b-form-select  @change="changeGu()" v-model = "selectedGu" :options= "optionsGu" class="mb-3">
            <b-form-select-option :value= "null" >-- 구 전체 --</b-form-select-option>
            
            </b-form-select>
        </span>
        <span class="selectbox">
            <b-form-select  v-model = "selectedDong" :options= "optionsDong" class="mb-3">
            <b-form-select-option :value= "null" >-- 동 전체 --</b-form-select-option>
            </b-form-select>
        </span>
        <span class="selectbox">
            <b-button @click="getMap" variant="primary" class="mb-2">
            검색 <b-icon icon="search" aria-hidden="true"></b-icon>
              <b-spinner variant="light"></b-spinner>
            </b-button>
        </span>
    </div>

    <!-- 가격대 필터링 구간 -->
</b-container>
</template>
<style scope>
    .title{
        margin-top:50px;
        margin-bottom:20px;
        text-align: center;
    }
    .selectbox{
        width: 20%;
        margin-left:20px;
    }
    .content{
        text-align: center;
    }
</style>
<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default{

    name:"SearchHouse",
    computed:{
        // 소괄호 안써서 한시간 넘게 날림 ,,^^
        ...mapGetters(['optionsGu','optionsDong'])
    },
    created(){
        console.log("구 이름 불러오기 시작");
        this.getOptionsGu();
    },
    data(){
        //이거 mapState로 바꿀것.
        return{
        selectedGu:null,
        selectedDong:null,
        }
    },

    methods:{
        ...mapActions({
            getOptionsGu:'getOptionsGu',
            getOptionsDong:'getOptionsDong',
            getHousesByDong:'getHousesByDong',
            getHousesByGu:'getHousesByGu'
            
        }),
        getMap(){
            // 1. 둘 다 전체 -> 0
            // 2. 구만 설정 -> 종로구 null
            // 3. 구, 동 둘다 설정->구로구 항동.
            // 4. 동만 설정 -> null 금촌동
            if(this.selectedGu == null && this.selectedDong == null){
                // alert('전체 매물 가져오기!')
                this.$store.dispatch("getHouses");

            }
            else if(this.selectedGu != null && this.selectedDong == null){
                // alert(this.selectedGu+"에 속한 전체 동네 매물");
                this.getHousesByGu(this.selectedGu);
                
            }
            else{
                // alert(this.selectedDong+"의 매물 바로불러오자");
                this.getHousesByDong(this.selectedDong);
            }
        },
        changeGu(){
            // 구목록에 따라서 동 목록 로딩하기!
            this.selectedDong = null;
            this.getOptionsDong(this.selectedGu);
        }
    }

}

</script>