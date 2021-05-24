<template>
    <div>
    <!-- 제목 -->
    <div class="title">
        <h2><b-icon icon="signpost" scale="1" ></b-icon> 서울 이곳 저곳</h2>
        <h5>구별 인구, 문화 정보 제공 </h5>
    </div>

    <div class="content">
    <!-- 구 선택 selectbox -->
    <span class="selectbox">
        <b-form-select v-model = "selectedGu" :options= "optionsGu" class="mb-3">
         <b-form-select-option :value= "null" disabled >-- 구 선택 --</b-form-select-option>
        </b-form-select>
    </span>

    <!-- 정보 보기 버튼 -->
    <span class="selectbox">
        <b-button @click="getTownInfo" variant="light" class="mb-2" > 검색 <b-icon icon="search" aria-hidden="true"></b-icon>
              <!-- <b-spinner variant="light"></b-spinner> -->
         </b-button>
    </span>
    </div>
    </div>
</template>
<style scoped>
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

    name:"SearchTown",
    computed:{
        // 소괄호 안써서 한시간 넘게 날림 ,,^^
        ...mapGetters(['optionsGu'])
    },
    created(){
        console.log("구 이름 불러오기 시작");
        this.getOptionsGu();
    },
    data(){
        //이거 mapState로 바꿀것.
        return{
        selectedGu:null,
        }
    },

    methods:{
        ...mapActions(['getOptionsGu']
        ),
        getTownInfo(){
            if(this.selectedGu == null){
                alert('지역을 선택해주세요.');
            }
            else{
                alert(this.selectedGu+"의 정보 가져오기")
            }
        },

    }

}

</script>