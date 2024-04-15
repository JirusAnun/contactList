import { createApp } from 'vue'
import App from './App.vue'
import FomanticUI from 'vue-fomantic-ui'
import 'fomantic-ui-css/semantic.min.css'

import router from './router'

const app = createApp(App).use(router).mount('#app')
app.use(FomanticUI)