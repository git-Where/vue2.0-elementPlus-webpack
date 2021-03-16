<template>
  <div>
    <el-table ref="elTable" :border="true" v-bind="getBindValue" v-on="$listeners" @header-dragend="headerDragend">
      <!-- 多选 -->
      <el-table-column
        v-if="selection"
        type="selection"
        :reserve-selection="reserveSelection"
        width="40"
      />
      <template v-for="item in columns">
        <!-- 自定义索引 -->
        <template v-if="item.type === 'index'">
          <el-table-column
            :key="item[item.field]"
            v-bind="{...getItemBindValue(item)}"
            type="index"
            :index="item.index"
          />
        </template>

        <!-- 树型数据 -->
        <template v-else-if="item.children && item.children.length">
          <table-column
            :key="item[item.field]"
            :child="item"
          />
        </template>

        <template v-else>
          <el-table-column
            :key="item[item.field]"
            v-bind="{...getItemBindValue(item)}"
            :prop="item.field"
          >
            <!-- 表头插槽 -->
            <template v-if="item.slots && item.slots.header" #header="scope">
              <table-slot
                v-if="item.slots && item.slots.header"
                :slot-name="item.slots.header"
                :column="item"
                :index="scope.$index"
              />
            </template>

            <!-- 表格内容插槽自定义 -->
            <template v-if="item.slots && item.slots.default" #default="scope">
              <table-slot
                v-if="item.slots && item.slots.default"
                :slot-name="item.slots.default"
                :row="scope.row"
                :column="item"
                :index="scope.$index"
              />
            </template>
            <!-- 不需要插槽 -->
            <!-- <span v-if="!item.slots || !item.slots.default">
              {{ scope.row[item.field] }}
            </span> -->
          </el-table-column>
        </template>
      </template>
    </el-table>

    <div v-if="pagination" class="pagination__wrap">
      <el-pagination
        :style="paginationStyle"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        v-bind="getPaginationBindValue"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import TableColumn from './components/TableColumn.vue'
import TableSlot from './components/Slot.vue'
export default {
  name: 'ComTable',
  components: {
    TableSlot,
    TableColumn
  },
  provide() {
    return {
      tableRoot: this
    }
  },
  props: {
    // 表头
    columns: {
      type: Array,
      default: () => []
    },
    // 是否多选
    selection: {
      type: Boolean,
      default: false
    },
    // 是否展示分页
    pagination: {
      type: [Boolean, Object],
      default: false
    },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getBindValue() {
      const bindValue = { ...this.$attrs, ...this.$props }
      delete bindValue.columns
      return bindValue
    },
    getPaginationBindValue() {
      const PaginationBindValue = this.pagination && typeof this.pagination === 'object'
        ? { ...this.pagination }
        : {}
      return PaginationBindValue
    },
    paginationStyle() {
      return {
        textAlign: this.pagination && this.pagination.position || 'right'
      }
    }
  },
  methods: {
    getTableRef() {
      return this.$refs.elTable
    },
    getItemBindValue(item) {
      const delArr = []
      const obj = deepClone(item)
      for (const key in obj) {
        if (delArr.indexOf(key) !== -1) {
          delete obj[key]
        }
      }
      return obj
    },
    headerDragend(newWidth, oldWidth, column) {
      // 不懂为啥无法自动计算宽度，只能手动去计算了。。失望ing，到时候看看能不能优化吧。
      const htmlArr = document.getElementsByClassName(column.id)
      for (const v of htmlArr) {
        if (v.firstElementChild) {
          v.firstElementChild.style.width = newWidth + 'px'
        }
      }
    },
    sizeChange(val) {
      if (this.pagination && this.pagination.onSizeChange) {
        this.pagination.onSizeChange(val)
      }
    },
    currentChange(val) {
      if (this.pagination && this.pagination.onCurrentChange) {
        this.pagination.onCurrentChange(val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination__wrap {
  margin-top: 15px;
  background: #fff;
  padding: 10px;
}
</style>
