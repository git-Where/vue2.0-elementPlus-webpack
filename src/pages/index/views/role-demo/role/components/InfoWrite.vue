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
          <el-form-item prop="roleName" label="角色名">
            <el-input v-model="form.roleName" disabled placeholder="请输入角色名" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="角色权限">
            <el-tree
              ref="tree"
              :check-strictly="false"
              :data="routesData"
              :props="defaultProps"
              show-checkbox
              accordion
              node-key="path"
              highlight-current
              class="permission-tree"
            />
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
import path from 'path'
import { setRoleApi, getRoleDetApi } from '../api'
import { asyncRouterMap } from '_@/router'
import { isExternal } from '@/utils/validate'

const requiredRule = {
  required: true,
  message: '该项为必填项'
}

export default {
  name: 'InfoWrite',
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      subLoading: false,
      form: {
        id: '', // id
        roleName: '', // 角色名
        checkedNodes: [], // 被选中的节点
        checkedkeys: [] // 被选中的keys
      },
      rules: {
        roleName: [requiredRule]
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      routes: []
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    const oldRoutes = [...asyncRouterMap]
    this.routes = this.generateRoutes(oldRoutes)
    this.getDet()
  },
  methods: {
    async getDet() {
      if (this.info) {
        const id = this.info.id
        try {
          const res = await getRoleDetApi({
            params: {
              id: id
            }
          })
          if (res) {
            const form = {}
            for (const key in this.form) {
              form[key] = res.data[key]
            }
            this.$set(this, 'form', form)
            this.$nextTick(() => {
              this.$refs.tree.setCheckedKeys(this.form.checkedkeys)
            })
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
            // 获取所有被选中节点，由于是前端渲染，所以只要保存一维数组就行
            this.form.checkedNodes = this.$refs.tree.getCheckedNodes(false, true)
            console.log(JSON.stringify(this.form.checkedNodes))
            // 获取所有被选中的keys，便于渲染是否选中
            this.form.checkedkeys = this.$refs.tree.getCheckedKeys()
            console.log(JSON.stringify(this.form.checkedkeys))
            const res = await setRoleApi({
              data: this.form
            })
            if (res) {
              this.$message.success(this.form.id ? '编辑成功，请重新退出登录后查看效果' : '新增成功，请重新退出登录后查看效果')
              this.$emit('success', this.form.id ? 'edit' : 'add')
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
      this.$emit('close')
    },
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route, path.resolve(basePath, route.path))

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: isExternal(route.path) ? route.path : path.resolve(basePath, route.path),
          title: route.meta && route.meta.title,
          name: route.name
        }
        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    onlyOneShowingChild(children = [], parent, basePath) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)
      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = isExternal(onlyOneChild.path) ? onlyOneChild.path : path.resolve(basePath, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style>
</style>
