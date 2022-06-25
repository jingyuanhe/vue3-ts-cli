import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import hyRequest from './services/';
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
const app = createApp(App);

app.use(store).use(router).mount('#app');
interface DataType {
  data?: any;
  status: boolean;
  msg: string;
}
hyRequest
  .get<DataType>({
    url: 'http://jsonplaceholder.typicode.com/posts',
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单独请求');
        return config;
      },
      responseInterceptor: (res) => {
        console.log('单独结束');
        return res;
      },
    },
  })
  .then((res) => {
    console.log(res);
  });
