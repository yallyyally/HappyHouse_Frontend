<template>
<v-app>
  <div>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title class="subtitle-2">
        <h2>{{ detail.btitle }}</h2>
      </v-card-title>

      <v-card-text class="py-0">
        <div class="subtitle-2">
          작성자 : <b>{{ detail.userid }}</b>
        </div>
        <v-row align="center" class="mx-0">
          <div class="black--text m-6 my-3 ">
            {{ detail.bcontent }}
          </div>
        </v-row>
        <v-card-actions>
          <v-row v-if="detail.userid == getUserId">
            <v-col cols="4"></v-col>
            <v-col cols="8">
              <v-btn
                color="primary"
                class="mr-2"
                outlined
                text
                @click="updateBoard"
              >
                수정
              </v-btn>
              <v-btn color="error" outlined text @click="deleteBoard">
                삭제
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
       <v-card-text>
        <v-row align="center" class="mx-0 .col-md-3">
          <a class="indigo--text m-6 h6 font-weight-bold">
            게시글 평가
          </a>
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            size="14"
          ></v-rating>
        </v-row>
        <div class="subtitle-4">
          #<b>{{ detail.bno }}</b
          >, 작성시간 {{ detail.bregtime }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</v-app>
</template>

<script>
import http from "@/util/http-commons";
import { mapGetters } from 'vuex';
import Vue from 'vue';
import swal from 'vue-swal';

Vue.use(swal);

export default {
  name: 'detailBoard',
  props: ['bno'],
  data() {
    return {
      upHere: false,
      detail: {},
      loading: true,
      errored: false,
    };
  },
  methods: {
    updateBoard: function() {
      this.$router.push('/Board/' + this.bno + '/update');
    },
    fetchData() {
      http
        .get('/api/board/detail/' + this.bno)
        .then((response) => (this.detail = response.data))
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
      console.dir(this.detail);
    },
    deleteBoard: function() {
      http
        .delete('/api/board/delete/' + this.bno)
        .then((response) => (this.detail = response.data))
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
      this.$swal(this.bno + '번 게시글이 삭제 되었습니다.', '', 'success');
      this.$router.push('/delete/success');
    },
  },
  watch: {
    $route: 'fecthData',
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserId']),
  },
  created() {
    this.fetchData();
  },
};
</script>
