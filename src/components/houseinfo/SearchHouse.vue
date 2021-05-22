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
        // optionsGu:[
        //     {text:'은평구',value: "은평구"},
        //     {text:"강동구", value:'강동구'},
        // ],
        selectedDong:null,
        // optionsDong:[
        //     {text:'냐냐동',value:'냐ㅑㄴ동'},
        //     {text:"여여동", value:'여여동'}
        // ]
        }
    },

    methods:{
        ...mapActions({
            getOptionsGu:'getOptionsGu',
            getOptionsDong:'getOptionsDong'
        }),
        getMap(){
            alert('클릭')
        },
        changeGu(){
            alert(this.selectedGu+' 선택!')
            // 구목록에 따라서 동 목록 로딩하기!
            this.getOptionsDong(this.selectedGu);
        }
    }

}

</script>