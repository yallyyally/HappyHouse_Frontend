<template>
<v-app>
  <div>
    <div v-if="!submitted">
      <v-card class="pa-6 mx-auto my-0" max-width="500">
        <v-card-title>{{ detail.qnaNum }}번 질문을 수정합니다!</v-card-title>
        <v-form v-model="valid" lazy-validation style="text-align:center">
          <v-text-field
            v-model="detail.userid"
            label="아이디"
            disabled
          ></v-text-field>
          <v-text-field
            v-model="detail.queTitle"
            label="제목"
            required
            ref="formSubject"
          ></v-text-field>

          <v-textarea
            v-model="detail.queContent"
            label="내용"
            required
            ref="formContent"
          ></v-textarea>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="updateQnA"
          >
            수정
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            초기화
          </v-btn>

          <v-btn class="warning" v-on:click="showQnA">
            취소
          </v-btn>
        </v-form>
      </v-card>
    </div>
    <div v-else>
      <h4>성공적으로 질문을 수정하였습니다!</h4>
      <button class="btn btn-success" v-on:click="showQnA">
        전체 목록으로 돌아가기
      </button>
    </div>
  </div>
</v-app>
</template>

<script>
import http from '@/util/http-commons';
import Vue from 'vue';
import swal from 'vue-swal';

Vue.use(swal);

export default {
  name: 'updateQnA',
  props: ['qnaNum'],
  data() {
    return {
      info: null,
      loading: true,
      errored: false,
      userid: '',
      queTitle: '',
      queContent: '',
      submitted: false,
      detail: {},
    };
  },
  mounted() {
    http
      .get('/api/qna/question/' + this.qnaNum)
      .then((response) => {
        this.detail = response.data;
      })
      .catch(() => {
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.formSubject.reset();
      this.$refs.formContent.reset();
    },
    updateQnA() {
      if (this.detail.queTitle == '' || this.detail.queTitle == undefined) {
        this.$swal('제목은 필수입니다.', '제목을 입력해주세요!', 'error');
        return;
      }
      if (this.detail.queContent == '' || this.detail.queContent == undefined) {
        this.$swal('내용은 필수입니다.', '내용을 입력해주세요!', 'error');
        return;
      }

      http
        .put('/api/qna/question/' + this.qnaNum, {
          subject: this.detail.queTitle,
          content: this.detail.queContent,
        })
        .then((response) => {
          if (response.data == 'success') {
            this.$router.replace('/qna/update/success');
            this.$swal('질문이 수정 되었습니다.', '', 'success');
          } else {
            this.$swal('질문이 수정되지 않았습니다.', '', 'error');
          }
        });
      this.submitted = true;
    },
    newQnA() {
      (this.submitted = false),
        (this.queTitle = ''),
        (this.queContent = ''),
        (this.errored = false);
    },
    showQnA() {
      http
        .get('/api/qna/question')
        .then((response) => (this.qnaNum = response.data))
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.$router.push('/qna');
        });
    },
  },
};
</script>

<style>
.submitform {
  max-width: 300px;
  margin: auto;
}
</style>
