const SESSION_KEY = 'ide_'

// TODO using promise
export default {
  get: function() {
    const content = window.localStorage.getItem(SESSION_KEY)
    if (!content) return {}
    try {
      return JSON.parse(content)
    } catch (e) {
      window.localStorage.removeItem(SESSION_KEY)
      console.error('session.get error', content)
      return {}
    }
  },
  set: function(data) {
    const curData = this.get()

    // TODO 检测，确保不可为数组
    if (typeof data === 'object') {
      const newData = { ...curData, ...data }
      try {
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(newData))
      } catch (e) {
        console.error('session.set error', data)
      }
    } else {
      console.error('session.set only support object', data)
    }
  },
  clear: function() {
    window.localStorage.removeItem(SESSION_KEY)
  }
}
