import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


// import 'semantic-ui-css/semantic.css'; 
import './assets/tailwind.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App);

app.use(router);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true,
  timeout: 3000
});

app.use(vue3GoogleLogin, {
  clientId: '916528742807-9a1dtd7t0gsu6ge1f96c63n6tf37dil9.apps.googleusercontent.com'

});

app.mount('#app');