import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import gAuthPlugin from 'vue3-google-oauth2';
import Select2 from 'vue3-select2-component';
import mitt from 'mitt';
import VModal from 'vue-js-modal';

const emitter = mitt();
const app = createApp(App);
let gauthClientId = '676785461988-icoil0dtlld2fcp5kb22llst7t94mans.apps.googleusercontent.com';

app.provide('emitter', emitter);

app.use(router);
app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent',
});
app.use(VModal);

app.component('Select2', Select2);

app.mount('#app');
