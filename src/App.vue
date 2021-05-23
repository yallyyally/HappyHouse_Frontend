<template>
  <div id="app">

<app-header></app-header>
    <!-- 라우터 뷰 -->
    <router-view />

    <!-- header 코드가 길어서 footer는 따로 뺏는데  -->
    <!-- 시간이 남으면 header 코드도 빼면 좋을듯함니다 ~~! -->
    <app-footer></app-footer>

  </div>
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