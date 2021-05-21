<template lang="">
  <div class="flex absolute-center">
    <b-form @submit="login" @reset="onReset" v-if="show">
      <b-form-group id="userid_g" label="ID">
        <b-form-input
          type="text"
          id="userid"
          v-model="user.userid"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password_g" label="PASSWORD" >
        <b-form-input
          id="password"
          v-model="user.userpwd"
           lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your password'
          ]"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">로그인</b-button>
      <b-button type="reset" variant="danger">초기화</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
    <div style="text-align:center">
        <a href="#">아이디 찾기</a>
        <a class="b-ml-sm" href="#">비밀번호 찾기</a>
        <a class="b-ml-sm" href="/join">회원가입</a>
    </div>
  </div>
</template>

<script>
import { SessionStorage } from "vuex";
import axios from "axios";
  export default {
    name: "login",
    data: function() {
      return {
        user: {
          userid:"",
          userpwd:""
        },
        message:"",
        msge:""
      };
    },
    computed:{
      nextRoute() {
        return this.$route.params.nextRoute ? this.$route.params.nextRoute : "";
      }
    },
  methods: {
    login: function() {
      axios
        .post(
          process.env.VUE_APP_SERVER_URL + "/member/confirm/login",
          this.user
        )
        .then(response => {
          if (response.data["status"] == "success") {
            SessionStorage.set("accessToken", `${response.data["auth-token"]}`);
            SessionStorage.set("userId", `${response.data["userid"]}`);
            SessionStorage.set("userName", `${response.data["username"]}`);
            if (SessionStorage.getItem("userId") == "admin") {
              SessionStorage.set("admincheck", true);
            } else {
              SessionStorage.set("admincheck", false);
            }
            this.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "로그인 성공"
            });
            this.$router.push("/");
          } else {
            this.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "로그인 실패"
            });
          }
        });
    },
    onReset: function() {
      this.user.userid = "";
      this.user.userpwd = "";
    },
    main: function() {
      this.$router.push("/");
    }
  }
};
</script>