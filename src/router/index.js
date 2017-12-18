import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Layout from '../components/Layout'
import Index from '../view/index'
import User from '../view/user'
import Role from '../view/role'
import Menu from '../view/menu'
import Permissions from '../view/permissions'
import Resource from '../view/resource'
import Merchant from '../view/merchant'
import Dictionary from '../view/dictionary'
import Advertis from '../view/advertis'
import Err from '../components/404'
import BannerManage from '../view/bannerManage'
import BannerOnLineDetails from '../view/bannerOnLineDetails'
import adverDetails from '../components/advites/adverDetails'
import Advers from '../view/advers'
import MarketList from '../view/marketList'
import MarketDetail from '../view/marketDetail'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/404',
      name: '404',
      component: Err
    },
    { path: '*', redirect: '/404', hidden: true },
    {
      path: '/',
      component: Layout,
      name: '导航',
      iconCls: 'fa fa-address-card',
      leaf: true,
      children: [
        { path: '/main', component: Index, name: '主页', hidden: true },
        { path: '/user', component: User, name: '用户管理' },
        { path: '/role', component: Role, name: '角色管理' },
        { path: '/menu', component: Menu, name: '菜单管理' },
        { path: '/permissions', component: Permissions, name: '权限管理' },
        { path: '/resource', component: Resource, name: '资源管理' },
        { path: '/merchant', component: Merchant, name: '广告商管理' },
        { path: '/dictionary', component: Dictionary, name: '字典管理' },
        { path: '/advertis', component: Advertis, name: '广告操作' },
        { path: '/bannerManage', component: BannerManage, name: 'banner位管理' },
        { path: '/advers', component: Advers, name: '全部广告' },
        { path: '/marketList', component: MarketList, name: '超市列表管理' },
        { path: '/marketList/details/:id', component: MarketDetail, name: '超市列表管理' },
        { path: '/bannerManage/details/:from/:id', component: BannerOnLineDetails, name: 'banner位在线详情' },
        { path: '/adverDetails/details', component: adverDetails }
      ]
    }
  ]
})

export default router
