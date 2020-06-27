import _ from 'lodash'
import db from './db'
const DEFAULT_STATE = {
  files: [],
  filesContent: {},
  curFileId: '',
  editorOptions: {
    minimap: {
      // 小地图
      enabled: true
    },
    rulers: [80, 160],
    tabSize: 2
  },
  theme: {

  }
}
const state = {
  // { name: 'a.js', id: 1, active: false, opened: false },
  files: [],
  // {"fileName":  'value'}
  filesContent: {},
  curFileId: '',
  editorOptions: {
    minimap: {
      // 小地图
      enabled: true
    },
    rulers: [80, 160],
    tabSize: 2
  },
  // 预设不同风格
  theme: {
    one: {},
    two: {
    }
  }
}

const mutations = {
  OPEN_FILE(state, item) {
    const found = _.find(state.files, (o) => {
      return o.id === item.id
    })
    found.opened = true
    // active
    _.forEach(state.files, (o) => {
      o.active = false
    })
    found.active = true
    state.curFileId = found.name
    console.log('OPEN_FILE', found, state.curFileId)
  },
  CLOSE_FILE(state, item) {
    const found = _.find(state.files, (o) => {
      return o.id === item.id
    })
    found.opened = false
    found.active = false

    // active other
    const newActive = _.find(state.files, (o) => {
      return o.opened === true
    })
    if (newActive) {
      newActive.active = true
      state.curFileId = newActive.name
    }
    console.log('CLOSE_FILE then OPEN_FILE', newActive)
  }
}

//  添加group 删除group
//  添加文件  删除文件
//  恢复数据
//  打开文件
//  关闭文件

const actions = {
  initIDE({ dispatch, commit, state }) {
    const files = db.get('files') || DEFAULT_STATE.files
    const filesContent = db.get('filesContent') || DEFAULT_STATE.filesContent

    state.files = files
    state.filesContent = filesContent

    const active = _.find(state.files, (o) => {
      return o.active === true
    })
    state.curFileId = active.name
  },
  openFile({ dispatch, commit, state }, item) {
    commit('OPEN_FILE', item)
    db.set('files', state.files)
  },
  closeFile({ dispatch, commit, state }, item) {
    commit('CLOSE_FILE', item)
    db.set('files', state.files)
  },
  // 1.文件名仅允许字符/数字/下划线
  // 2.不可与已有的文件重复
  // TODO 支持文件夹？
  addFile({ dispatch, commit, state }, fileName) {
    // 增加文件
    state.files.push({ name: fileName, id: fileName, active: false, opened: false })

    // localstorage
    db.set('files', state.files)
  },

  removeFile({ dispatch, commit, state }, name) {
    const index = _.findIndex(state.files, (o) => {
      return o.name === name
    })
    if (index !== -1) {
      state.files.splice(index, 1)

      // localstorage
      db.set('files', state.files)
    }
  },
  updateEditorValue({ dispatch, commit, state }, value) {
    console.log('updateEditorValue', state.curFileId, value)
    const fileId = state.curFileId
    state.filesContent[fileId] = value

    db.set('filesContent', state.filesContent)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
