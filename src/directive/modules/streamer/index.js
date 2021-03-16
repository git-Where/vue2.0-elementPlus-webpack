import './streamer.css'

export default {
  inserted(el, binding) {
    el.style.position = 'relative'
    el.classList.add('streamer-wrap')
  }
}
