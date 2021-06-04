<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="抽取于 Element 的图片预览组件进行改造，实现函数式调用组件，无需基于图片进行点击预览。"
      type="info"
      style="margin-bottom: 20px;"
    />

    <el-alert
      effect="dark"
      :closable="false"
      title="有底图预览。"
      type="info"
      style="margin-bottom: 20px;"
    />

    <div class="img-wrap">
      <div
        v-for="(item, $index) in imgList"
        :key="item"
        class="img-item"
        @click="showHasImg($index)"
      >
        <img :src="item" alt="">
      </div>
    </div>

    <el-alert
      effect="dark"
      :closable="false"
      title="无底图预览。"
      type="info"
      style="margin-bottom: 20px; margin-top: 20px;"
    />
    <el-button type="primary" @click="showNoImg">点击预览</el-button>

    <el-alert
      effect="dark"
      :closable="false"
      title="点击事件，包含图片点击事件以及关闭事件。。"
      type="info"
      style="margin-bottom: 20px; margin-top: 20px;"
    />
    <el-button type="primary" @click="showImg">点击预览</el-button>
  </div>
</template>

<script>
import PreviewPic from 'vue-preview-pictures'
export default {
  name: 'PreviewImg',
  data() {
    return {
      imgList: [
        'http://dn-p-tystore.qbox.me/p/chapter/attachment/e_bTeg-weA/EgfWEtftEBfs4BfuEg6uelu_JHH3HUD6I7HMet148BDq5uyiKgem4C2.jpg',
        'http://www.jf258.com/uploads/2014-09-29/012939994.jpg',
        'http://pic1.win4000.com/wallpaper/3/58f4672ad3c5c.jpg'
      ]
    }
  },
  methods: {
    showHasImg(i) {
      PreviewPic({
        index: i,
        list: this.imgList
      })
    },
    showNoImg() {
      PreviewPic({
        index: 0,
        list: this.imgList
      })
    },
    showImg() {
      PreviewPic({
        index: 0,
        list: this.imgList,
        onClose: (i) => {
          this.$message.info('当前点击的图片索引：' + i)
        },
        onSelect: (i) => {
          this.$message.info('关闭之后的图片索引：' + i)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.img-wrap {
  display: flex;
  justify-content: center;
  .img-item {
    width: 400px;
    height: 300px;
    overflow: hidden;
    position: relative;
    margin: 0 10px;
    cursor: pointer;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
