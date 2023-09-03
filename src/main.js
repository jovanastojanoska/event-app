import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import mitt from "mitt";
import axios from "axios";
import { createPinia } from 'pinia'
const eventBus = mitt();

const app = createApp(App).use(createPinia());
app.provide('eventBus', eventBus);
app.config.globalProperties.$http = axios;


app.use(router).mount("#app");
