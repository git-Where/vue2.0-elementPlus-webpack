<template>
  <info-write :id="$route.query.id" @success="success" />
</template>

<script>
import InfoWrite from './components/InfoWrite'

export default {
  // name: 'ExampleEdit',
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
