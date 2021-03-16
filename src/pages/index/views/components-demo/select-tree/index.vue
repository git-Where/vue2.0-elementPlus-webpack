<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基础用法。"
      type="info"
      style="margin-bottom: 20px;"
    />
    <select-tree
      v-model="selected1"
      :options="options"
      clearable
      @change="onSelectChange"
    />

    <el-alert
      effect="dark"
      :closable="false"
      title="默认单选。"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <select-tree
      v-model="selected"
      :options="options"
      only-child
      clearable
      @change="onSelectChange"
    />

    <el-alert
      effect="dark"
      :closable="false"
      title="带有搜索框。"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <select-tree
      v-model="selected2"
      :options="options"
      clearable
      show-search
      @change="onSelectChange"
    />

    <el-alert
      effect="dark"
      :closable="false"
      title="多选下拉。"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <select-tree
      v-model="selected3"
      :options="options"
      clearable
      show-search
      show-checkbox
      @change="onSelectChange"
    />

    <el-alert
      effect="dark"
      :closable="false"
      title="默认多选。"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <select-tree
      v-model="selected4"
      :options="options"
      clearable
      show-search
      show-checkbox
      @change="onSelectChange"
    />
  </div>
</template>

<script>
import SelectTree from '_c/SelectTree'

export default {
  name: 'SelectTreeDemo',
  components: {
    SelectTree
  },
  data() {
    return {
      selected1: '',
      selected: '30',
      selected2: '',
      selected3: [],
      selected4: [29, 30],
      options: []
    }
  },
  created() {
    setTimeout(() => {
      this.options = [
        {
          value: 1,
          label: '一级 1',
          children: [{
            value: 4,
            label: '二级 1-1',
            children: [{
              value: 9,
              label: '三级 1-1-1'
            }, {
              value: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          value: 2,
          label: '一级 2',
          children: [{
            value: 5,
            label: '二级 2-1'
          }, {
            value: 6,
            label: '二级 2-2'
          }]
        }, {
          value: 3,
          label: '一级 3',
          children: [{
            value: 7,
            label: '二级 3-1'
          }, {
            value: 8,
            label: '二级 3-2'
          }]
        },

        {
          value: 9,
          label: '一级 4',
          children: [{
            value: 10,
            label: '二级 4-1',
            children: [{
              value: 11,
              label: '三级 4-1-1'
            }, {
              value: 12,
              label: '三级 4-1-2'
            }]
          }]
        }, {
          value: 13,
          label: '一级 2',
          children: [{
            value: 14,
            label: '二级 2-1'
          }, {
            value: 15,
            label: '二级 2-2'
          }]
        }, {
          value: 16,
          label: '一级 3',
          children: [{
            value: 17,
            label: '二级 3-1'
          }, {
            value: 18,
            label: '二级 3-2'
          }]
        },
        {

          value: 19,
          label: '一级 3',
          children: [{
            value: 20,
            label: '二级 3-1'
          }, {
            value: 21,
            label: '二级 3-2'
          }]

        },
        {
          value: 22,
          label: '一级 3',
          children: [{
            value: 23,
            label: '二级 3-1'
          }, {
            value: 24,
            label: '二级 3-2'
          }]

        },
        {
          value: 25,
          label: '一级 3',
          children: [{
            value: 26,
            label: '二级 3-1'
          }, {
            value: 27,
            label: '二级 3-2'
          }]

        },
        {
          value: 28,
          label: '一级 3',
          children: [{
            value: 29,
            label: '二级 3-1'
          }, {
            value: 30,
            label: '二级 3-2'
          }]
        }
      ]
    }, 2000)
  },
  methods: {
    // 获取节点本身
    onSelectChange(node) {
      console.log(node)
    }
  }
}
</script>

<style>
</style>
