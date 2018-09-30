import host from './host'

let url = {
  // 查询菜单列表
  GetQueryMenuList: host + 'api/dspUserInfo/queryMenuList',
  // 权限---获取用户列表
  GetQueryDspUserInfoList: host + 'api/dspUserInfo/queryDspUserInfoList',
  // 权限---新增用户
  GetInsertDspUserInfo: host + 'api/dspUserInfo/insertDspUserInfo',
  // 权限-删除用户
  GetDeleteDspUserInfo: host + 'api/dspUserInfo/deleteDspUserInfo',
  // 权限-新增角色
  GetInsertDspRole: host + 'api/dspRole/insertDspRole',
  // 权限-删除角色
  GetDeleteDspRole: host + 'api/dspRol/deleteDspRole',
  // 权限-修改用户
  GetUpdateDspUserInfo: host + 'api/dspUserInfo/updateDspUserInfo',
  // 权限-用户角色列表
  GetQueryRoleWithUser: host + 'api/dspUserRole/queryRoleWithUser',
  // 权限-给用户配置角色
  GetUpdateOneUserRole: host + 'api/dspUserRole/updateOneUserRole',
  // 权限-给角色设置权限
  GetUpdateOneRolePerm: host + 'api/dspRolePerm/updateOneRolePerm',
  // 权限-获取用户详情
  GetQueryDspUserInfoDetails: host + 'api/dspUserInfo/queryDspUserInfoDetails',
  // 权限-获取角色列表
  GetqueryDspRoleList: host + 'api/dspRole/queryDspRoleList',
  // 权限-获取角色详情
  GetQueryDspRoleDetails: host + 'api/dspRole/queryDspRoleDetails',
  // 权限-角色权限列表
  GetQueryPermWithRole: host + 'api/dspRolePerm/queryPermWithRole',

}

export default url
