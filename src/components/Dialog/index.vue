<template>
  <el-dialog
    ref="dialogRef"
    v-bind="getBindValue"
    draggable="false"
    :visible.sync="dialogVisible"
    :fullscreen="fullscreen"
    destroy-on-close
    :close-on-click-modal="false"
    top="10vh"
    v-on="$listeners"
  >
    <template #title>
      <slot name="title">
        {{ title }}
      </slot>
      <svg-icon
        v-if="showFullscreen"
        :icon-class="fullscreen ? 'exit-fullscreen' : 'fullscreen'"
        class-name="dialog__icon"
        @click="toggleFull"
      />
    </template>

    <!-- 弹窗内容 -->
    <el-scrollbar
      :class="fullscreen && $slots.footer
        ? 'com-dialog__content--footer'
        : (fullscreen && !$slots.footer
          ? 'com-dialog__content--fullscreen'
          : 'com-dialog__content')"
    >
      <div class="content__wrap">
        <slot />
      </div>
    </el-scrollbar>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'

const getStyle = (function() {
  if (window.document.currentStyle) {
    return (dom, attr) => dom.currentStyle[attr]
  } else {
    return (dom, attr) => getComputedStyle(dom, false)[attr]
  }
})()

export default {
  name: 'Dialog',
  components: {
    SvgIcon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    // 是否显示全屏按钮
    showFullscreen: {
      type: Boolean,
      default: true
    },
    // 是否可以拖拽
    draggable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      fullscreen: false
    }
  },
  computed: {
    getBindValue() {
      const bindValue = { ...this.$attrs, ...this.$props }
      return bindValue
    }
  },
  watch: {
    visible: {
      handler: function(val) {
        this.dialogVisible = val
        if (this.draggable) {
          this.initDraggable()
        }
      },
      immediate: true
    },
    dialogVisible(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    toggleFull() {
      this.fullscreen = !this.fullscreen
      // 全屏的时候需要重新定义left top
      if (this.fullscreen && this.draggable) {
        const dragDom = this.$el.querySelector('.el-dialog')
        dragDom.style.cssText += `;left:0px;top:0px;`
      }
    },
    initDraggable() {
      this.$nextTick(() => {
        const dialogHeaderEl = this.$el.querySelector('.el-dialog__header')
        const dragDom = this.$el.querySelector('.el-dialog')
        dragDom.style.cssText += ';top:0px;'
        dialogHeaderEl.style.cssText += ';cursor:move;user-select:none;'
        dialogHeaderEl.onmousedown = (e) => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft
          const disY = e.clientY - dialogHeaderEl.offsetTop

          const dragDomWidth = dragDom.offsetWidth
          const dragDomHeight = dragDom.offsetHeight

          const screenWidth = document.body.clientWidth
          const screenHeight = document.body.clientHeight

          const minDragDomLeft = dragDom.offsetLeft
          const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

          const minDragDomTop = dragDom.offsetTop
          const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

          // 获取到的值带px 正则匹配替换
          let styL = getStyle(dragDom, 'left')
          let styT = getStyle(dragDom, 'top')

          if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
            styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
          } else {
            styL = +styL.replace(/\px/g, '')
            styT = +styT.replace(/\px/g, '')
          }

          document.onmousemove = function(e) {
            // 通过事件委托，计算移动的距离
            let left = e.clientX - disX
            let top = e.clientY - disY

            // 边界处理
            if (-(left) > minDragDomLeft) {
              left = -minDragDomLeft
            } else if (left > maxDragDomLeft) {
              left = maxDragDomLeft
            }

            if (-(top) > minDragDomTop) {
              top = -minDragDomTop
            } else if (top > maxDragDomTop) {
              top = maxDragDomTop
            }

            // 移动当前元素
            dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
          }

          document.onmouseup = function(e) {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dialog__icon {
  position: absolute;
  top: 22px;
  right: 45px;
  color: #909399;
  font-size: 12px;
  color: #909399;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #409EFF;
  }
}
.com-dialog__content {
  .content__wrap {
    padding: 0 10px 20px 0;
  }
  /deep/ .el-scrollbar__wrap  {
		max-height: 600px; // 最大高度
		overflow-x: hidden; // 隐藏横向滚动栏
	}
}
.com-dialog__content--fullscreen {
  /deep/ .el-scrollbar__wrap {
    height: calc(~"100vh - 32px - 60px"); // 最大高度
  }
}
.com-dialog__content--footer {
  /deep/ .el-scrollbar__wrap {
    max-height: calc(~"100vh - 32px - 60px - 66px"); // 最大高度
  }
}
</style>
