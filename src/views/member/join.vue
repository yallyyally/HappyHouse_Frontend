<template lang="">
<v-app>
  <div class="mt-15 mx-auto" style="min-width:600px">
    <v-card class="mt-15 px-10 pb-5">
      <v-card-title sub class="subtitle-1 justify-center pb-0">
        Happyhouse 회원이 되어보세요!
      </v-card-title>
      <v-card-title sub class="my-2 justify-center pa-0">
        <h2>"회원가입"</h2>
      </v-card-title>
      <v-form v-model="valid">
        <v-container>
          <v-text-field
            v-model="user.userid"
            :rules="idRules"
            :counter="20"
            label="아이디"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.userpwd"
            type="Password"
            :rules="passwordRules"
            label="패스워드 입력"
            required
            placeholder="비밀번호를 입력해주세요"
          ></v-text-field>
          <v-text-field
            dense
            v-model="confirmPassword"
            type="Password"
            :rules="[user.userpwd === confirmPassword || 'Password must match']"
            label="패스워드 확인"
            required
            placeholder="비밀번호를 확인해주세요"
          ></v-text-field>
          <v-text-field
            v-model="user.username"
            :rules="nameRules"
            label="사용자 이름"
            required
            placeholder="이름을 입력해주세요"
          ></v-text-field>
          <v-text-field
            dense
            v-model="user.phone"
            label="전화번호"
            required
          ></v-text-field>
          <v-text-field
            dense
            v-model="user.email"
            :rules="emailRules"
            label="이메일"
            required
          ></v-text-field>
          <v-btn class="ml-auto" depressed color="primary" @click="joinUser">
            회원 가입
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </div>
</v-app>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import swal from 'vue-swal';

Vue.use(swal);

// const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
    data: () => ({
    user: {
      userid: '',
      username: '',
      userpwd: '',
      email: '',
      phone: '',
    },
    valid: false,
    confirmPassword: '',
    idRules: [
      (v) => !!v || 'id is required',
      (v) => v.length <= 20 || 'id must be less than 20 characters',
    ],
    passwordRules: [(v) => !!v || 'password is required'],
    nameRules: [(v) => !!v || 'name is required'],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    joinUser: function() {
      axios
      // http
        // .post(`${SERVER_URL}/api/member/regist`, {
          .post("http://localhost:9999/vue/api/member/regist", {
          userid: this.user.userid,
          userpwd: this.user.userpwd,
          username: this.user.username,
          email: this.user.phone,
          phone: this.user.email,
        })
        .then((response) => {
          if (response.data == 'success') {
            this.$swal('회원가입되었습니다.', '', 'success');
            this.$router.replace('/');
          } else {
            this.$swal('회원가입에 실패하였습니다.', '', 'error');
          }
        });
    },
  },
};
</script>

<style lang="">
    
</style>