<template>
  <info-write @success="success" />
</template>

<script>
import InfoWrite from './components/InfoWrite'

export default {
  // name: 'ExampleAdd',
  components: {
    InfoWrite
  },
  methods: {
    // 成功之后的回调
    success(type) {
      this.$bus.$emit('success', type)
    }
  }
}
</script>

<style>
</style>
