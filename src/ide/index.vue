<template>
  <el-container class="main-wrapper">
    <el-container>
      <el-aside class="left-side" :width="leftPanel.show?'250px':'50px'" style="background-color: #2C2C2C">
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
            <div v-if="leftPanel.show" class="panel-content">
              <div class="bar">
                <div class="item add">
                  File
                  <i class="el-icon-document-add" />
                </div>
              </div>
              <div>
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
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
        <el-main style="margin: 0;padding: 0;height:100%;width: 100%;">
          <MonacoEditor
            ref="editor"
            width="100%"
            height="100%"
            theme="vs-dark"
            language="javascript"
            :options="options"
            @change="onChange"
          />
        </el-main>
        <el-footer class="bottom-panel" style="height: 200px;">
          Info:
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
import MonacoEditor from '@/components/monaco-editor-vue/src/index'

export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      leftPanel: { show: true },
      bottomPanel: { show: true },
      data: [{
        label: '一级 1',
        children: [{
          label: 'file1'
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1'
        }, {
          label: 'file2'
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1'
        }, {
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      options: {
        // Monaco Editor Options
        minimap: {
          // 不要小地图
          enabled: true
        }
      }
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import './index.styl'
</style>
