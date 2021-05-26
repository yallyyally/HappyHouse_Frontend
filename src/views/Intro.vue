<template>
  <v-app>
    <div class="v-pa-md" style="padding-right: 100px; padding-left: 100px; padding-top: 5%">
      <div class="row">
        <div class="col-3" style="text-color: #666666; text-align: center">
          <strong style="font-size: 25px">대표이사 | 양유진</strong>
        </div>
        <div class="col-9">
          <div class="text-h4" style="text-align: center">인사말</div>
        </div>
      </div>
      <div class="row">
        <div class="col-3" style="text-color: #666666; text-align: center">
          <v-img style="border-radius: 1000px" src="@/assets/pro.jpg" :ratio="1 / 1" />
          <!--여기에 교수님 사진을 넣고싶은뎅...-->
        </div>
        <div class="col-9">
          <div class="row justify-center" style="margin-top: 5%; text-align: center">
            <h5>
              안녕하세요 대표이사 양유진입니다.<br /><br />
              저희 <strong>HappyHouse는</strong> 논리적 사고력과 SW에 대한 호기심을 바탕으로 한
              <br />
              열정과 학습의지가 넘치는 젊은 인재와 함께 성장합니다.<br /><br />
              대전 5반의 제일 가는 베짱이들로 이루어진<br />
              <strong>베짱이팀</strong>을<br />
              자랑스럽게 세상에 소개합니다!
              <!--이아래 홈페이지 소개???-->
            </h5>
          </div>
        </div>
      </div>
      <div style="margin: 10%"></div>
      <div class="q-col-gutter-md row items-start">
        <hr />
        <!-- 1. 추구하는 가치 -->
        <div class="row" style="text-align: center height:200px;">
          <div class="col" style="text-align: center">
            <h4><strong>1번 베짱이-노효진</strong></h4>
            <!-- 효진 사진-->
            <div style="margin-top: 40px">
              <h5>자유게시판, Q&A, 공지사항</h5>
              <h5>유치원, 버스, 따릉이 마커 표시</h5>
              <h5>데이터베이스 설계 및 구축</h5>
              <h5>회원관리 CRUD, 로그인, 로그아웃</h5>
            </div>
          </div>
          <div class="col-5">
            <v-img
              class="photo"
              src="@/assets/pro2.jpg"
              :ratio="1 / 1"
              style="border-radius: 20px"
            ></v-img>
          </div>
        </div>
        <hr />
        <!-- 2. 프로의식 -->
        <div class="row" style="text-align: center">
          <div class="col-5">
            <v-img
              class="photo"
              src="@/assets/pro1.jpg"
              :ratio="1 / 1"
              style="border-radius: 20px"
            ></v-img>
          </div>
          <div class="col" style="text-align: center">
            <h4><strong>2번 베짱이-신준희</strong></h4>
            <div style="margin-top: 40px">
              <!-- 준희님사진-->
              <h5>거래 상세 내역, 지역별 매물 조회</h5>
              <h5>매물, 학교, 지하철 마커 표시</h5>
              <h5>지역별 문화정보, 인구 정보</h5>
              <h5>매물별 이동정보</h5>
            </div>
          </div>
        </div>
        <hr />
        <!-- 팀워크 -->
        <div class="row" style="text-align: center">
          <h4><strong>대전5반.contains("베짱이팀")</strong></h4>
          <br />
          <div class="row" style="text-align: center">
            <div class="col-12">
              <img src="@/assets/pro3.png" alt="" style="border-radius: 20px; width: 500px" />
              <!-- <v-img
              src="@/assets/pro3.png"
              :ratio="1 / 1"
              style="border-radius: 20px; height: 100px"
            ></v-img> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<style scoped>
.photo {
  width: 400px;
}
.row {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
