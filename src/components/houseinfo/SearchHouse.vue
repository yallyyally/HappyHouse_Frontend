<template>
<b-container>
    <div class="content">
        <span class="selectbox">
            <b-form-select  @change="changeGu()" v-model = "selectedGu" :options= "optionsGu" class="mb-3">
            <b-form-select-option :value= "null" disabled>-- 구 선택 --</b-form-select-option>
            
            </b-form-select>
        </span>
        <span class="selectbox">
            <b-form-select  v-model = "selectedDong" :options= "optionsDong" class="mb-3">
            <b-form-select-option :value= "null" disabled>-- 동 선택 --</b-form-select-option>
            </b-form-select>
        </span>
        <span class="selectbox">
            <b-button @click="getMap" variant="light" class="mb-2" > 검색 <b-icon icon="search" aria-hidden="true"></b-icon>
              <!-- <b-spinner variant="light"></b-spinner> -->
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
            getHousesByGu:'getHousesByGu',
            getSchoolInfo:'getSchoolInfo',
            setCameraPos:'setCameraPos',
            getSubwayInfo:'getSubwayInfo',
            getPublicBicycleInfo:'getPublicBicycleInfo',
            setSelectDongComplete:'setSelectDongComplete'
            
        }),
        getMap(){
            if(this.selectedGu == null  || this.selectedDong == null){;
                alert('주소를 모두 입력해주세요.')
            }
            else{
                // 1. 중심 위치 불렁오기. 0.구 정보에 따라 학교 정보, 따릉이 정보, 매물 정보 불러오기 ))-> 
                //2.state에 저장 
                // 3.map에 props로 주기


                // 학교 정보 받아오기
                this.getSchoolInfo(this.selectedGu);
                // 매물 정보 받아오기
                this.getHousesByDong(this.selectedDong);
                // 카메라 위치 설정
                this.setCameraPos(this.selectedDong);
                // 지하철 정보 받아오기
                this.getSubwayInfo(this.selectedGu);
                // 따릉이 정보 받아오기
                this.getPublicBicycleInfo(this.selectedGu);
                // 동 선택 완료 상태로..
                // this.setSelctDongComplete(true);
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