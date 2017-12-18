export default {
  // 变更用户sessionId
  changeUserId (state, val) {
    if (val.data.status == 200) {
      state.userId = val.data.data.data
      localStorage.setItem('userId', val.data.data.data)
    }
    val.callback(val.data.data)
  },
  // 删除用户sessionId
  deleteUserId (state) {
    state.userId = ''
  },
  // 变更首页信息
  changeIndexInfo (state, val) {
    if (val.data.data.code == 200) {
      state.menuList = val.data.data.data.menuList
      state.sysUser = val.data.data.data.sysUser
      state.roleName = val.data.data.data.roleName
      state.permissionName = val.data.data.data.permissionName
      localStorage.setItem('permissionName', val.data.data.data.permissionName)
    }
    val.callback(val.data.data)
  },
  // 变更菜单信息
  changeMenuInfo (state, val) {
    let list = state.menuList
    for (let i in list) {
      for (let j in list[i].children) {
        if (val.id == list[i].children[j].id) {
          list[i].children[j].menuName = val.menuName
          list[i].children[j].menuUrl = val.menuUrl
          list[i].children[j].fmenuIcon = val.fmenuIcon
          list[i].children[j].menuOrder = val.menuOrder
          list[i].children[j].menuStatus = val.menuStatus
          break
        }
      }
    }
    state.menuList = Object.assign({}, state.menuList)
  },
  // 删除菜单
  deleteMenu (state, id) {
    for (let i in state.menuList) {
      for (let j in state.menuList[i].children) {
        if (id == state.menuList[i].children[j].id) {
          state.menuList[i].children.splice(j, 1)
          // delete state.menuList[i].children[j]
        }
      }
    }
    state.menuList = Object.assign({}, state.menuList)
  },
  // 获取已在线表格
  getOnlineTable (state, val) {
    if (val.data.code == 200) {
      state.onLineData.total = val.data.total
      state.onLineData.list = val.data.data.bannerPositionList
    }
    val.callback(val)
  },
  // 变更在线表格数据
  changeOnLineTableData (state, data) {
    if (data.currentPage != undefined) {
      state.onLineData.currentPage = data.currentPage
    }
    if (data.pageSize != undefined) {
      state.onLineData.pageSize = data.pageSize
    }
    if (data.total != undefined) {
      state.onLineData.total = data.total
    }
    if (data.list != undefined) {
      state.onLineData.list = data.list
    }
  },
  // 获取下线表格
  getOutlineTable (state, val) {
    if (val.data.code == 200) {
      state.outLineData.total = val.data.total
      state.outLineData.list = val.data.data.bannerTaskList
    }
    val.callback(val)
  },
  // 变更下线表格数据
  changeOutLineTableData (state, data) {
    if (data.currentPage) {
      state.outLineData.currentPage = data.currentPage
    }
    if (data.pageSize) {
      state.outLineData.pageSize = data.pageSize
    }
  },

  // 获取使用中广告表格数据
  getAdvertisTable(state, val){
    state.advertisData.currentPage = val.data.currentPage
    state.advertisData.pageSize = val.data.pageSize
    state.advertisData.total = val.data.total
    state.advertisData.list = val.data.list
    val.callback(val.data)
  },
    // 获取已下线广告表格数据
  getAdvertisDown(state, val){
      state.advertisDown.currentPage = val.data.currentPage
      state.advertisDown.pageSize = val.data.pageSize
      state.advertisDown.total = val.data.total
      state.advertisDown.list = val.data.list
      val.callback(val.data)
  },
  changeAdvertise(state, data){
    if (data.currentPage) {
      state.advertisData.currentPage = data.currentPage
    }
    if (data.pageSize) {
      state.advertisData.pageSize = data.pageSize
    }
    if (data.total) {
      state.advertisData.total = data.total
    }
  },
  changeAdvertiseDown(state, data){
    if (data.currentPage) {
      state.advertisDown.currentPage = data.currentPage
    }
    if (data.pageSize) {
      state.advertisDown.pageSize = data.pageSize
    }
    if (data.total) {
      state.advertisDown.total = data.total
    }
  },
  getOnlineMarketList (state, val) {
    if (val.data.data.code == 200) {
      state.onLineMarketListData.currentPage = val.data.data.data.pageNum
      state.onLineMarketListData.pageSize = val.data.data.data.pageSize
      state.onLineMarketListData.total = val.data.data.data.total
      let list = val.data.data.data.list
      for (let i = 0; i < list.length; i++) {
        if (list[i].img2 != '' || list[i].img2 != undefined) {
          list[i].img2 = process.env.IMG_SERVER + list[i].img2
        }
      }
      state.onLineMarketListData.list = list
    }
    val.callback(val.data)
  },
  // 变更在线超市表格数据
  changeOnLineMarketTableData (state, data) {
    if (data.currentPage) {
      state.onLineMarketListData.currentPage = data.currentPage
    }
    if (data.pageSize) {
      state.onLineMarketListData.pageSize = data.pageSize
    }
    if (data.list) {
      state.onLineMarketListData.list = data.list
    }
  },
  getFutureMarketList (state, val) {
    if (val.data.data.code == 200) {
      state.futureMarketListData.currentPage = val.data.data.data.pageNum
      state.futureMarketListData.pageSize = val.data.data.data.pageSize
      state.futureMarketListData.total = val.data.data.data.total
      let list = val.data.data.data.list
      for (let i = 0; i < list.length; i++) {
        if (list[i].img2 != '' && list[i].img2 != undefined) {
          list[i].img2 = process.env.IMG_SERVER + list[i].img2
        }
      }
      state.futureMarketListData.list = list
    }
    val.callback(val.data)
  },
  // 变更待上线超市表格数据
  changeFutureMarketTableData (state, data) {
    if (data.currentPage) {
      state.futureMarketListData.currentPage = data.currentPage
    }
    if (data.pageSize) {
      state.futureMarketListData.pageSize = data.pageSize
    }
  },
  getOutlineMarketList (state, val) {
    if (val.data.data.code == 200) {
      state.outLineMarketListData.currentPage = val.data.data.data.pageNum
      state.outLineMarketListData.pageSize = val.data.data.data.pageSize
      state.outLineMarketListData.total = val.data.data.data.total
      let list = val.data.data.data.list
      for (let i = 0; i < list.length; i++) {
        if (list[i].img2 != '' && list[i].img2 != undefined) {
          list[i].img2 = process.env.IMG_SERVER + list[i].img2
        }
      }
      state.outLineMarketListData.list = list
    }
  },
  // 变更待上线超市表格数据
  changeOutlineMarketTableData (state, data) {
    if (data.currentPage) {
      state.outLineMarketListData.currentPage = data.currentPage
    }
    if (data.pageSize) {
      state.outLineMarketListData.pageSize = data.pageSize
    }
  }
}