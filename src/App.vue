<template>
  <div id="app">
    <div id="nav">
      <!-- 네비 테마 -->
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <!-- 왼쪽: 로고, 커뮤니티(공지사항,큐앤에이,자유게시판),매물,동네정보\-->
    <!-- 로고 -->
    <b-navbar-brand href="/">
            <img src="../src/assets/logo.png" id="logo"/>

      <img src="../src/assets/happyhouse_logo.png" id="happy_logo"/>
    </b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>
      <!-- 커뮤니티 -->
            <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="커뮤니티" right>
          <b-dropdown-item href="#">자유게시판</b-dropdown-item>
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
  <div v-if="!loginok">
      <b-navbar-nav id="beforeLogin">
      <!-- 로그인 아이디, 비밀번호 입력 -->
        <b-form>
          <!-- 아이디 -->
          <!-- 비밀번호 -->
          <!-- <input type="text" style="margin-top:7px;border:none;" size="sm" placeholder="ID"/>&nbsp;
          <input style="margin-top:7px;border:none;" type="password" size="sm" placeholder="Password"/>&nbsp; -->
          <!-- 로그인 버튼 -->
          
        <!-- <b-button size="sm" type="submit" style="margin-bottom:5px;">Login</b-button> -->
        <b-navbar-nav>
        <b-nav-item @click="login">로그인</b-nav-item>
      </b-navbar-nav>
        </b-form>
      <!-- 회원가입 -->
      <b-navbar-nav>
        <b-nav-item @click="join">회원가입</b-nav-item>
      </b-navbar-nav>
        </b-navbar-nav>
  </div>
  <div v-else>
    <!-- 로그인 후 보이는 버전 -->
          <b-navbar-nav id="afterLogin">
          <!-- 로그아웃 -->
                <b-navbar-nav>
        <b-nav-item @click="logout">로그아웃</b-nav-item>
      </b-navbar-nav>
          <!-- 마이페이지 -->
      <b-navbar-nav>
        <b-nav-item @click="mypage">마이페이지</b-nav-item>
      </b-navbar-nav>
        </b-navbar-nav>
  </div>


    </b-collapse>
  </b-navbar>
    </div>

    <!-- 라우터 뷰 -->
    <router-view />

    <!-- header 코드가 길어서 footer는 따로 뺏는데  -->
    <!-- 시간이 남으면 header 코드도 빼면 좋을듯함니다 ~~! -->
    <app-footer></app-footer>

  </div>
</template>

<style scoped>
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
<script>
import AppFooter from '@/components/layout/AppFooter.vue';
export default{
    components:{
      AppFooter
    }
}
</script>
