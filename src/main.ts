// import './assets/main.css'
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "virtual:unocss-devtools";

import "notivue/notification.css"; // Only needed if using built-in <Notification />
import "notivue/animations.css"; // Only needed if using default animations
import "notivue/notification-progress.css";

import { createApp } from "vue";
import { createNotivue } from "notivue";
import i18n from "@/i18n";

import App from "./App.vue";
import router from "./router.ts";


const notivue = createNotivue({
  position: "top-right",
  limit: 4,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 10000
    }
  }
});

const app = createApp(App);

app
  .use(router)
  .use(notivue)
  .use(i18n)
  .mount("#app");

app.config.errorHandler = (err, instance, info) => {
  console.error("Error:", err);
  console.error("Vue component:", instance);
  console.error("Additional info:", info);
};
