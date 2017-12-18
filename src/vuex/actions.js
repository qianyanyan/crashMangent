import { requestLogin, toIndex, searMerchantAd, showOnlineList, showOutlineList, searchAdPlan } from '../api/api'

export default {
  // 登陆后，获取用户信息
  getUser (context, value) {
    // ajax请求
    requestLogin(value.loginParams).then(data => {
      let val = {
        data: data,
        callback: value.callback
      }
      context.commit('changeUserId', val)
    })
  },
  // 获取首页信息
  getIndexInfo (context, value) {
    toIndex(value.userId).then(data => {
      let val = {
        data: data,
        callback: value.callback
      }
      context.commit('changeIndexInfo', val)
    })
  },
  // 获取已在线表格
  getOnlineTable (context, value) {
    showOnlineList().then(res => {
      let val = {
        data: res.data,
        callback: value.callback
      }
      context.commit('getOnlineTable', val)
    })
  },
  // 获取已下线表格
  getOutlineTable (context, value) {
    showOutlineList().then(res => {
      let val = {
        data: res.data,
        callback: value.callback
      }
      context.commit('getOutlineTable', val)
    })
  },

  // 获得使用中的全部广告数据
  getAdvertisTable(context, value){
      searMerchantAd(value).then(data => {
          let advertisData = {
            currentPage:value.currentPage,
            total:data.data.total,
            list:data.data.data.list,
            pageSize:data.data.data.pageSize,
          }
          let val = {
            data: advertisData,
            callback: value.callback
          }
        context.commit('getAdvertisTable', val)
      })
  },
  getAdvertisDown(context, value){
    searMerchantAd(value).then(data => {
        let advertisDown = {
          currentPage:value.currentPage,
          total:data.data.total,
          list:data.data.data.list,
          pageSize:data.data.data.pageSize,
        }
        let val = {
          data: advertisDown,
          callback: value.callback
        }
      context.commit('getAdvertisDown', val)
    })
  },
  // 获取已在线超市列表
  getOnlineMarketList (context, value) {
    searchAdPlan(value.params).then(res => {
      let val = {
        data: res,
        callback: value.callback
      }
      context.commit('getOnlineMarketList', val)
    })
  },
  // 获取待上线超市列表
  getFutureMarketList (context, value) {
    searchAdPlan(value.params).then(res => {
      let val = {
        data: res,
        callback: value.callback
      }
      context.commit('getFutureMarketList', val)
    })
  },
  // 获取已下线超市列表
  getOutlineMarketList (context, value) {
    searchAdPlan(value.params).then(res => {
      let val = {
        data: res,
        callback: value.callback
      }
      context.commit('getOutlineMarketList', val)
    })
  }
}
