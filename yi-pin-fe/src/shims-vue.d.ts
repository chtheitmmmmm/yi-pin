// ts 腻子脚本

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component  // 返回一个任意的组件
}