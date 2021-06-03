// 常用的增删改查
// 可根据实际项目自行改造
export default {
  data() {
    return {
      // 请求接口的基本参数
      defaultParams: {
        pageIndex: 1,
        pageSize: 10
      },

      // 多选数据
      selectionData: [],

      // 表格数据
      tableData: [],

      // 表格加载状态
      loading: true,

      // 表格总条数
      total: 0,

      // 是否展示弹窗
      dialogVisible: false,

      // 弹窗标题
      title: '',

      // 组件名称
      comName: ''
    }
  },
  methods: {
    // 表格展示条目改变时候重置基本参数
    sizeChange(val) {
      this.loading = true
      this.defaultParams.pageIndex = 1
      this.defaultParams.pageSize = val
    },

    // 表格分页改变时候重置基本参数
    currentChange(val) {
      this.loading = true
      this.defaultParams.pageIndex = val
    },

    // 删除多选
    /**
     * @param {Object} callBack
     * @param {Object} config {
          noDataText?: string // 没有选中数据时的提示
          text?: string // 删除前的提示
          hiddenVerify?: boolean // 是否隐藏前置判断
        }
     */
    delData(callBack, config) {
      if (this.selectionData.length === 0 && (config && !config.hiddenVerify)) {
        this.$message.warning((config && config.noDataText) || '请选择需要删除的数据！')
        return
      }
      this.$confirm((config && config.text) || '此操作将永久删除选中数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await callBack()
      })
    },

    // 多选变化的时候
    handleSelectionChange(selection) {
      this.selectionData = selection
    },

    // 改变弹窗dialogVisible
    toggleVisible(val = false) {
      this.dialogVisible = val
    }
  }
}
