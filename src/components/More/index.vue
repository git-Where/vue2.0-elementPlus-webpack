<template>
  <div class="more__item clearfix" :style="styleObj">
    <p class="more__item--text" :style="styleTextObj">{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'More',
  props: {
    // 内容
    content: {
      type: String,
      default: ''
    },
    // 默认展示几行
    lineClamp: {
      type: Number,
      default: 1
    },
    // style
    styleObj: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    styleTextObj() {
      if (this.lineClamp === 1) {
        // 默认展示一行
        return {
          'white-space': 'nowrap'
        }
      } else {
        // 展示多少行
        return {
          display: '-webkit-box',
          '-webkit-line-clamp': this.lineClamp,
          '-webkit-box-orient': 'vertical'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.more__item {
  float: left;
  .more__item--text {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #545c63;
    transition: all .1s;
    text-align: left;
    &:hover {
      background: #fff;
      height: auto;
      position: relative;
      z-index: 5;
      border-radius: 8px;
      box-shadow: 0 8px 16px 0 rgba(7,17,27,.2);
      -webkit-line-clamp: inherit !important;
      padding: 10px;
      margin-top: -10px;
      margin-left: -10px;
      white-space: normal !important;
    }
  }
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>
