import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

if (import.meta.env.DEV) {
  import('vconsole').then(({ default: VConsole }) => {
    new VConsole() // 开发环境显示调试面板
  })
}

createApp(App).mount('#app')
