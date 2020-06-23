const ID = 1
const state = {
  files: [
    { name: 'a.js', id: 1 },
    { name: 'b.js', id: 2, active: true }
  ],
  fileContentMap: {
    fileId: '',
    fileId2: ''
  },
  openedFiles: {
    editableTabsValue: '2',
    editableTabs: [{
      title: 'Tab 1',
      name: '1',
      content: 'Tab 1 content'
    }, {
      title: 'Tab 2',
      name: '2',
      content: 'Tab 2 content'
    }],
    tabIndex: 2
  },
  editorOptions: {
    minimap: {
      // 不要小地图
      enabled: true
    },
    rulers: [80, 160],
    tabSize: 2
  }
}

//  添加group 删除group
//  添加文件  删除文件
//  恢复数据
//  打开文件
//  关闭文件

export default {
  namespaced: true,
  state
}
