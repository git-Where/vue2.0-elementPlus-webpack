<template>
  <div>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item prop="roleName" label="角色名">
            <el-input v-model="form.roleName" disabled placeholder="请输入角色名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色权限">
            <el-tree
              ref="tree"
              :check-strictly="false"
              :expand-on-click-node="false"
              :data="routesData"
              :props="defaultProps"
              accordion
              node-key="path"
              highlight-current
              class="permission-tree"
              @node-click="handleNodeClick"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="seletTreeData" :span="12">
          <el-form-item label="title">
            <el-input v-model="seletTreeData.title" />
          </el-form-item>
          <el-form-item label="component">
            <el-input v-model="seletTreeData.component" />
          </el-form-item>
          <el-form-item label="redirect">
            <el-input v-model="seletTreeData.redirect" />
          </el-form-item>
          <el-form-item label="activeMenu">
            <el-input v-model="seletTreeData.meta.activeMenu" />
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="seletTreeData.name" />
          </el-form-item>
          <el-form-item label="icon">
            <el-input v-model="seletTreeData.meta.icon" />
          </el-form-item>
          <el-form-item label="hidden">
            <el-switch v-model="seletTreeData.hidden" />
          </el-form-item>
          <el-form-item label="alwaysShow">
            <el-switch v-model="seletTreeData.alwaysShow" />
          </el-form-item>
          <el-form-item label="noCache">
            <el-switch v-model="seletTreeData.meta.noCache" />
          </el-form-item>
          <el-form-item label="breadcrumb">
            <el-switch v-model="seletTreeData.meta.breadcrumb" />
          </el-form-item>
          <el-form-item label="affix">
            <el-switch v-model="seletTreeData.meta.affix" />
          </el-form-item>
          <el-form-item label="noTagsView">
            <el-switch v-model="seletTreeData.meta.noTagsView" />
          </el-form-item>
          <el-form-item label="showMainRoute">
            <el-switch v-model="seletTreeData.meta.showMainRoute" />
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
import { setRoleApi, getRoleDetApi } from '../api'
// import { checkedRoleNodes } from './test-default-role'

const requiredRule = {
  required: true,
  message: '该项为必填项'
}

export default {
  name: 'InfoWrite2',
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
      routes: [],
      seletTreeData: null // 选中的菜单
    }
  },
  computed: {
    routesData() {
      return this.routes
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
            this.routes = this.generateRoutes(this.form.checkedNodes)
            this.$nextTick(() => {
              this.$refs.tree.setCheckedKeys(this.form.checkedkeys)
            })
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    // 树形点击
    handleNodeClick(data, node) {
      this.seletTreeData = data
    },
    // 新增或者编辑
    setListData() {
      try {
        this.subLoading = true
        this.$refs.formRef.validate(async(valid) => {
          if (valid) {
            console.log(this.routesData)
            // 获取所有被选中节点
            // const checkedNodes = this.$refs.tree.getCheckedNodes(false, true).filter(v => {
            //   if (v.path.includes('/')) return v
            // })
            // // 获取所有被选中的keys，便于渲染是否选中
            // this.form.checkedkeys = this.$refs.tree.getCheckedKeys()
            // console.log(JSON.stringify(this.form.checkedkeys))

            // this.form.checkedNodes = this.getFilterNodes(checkedNodes)
            // console.log(JSON.stringify(this.form.checkedNodes))
            const res = await setRoleApi({
              data: Object.assign(this.form, { checkedNodes: this.routesData })
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
    // 获取最终选完的树型
    // getFilterNodes(nodes) {
    //   const keys = Array.from(new Set([...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]))
    //   const res = []
    //   for (const node of nodes) {
    //     if (keys.indexOf(node.path) !== -1) {
    //       res.push(node)
    //     }
    //     if (node.children) { node.children = this.getFilterNodes(node.children) }
    //   }
    //   return res
    // },
    // 树形渲染过滤
    generateRoutes(routes) {
      const res = []

      for (const route of routes) {
        const data = {
          path: route.path,
          title: route.title || (route.meta && route.meta.title),
          name: route.name,
          hidden: route.hidden || false,
          alwaysShow: route.alwaysShow || false,
          redirect: route.redirect || '',
          component: route.component || '',
          meta: {
            icon: route.meta && route.meta.icon,
            noCache: route.meta && route.meta.noCache,
            breadcrumb: route.meta && route.meta.breadcrumb,
            affix: route.meta && route.meta.affix,
            noTagsView: route.meta && route.meta.noTagsView,
            activeMenu: route.meta && route.meta.activeMenu,
            showMainRoute: route.meta && route.meta.showMainRoute
          }
        }
        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children)
        }
        res.push(data)
      }
      return res
    }
  }
}
</script>

<style>
</style>
