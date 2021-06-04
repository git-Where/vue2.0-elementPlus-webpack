<template>
  <div>
    <div class="search__example--wrap">
      <com-search
        :data="searchData"
        @search-submit="searchSubmit"
        @reset-submit="resetSubmit"
      />
    </div>

    <div class="button__example--wrap">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="open(false, 'InfoWrite')">新增</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        @click="dels"
      >删除</el-button>
    </div>

    <com-table
      v-loading="loading"
      selection
      :columns="columns"
      :data="tableData"
      :pagination="{
        currentPage: defaultParams.pageIndex,
        total: total,
        onSizeChange: handleSizeChange,
        onCurrentChange: handleCurrentChange
      }"
      @selection-change="handleSelectionChange"
    >
      <template #importance="scope">
        <el-tag
          :type="scope.row.importance === 3
            ? 'success'
            : (scope.row.importance === 2
              ? 'warning'
              : 'danger')"
        >{{ scope.row.importance === 3
          ? '重要'
          : (scope.row.importance === 2
            ? '良好'
            : '一般') }}
        </el-tag>
      </template>
      <template #action="scope">
        <el-button type="primary" size="mini" @click="open(scope.row, 'InfoWrite')">编辑</el-button>
        <el-button type="success" size="mini" @click="open(scope.row, 'Detail')">查看</el-button>
        <el-button type="danger" size="mini" @click="dels(scope.row)">删除</el-button>
      </template>
    </com-table>

    <com-dialog :visible.sync="dialogVisible" :title="title">
      <info-write
        v-if="comName === 'InfoWrite' && dialogVisible"
        :info="info"
        @close="toggleVisible"
        @success="success"
      />
      <detail
        v-if="comName === 'Detail' && dialogVisible"
        :info="info"
        @close="toggleVisible"
      />
    </com-dialog>
  </div>
</template>

<script >
import InfoWrite from './components/InfoWrite'
import Detail from './components/Detail'
import exampleMixins from '@/mixins/example-mixins'

import { getExampleListApi, delsExampApi } from './api'

const searchData = [
  {
    label: '标题',
    value: '',
    itemType: 'input',
    field: 'title',
    placeholder: '请输入标题',
    clearable: true
  }
]

const columns = [
  {
    field: 'title',
    label: '标题',
    showOverflowTooltip: true
  },
  {
    field: 'author',
    label: '作者'
  },
  {
    field: 'display_time',
    label: '创建时间'
  },
  {
    field: 'importance',
    label: '重要性',
    slots: {
      default: 'importance'
    }
  },
  {
    field: 'pageviews',
    label: '阅读数'
  },
  {
    field: 'action',
    label: '操作',
    width: '220px',
    slots: {
      default: 'action'
    }
  }
]

export default {
  // name: 'ExampleDialog',
  components: {
    InfoWrite,
    Detail
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
    this.getExampleList()
  },
  methods: {
    // 请求数据
    async getExampleList(data) {
      try {
        const res = await getExampleListApi({
          params: Object.assign(this.defaultParams, data || {})
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
      this.getExampleList(data)
    },
    // 重置
    resetSubmit(data) {
      // 该方法重置了一些默认参数
      this.currentChange(1)
      this.getExampleList(data)
    },
    // 展示多少条
    handleSizeChange(val) {
      // 该方法重置了一些默认参数
      this.sizeChange(val)
      this.getExampleList()
    },
    // 展示第几页
    handleCurrentChange(val) {
      // 该方法重置了一些默认参数
      this.currentChange(val)
      this.getExampleList()
    },
    // 删除多选
    dels(item) {
      this.delData(async() => {
        let ids = null
        if (item.id) {
          ids = [item.id]
        } else {
          ids = this.selectionData.map((v) => {
            return v.id
          })
        }
        const res = await delsExampApi({
          data: { ids }
        })
        if (res) {
          this.$message.success('删除成功！')
          this.getExampleList()
        }
      }, { hiddenVerify: item.id })
    },
    // 打开弹窗
    open(row, component) {
      this.comName = component
      this.title = !row ? '新增' : (component === 'Detail' ? '详情' : '编辑')
      this.info = row || null
      this.toggleVisible(true)
    },
    // 成功之后的回调
    success(type) {
      if (type === 'add') {
        this.currentChange(1)
      }
      this.toggleVisible()
      this.getExampleList()
    }
  }
}
</script>

<style>
</style>
