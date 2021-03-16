<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 wangeditor 封装的 富文本 组件。"
      type="info"
      style="margin-bottom: 20px;"
    />

    <editor
      ref="editor"
      v-model="content"
      @change="handleChange"
    />

    <div style="margin-top: 20px;text-align: center;">
      <el-button @click="showHtml">
        获取TTML(请在控制台查看)
      </el-button>
      <el-button @click="showText">
        获取TEXT(请在控制台查看)
      </el-button>
      <el-button @click="showJson">
        获取JSON(请在控制台查看)
      </el-button>
    </div>
  </div>
</template>

<script>
import Editor from '_c/Editor'
export default {
  name: 'EditorDemo',
  components: {
    Editor
  },
  data() {
    return {
      content: '默认展示数据',
      html: '',
      text: '',
      json: null
    }
  },
  methods: {
    handleChange(html, text) {
      console.log(html, text)
    },
    showHtml() {
      console.log(this.$refs.editor.getEditorRef().txt.html())
    },
    showText() {
      console.log(this.$refs.editor.getEditorRef().txt.text())
    },
    showJson() {
      console.log(this.$refs.editor.getEditorRef().txt.getJSON())
    }
  }
}
</script>

<style>
</style>
