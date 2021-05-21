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
import { SessionStorage } form "quasar";
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>