<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="图片裁剪组件。"
      type="info"
      style="margin-bottom: 20px;"
    />

    <cropper @on-crop="handleCroped" />
    <img
      v-if="src"
      :src="src"
      alt=""
    >
  </div>
</template>

<script>
import Cropper from '_c/Cropper'
export default {
  name: 'CropperDemo',
  components: {
    Cropper
  },
  data() {
    return {
      src: ''
    }
  },
  methods: {
    handleCroped(base64) {
      this.src = base64
    }
  }
}
</script>

<style>
</style>
