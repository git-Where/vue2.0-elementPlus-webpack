<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 Element 的 Table 组件进行二次封装，实现数据驱动，支持所有 Table 参数 -- 表尾合计行"
      type="info"
      style="margin-bottom: 20px;"
    />
    <com-table
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      border
      show-summary
    />

    <com-table
      v-loading="loading"
      :columns="columns1"
      :data="tableData"
      border
      height="200"
      :summary-method="getSummaries"
      show-summary
      style="margin-top: 20px;"
    />
  </div>
</template>

<script>

const columns = [
  {
    field: 'id',
    label: 'ID'
  },
  {
    field: 'name',
    label: '姓名'
  },
  {
    field: 'amount1',
    label: '数值1',
    sortable: true
  },
  {
    field: 'amount2',
    label: '数值2',
    sortable: true
  },
  {
    field: 'amount3',
    label: '数值4',
    sortable: true
  }
]

const columns1 = [
  {
    field: 'id',
    label: 'ID'
  },
  {
    field: 'name',
    label: '姓名'
  },
  {
    field: 'amount1',
    label: '数值1（元）'
  },
  {
    field: 'amount2',
    label: '数值2（元）'
  },
  {
    field: 'amount3',
    label: '数值4（元）'
  }
]

const tableData = [
  {
    id: '12987122',
    name: '王小虎',
    amount1: '234',
    amount2: '3.2',
    amount3: 10
  }, {
    id: '12987123',
    name: '王小虎',
    amount1: '165',
    amount2: '4.43',
    amount3: 12
  }, {
    id: '12987124',
    name: '王小虎',
    amount1: '324',
    amount2: '1.9',
    amount3: 9
  }, {
    id: '12987125',
    name: '王小虎',
    amount1: '621',
    amount2: '2.2',
    amount3: 17
  }, {
    id: '12987126',
    name: '王小虎',
    amount1: '539',
    amount2: '4.1',
    amount3: 15
  }
]

export default {
  // name: 'TotalTable',
  data() {
    return {
      columns,
      columns1,
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
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map((item) => Number(item[column.property]))
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
</script>

<style>
</style>
