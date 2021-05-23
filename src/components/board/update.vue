<template>
<v-app>
  <div>
    <div v-if="!submitted">
      <v-card class="pa-6 mx-auto my-0" max-width="500">
        <v-card-title>{{ detail.no }}번 게시물을 수정합니다!</v-card-title>
        <v-form v-model="valid" lazy-validation style="text-align:center">
          <v-text-field
            v-model="detail.userid"
            label="아이디"
            disabled
          ></v-text-field>
          <v-text-field
            v-model="detail.btitle"
            label="제목"
            required
            ref="formTitle"
          ></v-text-field>

          <v-textarea
            v-model="detail.bcontent"
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

          <v-btn class="warning" v-on:click="listBoard">
            취소
          </v-btn>
        </v-form>
      </v-card>
    </div>
    <div v-else>
      <h4>성공적으로 게시물을 수정하였습니다!</h4>
      <button class="btn btn-success" v-on:click="listBoard">
        전체 목록으로 돌아가기
      </button>
    </div>
  </div>
</v-app>
</template>
<script>
import http from "@/util/http-commons";
import Vue from 'vue';
import swal from 'vue-swal';

Vue.use(swal);

export default {
  name: 'updateBoard',
  props: ['no'],
  data() {
    return {
      info: null,
      loading: true,
      errored: false,
      userid: '',
      title: '',
      content: '',
      submitted: false,
      detail: {},
    };
  },
  mounted() {
    http
      .get('/api/board/detail/' + this.bno)
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
      this.$refs.formTitle.reset();
      this.$refs.formContent.reset();
    },
    updateBoard() {
      if (this.detail.btitle == '' || this.detail.btitle == undefined) {
        this.$swal('제목은 필수입니다.', '제목을 입력해주세요!', 'error');
        return;
      }
      if (this.detail.bcontent == '' || this.detail.bcontent == undefined) {
        this.$swal('내용은 필수입니다.', '내용을 입력해주세요!', 'error');
        return;
      }

      http
        .put('/api/board/update/' + this.bno, {
          title: this.detail.btitle,
          content: this.detail.bcontent,
        })
        .then((response) => {
          if (response.data == 'success') {
            this.$router.replace('/update/success');
            this.$swal('게시글이 수정 되었습니다.', '', 'success');
          } else {
            this.$swal('게시글이 수정되지 않았습니다.', '', 'error');
          }
        });
      this.submitted = true;
    },
    newBoard() {
      (this.submitted = false),
        (this.btitle = ''),
        (this.bcontent = ''),
        (this.errored = false);
    },
    listBoard() {
      http
        .get('/api/board/retrieve')
        .then((response) => (this.bno = response.data))
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.$router.push('/board');
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
