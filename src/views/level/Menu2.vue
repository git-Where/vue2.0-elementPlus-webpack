<template>
  <div style="padding: 20px; background: #fff;display: flex;align-items: center;">
    <div style="min-width: 200px;">多层级缓存-页面2：</div>
    <el-input v-model="value" />
  </div>
</template>

<script>
export default {
  name: 'Menu2Demo',
  data() {
    return {
      value: ''
    }
  }
}
</script>
