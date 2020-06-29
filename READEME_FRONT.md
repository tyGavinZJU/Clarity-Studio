
### 外部获取当前编辑器的值

```js
import store from '@/store'
store.getters.editorValue

```

### 和区块链交互


实现contractAPI的compile和deploy方法即可
路径：Clarity-Studio/src/ide/contractAPI.js
```js
    export default {
      compile(fileContent) {
        console.log('compile', fileContent)
      },
      deploy(fileContent) {
        console.log('deploy', fileContent)
      }
    }
```
点击右上角按钮,compile和deploy可触发执行

### 底部信息显示接口

```js
import store from '@/store'

store.dispatch('ide/log', 'some content') // 附加信息
store.dispatch('ide/clearConsole') // 清空信息窗口
store.dispatch('ide/setConsole', 'some content') // 使用新内容覆盖当前信息

```
