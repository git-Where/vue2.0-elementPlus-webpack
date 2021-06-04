<template>
  <div style="display: inline-block;">
    <i v-if="icon && icon.includes('el-icon')" :class="[icon, 'sub-el-icon', 'anticon']" />
    <svg-icon v-else-if="icon" :icon-class="icon" class="anticon" />
    <slot name="title">
      <span class="anticon-item">{{ title }}</span>
    </slot>
  </div>
</template>

<script>

export default {
  name: 'Item',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.anticon-item {
  opacity: 1;
  transition: opacity .3s cubic-bezier(.645,.045,.355,1),width .3s cubic-bezier(.645,.045,.355,1);
}
</style>
