<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 Element 的 Table 组件进行二次封装，实现数据驱动，支持所有 Table 参数 -- 筛选"
      type="info"
      style="margin-bottom: 20px;"
    />
    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <com-table
      ref="filterTable"
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <template #tag="scope">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          disable-transitions
        >{{ scope.row.tag }}</el-tag>
      </template>
    </com-table>
  </div>
</template>

<script>

const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    tag: '家'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
    tag: '公司'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    tag: '家'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
    tag: '公司'
  }
]

export default {
  // name: 'ScreenTable',
  data() {
    return {
      columns: [
        {
          field: 'date',
          label: '日期',
          sortable: true,
          width: '180',
          columnKey: 'date',
          filters: [{ text: '2016-05-01', value: '2016-05-01' }, { text: '2016-05-02', value: '2016-05-02' }, { text: '2016-05-03', value: '2016-05-03' }, { text: '2016-05-04', value: '2016-05-04' }],
          filterMethod: this.filterHandler
        },
        {
          field: 'name',
          label: '姓名',
          sortable: true
        },
        {
          field: 'address',
          label: '地址'
        },
        {
          field: 'tag',
          label: '标签',
          filters: [{ text: '家', value: '家' }, { text: '公司', value: '公司' }],
          filterMethod: this.filterTag,
          filterPlacement: 'bottom-end',
          slots: {
            default: 'tag'
          }
        }
      ],
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
    resetDateFilter() {
      const filterTableRef = this.$refs.filterTable.getTableRef()
      filterTableRef.clearFilter('date')
    },
    clearFilter() {
      const filterTableRef = this.$refs.filterTable.getTableRef()
      filterTableRef.clearFilter()
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style>
</style>
