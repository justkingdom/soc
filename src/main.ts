import '@fontsource/golos-ui/400.css';
import '@fontsource/golos-ui/500.css';
import '@fontsource/golos-ui/600.css';

import { createApp } from 'vue';
import VueCountdown from '@chenfengyuan/vue-countdown';
import App from './App.vue';
import store from './store';
import router from './router';

// 引入全局样式
import '@/styles/index.scss';
import 'highlight.js/styles/atom-one-dark.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.component(VueCountdown.name, VueCountdown);

app.mount('#app');
