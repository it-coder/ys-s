import { createApp } from "vue";
import Antd from "ant-design-vue";
import DataVVue3 from "@kjgl77/datav-vue3";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/styles/reset.css";
import "ant-design-vue/dist/antd.css";
import "./assets/styles/index.css";
import "./assets/iconfont/iconfont.js";
import highcharts from "highcharts";
import highcharts3d from "highcharts/highcharts-3d";
import 'element-plus/theme-chalk/index.css'
import ElementPlus from 'element-plus'
 
highcharts3d(highcharts);

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Antd);
app.use(DataVVue3);
app.use(ElementPlus)

app.mount("#app");
