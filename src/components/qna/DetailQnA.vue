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
        <h2>{{ detail.queTitle }}</h2>
      </v-card-title>

      <v-card-text class="py-0">
        <div class="subtitle-2">
          작성자 : <b>{{ detail.userid }}</b>
        </div>
        <v-row align="center" class="mx-0">
          <div class="black--text m-6 my-3 ">
            {{ detail.queContent }}
          </div>
        </v-row>
        <v-card-actions>
          <!-- <v-row v-if="detail.userid == getUserId"> -->
            <v-col cols="4"></v-col>
            <v-col cols="8">
              <v-btn
                color="primary"
                class="mr-2"
                outlined
                text
                @click="updateQnA"
              >
                수정
              </v-btn>
              <v-btn color="error" outlined text @click="deleteQnA">
                삭제
              </v-btn>
            </v-col>
          <!-- </v-row> -->
        </v-card-actions>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        <v-row align="center" class="mx-0 .col-md-3">
          <a class="indigo--text m-6 h6 font-weight-bold" @click="answerQnA">
            답변
          </a>
          <v-row align="center" class="mx-0">
          <div class="black--text m-6 my-3 ">
            {{ detail.ansContent }} ddd
          </div>
        </v-row>
          <v-slider
      v-model= "length"
      color="red darken-4"
      min="1"
      max="15"
      label="답변 만족도"
    ></v-slider>
    <!-- // 별모양 뜨는건데 안떠요ㅜㅜㅜ -->
    <v-rating
      v-model= "rating"
      background-color="indigo lighten-3"
      color="indigo"
      size="64"
    ></v-rating>
    <!-- <div>
      <span class="caption text-uppercase">model:</span>
      <span class="font-weight-bold">
        {{ rating }}
      </span>
    </div> -->
        </v-row>
        <div class="subtitle-4">
          #<b>{{ ansdetail.ansNum }}</b
          >, 작성시간 {{ ansdetail.ansTime }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</v-app>
</template>

<script>
import http from '@/util/http-commons';
import { mapGetters } from 'vuex';
import Vue from 'vue';
import swal from 'vue-swal';

Vue.use(swal);

export default {
  name: 'detailQnA',
  props: ['qnaNum'],
  data() {
    return {
      rating: 0,
      length:5,
      upHere: false,
      detail: {},
      ansdetail: {},
      loading: true,
      errored: false,
    };
  },
  methods: {
    answerQnA: function() {
      http
        .get('api/qna/answer/'+ this.qnaNum)
        .then((response) => (this.ansdetail = response.data))
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
        console.dir(this.ansdetail);
    },
    updateQnA: function() {
      this.$router.push('/qna/' + this.qnaNum + '/update');
    },
    fetchData() {
      http
        .get('api/qna/question/' + this.qnaNum)
        .then((response) => (this.detail = response.data))
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
      console.dir(this.detail);
    },
    deleteQnA: function() {
      http
        .delete('api/qna/question/' + this.qnaNum +'/delete')
        .then((response) => (this.detail = response.data))
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
      this.$swal(this.qnaNum + '번 질문이 삭제 되었습니다.', '', 'success');
      this.$router.push('/qna/delete/success');
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
