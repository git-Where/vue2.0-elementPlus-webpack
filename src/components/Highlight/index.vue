<script>
export default {
  name: 'Highlight',
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    keys: {
      type: Array,
      default() {
        return []
      }
    },
    color: {
      type: String,
      default: '#2d8cf0'
    }
  },
  computed: {
    keyNodes() {
      return this.keys.map(key => {
        return this.$createElement('span', {
          on: {
            click: () => {
              this.$emit('click', key)
            }
          },
          style: {
            color: this.color,
            cursor: 'pointer'
          }
        }, key)
      })
    }
  },
  methods: {
    parseText(text) {
      this.keys.forEach((key, index) => {
        const regexp = new RegExp(key, 'g')
        text = text.replace(regexp, `{{${index}}}`)
      })
      return text.split(/{{|}}/)
    }
  },
  render(h) {
    if (!this.$slots.default) return null
    const node = this.$slots.default[0]
    if (!node || !node.text) {
      console.warn('Highlight组件的插槽必须要是文本')
      return this.$slots.default
    }
    const textArray = this.parseText(node.text)
    const regexp = /^[0-9]*$/
    const nodes = textArray.map(t => {
      if (regexp.test(t)) {
        return this.keyNodes[Math.floor(t)] || t
      }
      return t
    })
    return h(this.tag, nodes)
  }
}
</script>

<style>
</style>
