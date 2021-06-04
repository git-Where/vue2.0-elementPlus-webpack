export const data = [
  {
    label: '即时配送',
    value: true,
    itemType: 'switch',
    field: 'delivery'
  },
  {
    label: '活动名称',
    value: '',
    itemType: 'input',
    field: 'name',
    placeholder: '活动名称',
    clearable: true,
    onChange: true,
    rules: [
      {
        required: true,
        message: '请输入活动名称'
      }
    ]
  },
  {
    label: '活动区域',
    value: '',
    itemType: 'select',
    placeholder: '活动区域',
    clearable: true,
    field: 'region',
    options: [
      {
        title: '区域一',
        value: 'fujian'
      },
      {
        title: '区域二',
        value: 'beijing'
      }
    ],
    rules: [
      {
        itemType: 'string',
        required: true,
        message: '请选择活动区域'
      }
    ]
  },
  {
    label: '特殊资源',
    value: '2',
    itemType: 'radio',
    field: 'resource',
    radioType: 'button', // button or radio
    options: [
      {
        label: '线上品牌商赞助',
        value: '1'
      },
      {
        label: '线下场地免费',
        value: '2'
      }
    ]
  },
  {
    label: '组织机构',
    value: '',
    itemType: 'SelectTree',
    field: 'company',
    clearable: true,
    onChange: true,
    placeholder: '请选择组织机构',
    options: [
      {
        value: 1,
        label: '一级 1',
        children: [
          {
            value: 4,
            label: '二级 1-1',
            children: [
              {
                value: 9,
                label: '三级 1-1-1'
              },
              {
                value: 10,
                label: '三级 1-1-2'
              }
            ]
          }
        ]
      },
      {
        value: 2,
        label: '一级 2',
        children: [
          {
            value: 5,
            label: '二级 2-1'
          },
          {
            value: 6,
            label: '二级 2-2'
          }
        ]
      },
      {
        value: 3,
        label: '一级 3',
        children: [
          {
            value: 7,
            label: '二级 3-1'
          },
          {
            value: 8,
            label: '二级 3-2'
          }
        ]
      },
      {
        value: 9,
        label: '一级 4',
        children: [
          {
            value: 10,
            label: '二级 4-1',
            children: [
              {
                value: 11,
                label: '三级 4-1-1'
              },
              {
                value: 12,
                label: '三级 4-1-2'
              }
            ]
          }
        ]
      },
      {
        value: 13,
        label: '一级 2',
        children: [
          {
            value: 14,
            label: '二级 2-1'
          },
          {
            value: 15,
            label: '二级 2-2'
          }
        ]
      },
      {
        value: 16,
        label: '一级 3',
        children: [
          {
            value: 17,
            label: '二级 3-1'
          },
          {
            value: 18,
            label: '二级 3-2'
          }
        ]
      },
      {
        value: 19,
        label: '一级 3',
        children: [
          {
            value: 20,
            label: '二级 3-1'
          },
          {
            value: 21,
            label: '二级 3-2'
          }
        ]
      },
      {
        value: 22,
        label: '一级 3',
        children: [
          {
            value: 23,
            label: '二级 3-1'
          },
          {
            value: 24,
            label: '二级 3-2'
          }
        ]
      },
      {
        value: 25,
        label: '一级 3',
        children: [
          {
            value: 26,
            label: '二级 3-1'
          },
          {
            value: 27,
            label: '二级 3-2'
          }
        ]
      },
      {
        value: 28,
        label: '一级 3',
        children: [
          {
            value: 29,
            label: '二级 3-1'
          },
          {
            value: 30,
            label: '二级 3-2'
          }
        ]
      }
    ]
  },
  {
    label: '日选择器',
    value: '',
    itemType: 'datePicker',
    field: 'date1',
    clearable: true,
    placeholder: '请选择日期'
  },
  {
    label: '月选择器',
    value: '',
    itemType: 'datePicker',
    field: 'date2',
    clearable: true,
    placeholder: '请选择日期'
  },
  {
    label: '范围选择器',
    value: [],
    itemType: 'datePicker',
    field: 'date3',
    clearable: true,
    type: 'daterange',
    rangeSeparator: '至',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期'
  },
  {
    label: '周选择器',
    value: '',
    itemType: 'datePicker',
    field: 'date4',
    type: 'week',
    clearable: true,
    placeholder: '请选择日期'
  }
]
