import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/index.vue"),
  },
  {
    path: "/demo2",
    name: "Demo2",
    component: () => import("../pages/demo2/index.vue"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../pages/main/index.vue"),
  },
  {
    path: "/engine",
    name: "Engine",
    component: () => import("../pages/engine/index.vue"),
  },
  {
    path: "/compresive",
    name: "Compresive",
    component: () => import("../pages/compresive/index.vue"),
  },
  {
    path: "/backendForm",
    name: "BackendForm",
    component: () => import("../pages/backendForm/index.vue"),
  },
  {
    path: "/backendStats",
    name: "BackendStats",
    component: () => import("../pages/backendStats/index.vue"),
  },
  // {
  //   path: "/futureService",
  //   name: "futureService",
  //   component: () => import("../pages/futureService/index.vue"),
  // },
  // {
  //   path: "/oldyoung",
  //   name: "oldyoung",
  //   component: () => import("../pages/oldyoung/index.vue"),
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { top: 0 };
  },
});

export default router;
