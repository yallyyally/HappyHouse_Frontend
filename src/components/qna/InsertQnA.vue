<template>
  <div>
    <div v-if="!submitted">
      <v-card class="pa-6 mx-auto my-12" max-width="500">
        <v-card-title>게시물 등록</v-card-title>
        <v-form v-model="valid" lazy-validation style="text-align:center">
          <v-text-field
            v-model="inputData.userid"
            label="아이디"
            disabled
            required
          ></v-text-field>
          <v-text-field
            v-model="inputData.queTitle"
            label="제목"
            ref="formSubject"
            required
          ></v-text-field>

          <v-textarea
            v-model="inputData.queContent"
            label="내용"
            ref="formContent"
            required
          ></v-textarea>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="insertQnA"
          >
            등록
          </v-btn>

          <v-btn color="warning" class="mr-4" @click="reset">
            초기화
          </v-btn>
          <v-btn color="error" class="mr-4" @click="showQnA">
            취소
          </v-btn>
        </v-form>
      </v-card>
    </div>
    <div v-else class="content">
      <v-card :loading="loading" class="mx-auto" max-width="500">
        <template slot="progress">
          <v-progress-linear
            color="#4181a6"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-card-title>
          {{ this.resultString }}
        </v-card-title>

        <v-card-text class="py-0 wrapper">
          <v-card-actions class="mx-auto">
            <v-btn
              color="#4181a6"
              style="color:white; margin-left:25%"
              @click="showQnA"
            >
              전체 목록으로 돌아가기
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import http from '@/util/http-commons';
import { mapGetters } from 'vuex';
import Vue from 'vue';
import swal from 'vue-swal';

Vue.use(swal);

export default {
  name: 'InsertQnA',
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
      inputData: {},
      resultString: '',
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.formSubject.reset();
      this.$refs.formContent.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    insertQnA() {
      if (this.inputData.queTitle == undefined || this.inputData.queTitle == '') {
        this.$swal('제목란이 비었습니다', '제목은 필수입니다', 'error');
        return;
      }
      if (this.inputData.queContent == undefined || this.inputData.queContent == '') {
        this.$swal('내용란이 비었습니다', '내용은 필수입니다', 'error');
        return;
      }

      http
        .post('/api/qna/question', {
          userid: this.inputData.userid,
          queTitle: this.inputData.queTitle,
          queContent: this.inputData.queContent,
        })
        .then((response) => {
          if (response.data == 'success') {
            this.$swal('우왕!!', 'QnA 등록 성공!!', 'success');
            this.resultString = '질문이 등록 되었습니다.';
          } else {
            this.$swal('흑흑..', 'QnA가 등록 실패..', 'return');
            this.resultString = '질문이 등록되지 않았습니다.';
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
  computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserId']),
  },
  created() {
    this.inputData.userid = this.getUserId;
  },
};
</script>

<style>
.submitform {
  max-width: 300px;
  margin: auto;
}
</style>
