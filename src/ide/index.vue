<template>
  <el-container class="main-wrapper">
    <el-container>
      <el-aside class="left-side" width="250px" style="background-color: #2C2C2C">
        <div class="left-content">
          <div class="panel-nav">
            <div class="item">
              <i class="el-icon-document" />
            </div>
            <div class="item">
              <i class="el-icon-setting" />
            </div>
          </div>

          <div class="panel-content" v-show="leftPanel.show">
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
        </div>
      </el-aside>
      <el-container>
        <el-header class="header" style="height:30px">
          <div class="switch" @click="toggleLeftPanel">
            <i class="el-icon-s-fold" />
          </div>
          <div class="actions" style="float: right;">
            <el-button size="mini" type="text">Compile</el-button>
            <el-button size="mini" type="text">Deploy</el-button>

          </div>
        </el-header>
        <el-main style="margin: 0;padding: 0;height: 100%;width: 100%;">
          <MonacoEditor
            theme="vs-dark"
            language="javascript"
            :options="options"
            @change="onChange"
          />
        </el-main>
        <el-footer style="background-color:#aaa;height: 250px;" v-show="bottomPanel.show">
          Footer
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
import MonacoEditor from 'monaco-editor-vue'

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
      this.$forceUpdate()
      this.$refs
    },
    toggleBottomPanel() {
      this.bottomPanel.show = !this.bottomPanel.show
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import './index.styl'
</style>
