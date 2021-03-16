/**
 * 拖拽元素包裹的容器，为了可以使用$emit发射事件，无实际作用
 */
<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DragItem'
}
</script>

<style>
</style>
