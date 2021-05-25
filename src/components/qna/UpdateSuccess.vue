<template>
<v-app>
  <div>
    <v-card :loading="loading" class=" my-15 pa-5 mx-auto" max-width="500">
      <template slot="progress">
        <v-progress-linear
          color="#4181a6"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title>
        <h3>
          질문이 수정 되었습니다^_^<br />
          전체 목록에서 확인하세요~~<br /><br />
        </h3>
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
</v-app>
</template>

<script>
import http from '@/util/http-commons';
export default {
  methods: {
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
</style>
