<template>
  <div id="app" :class="{'grey__mode': greyMode}">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['greyMode'])
  }
}
</script>

<style lang="less">
.size {
  width: 100;
  height: 100%;
}
html,body {
  .size;
  margin: 0;
  padding: 0;
}
#app {
  .size;
  background: @appBg;
}
.grey__mode {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
</style>
