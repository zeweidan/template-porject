import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssPxToViewport from 'postcss-px-to-viewport' // 转换px为vw
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { wrapperEnv } from './build/utils'
import { OUTPUT_DIR } from './build/constants'

// https://vite.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  console.log('env1', env)
  const viteEnv = wrapperEnv(env)
  const { VITE_DROP_CONSOLE } = viteEnv
  console.log('command222', '|', root, command, '|', mode)
  return defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    css: {
      postcss: {
        plugins: [
          postcssPxToViewport({
            viewportWidth: 375,
            viewportUnit: 'vw',
            selectorBlackList: ['ignore-px'],
          }),
        ],
      },
    },
    build: {
      minify: true,
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE, // 生产环境删除console
        },
      },
      chunkSizeWarningLimit: 2000,
    },
    server: {
      port: 8000, // 开发端口
      open: true, // 启动后自动打开浏览器
      proxy: {
        // 配置接口代理（解决跨域）
        '/api': {
          target: 'https://api-mobile.example.com', // 后端接口地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
