<template lang="">
  <div class="mt-15 mx-auto">
  <b-card 
    img-src="@/assets/logo.png"
    img-alt="Image"
    img-top
    tag="article"
    min-width="500" 
    class="mt-15 px-10 py-5"
  >
  <b-card-title sub class="my-2 justify-center pa-0">
        <h2>로그인</h2>
  </b-card-title>
    <b-card-text>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" v-model="valid" style="text-align:center">
      <b-form-group>
        <label>아이디</label>
        <b-form-input
          v-model="user.userid"
          type="text"
          :rules="idRules"
          :counter="20"
          placeholder="Enter ID"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label>패스워드</label>
        <b-form-input
          v-model="user.userpwd"
          type="password"
          :rules="passwordRules"
          placeholder="Enter PASSWORD"
          required
          @keypress.enter="login"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" color="primary" @click="login">Login</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </b-card-text>

    <b-button class="ml-6" variant="primary" depressed color="success" @click="join">Sign up</b-button>
  </b-card>
</div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import swal from 'vue-swal';

Vue.use(VueRouter);
Vue.use(swal);

export default {
  name: 'login',
    data: () => ({
      // return {
        user: {
          userid: '',
          userpwd: '',
        },
        show: true,
        message: '',
        valid: false,
        idRules: [
      (b) => !!b || 'id is required',
      (b) => b.length <= 20 || 'id must be less than 20 characters',
    ],
    passwordRules: [(b) => !!b || 'password is required'],
  }),

  computed: {
    nextRoute() {
      let _this = this;

      if (_this.$route.params.thirdKey) {
        return (
          _this.$route.params.firstKey +
          '/' +
          _this.$route.params.secondKey +
          '/' +
          _this.$route.params.thirdKey
        );
      } else if (_this.$route.params.secondKey) {
        return (
          _this.$route.params.firstKey + '/' + _this.$route.params.secondKey
        );
      } else {
        return '';
      }
    },
  },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.user))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.user.userid = ''
        this.user.userpwd = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      login: function() {
      this.$store
        .dispatch('LOGIN', this.user)
        .then((response) => {
          if (response == 'success') {
            this.$swal('로그인 완료 :)', '', 'success');
          } else {
            this.$swal('로그인 실패 :)', '', 'error');
          }

          this.$router.replace(`/${this.nextRoute}`);
        })
        .catch(({ message }) => (this.msg = message));
    },
    join: function() {
      this.$router.replace('/join');
    },
  },
};
</script>

<style scope>
  #login-div {
  text-align: center;
}
</style>