// import './assets/main.css'
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "virtual:unocss-devtools";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.ts";

const app = createApp(App);

app
  .use(router)
  .mount("#app");
