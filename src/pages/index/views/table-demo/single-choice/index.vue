<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 Element 的 Table 组件进行二次封装，实现数据驱动，支持所有 Table 参数 -- 单选"
      type="info"
      style="margin-bottom: 20px;"
    />
    <com-table
      ref="singleTable"
      v-loading="loading"
      highlight-current-row
      :columns="columns"
      :data="tableData"
      @current-change="handleCurrentChange"
    />

    <div style="margin-top: 20px">
      <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>
  </div>
</template>

<script>

const columns = [
  {
    field: 'date',
    label: '日期'
  },
  {
    field: 'name',
    label: '姓名'
  },
  {
    field: 'address',
    label: '地址'
  }
]

const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]

export default {
  // name: 'SingleChoice',
  data() {
    return {
      columns,
      tableData,
      loading: true
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
    setCurrent(row) {
      const singleTableRef = this.$refs.singleTable.getTableRef()
      singleTableRef.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      console.log(val)
    }
  }
}
</script>

<style>
</style>
