<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="由于是模拟数据，所以只提供了两种不同权限的帐号，开发者可根据实际情况自行改造结合。"
      type="info"
      style="margin-bottom: 20px;"
    />

    <div class="search__example--wrap">
      <com-search
        :data="searchData"
        @search-submit="searchSubmit"
        @reset-submit="resetSubmit"
      />
    </div>

    <com-table
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      :pagination="{
        currentPage: defalutParams.pageIndex,
        total: total,
        onSizeChange: handleSizeChange,
        onCurrentChange: handleCurrentChange
      }"
    >
      <template #remark="scope">
        <span>模拟</span>
        <el-tag
          :type="scope.row.userName === 'admin' ? 'success' : 'warning'"
          style="margin: 0 15px;"
        >{{ scope.row.userName === 'admin' ? '前端' : '后端' }}</el-tag>
        <span>控制路由权限</span>
      </template>
    </com-table>
  </div>
</template>

<script >
import exampleMixins from '@/mixins/example-mixins'

import { getUserListApi } from './api'

const searchData = [
  {
    label: '帐号',
    value: '',
    itemType: 'input',
    field: 'userName',
    placeholder: '请输入帐号',
    clearable: true
  }
]

const columns = [
  {
    field: 'userName',
    label: '帐号'
  },
  {
    field: 'password',
    label: '密码'
  },
  {
    field: 'role',
    label: '角色'
  },
  {
    label: '备注',
    slots: {
      default: 'remark'
    }
  }
]

export default {
  // name: 'User',
  mixins: [exampleMixins],
  data() {
    return {
      searchData,
      columns
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 请求数据
    async getUserList(data) {
      try {
        const res = await getUserListApi({
          params: Object.assign(this.defalutParams, data || {})
        })
        if (res) {
          this.total = res.data.total
          this.tableData = res.data.list
        }
      } finally {
        this.loading = false
      }
    },
    // 查询
    searchSubmit(data) {
      // 该方法重置了一些默认参数
      this.currentChange(1)
      this.getUserList(data)
    },
    // 重置
    resetSubmit(data) {
      // 该方法重置了一些默认参数
      this.currentChange(1)
      this.getUserList(data)
    },
    // 展示多少条
    handleSizeChange(val) {
      // 该方法重置了一些默认参数
      this.sizeChange(val)
      this.getUserList()
    },
    // 展示第几页
    handleCurrentChange(val) {
      // 该方法重置了一些默认参数
      this.currentChange(val)
      this.getUserList()
    }
  }
}
</script>

<style>
</style>
