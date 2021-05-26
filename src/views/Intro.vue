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
              열정과 학습의지가 넘치는 젊은 인재와 함께 성장합니다.
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
            <h4><strong>01.추구하는 가치</strong></h4>
            <!-- 효진 사진-->
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
            <h4><strong>02.프로의식</strong></h4>
          </div>
          <!-- 준희님사진-->
        </div>
        <hr />
        <!-- 팀워크 -->
        <div class="row" style="text-align: center">
          <h4><strong>03.팀워크</strong></h4>
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
