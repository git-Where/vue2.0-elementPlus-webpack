<template>
  <detail :id="$route.query.id" />
</template>

<script>
import Detail from './components/Detail'

export default {
  // name: 'ExampleDetail',
  components: {
    Detail
  }
}
</script>

<style>
</style>
