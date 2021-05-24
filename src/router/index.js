import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store";
// 매물 관련
import HouseInfo from "../views/HouseInfo.vue";
// 회원 관련
import Home from "../views/Home.vue";
import join from "../views/member/join.vue";
import login from "../views/member/login.vue";
import mypage from "../views/member/mypage.vue";
// 게시판 관련
import Board from "../views/Board.vue";
import InsertBoard from "../components/board/InsertBoard.vue";
import DetailBoard from "../components/board/DetailBoard.vue";
import UpdateBoard from "../components/board/UpdateBoard.vue";
import UpdateSuccess from "../components/board/UpdateSuccess.vue";
import DeleteSuccess from "../components/board/DeleteSuccess.vue";
import notice from "../views/NoticeBoard.vue";
import QnA from '../views/QnABoard.vue';
import UpdateQnA from '../components/qna/UpdateQnA.vue';
import DetailQnA from '../components/qna/DetailQnA.vue';
import InsertQnA from '../components/qna/InsertQnA.vue';
// 동네정보 관련
import towninfo from "../views/TownInfo.vue";

Vue.use(VueRouter);

// const requireAuth = () => (to, from, next) => {
//   const nextRoute = to.path;

//   if (store.getters.getUserId) {
//     return next();
//   } else {
//     return next("/login" + nextRoute);
//   }
// };

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/houseinfo",
    name: "HouseInfo",
    component: HouseInfo,
  },
  {
    path: "/join",
    name: "join",
    component: join,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/login/:firstKey/:secondKey",
    name: "LoginNextRoute",
    component: login,
  },
  {
    path: "/login/:firstKey/:secondKey/:thirdKey",
    name: "LoginThirdRoute",
    component: login,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: mypage,
    // beforeEnter: requireAuth(),
  },
  {
    path: "/Board",
    name: "Baord",
    component: Board,
  },
  {
    path: "/Board/InsertBoard",
    name: "InsertBoard",
    component: InsertBoard,
    // beforeEnter: requireAuth(),
  },
  {
    path: "/Board/:bno",
    name: "BoardNo",
    component: Board,
    props: true,
    children: [
      {
        path: "Detail",
        name: "DetailBoard",
        component: DetailBoard,
        props: true,
      },
      {
        path: "Update",
        name: "UpdateBoard",
        component: UpdateBoard,
        props: true,
      },
    ],
  },
  {
    path: "/update/success",
    name: "UpdateSuccess",
    component: UpdateSuccess,
  },
  {
    path: "/delete/success",
    name: "DeleteSuccess",
    component: DeleteSuccess,
  },
  {
    path: "/notice",
    name: "notice",
    // beforeEnter: requireAuth(),
    component: notice,
  },
  {
    path: '/qna',
    name: 'QnA',
    component: QnA,
  },
  {
    path: '/qna/insert',
    name: 'InsertQnA',
    component: InsertQnA,
    // beforeEnter: requireAuth(),
  },

  {
    path: '/qna/:qnaNum',
    name: 'QnANo',
    component: QnA,
    props: true,
    children: [
      {
        path: 'detail',
        name: 'DetailQnA',
        component: DetailQnA,
        props: true,
      },
      {
        path: 'update',
        name: 'UpdateQnA',
        component: UpdateQnA,
        props: true,
      },
    ],
  },
  {
    path: "/towninfo",
    name: "towninfo",
    component: towninfo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
