<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 Element 的 Table 组件进行二次封装，实现数据驱动，支持所有 Table 参数 -- 多级表头"
      type="info"
      style="margin-bottom: 20px;"
    />
    <com-table
      v-loading="loading"
      :columns="columns"
      :data="tableData"
    >
      <template #address="scope">
        地址是: {{ scope.row.address }}
      </template>
      <template #action="scope">
        <el-button type="text" size="small" @click="deleteRow(scope.$index)">移除</el-button>
      </template>
    </com-table>
  </div>
</template>

<script>

const columns = [
  {
    field: 'date',
    label: '日期',
    fixed: true,
    width: '150'
  },
  {
    label: '配送信息',
    children: [
      {
        field: 'name',
        label: '姓名',
        width: '120'
      },
      {
        label: '地址',
        children: [
          {
            field: 'province',
            label: '省份',
            width: '120'
          },
          {
            field: 'city',
            label: '市区',
            width: '120'
          },
          {
            field: 'address',
            label: '地址',
            slots: {
              default: 'address'
            }
          },
          {
            field: 'zip',
            label: '邮编',
            width: '120'
          }
        ]
      }
    ]
  },
  {
    field: 'action',
    label: '操作',
    width: '100',
    slots: {
      default: 'action'
    }
  }
]

export default {
  // name: 'MultiHeader',
  data() {
    return {
      columns,
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      loading: true
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
    deleteRow(index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style>
</style>
