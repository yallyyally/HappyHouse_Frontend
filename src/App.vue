<template>
<v-app>
  <div id="app">

    <app-header></app-header>
    <!-- 라우터 뷰 -->
    <router-view />
    
    <app-footer></app-footer>

  </div>
</v-app>
</template>

<style>
</style>

<script>
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
export default{
    components:{
      AppFooter,
      AppHeader
   }
}
</script>