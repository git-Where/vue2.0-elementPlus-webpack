<template>
  <div>
    <com-detail
      :data="form"
      :schema="fromSchema"
      :collapsed="false"
      title="文章详情"
    >
      <template #content="scope">
        <div v-html="scope.row.content" />
      </template>
    </com-detail>
    <div class="dialong__button--wrap">
      <el-button @click="close">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getExampDetApi } from '../api'

const fromSchema = [
  {
    field: 'title',
    label: '标题',
    span: 24
  },
  {
    field: 'author',
    label: '作者'
  },
  {
    field: 'display_time',
    label: '创建时间'
  },
  {
    field: 'importance',
    label: '重要性'
  },
  {
    field: 'pageviews',
    label: '阅读数'
  },
  {
    field: 'content',
    label: '内容',
    span: 24,
    slots: {
      default: 'content'
    }
  }
]

export default {
  name: 'Detail',
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      fromSchema,
      form: {
        id: '', // id
        author: '', // 作者
        title: '', // 标题
        content: '', // 内容
        importance: '', // 重要性
        display_time: '', // 创建时间
        pageviews: 0 // 阅读数
      }
    }
  },
  created() {
    this.getDet()
  },
  methods: {
    async getDet() {
      if (this.info) {
        const id = this.info.id
        try {
          const res = await getExampDetApi({
            params: {
              id: id
            }
          })
          if (res) {
            for (const key in this.form) {
              if (key === 'importance') {
                this.form[key] = res.data[key].toString()
              } else {
                this.form[key] = res.data[key]
              }
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
