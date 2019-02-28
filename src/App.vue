<template>
  <div id="app">
    <el-container class="container">
      <sidebar width="200px">Aside</sidebar>
      <el-container>
        <!--<el-header>-->
          <!--<headbar></headbar>-->
        <!--</el-header>-->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sidebar from '@/components/Sidebar'
import headbar from '@/components/Headbar'
export default {
  name: 'App',
  components: {
    sidebar, headbar
  }
}
</script>

<style>
  html,body{
    width: 100%;
    height: 100%;
  }

  #app {
    height: 100%;
    min-height: 550px;
  }

  .container{
    height: 100%;
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-menu {
    border-right: 0px;
  }

</style>
