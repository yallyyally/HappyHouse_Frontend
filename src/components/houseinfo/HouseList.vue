<template>
    <b-container>
         <div>
        <b-table hover :items="houses"></b-table>
     </div>
    </b-container>
</template>
<script>
import { mapGetters } from "vuex";

export default{
    name:"HouseList",
    computed:{
        ...mapGetters(["houses"])
    },
    created(){
        // 페이지 로딩시 전체 매물 목록 불러오기
        console.log("created - 전체 집 불러오기시작");
        this.$store.dispatch("getHouses");
    },
}

</script>