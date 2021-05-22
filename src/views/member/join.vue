<template lang="">
<div class="mt-15 mx-auto" style="min-width:600px">
  <b-card 
    img-src="@/assets/logo.png"
    img-alt="Image"
    img-top
    tag="article"
    min-width="500" 
    class="mt-15 px-10 py-5"
  >
  <b-card-title sub class="my-2 justify-center pa-0">
        <h2>회원가입</h2>
  </b-card-title>
    <b-card-text>
      <b-form v-model="valid">
      <b-container>
        <b-form-input
          v-model="user.userid"
          type="text"
          :rules="idRules"
          :counter="20"
          label="아이디"
          required
        ></b-form-input>
        <b-form-input
          v-model="user.uerpwd"
          type="password"
          :rules="passwordRules"
          placeholder="비밀번호를 입력해주세요."
          label="패스워드"
          required
        ></b-form-input>
        <b-form-input
          v-model="confirmPassword"
          type="password"
          :rules="[user.userpwd === confirmPassword || 'Password must match']"
          placeholder="비밀번호를 확인해주세요."
          label="패스워드 확인"
          required
        ></b-form-input>
        <b-form-input
          v-model="user.username"
          type="text"
          :rules="nameRules"
          label="사용자 이름"
          placeholder="이름을 입력해주세요"
          required
        ></b-form-input>
        <b-form-input
          dense
          v-model="user.email"
          type="email"
          :rules="emailRules"
          label="이메일"
          required
        ></b-form-input>
        <b-form-input
          dense
          v-model="user.phone"
          type="text"
          label="전화번호"
          required
        ></b-form-input>
      </b-container>
    </b-form>
    </b-card-text>

    <b-button class="ml-auto" depressed color="primary" @click="joinUser">Sign up</b-button>
  </b-card>
</div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import swal from 'vue-swal';

Vue.use(swal);

const SERVER_URL = process.env.VUE_APP_SERVER_URL;

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
      (b) => !!b || 'id is required',
      (b) => b.length <= 20 || 'id must be less than 20 characters',
    ],
    passwordRules: [(b) => !!b || 'password is required'],
    nameRules: [(b) => !!b || 'name is required'],
    emailRules: [
      (b) => !!b || 'E-mail is required',
      (b) => /.+@.+/.test(b) || 'E-mail must be valid',
    ],
  }),
  methods: {
    joinUser: function() {
      axios
        .post(`${SERVER_URL}/user/join`, {
          userid: this.user.userid,
          userpwd: this.user.userpwd,
          username: this.user.username,
          email: this.user.email,
          address: this.user.phone,
        })
        .then((response) => {
          if (response.data == 'success') {
            this.$swal('가입되었습니다.', '', 'success');
            this.$router.replace('/');
          } else {
            this.$swal('가입에 실패하였습니다.', '', 'error');
          }
        });
    },
  },
};
</script>

<style lang="">
    
</style>