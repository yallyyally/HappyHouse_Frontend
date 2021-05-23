<template>
<v-app>
  <div class="content mt-15">
    <v-card :loading="loading" class="mt-15 pa-5 mx-auto" max-width="500">
      <template slot="progress">
        <v-progress-linear
          color="#4181a6"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title>
        <h3>
          게시글이 삭제 되었습니다^_^<br />
          전체 목록에서 확인하세요~~
        </h3>
      </v-card-title>

      <v-card-text class="py-0 wrapper">
        <v-card-actions class="mx-auto">
          <v-btn
            color="#4181a6"
            style="color:white; margin-left:25%"
            @click="listBoard"
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
    listBoard() {
      http
        .get('/api/board/retrieve')
        .then((response) => (this.bno = response.data))
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.$router.push('/Board');
        });
    },
  },
};
</script>

<style>
</style>