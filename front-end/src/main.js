import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


// import 'semantic-ui-css/semantic.css'; 
import './assets/tailwind.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(router);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true,
  timeout: 3000
});

app.mount('#app');