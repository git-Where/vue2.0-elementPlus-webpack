<template>
  <div class="app-wrapper">
    <component :is="layout" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Classic from './modules/Classic'
import Top from './modules/Top'
import LeftTop from './modules/LeftTop'
export default {
  name: 'Layout',
  components: {
    Classic,
    Top,
    LeftTop
  },
  computed: {
    ...mapGetters(['layout'])
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
