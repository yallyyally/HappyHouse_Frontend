<template>
  <div class="mt-15 mx-auto" style="min-width:600px">
    <b-card class="mt-15 px-10 pb-5" style="text-align:center">
      <b-card-title sub class="my-2 justify-center pt-5 mt-5">
        <h2>"마이 페이지"</h2>
      </b-card-title>
      <b-form v-model="valid">
        <b-container>
        <label>아이디</label>
          <b-form-input
            v-model="user.userid"
            :rules="idRules"
            :counter="20"
            disabled
            required
          ></b-form-input>
          <label>패스워드 변경</label>
          <b-form-input
            v-model="user.userpwd"
            type="Password"
            :rules="passwordRules"
            required
            placeholder="비밀번호를 입력해주세요"
          ></b-form-input>
          <label>패스워드 확인</label>
          <b-form-input
            v-model="confirmPassword"
            type="Password"
            :rules="[user.userpwd === confirmPassword || 'Password must match']"
            required
            placeholder="비밀번호를 확인해주세요"
          ></b-form-input>
          <label>사용자 이름</label>
          <b-form-input
            v-model="user.username"
            :rules="nameRules"
            required
            placeholder="이름을 입력해주세요"
          ></b-form-input>
          <label>이메일</label>
          <b-form-input
            dense
            v-model="user.email"
            :rules="emailRules"
            required
            placeholder="이메일을 입력해주세요"
          ></b-form-input>
          <label>전화번호</label>
          <b-form-input
            v-model="user.phone"
            id="userRoadAddress"
            label="전화번호"
            required
            disabled
            placeholder="전화번호를 입력해주세요"
          ></b-form-input>
          <b-button color="success" @click="updateUser">
            회원 정보 수정
          </b-button>
          <b-space></b-space>
          <b-button color="error" class="ml-4" @click="deleteUser">
            회원 탈퇴
          </b-button>
        </b-container>
      </b-form>
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
    user: null,
    valid: false,
    confirmPassword: '',
    // idRules: [
    //   (b) => !!b || 'id is required',
    //   (b) => b.length <= 20 || 'id must be less than 20 characters',
    // ],
    // passwordRules: [(b) => !!b || 'password is required'],
    // nameRules: [(b) => !!b || 'name is required'],
    // emailRules: [
    //   (b) => !!b || 'E-mail is required',
    //   (b) => /.+@.+/.test(b) || 'E-mail must be valid',
    // ],
  }),

  created() {
    axios
      .get(`${SERVER_URL}/api/member/info`)
      .then((response) => {
        this.user = response.data.user;
      })
      .catch(() => {
        this.$store.dispatch('LOGOUT').then(() => this.$router.replace('/'));
      });
  },

  methods: {
    updateUser: function() {
      axios
        .put(`${SERVER_URL}/api/member/update`, {
          userid: this.user.userid,
          userpwd: this.user.userpwd,
          username: this.user.username,
          email: this.user.email,
          phone: this.user.phone,
        })
        .then((response) => {
          if (response.data == 'success') {
            this.$store.dispatch('LOGIN', this.user).then((response) => {
              if (response == 'success') {
                this.$swal('수정되었습니다', '', 'success');
              } else {
                this.$swal('수정 실패 :)', '', 'error');
              }
              this.$router.replace('/');
            });
          } else {
            this.$swal('수정에 실패하였습니다.', '', 'error');
          }
        });
    },

    deleteUser: function() {
      axios
        .delete(`${SERVER_URL}/api/member/delete?userid=${this.user.userid}`)
        .then((response) => {
          if (response.data == 'success') {
            this.$swal('탈퇴되었습니다', '', 'success');
            this.$store
              .dispatch('LOGOUT')
              .then(() => this.$router.replace('/').catch(() => {}));
          } else {
            this.$swal('탈퇴에 실패하였습니다.', '', 'error');
          }
        });
    },
  },
};
</script>

<style lang="">
    
</style>