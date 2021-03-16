export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @param {date} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export function formatTime(time, fmt) {
  if (!time) return ''
  else {
    const date = new Date(time)
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((
          '00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}

/**
 * 图片base64转file对象
 * @param {String} dataurl base64
 * @param {String} filename 转换完成之后的文件名，可不传
 * @param {String} suffix 图片后缀名 不传默认是.jpg
 */
export function base64ToFile(dataUrl, fileName, suffix) {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  // 转换成file对象
  return new File([u8arr], fileName || toAnyString() + (suffix || '.jpg'), {
    type: mime
  })
}

/**
 * 生成随机字符串
 */
export function toAnyString() {
  const date = new Date()
  const time = date.getTime()
  const str = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
  return time + '-' + str
}

/**
 * 对象数组深拷贝
 * @param {Array,Object} source 需要深拷贝的对象数组
 * @param {Array} noClone 不需要深拷贝的属性集合
 */
export function deepClone(source, noClone = []) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object' && noClone.indexOf(keys) === -1) {
      targetObj[keys] = deepClone(source[keys], noClone)
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 查找数组对象的某个下标
 * @param {Array} ary 查找的数组
 * @param {Functon} fn 判断的方法
 */
export function findIndex(ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  let index = -1
  ary.some(function(item, i, ary) {
    const ret = fn.call(this, item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  return index
}

/**
 * 截取URL参数
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * 获取身份证信息
 * @param {string} IDCard
 */
export function getIDCardData(IDCard) {
  if (IDCard) {
    // 根据身份证号获取籍贯
    const hometown = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门'
    }
    const myHometown = hometown[parseInt(IDCard.substring(0, 2))]

    // 根据身份证号获取出生日期
    const myBirthday = IDCard.substring(6, 10) + '-' + IDCard.substring(10, 12) + '-' + IDCard.substring(12, 14)

    let mySex = ''
    // 根据身份证号获取性别
    if (parseInt(IDCard.substr(16, 1)) % 2 === 1) {
      mySex = '男'
    } else {
      mySex = '女'
    }

    // 根据身份证号获取年龄
    const date = new Date()
    const myAge = date.getFullYear() - IDCard.substring(6, 10) - 1

    return {
      hometown: myHometown,
      birthday: myBirthday,
      sex: mySex,
      age: myAge
    }
  } else {
    return null
  }
}
