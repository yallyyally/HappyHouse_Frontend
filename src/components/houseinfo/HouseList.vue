<template>
    <b-container>
             <b-table v-b-toggle.sidebar-no-header hover @row-clicked = "clickHouse($event)" :items= "houses" :fields= "fields">
             </b-table>
                 <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
          <p>
            아파트명 {{selectedHouse.aptname}}
            면적 {{selectedHouse.area}}
          </p>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
    </b-container>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default{
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
        ...mapGetters(["houses",'selectedHouse'])
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