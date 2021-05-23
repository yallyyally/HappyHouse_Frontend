<template>
<v-app>
  <div class="mt-15 mx-auto" style="min-width:600px">
    <v-card class="mt-15 px-10 pb-5" style="text-align:center">
      <v-card-title sub class="my-2 justify-center pt-5 mt-5">
        <h2>"마이 페이지"</h2>
      </v-card-title>
      <v-form v-model="valid">
        <v-container>
          <v-text-field
            v-model="user.userid"
            :rules="idRules"
            :counter="20"
            label="아이디"
            disabled
            required
          ></v-text-field>
          <v-text-field
            v-model="user.userpwd"
            type="Password"
            :rules="passwordRules"
            label="패스워드 변경"
            required
            placeholder="비밀번호를 입력해주세요"
          ></v-text-field>
          <v-text-field
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
            label="전화번호 변경"
            required
            placeholder="전화번호를 입력해주세요"
          ></v-text-field>
          <v-text-field
            dense
            v-model="user.email"
            :rules="emailRules"
            label="이메일 변경"
            required
            placeholder="이메일을 입력해주세요"
          ></v-text-field>
          <v-btn color="success" @click="updateUser">
            회원 정보 수정
          </v-btn>
          <v-space></v-space>
          <v-btn color="error" class="ml-4" @click="deleteUser">
            회원 탈퇴
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
    user: null,
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

  created() {
    axios
    // http
      // .get(`${SERVER_URL}/api/member/info`)
      .get("http://localhost:9999/vue/api/member/info")
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
      // http
        // .put(`${SERVER_URL}/api/member/update`, {
          .put("http://localhost:9999/vue/api/member/update", {
          userid: this.user.userid,
          userpwd: this.user.userpwd,
          username: this.user.username,
          email: this.user.phone,
          phone: this.user.email,
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
      // http
      .delete("http://localhost:9999/vue/api/member/delete?userid=${this.user.userid}")
        // .delete(`${SERVER_URL}/api/member/delete?userid=${this.user.userid}`)
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