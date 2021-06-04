<template>
  <div>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item prop="title" label="标题">
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="author" label="作者">
            <el-input v-model="form.author" placeholder="请输入作者" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="display_time" label="创建时间">
            <el-date-picker
              v-model="form.display_time"
              value-format="yyyy-MM-dd"
              type="datetime"
              placeholder="请选择创建时间"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="importance" label="重要性">
            <el-select v-model="form.importance" placeholder="请选择重要性" style="width: 100%;">
              <el-option label="重要" value="3" />
              <el-option label="良好" value="2" />
              <el-option label="一般" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="pageviews" label="阅读数">
            <el-input-number
              v-model="form.pageviews"
              :min="0"
              :max="99999999"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="content" label="内容">
            <editor ref="editorRef" v-model="form.content" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialong__button--wrap">
      <el-button @click="close">取消</el-button>
      <el-button :loading="subLoading" type="primary" @click="setListData">保存</el-button>
    </div>
  </div>
</template>

<script>
import Editor from '_c/Editor/index.vue'
import { setExampApi, getExampDetApi } from '../api'

const requiredRule = {
  required: true,
  message: '该项为必填项'
}

export default {
  name: 'InfoWrite',
  components: {
    Editor
  },
  props: {
    id: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      subLoading: false,
      form: {
        id: '', // id
        author: '', // 作者
        title: '', // 标题
        content: '', // 内容
        importance: '', // 重要性
        display_time: '', // 创建时间
        pageviews: 0 // 阅读数
      },
      rules: {
        title: [requiredRule],
        author: [requiredRule],
        content: [requiredRule],
        importance: [requiredRule],
        display_time: [requiredRule],
        pageviews: [requiredRule]
      }
    }
  },
  created() {
    this.getDet()
  },
  methods: {
    async getDet() {
      if (this.id) {
        const id = this.id
        try {
          const res = await getExampDetApi({
            params: {
              id: id
            }
          })
          if (res) {
            const form = {}
            for (const key in this.form) {
              if (key === 'importance') {
                form[key] = res.data[key].toString()
              } else {
                form[key] = res.data[key]
              }
            }
            this.$set(this, 'form', form)
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    // 新增或者编辑
    setListData() {
      try {
        this.subLoading = true
        this.$refs.formRef.validate(async(valid) => {
          if (valid) {
            const res = await setExampApi({
              data: this.form
            })
            if (res) {
              this.$message.success(this.form.id ? '编辑成功' : '新增成功')
              this.$bus.$emit('success', this.form.id ? 'edit' : 'add')
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.subLoading = false
      }
    },
    close() {
      this.$router.push('/example-demo/example-page')
    }
  }
}
</script>

<style>
</style>
