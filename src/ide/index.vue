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
                  <i class="el-icon-document-add" @click="createFileFormShow=true" />
                </div>
              </div>
              <div>
                <div
                  v-for="item in files"
                  :id="item.id"
                  :key="item.id"
                  class="file-item"
                  :class="{active:item.active}"
                  @click="openFile(item)"
                >
                  {{ item.name }}
                  <i style="float: right;" class="delete el-icon-delete" @click.stop="onRemoveFile(item)" />
                </div>
              </div>
            </div>
          </transition>
        </div>
      </el-aside>
      <el-container class="main" style="margin: 0;padding: 0;width: 100%;">
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
            v-for="item in openedFiles"
            :id="item.id"
            :key="item.id"
            :class="{active:item.active}"
            size="mini"
            plain
            :type="item.active?'primary':''"
            @click="openFile(item)"
          >
            {{ item.name }}
            <i class="el-icon-close el-icon--right" @click="closeFile(item)" />
          </el-button>
        </el-button-group>
        <el-main style="margin: 0;padding: 0;height:100%;width: 100%;">
          <MonacoEditor
            ref="editor"
            width="100%"
            height="100%"
            theme="vs-dark"
            language="javascript"
            :options="editorOptions"
            :value="filesContent[curFileId]||''"
            @change="onChange"
          />
        </el-main>
        <el-footer class="bottom-panel" style="height: 200px;">
          Current File: {{ curFileId }}
          <div v-for="(item,index) in consoleLogs" :key="index">
            {{ index }} {{ item }}
          </div>
        </el-footer>
      </el-container>
    </el-container>
    <el-footer class="footer-status" style="height: 30px">
      <div class="switch" @click="toggleBottomPanel">
        <i class="el-icon-s-fold" style="transform: rotate(90deg);" />
      </div>
    </el-footer>
    <el-dialog title="Create File" :visible.sync="createFileFormShow">
      <el-form :model="createFileForm">
        <el-form-item label="File Name" :label-width="formLabelWidth">
          <el-input v-model="createFileForm.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createFileFormShow = false">Cancel</el-button>
        <el-button type="primary" @click="onAddFile(createFileForm)">Confirm</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import MonacoEditor from '@/ide/MonacoEditor'
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      leftPanel: { show: true },
      bottomPanel: { show: true },
      createFileForm: {

      },
      formLabelWidth: '120px',
      createFileFormShow: false
    }
  },
  computed: {
    ...mapState({
      files: state => state.ide.files,
      filesContent: state => state.ide.filesContent,
      curFileId: state => state.ide.curFileId,
      editorOptions: state => state.ide.editorOptions,
      openedFiles: state => {
        return _.filter(state.ide.files, (f) => {
          return f.opened === true
        })
      },
      consoleLogs: state => state.ide.consoleLogs
    })
  },
  watch: {
    curFileId: function(val) {
      console.log('watch curFileId', val)
    }
  },
  created() {
    window.addEventListener('resize', this.onWindowResize)
    this.initIDE()
    console.log('created curFileId', this.curFileId)
  },
  mounted() {
    this.$nextTick(() => {
      console.log('mounted curFileId', this.curFileId)
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    ...mapActions('ide', ['initIDE', 'openFile', 'closeFile', 'addFile', 'removeFile', 'updateEditorValue', 'log']),
    onWindowResize() {
      this.$nextTick(() => {
        this.$refs.editor.editor.layout()
      })
    },
    handleNodeClick(data) {
      console.log(data)
    },
    onChange(value) {
      console.log('onChange', value)
      this.updateEditorValue(value)
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
    onAddFile(data) {
      const fileName = data.name
      const name = fileName.replace(/[/\\?%*:|"<> ]/g, '-')
      const found = _.find(this.files, (o) => {
        return o.name === name
      })
      if (found) {
        this.$message.error('Please check the file name if it is illegal or duplicated')
        return
      }
      this.addFile(name)
      this.createFileFormShow = false
    },
    onRemoveFile(item) {
      const fileName = item.name
      this.removeFile(fileName)
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
  .delete{
    display none;
  }
  &:hover .delete{
    display block;
    margin-right 10px;
  }
}

</style>
