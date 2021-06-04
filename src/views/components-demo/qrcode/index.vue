<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="title-item">基础用法，默认canvas</div>
        <qrcode text="vue-element-admin2.0" />
      </el-col>
      <el-col :span="6">
        <div class="title-item">img标签</div>
        <qrcode text="vue-element-admin2.0" tag="img" />
      </el-col>
      <el-col :span="6">
        <div class="title-item">样式配置</div>
        <qrcode
          text="vue-element-admin2.0"
          :options="{
            color: {
              dark: '#55D187',
              light: '#2d8cf0'
            }
          }"
        />
      </el-col>
      <el-col :span="6">
        <div class="title-item">点击</div>
        <qrcode
          text="vue-element-admin2.0"
          @click="codeClick"
        />
      </el-col>
      <el-col :span="6">
        <div class="title-item">异步内容</div>
        <qrcode :text="text" />
      </el-col>
      <el-col :span="6">
        <div class="title-item">二维码失效</div>
        <qrcode text="vue-element-admin2.0" :disabled="true" @disabled-click="disabledClick" />
      </el-col>
      <el-col :span="6">
        <div class="title-item">logo配置</div>
        <qrcode
          text="vue-element-admin2.0"
          :logo="require('@/assets/img/logo.png')"
        />
      </el-col>
      <el-col :span="6">
        <div class="title-item">logo样式配置</div>
        <qrcode
          text="vue-element-admin2.0"
          :logo="{
            src: require('@/assets/img/logo.png'),
            logoSize: 0.2,
            borderSize: 0.05,
            borderRadius: 50,
            bgColor: 'blue'
          }"
        />
      </el-col>
      <el-col :span="6">
        <div class="title-item">大小配置</div>
        <qrcode text="vue-element-admin2.0" :width="300" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Qrcode from '_c/Qrcode'
export default {
  name: 'QrcodeDemo',
  components: {
    Qrcode
  },
  data() {
    return {
      text: ''
    }
  },
  created() {
    setTimeout(() => {
      this.text = '我是异步生成的内容'
    }, 3000)
  },
  methods: {
    codeClick() {
      this.$message.info('我被点击了。')
    },
    disabledClick() {
      this.$message.info('我失效被点击了。')
    }
  }
}
</script>

<style lang="less" scoped>
.el-col {
  text-align: center;
  margin-bottom: 20px;
  .title-item {
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
