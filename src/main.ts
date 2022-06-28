import { createApp } from 'vue';

import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import router from "./router";
import { createPinia } from 'pinia';

import "@/assets/scss/common.scss"; // 公共类样式

const app = createApp(App);
app.use(router).use(Antd).use(createPinia()).mount('#app');