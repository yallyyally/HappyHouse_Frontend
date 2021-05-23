<template>
    <b-container>
             <b-table hover  @click = "clickHouse($event)" :items= "houses" :fields= "fields">
             </b-table>
        <!-- <b-table hover :items="houses"></b-table> -->
    </b-container>
</template>
<script>
import { mapGetters } from "vuex";

export default{
    name:"HouseList",
    data(){
        return {
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
        ...mapGetters(["houses"])
    },
    created(){
        // 페이지 로딩시 전체 매물 목록 불러오기
        console.log("created - 전체 집 불러오기시작");
        this.$store.dispatch("getHouses");
    },
    methods:{
        clickHouse(event){

            alert(event.currentTarget+"클릭!")
        }
    }
}

</script>