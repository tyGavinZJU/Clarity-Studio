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

          <div class="panel-content">
            <div class="bar">
              <div class="item add">
                File
                <i class="el-icon-document-add" />
              </div>
            </div>
            <div>
              <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

            </div>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header class="header" style="height:30px">Header</el-header>
        <el-main>main</el-main>
        <el-footer style="background-color:#aaa;height: 250px;" >Footer</el-footer>
      </el-container>
    </el-container>
    <el-footer class="footer-status" style="height: 30px">
      <el-button-group>
        VIEW
        <i class="el-icon-s-fold" />
        <i class="el-icon-s-unfold" />
      </el-button-group>
    </el-footer>
  </el-container>

</template>

<script>
export default {
  data() {
    return {
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
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import './index.styl'
</style>
