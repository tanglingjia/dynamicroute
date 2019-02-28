import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import * as types from '../store/mutations-type'
import { get } from '../utils/request'
import { APIS } from '../store/const'

Vue.use(Router)

const routes = []

const router = new Router({
  routes
})

router.beforeEach(async (to, from, next) => {
  if (store.state.common.routes.length === 0) {
    let res = await get({ url: APIS.B_ROUTE })
    const {data} = res
    await store.dispatch(types.PULL_ROUTES, data)
    router.addRoutes(store.state.common.routes)
    next({ ...to })
  }
  next()
})

export default router
