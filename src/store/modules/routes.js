import * as types from '../mutations-type'

const state = {
  staticRoute: [
    {
      'name': 'menu1',
      'pic': 'el-icon-menu',
      'component': () => import('@/components/menu1/index')
    },
    {
      'name': 'menu2',
      'pic': 'el-icon-location',
      'component': () => import('@/components/menu2/index')
    },
    {
      'name': 'submenu1',
      'component': () => import('@/components/menu2/submenu1/index')
    },
    {
      'name': 'submenu2',
      'component': () => import('@/components/menu2/submenu2/index')
    },
    {
      'name': 'menu3',
      'pic': 'el-icon-document',
      'component': () => import('@/components/menu3/index')
    }
  ],
  rootRoute: {
    'path': '/'
  },
  noPermissionRoute: {
    'path': '/nopermission',
    'name': 'nopermission',
    'component': () => import('@/components/nopermission/index')
  },
  routes: [
  ]
}

const getters = {
}

const mutations = {
  [types.PULL_ROUTES] (state, data) {
    mergeRoute(data, state.staticRoute, '') // 合并本地静态内容到后端路由
    state.routes.push(state.rootRoute) // 加入根路由
    state.routes = state.routes.concat(data) // 加入后端路由
    state.routes.push(state.noPermissionRoute) // 加入无权限路由
    makeRedirect(state.routes) // 路由重定向
  }
}

const actions = {
  [types.PULL_ROUTES] ({commit}, data) {
    commit(types.PULL_ROUTES, data)
  }
}

// 从后端取到的路由，合并本地内容
function mergeRoute (routes, staticRoutes, indexPre) {
  var index = 1
  routes.forEach((item) => {
    let currentRoute = staticRoutes.find((staticRoute) => { return staticRoute.name === item.name })
    Object.assign(item, currentRoute) // 合并对象
    var menuIndex = indexPre === '' ? index : indexPre + '-' + index
    Object.assign(item, {'index': menuIndex}) // 菜单索引
    index++
    if (item.children) {
      mergeRoute(item.children, staticRoutes, menuIndex)
    }
  })
}

// 制作redirect，包括根路由和各级子路由
function makeRedirect (routes) {
  routes[0].redirect = routes[1].path // 根路由跳转至第一个路由path
  for (let i = 1; i < routes.length - 1; i++) {
    subRedirect(routes[i])
  }
}

// 递归生成redirect
function subRedirect (route) {
  if (route.children) {
    route.redirect = route.children[0].path // 路由redirect为其children第一项的path
    route.children.forEach((item) => {
      subRedirect(item) // 递归所有子路由
    })
  }
}

export default { state, getters, mutations, actions }
