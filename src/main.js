import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 스타일 파일을 import (있는 경우)
// import './assets/main.css'

const app = createApp(App)

// Pinia 스토어 사용
app.use(createPinia())

// Vue Router 사용
app.use(router)

// 전역 컴포넌트 등록 (있는 경우)
// app.component('ComponentName', ComponentName)

// 전역 디렉티브 등록 (있는 경우)
// app.directive('directiveName', directiveFunction)

// 애플리케이션 마운트
app.mount('#app')