const PREFIX_KEY = 'IDE_'
export default {
  get: function(name) {
    const innerName = `${PREFIX_KEY}${name}`
    const content = window.localStorage.getItem(innerName)
    if (!content) return null
    try {
      return JSON.parse(content)
    } catch (e) {
      window.localStorage.removeItem(innerName)
      return null
    }
  },
  set: function(name, data) {
    const innerName = `${PREFIX_KEY}${name}`
    try {
      window.localStorage.setItem(innerName, JSON.stringify(data))
    } catch (e) {
      console.error('Data can not be stringified', data)
    }
  },
  clear: function() {
    const innerName = `${PREFIX_KEY}${name}`
    window.localStorage.removeItem(innerName)
  }
}
