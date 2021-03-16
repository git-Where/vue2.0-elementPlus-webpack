<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="由于是模拟数据，所以只提供了两种不同权限的角色，开发者可根据实际情况自行改造结合。"
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
          :type="scope.row.roleName === 'admin' ? 'success' : 'warning'"
          style="margin: 0 15px;"
        >{{ scope.row.roleName === 'admin' ? '前端' : '后端' }}</el-tag>
        <span>角色</span>
      </template>

      <template #action="scope">
        <el-button type="primary" size="mini" @click="open(scope.row)">编辑</el-button>
      </template>
    </com-table>

    <com-dialog :visible.sync="dialogVisible" :title="title">
      <info-write
        v-if="comName === 'InfoWrite' && dialogVisible"
        :info="info"
        @close="toggleVisible"
        @success="success"
      />
      <info-write2
        v-if="comName === 'InfoWrite2' && dialogVisible"
        :info="info"
        @close="toggleVisible"
        @success="success"
      />
    </com-dialog>
  </div>
</template>

<script >
import InfoWrite from './components/InfoWrite'
import InfoWrite2 from './components/InfoWrite2'
// import Detail from './components/Detail.vue'
import exampleMixins from '@/mixins/example-mixins'

import { getRoleListApi } from './api'

const searchData = [
  {
    label: '角色名',
    value: '',
    itemType: 'input',
    field: 'roleName',
    placeholder: '请输入角色名',
    clearable: true
  }
]

const columns = [
  {
    field: 'roleName',
    label: '角色名'
  },
  {
    label: '备注',
    slots: {
      default: 'remark'
    }
  },
  {
    field: 'action',
    label: '操作',
    width: '80px',
    slots: {
      default: 'action'
    }
  }
]

export default {
  // name: 'Role',
  components: {
    InfoWrite,
    InfoWrite2
  },
  mixins: [exampleMixins],
  data() {
    return {
      searchData,
      columns,
      info: null
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 请求数据
    async getRoleList(data) {
      try {
        const res = await getRoleListApi({
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
      this.getRoleList(data)
    },
    // 重置
    resetSubmit(data) {
      // 该方法重置了一些默认参数
      this.currentChange(1)
      this.getRoleList(data)
    },
    // 展示多少条
    handleSizeChange(val) {
      // 该方法重置了一些默认参数
      this.sizeChange(val)
      this.getRoleList()
    },
    // 展示第几页
    handleCurrentChange(val) {
      // 该方法重置了一些默认参数
      this.currentChange(val)
      this.getRoleList()
    },
    // 打开弹窗
    open(row, component) {
      this.comName = row.roleName === 'admin' ? 'InfoWrite' : 'InfoWrite2'
      this.title = !row ? '新增' : '编辑'
      this.info = row || null
      this.toggleVisible(true)
    },
    // 成功之后的回调
    success(type) {
      if (type === 'add') {
        this.currentChange(1)
      }
      this.toggleVisible()
      this.getRoleList()
    }
  }
}
</script>

<style>
</style>
