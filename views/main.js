import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
app.config.isCustomElement = tag => tag.startsWith('smart-');
