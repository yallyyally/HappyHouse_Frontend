import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import join from "../views/member/join.vue";
import login from "../views/member/login.vue";
import mypage from "../views/member/mypage.vue";

Vue.use(VueRouter);

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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/join",
    name :"join",
    component: join,
  },
  {
    path: "/login",
    name :"login",
    component: login,
  },
  {
    path: "/mypage",
    name :"mypage",
    component: mypage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
