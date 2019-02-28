<template>
  <el-aside width="200px">
    <el-menu
      :default-active="currentActive"
      class="el-menu-vertical-demo"
      @select="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <template v-for="v in menu">
        <el-menu-item v-if="oneLevel(v.index, v.children)" :key="v.index" :index="v.index.toString()">
          <i :class="v.pic"></i>
          <span slot="title">{{v.label}}</span>
        </el-menu-item>
        <el-submenu v-if="twoLevels(v.index, v.children)" :key="v.index" :index="v.index.toString()">
          <template slot="title">
            <i :class="v.pic"></i>
            <span>{{v.label}}</span>
          </template>
          <template v-for="m in v.children">
            <el-menu-item :key="m.index" :index="m.index.toString()">{{m.label}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import store from '../store'
export default {
  name: 'Sidebar',
  data () {
    return {
    }
  },
  methods: {
    handleOpen (index, indexPath) {
      var route = this.findRoute(store.state.common.routes, index)
      this.$router.push({name: route.name})
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    oneLevel (hasIndex, hasChildren) {
      return hasIndex && !hasChildren
    },
    twoLevels (hasIndex, hasChildren) {
      return hasIndex && hasChildren
    },
    findRoute (route, index) {
      var splitIndex = index.toString().split('-')
      var firstLevelRoute = route[parseInt(splitIndex[0])]
      var dRoute = firstLevelRoute
      for (var i = 1; i < splitIndex.length; i++) {
        dRoute = dRoute.children[splitIndex[i] - 1]
      }
      return dRoute
    }
  },
  computed: {
    menu () {
      return store.state.common.routes
    },
    currentActive () {
      let currentPath
      if (this.$route.matched.length > 0) {
        currentPath = this.$route.matched[0].path
        for (var i = 1; i < store.state.common.routes.length - 1; i++) {
          if (store.state.common.routes[i].path === currentPath) {
            if (this.$route.matched.length === 1) {
              return store.state.common.routes[i].index.toString()
            } else if (this.$route.matched.length === 2) {
              currentPath = this.$route.matched[1].path
              for (var j = 0; j < store.state.common.routes[i].children.length; j++) {
                if (store.state.common.routes[i].children[j].path === currentPath) {
                  return store.state.common.routes[i].children[j].index.toString()
                }
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
