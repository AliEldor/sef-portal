import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.config.errorHandler = (error, instance, info) => {
}

app.config.globalProperties.$appName = 'SE Factory Portal'

app.mount('#app')