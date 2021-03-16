<template>
  <div>
    <div v-if="!hideHeader" class="markdown-header-wrap">
      <input v-model="title" type="text" :placeholder="placeholder">
      <el-button
        v-ripples
        type="primary"
        @click="save"
      >
        {{ btnText }}
      </el-button>
    </div>
    <div :id="markdownId" />
    <div v-if="!hideFooter" class="markdown-footer-wrap">
      <div class="footer-left" :style="{width:previewStyle==='vertical'?'50%':'100%'}">
        <el-upload
          :show-file-list="false"
          :auto-upload="false"
          :on-change="beforeUpload"
          accept="image/png,image/gif,image/jpg,image/jpeg"
          action=""
        >
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE5cHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE5IDE0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IHNrZXRjaHRvb2wgMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPjc3NkNFMTBCLUM5MzQtNEEyNy1BNUQ2LUI4NzI1RTBBMzY2NzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTWFya2Rvd27vvI3lhajlsY/mqKHlvI/jgIHnmb3oibLpo47moLwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01Mi4wMDAwMDAsIC04NzMuMDAwMDAwKSIgZmlsbD0iI0IzQkFDMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik01Miw4NzQuNDk4MjQ1IEM1Miw4NzMuNjcwNzg3IDUyLjY3NjIyMDEsODczIDUzLjQ5MDg5ODEsODczIEw2OS41MDkxMDE5LDg3MyBDNzAuMzMyNTAyMiw4NzMgNzEsODczLjY3NTI0OSA3MSw4NzQuNDk4MjQ1IEw3MSw4ODUuNTAxNzU1IEM3MSw4ODYuMzI5MjEzIDcwLjMyMzc3OTksODg3IDY5LjUwOTEwMTksODg3IEw1My40OTA4OTgxLDg4NyBDNTIuNjY3NDk3OCw4ODcgNTIsODg2LjMyNDc1MSA1Miw4ODUuNTAxNzU1IEw1Miw4NzQuNDk4MjQ1IFogTTY5LjAxMDM0OTMsODg0LjAwMDE5MyBDNjkuMDEwMzQ5Myw4ODQuNTUyMzcxIDY4LjU2MTExOTMsODg1IDY4LjAwMjE3MDIsODg1IEw1NCw4ODUgTDU5LDg4MCBMNjEsODgyIEw2Niw4NzcgTDY5LjAxMDM0OTMsODgwIEw2OS4wMTAzNDkzLDg4NC4wMDAxOTMgWiBNNTYuNSw4NzggQzU3LjMyODQyNzEsODc4IDU4LDg3Ny4zMjg0MjcgNTgsODc2LjUgQzU4LDg3NS42NzE1NzMgNTcuMzI4NDI3MSw4NzUgNTYuNSw4NzUgQzU1LjY3MTU3MjksODc1IDU1LDg3NS42NzE1NzMgNTUsODc2LjUgQzU1LDg3Ny4zMjg0MjcgNTUuNjcxNTcyOSw4NzggNTYuNSw4NzggWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" alt="" style="position: relative;top: 2px;" title="上传图片">
        </el-upload>
        <img
          v-if="!hideUi"
          :src="previewStyle === 'vertical' ? retract : eject"
          class="icon-item"
          alt=""
          @click="changeStyle"
        >

      </div>
      <div v-if="previewStyle === 'vertical'" class="footer-right">
        <div>预览</div>
        <div>{{ textTotal }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import 'tui-editor/dist/tui-editor-extScrollSync.js'
import Editor from 'tui-editor'
import defaultOptions from './default-options'

const retract = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE2IDE0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IHNrZXRjaHRvb2wgMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPjMxNTgwMEQ5LUREQzktNEJCMS04NTNGLTJFRTFBRTYyRUYwNjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTWFya2Rvd27vvI3nvZHnu5zkuI3lpb3jgIHlm77niYfmj4/ov7AiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02OTAuMDAwMDAwLCAtODczLjAwMDAwMCkiIGZpbGw9IiNCM0JBQzEiPgogICAgICAgICAgICA8cGF0aCBkPSJNNjk3LDg3NS4yNzU5MjcgQzY5Nyw4NzQuOTk2NTMgNjk3LjE2MTY0Nyw4NzQuOTMyNzM4IDY5Ny4zNTgxMjMsODc1LjEzMDUgTDcwMS44NTIxNTEsODc5LjY1MzkzOCBDNzAyLjA0OTkzNyw4NzkuODUzMDE5IDcwMi4wNDg2MjgsODgwLjE3NzEwOSA3MDEuODUyMTUxLDg4MC4zNzQ4NzIgTDY5Ny4zNTgxMjMsODg0Ljg5ODMxIEM2OTcuMTYwMzM3LDg4NS4wOTczOSA2OTcsODg1LjAzOTcwNCA2OTcsODg0Ljc1Mjg4MyBMNjk3LDg3NS4yNzU5MjcgWiBNNzA0LDg3NC4wMDY4NDUgQzcwNCw4NzMuNDUwNzggNzA0LjQ0Mzg2NSw4NzMgNzA1LDg3MyBDNzA1LjU1MjI4NSw4NzMgNzA2LDg3My40NDk5NDkgNzA2LDg3NC4wMDY4NDUgTDcwNiw4ODUuOTkzMTU1IEM3MDYsODg2LjU0OTIyIDcwNS41NTYxMzUsODg3IDcwNSw4ODcgQzcwNC40NDc3MTUsODg3IDcwNCw4ODYuNTUwMDUxIDcwNCw4ODUuOTkzMTU1IEw3MDQsODc0LjAwNjg0NSBaIE02OTAsODc4LjQ5MDQ3OSBDNjkwLDg3OC4yMTk1OTUgNjkwLjIzMjkwMyw4NzggNjkwLjUwMzQyMyw4NzggTDY5Nyw4NzggTDY5Nyw4ODIgTDY5MC41MDM0MjMsODgyIEM2OTAuMjI1MzksODgyIDY5MCw4ODEuNzg0OTQzIDY5MCw4ODEuNTA5NTIxIEw2OTAsODc4LjQ5MDQ3OSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=='

const eject = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIxcHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDIxIDE0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IHNrZXRjaHRvb2wgMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPkIyQkFDQzU2LUU2QzktNEUwOS1CRENBLTI1OTY2RTZGRkUyODwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTWFya2Rvd27vvI3lhajlsY/mqKHlvI/jgIHnmb3oibLpo47moLwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNDA3LjAwMDAwMCwgLTg3My4wMDAwMDApIiBmaWxsPSIjQjNCQUMxIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE0MjMsODc1LjI3NTkyNyBDMTQyMyw4NzQuOTk2NTMgMTQyMy4xNjE2NSw4NzQuOTMyNzM4IDE0MjMuMzU4MTIsODc1LjEzMDUgTDE0MjcuODUyMTUsODc5LjY1MzkzOCBDMTQyOC4wNDk5NCw4NzkuODUzMDE5IDE0MjguMDQ4NjMsODgwLjE3NzEwOSAxNDI3Ljg1MjE1LDg4MC4zNzQ4NzIgTDE0MjMuMzU4MTIsODg0Ljg5ODMxIEMxNDIzLjE2MDM0LDg4NS4wOTczOSAxNDIzLDg4NS4wMzk3MDQgMTQyMyw4ODQuNzUyODgzIEwxNDIzLDg3NS4yNzU5MjcgTDE0MjMsODc1LjI3NTkyNyBaIE0xNDE2LDg3OC40OTA0NzkgQzE0MTYsODc4LjIxOTU5NSAxNDE2LjIzMjksODc4IDE0MTYuNTAzNDIsODc4IEwxNDIzLDg3OCBMMTQyMyw4ODIgTDE0MTYuNTAzNDIsODgyIEMxNDE2LjIyNTM5LDg4MiAxNDE2LDg4MS43ODQ5NDMgMTQxNiw4ODEuNTA5NTIxIEwxNDE2LDg3OC40OTA0NzkgWiBNMTQwNyw4NzQuMDA2ODQ1IEMxNDA3LDg3My40NTA3OCAxNDA3LjQzNzg4LDg3MyAxNDA4LjAwMjkzLDg3MyBMMTQxMi45OTcwNyw4NzMgQzE0MTMuNTUwOTcsODczIDE0MTQsODczLjQ0OTk0OSAxNDE0LDg3NC4wMDY4NDUgTDE0MTQsODg1Ljk5MzE1NSBDMTQxNCw4ODYuNTQ5MjIgMTQxMy41NjIxMiw4ODcgMTQxMi45OTcwNyw4ODcgTDE0MDguMDAyOTMsODg3IEMxNDA3LjQ0OTAzLDg4NyAxNDA3LDg4Ni41NTAwNTEgMTQwNyw4ODUuOTkzMTU1IEwxNDA3LDg3NC4wMDY4NDUgWiBNMTQwOSw4NzUgTDE0MTIsODc1IEwxNDEyLDg4NSBMMTQwOSw4ODUgTDE0MDksODc1IFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQxNy41MDAwMDAsIDg4MC4wMDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTE0MTcuNTAwMDAwLCAtODgwLjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4='
export default {
  name: 'MarkDown',
  props: {
    // 默认值
    content: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '400px'
    },
    initialEditType: {
      type: String,
      default: 'markdown' // 另一个可选值 wysiwyg
    },
    hideToolBar: {
      type: Boolean,
      default: true
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入文章标题'
    },
    btnText: {
      type: String,
      default: '发布'
    },
    hideUi: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: defaultOptions,
      markDown: null,
      textTotal: '字数',
      retract: retract,
      eject: eject,
      previewStyle: 'vertical', // 另一个可选值 tab
      contentValue: null,
      title: ''
    }
  },
  computed: {
    markdownId() {
      return `markdown${this._uid}`
    },
    editorOptions() {
      const options = Object.assign({}, defaultOptions, this.options)

      options.initialValue = this.value
      options.previewStyle = this.previewStyle
      options.initialEditType = this.initialEditType
      options.height = this.height
      return options
    },
    value() {
      return this.contentValue !== null ? this.contentValue : this.content
    }
  },
  watch: {
    content(newValue, preValue) {
      if (newValue !== preValue && newValue !== this.markDown.getValue()) {
        this.markDown.setValue(newValue)
      }
    },
    hideUi: {
      handler(val) {
        if (val) {
          this.previewStyle = 'tab'
        } else {
          this.previewStyle = 'vertical'
        }
      },
      immediate: true
    },
    previewStyle(val) {
      this.$nextTick(() => {
        if (val === 'tab') {
          document.querySelector('.te-preview').style.display = 'none'
          document.querySelector('.te-md-splitter').style.display = 'none'
          document.querySelector('.te-editor').classList.add('markdown-wrap')
          document.querySelector('.te-editor').classList.remove('markdown-tab-wrap')
        } else {
          document.querySelector('.te-preview').style.display = 'block'
          document.querySelector('.te-md-splitter').style.display = 'block'
          document.querySelector('.te-editor').classList.add('markdown-tab-wrap')
          document.querySelector('.te-editor').classList.remove('markdown-wrap')
          this.markDown.setValue(this.value)
        }
      })

      // this.destroyEditor()
      // this.initEditor()
    }
  },
  destroyed() {
    this.destroyEditor()
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      this.markDown = new Editor({
        el: document.querySelector(`#${this.markdownId}`),
        ...this.editorOptions
      })
      this.markDown.on('change', () => {
        if (!this.hideFooter) {
          setTimeout(() => {
            const text = document.querySelector('.tui-editor-contents').innerText
            this.textTotal = text.length > 0 ? text.length + '字' : '字数'
          }, 800)
        }
        this.contentValue = this.markDown.getValue()
        this.$emit('change', this.markDown.getValue())
      })
      if (this.hideToolBar) {
        this.markDown.getUI().getToolbar().removeAllItems()
        document.querySelector(`.te-toolbar-section`).style.display = 'none'
      }
      document.querySelector('.te-editor').classList.add('markdown-tab-wrap')
    },
    destroyEditor() {
      if (!this.markDown) return
      this.markDown.off('change')
      this.markDown.remove()
    },
    getValue() {
      return this.markDown.getValue()
    },
    getHtml() {
      return this.markDown.getHtml()
    },
    setValue(value) {
      this.markDown.setValue(value)
    },
    setHtml(value) {
      this.markDown.setHtml(value)
    },
    beforeUpload(file) {
      // 需要自行去处理上传逻辑，下方的data为需要插入到markDown的完整url

      const fileType = 'image/png,image/jpg,image/jpeg'
      if (fileType.includes(file.raw.type)) {
        const editor = this.markDown.getCodeMirror()
        const editorHtml = this.markDown.getCurrentModeEditor()
        const isMarkdownMode = this.markDown.isMarkdownMode()
        const data = 'http://dn-p-tystore.qbox.me/p/chapter/attachment/e_bTeg-weA/EgfWEtftEBfs4BfuEg6uelu_JHH3HUD6I7HMet148BDq5uyiKgem4C2.jpg'
        if (isMarkdownMode) {
          editor.replaceSelection(`![img](${data})`)
        } else {
          const range = editorHtml.getRange()
          const img = document.createElement('img')
          img.src = `${data}`
          img.alt = 'img'
          range.insertNode(img)
        }
        return false
      } else {
        this.$message.warning('请上传正确的图片格式')
      }
    },
    changeStyle() {
      this.previewStyle = this.previewStyle === 'vertical' ? 'tab' : 'vertical'
    },
    save() {
      // if (!this.title) {
      //   this.$message.warning('标题不能为空')
      //   return false
      // }
      this.$emit('setMarkdown', {
        title: this.title,
        value: this.getValue(),
        html: this.getHtml()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.markdown-header-wrap {
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  position: relative;
  input {
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-weight: 700;
    color: #000;
    border: none;
    outline: none;
  }
  /deep/.el-button {
    position: absolute !important;
    top: 10px;
    right: 10px;
  }
}
.markdown-footer-wrap {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-top: none;
  user-select: none;
  &>div {
    padding: 0 10px;
  }
  .footer-left {
    position: relative;
    .icon-item {
      position: absolute;
      top: 2px;
      right: 10px;
      cursor: pointer;
    }
  }
  .footer-right {
    width: 50%;
    color: #ddd;
    display: flex;
    position: relative;
    &>div {
      width: 50%;
    }
    &>div:nth-of-type(2) {
      text-align: right;
    }
  }
  .footer-right:before {
    content: "";
    width: 1px;
    height: 40px;
    background: #e5e5e5;
    position: absolute;
    top: -10px;
    left: 0;
  }
}
/deep/.markdown-tab-wrap {
  /deep/ .te-md-splitter {
    width: 50%;
  }
  /deep/ .te-preview {
    width: 100%;
  }
}
/deep/ .markdown-wrap {
  width: 100% !important;
}
</style>
