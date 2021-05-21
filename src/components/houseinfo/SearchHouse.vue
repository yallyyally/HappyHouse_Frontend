<template>
<b-container>

    <!-- 시군구 선택박스 -->
    <div class="title">
        <h2>원하는 지역 선택하기</h2>
        <h5> <b-icon icon="geo-alt-fill" scale="1" ></b-icon> 서울특별시의 매물정보 조회</h5>
    </div>
  
    <div class="content">
        <span class="selectbox">
            <b-form-select  v-model = "selectedGu" :options= "optionsGu" class="mb-3">
            <b-form-select-option :value= "null" disabled>-- 구를 선택해 주십시오 --</b-form-select-option>
            </b-form-select>
        </span>
        <span class="selectbox">
            <b-form-select  v-model = "selectedDong" :options= "optionsDong" class="mb-3">
            <b-form-select-option :value= "null" disabled>-- 동을 선택해 주십시오 --</b-form-select-option>
            </b-form-select>
        </span>
        <span class="selectbox">
            <b-button @click="getMap" variant="primary" class="mb-2">
            검색 <b-icon icon="search" aria-hidden="true"></b-icon>
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
import { mapActions } from 'vuex';

export default{
    name:"SearchHouse",
    data(){
        return{
        selectedGu:null,
        optionsGu:[
            {text:'은평구',value: "은평구"},
            {text:"강동구", value:'강동구'},
        ],
        selectedDong:null,
        optionsDong:[
            {text:'냐냐동',value:'냐ㅑㄴ동'},
            {text:"여여동", value:'여여동'}
        ]
        }
    },
    methods:{
        ...mapActions['getMap'],
    }

}

</script>