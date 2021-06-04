<template>
  <div>
    <mark-down ref="markdown" :content="content" height="600px" @setMarkdown="setMarkdown" />
    <div style="margin-top: 20px;text-align: center;">
      <el-button @click="getValue">获取value(请在控制台查看)</el-button>
      <el-button @click="getHtml">获取html(请在控制台查看)</el-button>
    </div>
  </div>
</template>

<script>
import MarkDown from '_c/MarkDown'
const content = `
**测试默认值**

* vue
* element
* webpack
`
export default {
  name: 'MarkdownDemo',
  components: {
    MarkDown
  },
  data() {
    return {
      content: content
    }
  },
  methods: {
    getValue() {
      console.log(this.$refs.markdown.getValue())
    },
    getHtml() {
      console.log(this.$refs.markdown.getHtml())
    },
    setMarkdown(item) {
      console.log(item)
    }
  }
}
</script>

<style>
</style>
