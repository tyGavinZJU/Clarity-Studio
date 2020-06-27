const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  // 获取当前激活文件的编辑器内容
  // 用法：
  // ```
  // import store from '@/store'
  // store.getters.editorValue
  //
  // ````
  // TODO 考虑没有文件激活，state.ide.curFileId 为undefined的情况
  editorValue: (state, getters) => {
    return state.ide.filesContent[state.ide.curFileId] || ''
  }

}
export default getters
