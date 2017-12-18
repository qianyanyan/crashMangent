const getters = {
  // 用户id
  getUserId: state => state.userId,
  // 首页菜单列表
  getMenuList: state => state.menuList,
  // 获取用户名
  getSysUserName: state => state.sysUser.accounts,
  // 获取用户权限名称
  getRoleName: state => state.roleName,
  getPermissionName: state => state.permissionName,

  // 获取已在线表格数据对象
  getOnlineData: state => state.onLineData,
  // 获取下线表格数据对象
  getOutlineData: state => state.outLineData,

  // 获取全部使用中广告数据
  getAdvertisData: state => state.advertisData,

  // 获取全部已下线广告数据
  getAdvertisDown: state => state.advertisDown,

  // 获取已上线超市列表数据
  getOnlineMarketData: state => state.onLineMarketListData,
  // 获取待上线超市列表数据
  getFutureMarketData: state => state.futureMarketListData,
  // 获取待上线超市列表数据
  getOutlineMarketData: state => state.outLineMarketListData
}
export default getters
