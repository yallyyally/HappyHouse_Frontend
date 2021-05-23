import Vue from "vue";
import VueRouter from "vue-router";
// import store from '../store';
import Home from "../views/Home.vue";
import HouseInfo from "../views/HouseInfo.vue";
import join from "../views/member/join.vue";
import login from "../views/member/login.vue";
import mypage from "../views/member/mypage.vue";
import Board from "../views/Board.vue";
import insertBoard from "../components/board/insert.vue";
import detailBoard from "../components/board/detail.vue";
import updateBoard from "../components/board/update.vue";

Vue.use(VueRouter);

// const requireAuth = () => (to, from, next) => {
// const nextRoute = to.path;

//   if (store.getters.getAccessToken) {
//     return next();
//   } else {
//     return next('/login' + nextRoute);
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
    path: '/login/:firstKey/:secondKey',
    name: 'LoginNextRoute',
    component: login,
  },
  {
    path: '/login/:firstKey/:secondKey/:thirdKey',
    name: 'LoginThirdRoute',
    component: login,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: mypage,
    // beforeEnter: requireAuth(),
  },
  {
    path: '/Board',
    name: 'Baord',
    component: Board,
  },
  {
    path: '/board/insertBoard',
    name: 'insertBoard',
    component: insertBoard,
  },
  {
    path: '/board/detailBoard',
    name: 'detailBoard',
    component: detailBoard,
  },
  {
    path: '/board/updateBoard',
    name: 'updateBoard',
    component: updateBoard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
