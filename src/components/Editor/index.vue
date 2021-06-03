<template>
  <div class="editor-wrapper">
    <div :id="editorId" />
  </div>
</template>

<script>
import Editor from 'wangeditor'
import { oneOf } from '@/utils'
import { isExternal } from '@/utils/validate'
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: 'html',
      validator: (val) => {
        return oneOf(val, ['html', 'text'])
      }
    },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200
    },
    /**
     * @description 是否开启本地存储
     */
    cache: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    editorId() {
      return `editor${this._uid}`
    }
  },
  watch: {
    value(newValue) {
      this.$nextTick(() => {
        this.editor.txt.html(newValue)
      })
    }
  },
  mounted() {
    this.editor = new Editor(`#${this.editorId}`)
    this.editor.customConfig.onchange = (html) => {
      const text = this.editor.txt.text()
      if (this.cache) localStorage.editorCache = html
      // this.$emit('input', this.valueType === 'html' ? html : text)
      this.$emit('change', html, text)
    }
    // 自定义菜单配置
    this.editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      // 'code',  // 插入代码
      'undo' // 撤销
      // 'redo'  // 重复
    ]
    this.editor.customConfig.onchangeTimeout = this.changeInterval
    // 插入链接的验证
    this.editor.customConfig.linkCheck = function(text, link) {
      if (isExternal(link)) {
        return true // 返回 true 表示校验成功
      } else {
        // _self.$message.error('请插入正确的网址链接')
        return '请插入正确的网址链接' // 返回字符串，即校验失败的提示信息
      }
    }
    this.editor.customConfig.zIndex = 10
    // 默认使用base64，如果需要自定义上传，可以自行更改customUploadImg逻辑
    this.editor.customConfig.uploadImgShowBase64 = true
    // this.editor.customConfig.customUploadImg = async function(files, insert) {
    //   // files 是 input 中选中的文件列表
    //   // insert 是获取图片 url 后，插入到编辑器的方法
    //   //       console.log(files)
    //   //       console.log(insert)
    //   const imgs = await _self.uploadImg(files)
    //   // 上传代码返回结果之后，将图片插入到编辑器中
    //   imgs.forEach((item, index) => {
    //     insert(`https://lxzgoodup.com/hades${item.filePath}`)
    //   })
    // }
    // create这个方法一定要在所有配置项之后调用
    this.editor.create()
    // 如果本地有存储加载本地存储内容
    const html = this.value || localStorage.editorCache
    if (html) {
      this.editor.txt.html(html)
    }
  },
  methods: {
    getEditorRef() {
      return this.editor
    },
    setHtml(val) {
      this.editor.txt.html(val)
    },
    async uploadImg(files) {
      const formData = new FormData()
      files.forEach((item, index) => {
        formData.append('files', item)
      })
      formData.append('fileType', '0002')
      formData.append('uploadUser', '123')
      const res = await this.$api.common.uploads(formData)
      if (res) {
        return res
      }
    }
  }
}
</script>

<style lang="less" scoped>
.editor-wrapper *{
  z-index: 10 !important;
  /deep/ .w-e-text-container {
    height: 500px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
  }
}
</style>
