<template>
  <div v-if="formInline" :class="{ search__col: layout === 'right' }">
    <el-row :gutter="20">
      <el-col :span="layout === 'right' ? 22 : 24">
        <el-form
          ref="ruleForm"
          inline
          :model="formInline"
          :rules="rules"
          :label-width="labelWidth"
          :label-position="labelPosition"
          :hide-required-asterisk="hideRequiredAsterisk"
          @submit.prevent
        >
          <el-form-item
            v-for="(item, $index) in data"
            :key="$index"
            :label="item.label"
            :prop="item.field"
            :rules="item.rules"
          >
            <template v-if="item.itemType === 'switch'">
              <el-switch
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.itemType === 'input'">
              <el-input
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.itemType === 'select'">
              <el-select
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              >
                <el-option
                  v-for="v in item.options"
                  :key="item.optionValue ? v[item.optionValue] : v.value"
                  :value="item.optionValue ? v[item.optionValue] : v.value"
                  :label="item.optionLabel ? v[item.optionLabel] : v.label"
                />
              </el-select>
            </template>

            <template v-if="item.itemType === 'radio'">
              <el-radio-group
                v-model="formInline[item.field]"
                @change="((val) => {changeVal(val, item)})"
              >
                <template v-if="item.radioType === 'radio'">
                  <el-radio
                    v-for="v in item.options"
                    :key="item.optionValue ? v[item.optionValue] : v.value"
                    v-bind="{...getItemBindValue(item)}"
                    :label="item.optionValue ? v[item.optionValue] : v.value"
                  >
                    {{ item.optionLabel ? v[item.optionLabel] : v.label }}
                  </el-radio>
                </template>
                <template v-else-if="item.radioType === 'button'">
                  <el-radio-button
                    v-for="v in item.options"
                    :key="item.optionValue ? v[item.optionValue] : v.value"
                    v-bind="{...getItemBindValue(item)}"
                    :label="item.optionValue ? v[item.optionValue] : v.value"
                  >
                    {{ item.optionLabel ? v[item.optionLabel] : v.label }}
                  </el-radio-button>
                </template>
              </el-radio-group>
            </template>

            <template v-if="item.itemType === 'SelectTree'">
              <select-tree
                v-model="formInline[item.field]"
                :default-props="item.defaultProps || {
                  value: 'value', // ID字段名
                  label: 'label', // 显示名称
                  children: 'children' // 子级字段名
                }"
                :options="item.options"
                :placeholder="item.placeholder"
                :clearable="item.clearable"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.itemType === 'timePicker'">
              <el-time-picker
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.itemType === 'timeSelect'">
              <el-time-select
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.itemType === 'datePicker' || item.itemType === 'dateTimePicker'">
              <el-date-picker
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>
          </el-form-item>
          <el-form-item v-if="data.length > 0 && layout === 'classic'">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="submitForm"
            >
              查询
            </el-button>
            <el-button
              v-if="showReset"
              icon="el-icon-refresh-right"
              @click="resetForm"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="layout === 'right' ? 2 : 24">
        <div
          v-if="data.length > 0 && (layout === 'bottom' || layout === 'right')"
          class="search__bottom"
          :class="{ 'search__bottom--col': layout === 'right' }"
        >
          <div class="search__bottom--button">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="submitForm"
            >
              查询
            </el-button>
          </div>
          <div class="search__bottom--button">
            <el-button
              v-if="showReset"
              :style="{
                'margin-left': layout !== 'right' ? '15px' : '0',
                'margin-top': layout === 'right' ? '27px' : '0'
              }"
              icon="el-icon-refresh-right"
              @click="resetForm"
            >
              重置
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SelectTree from '_c/SelectTree'
import { deepClone } from '@/utils'
export default {
  name: 'Search',
  components: {
    SelectTree
  },
  props: {
    // 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
    labelWidth: {
      type: String,
      default: ''
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    // 隐藏所有表单项的必选标记
    hideRequiredAsterisk: {
      type: Boolean,
      default: true
    },
    // 表单数据对象
    data: {
      type: Array,
      default: () => []
    },
    // 表单验证规则
    rules: {
      type: Object,
      default: () => {}
    },
    // 是否显示重置按钮
    showReset: {
      type: Boolean,
      default: true
    },
    // 是否显示导出按钮
    showExport: {
      type: Boolean,
      default: false
    },
    // 风格
    layout: {
      type: String,
      default: 'classic'
    }
  },
  emits: ['search-submit', 'reset-submit', 'change'],
  data() {
    return {
      formInline: null
    }
  },
  watch: {
    data: {
      handler: function(data) {
        this.initForm(data)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getItemBindValue(item) {
      const delArr = ['label', 'itemType', 'value', 'field', 'onChange']
      const obj = deepClone(item)
      for (const key in obj) {
        if (delArr.indexOf(key) !== -1) {
          delete obj[key]
        }
      }
      return obj
    },
    initForm(data) {
      const form = {}
      for (const v of data) {
        form[v.field] = (this.formInline && this.formInline[v.field]) || v.value
      }
      this.$set(this, 'formInline', form)
    },
    async submitForm() {
      try {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$emit('search-submit', this.formInline)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async resetForm() {
      await this.$refs.ruleForm.resetFields()
      this.$emit('reset-submit', this.formInline)
    },
    changeVal(val, item) {
      if (item.onChange) {
        this.$emit('change', {
          field: item.field,
          value: this.formInline[item.field]
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ant-form-inline {
  .ant-form-item {
    min-height: 60px;
  }
  .ant-form-item-with-help {
    margin-bottom: 0;
  }
}
.search__bottom {
  text-align: center;
  padding-bottom: 20px;
  .search__bottom--button {
    display: inline-block;
  }
}
.search__bottom--col {
  padding-bottom: 0;
  margin-top: 5px;
  position: relative;
  .search__bottom--button {
    display: inline-block;
  }
}
.search__bottom--col::before {
  content: "";
  width: 1px;
  height: 100%;
  border-left: 1px solid #d9d9d9;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
