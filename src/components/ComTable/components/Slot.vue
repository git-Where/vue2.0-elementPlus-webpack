<script>
export default {
  name: 'TableSlot',
  functional: true,
  inject: ['tableRoot'],
  props: {
    row: {
      type: Object,
      default: () => null
    },
    index: {
      type: Number,
      default: () => null
    },
    column: {
      type: Object,
      default: () => null
    },
    slotName: {
      type: String,
      default: ''
    }
  },
  render: (h, ctx) => {
    return h('span', ctx.injections.tableRoot.$scopedSlots[ctx.props.slotName]({
      row: ctx.props.row,
      column: ctx.props.column,
      $index: ctx.props.index
    }))
  }
}
</script>
