import directive from './directives'

const importDirective = Vue => {
  /**
   * 按钮水波纹指令 v-waves
   */
  Vue.directive('waves', directive.waves)

  /**
   * 按钮涟漪指令 v-ripples
   */
  Vue.directive('ripples', directive.ripples)

  /**
   * 元素拖拽指令 v-drag
   */
  Vue.directive('drag', directive.drag)

  /**
   * 流光特效指令 v-streamer
   */
  Vue.directive('streamer', directive.streamer)
}

export default importDirective
