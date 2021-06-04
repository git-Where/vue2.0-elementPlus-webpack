<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 Element 的 Table 组件进行二次封装，实现数据驱动，支持所有 Table 参数 -- 自定义索引"
      type="info"
      style="margin-bottom: 20px;"
    />
    <com-table
      v-loading="loading"
      :columns="columns"
      :data="tableData"
    />
  </div>
</template>

<script>

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
  // name: 'CustomIndex',
  data() {
    return {
      tableData,
      columns: [
        {
          field: 'index',
          type: 'index',
          index: (index) => {
            return index * 2
          }
        },
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
      ],
      loading: true
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }
}
</script>

<style>
</style>
