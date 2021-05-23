<template>
  <div class="grey lighten-2 ">
    <v-main>
      <v-container class="py-8 px-6">
        <v-row text-align: center>
            <!-- <v-img
              position="center"
              lazy-src="@/assets/QnABoard-banner.jpg"
              max-height="300"
              max-width="1300"
              src="@/assets/QnABoard-banner.jpg"
            ></v-img> -->
          <v-card min-width="500" class="mt-15 px-10 py-5">
      <v-card-title sub class="subtitle-1 justify-center pb-0">
        자유롭게 회원들과 소통해보세요!
      </v-card-title>
      <v-card-title sub class="my-2 justify-center pa-0">
        <h2>"자유게시판"</h2>
      </v-card-title>
          </v-card>
          <v-btn class="ml-4" fab small color="cyan" @click="insertQnA">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-row>
        <v-row class="mt-0" justify="center">
            <v-data-table
              :headers="headers"
              :items="articles"
              hide-default-footer
              class="elevation-10"
              @click:row="getNum"
              v-model="detailno"
              :loading="loading"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
            </v-data-table>
          <v-col cols="6" class="pt-0">
            <router-view :key="$route.fullPath"></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import http from "@/util/http-commons";

export default {
  data() {
    return {
      icon: 'mdi-pencil',
      detailno: 0,
      headers: [
        {
          text: '글번호',
          align: 'start',
          value: 'bno',
        },
        { text: '글쓴이', value: 'userid' },
        { text: '제목', value: 'btitle' },
        { text: '작성 시간', value: 'bregtime' },
      ],
      articles: [],
      errored: false,
    };
  },
  watch: {
    detailno: function() {
      this.$router.push('/Board/' + this.bno + '/detail');
    },
  },
  methods: {
    insertBoard: function() {
      this.$router.push('/insert');
    },
    updateBoard: function() {
      this.$router.push('/Board/' + this.bno + '/update');
    },
    listBoard() {
      http
        .get('api/board/retrieve')
        .then((response) => {
          this.articles = response.data;
          this.detailno = this.articles[0].bno;
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    getNo(v) {
      this.detailno = v.bno;
    },
  },
  mounted() {
    this.listBoard();
  },
};
</script>
