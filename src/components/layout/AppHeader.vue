<template lang="">
    <div id="nav">
      <!-- 네비 테마 -->
  <b-navbar toggleable="lg" type="dark" variant="dark" class="nav">
    <!-- 왼쪽: 로고, 커뮤니티(공지사항,큐앤에이,자유게시판),매물,동네정보\-->
    <!-- 로고 -->
    <b-navbar-brand href="/">
            <img src="@/assets/logo.png" id="logo"/>

      <img src="@/assets/happyhouse_logo.png" id="happy_logo"/>
    </b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>
      <!-- 커뮤니티 -->
            <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="커뮤니티" right>
          <b-dropdown-item href="/Board">자유게시판</b-dropdown-item>
          <b-dropdown-item href="#">Q&A</b-dropdown-item>
          <b-dropdown-item href="#">공지사항</b-dropdown-item>
         </b-nav-item-dropdown>

<!-- 있어보이는 단어로 바꿀 것.. -->
      <!-- 매물 -->
      <b-navbar-nav>
              <!-- <router-link to="/about">About</router-link> -->
        <!-- 이게 라우터라는걸몰라도 가능스 -->
        <b-nav-item href="/houseinfo">매물정보</b-nav-item>
      </b-navbar-nav>

      <!-- 동네정보 -->
      <b-navbar-nav>
        <b-nav-item href="#">동네정보</b-nav-item>
      </b-navbar-nav>
    </b-navbar-nav>
    
      <!-- 오른쪽: 로그인/회원가입/로그아웃,마이페이지 -->
  
  <!-- 로그인 전 보이는 버전 -->
   <!-- <div v-if="!getAccessToken"> -->
      <b-navbar-nav id="beforeLogin">
      <!-- 로그인 -->
        <b-navbar-nav>
        <b-nav-item href="/login">로그인</b-nav-item>
      </b-navbar-nav>
      <!-- 회원가입 -->
      <b-navbar-nav>
        <b-nav-item href="/join">회원가입</b-nav-item>
      </b-navbar-nav>
        </b-navbar-nav>
  <!-- </div> -->
  <!-- <div v-else>  -->
    <!-- 로그인 후 보이는 버전 -->
          <b-navbar-nav id="afterLogin">
          <!-- 로그아웃 -->
          <b-navbar-nav>
            <!-- <b-nav-item>{{ getUserId }} 님 환영합니다!</b-nav-item> -->
        <b-nav-item to="/logout" @click.prevent="onClickLogout">로그아웃</b-nav-item>
      </b-navbar-nav>
          <!-- 마이페이지 -->
      <b-navbar-nav>
        <b-nav-item href="/mypage">마이페이지</b-nav-item>
      </b-navbar-nav>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import Vue from 'vue';
import swal from 'vue-swal';
Vue.use(swal);

export default {
    data: () => ({
      isLogin: false,
    }),
      computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserName']),
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    onClickLogout() {
      this.$store
        .dispatch('LOGOUT')
        .then(() => {
          this.$swal('로그아웃 완료 :)', '', 'success');
          this.$router.replace('/');
        })
        .catch(() => {
          alert('error');
        });
    },
  },
  mounted() {
    this.$store.state.accessToken = this.getAccessToken;
    this.$store.state.userId = this.getUserId;
    this.$store.state.userName = this.getUserName;
    axios.defaults.headers.common['auth-token'] = this.getAccessToken;
  },
};
</script>

<style scope>
    #logo{
  width:35px;
  margin-left: 50px;
  margin-bottom:8px;
}
#happy_logo{
  width:150px;
  margin-left:7px;
}
</style>