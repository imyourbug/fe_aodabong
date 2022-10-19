import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import gAuthPlugin from "vue3-google-oauth2";
import Select2 from "vue3-select2-component";
import mitt from "mitt";
// import { store } from "@/store";
import Toasted from "@hoppscotch/vue-toasted";
import "@hoppscotch/vue-toasted/style.css";

const emitter = mitt();
const app = createApp(App);
let gauthClientId = process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID;

app.provide("emitter", emitter);

app.use(Toasted); // You can pass options as a second parameter
// app.use(store);
app.use(router);
app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: "email",
  prompt: "consent",
});

app.component("Select2", Select2);

app.mount("#app");
