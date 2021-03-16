export default {
  inserted(el, binding, vnode) {
    const index = binding.value && (binding.value.index || binding.value.index === 0) ? (binding.value.index === true ? 0 : binding.value.index) : undefined
    const field = binding.value && binding.value.field ? binding.value.field : undefined
    let firstTime = ''
    let lastTime = ''
    const parentDom = binding.value && binding.value.body ? document.querySelector(binding.value.body) : el.parentNode
    const dragDom = el
    dragDom.style.cssText += ';cursor:move;position:absolute;'
    let resultX = null
    let resultY = null

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const getStyle = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()

    dragDom.onmousedown = (e) => {
      dragDom.setAttribute('data-flag', false)
      firstTime = new Date().getTime()
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX
      const disY = e.clientY

      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight

      const screenWidth = parentDom.clientWidth
      const screenHeight = parentDom.clientHeight

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

      // 获取到的值带px 正则匹配替换
      let styL = getStyle(dragDom, 'left')
      let styT = getStyle(dragDom, 'top')

      if (styL.includes('%')) {
        styL = +parentDom.clientWidth * (+styL.replace(/\%/g, '') / 100)
        styT = +parentDom.clientHeight * (+styT.replace(/\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-(top) > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
        resultX = `${left + styL}`
        resultY = `${top + styT}`
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
        lastTime = new Date().getTime()
        if ((lastTime - firstTime) < 200) {
          dragDom.setAttribute('data-flag', true)
        }
        if (resultX !== null && resultY !== null) {
          if (field !== undefined) {
            vnode.child.$emit('eleMove', { X: resultX, Y: resultY, index: index, field: field })
          } else {
            vnode.child.$emit('eleMove', { X: resultX, Y: resultY, index: index })
          }
        }
      }
    }
  }
}
