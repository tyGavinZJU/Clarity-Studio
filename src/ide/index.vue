<template>
  <el-container class="main-wrapper">
    <el-container>
      <el-aside
        class="left-side"
        :width="leftPanel.show ? '250px' : '50px'"
        style="background-color: #2C2C2C"
      >
        <div class="left-content">
          <div class="panel-nav">
            <div class="item">
              <i class="el-icon-document" />
            </div>
            <div class="item">
              <i class="el-icon-setting" />
            </div>
          </div>

          <transition name="fade">
            <div v-if="leftPanel.show" class="panel-content" style="background-color: rgb(33,37,43);color:#fff;">
              <div class="bar">
                <div class="item add" style="color:#fff;">
                  File
                  <i class="el-icon-document-add" />
                </div>
              </div>
              <div>
                <div v-for="item in files" :id="item.id" :key="item.id" class="file-item" :class="{active:item.active}">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </transition>
        </div>
      </el-aside>
      <el-container style="margin: 0;padding: 0;height: 100%;width: 100%;">
        <el-header class="header" style="height:30px">
          <div class="switch" @click="toggleLeftPanel">
            <i class="el-icon-s-fold" />
          </div>
          <div class="actions" style="float: right;">
            <el-button size="mini" type="text">Compile</el-button>
            <el-button size="mini" type="text">Deploy</el-button>
          </div>
        </el-header>
        <el-button-group style="height: 28px;width:100%;">
          <el-button
            v-for="item in files"
            :id="item.id"
            :key="item.id"
            :class="{active:item.active}"
            size="mini"
            plain
            :type="item.active?'primary':''"
          >
            超小按钮<i class="el-icon-close el-icon--right" /></el-button>
        </el-button-group>
        <el-main style="margin: 0;padding: 0;height:100%;width: 100%;">
          <MonacoEditor
            ref="editor"
            width="100%"
            height="100%"
            theme="vs-dark"
            language="javascript"
            :options="editorOptions"
            @change="onChange"
          />
        </el-main>
        <el-footer class="bottom-panel" style="height: 200px;">
          Info:
          {{ files }}
        </el-footer>
      </el-container>
    </el-container>
    <el-footer class="footer-status" style="height: 30px">
      <div class="switch" @click="toggleBottomPanel">
        <i class="el-icon-s-fold" style="transform: rotate(90deg);" />
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import MonacoEditor from '@/ide/MonacoEditor'
import { mapState } from 'vuex'

export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      leftPanel: { show: true },
      bottomPanel: { show: true }
    }
  },
  computed: {
    ...mapState({
      files: state => state.ide.files,
      editorOptions: state => state.ide.editorOptions,
      openedFiles: state => state.ide.openedFiles
    })
  },
  created() {
    window.addEventListener('resize', this.onWindowResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    onWindowResize() {
      this.$nextTick(() => {
        this.$refs.editor.editor.layout()
      })
    },
    handleNodeClick(data) {
      console.log(data)
    },
    onChange(value) {
      console.log(value)
    },
    toggleLeftPanel() {
      this.leftPanel.show = !this.leftPanel.show
      this.$nextTick(() => {
        this.$refs.editor.editor.layout()
      })
    },
    toggleBottomPanel() {
      this.bottomPanel.show = !this.bottomPanel.show
      this.$nextTick(() => {
        this.$refs.editor.editor.layout()
      })
    },
    openFile(targetName) {
      const newTabName = ++this.tabIndex + ''
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      })
      this.editableTabsValue = newTabName
    },
    closeFile(targetName) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
.file-item{
  padding 5px 0 5px 10px
  &.active{
    background-color #99a9bf
  }
}

</style>
