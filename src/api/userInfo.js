import Ajax from './Ajax'
import * as mock from './mock/userInfo'
import url from './url/userInfo'

export class GetQueryMenuList extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'post'
    this.mock = mock.GetQueryMenuList
    this.url = url.GetQueryMenuList
  }
  adapter (res) {
    return res.data
  }
}
export class GetQueryDspUserInfoList extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetQueryDspUserInfoList
    this.url = url.GetQueryDspUserInfoList
  }
  adapter (res) {
    return res.data
  }
}
export class GetInsertDspUserInfo extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetInsertDspUserInfo
    this.url = url.GetInsertDspUserInfo
  }
  adapter (res) {
    return res.data
  }
}
export class GetDeleteDspUserInfo extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetDeleteDspUserInfo
    this.url = url.GetDeleteDspUserInfo
  }
  adapter (res) {
    return res.data
  }
}
export class GetUpdateDspUserInfo extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetUpdateDspUserInfo
    this.url = url.GetUpdateDspUserInfo
  }
  adapter (res) {
    return res.data
  }
}
export class GetInsertDspRole extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetInsertDspRole
    this.url = url.GetInsertDspRole
  }
  adapter (res) {
    return res.data
  }
}
export class GetDeleteDspRole extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetDeleteDspRole
    this.url = url.GetDeleteDspRole
  }
  adapter (res) {
    return res.data
  }
}
export class GetQueryRoleWithUser extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetQueryRoleWithUser
    this.url = url.GetQueryRoleWithUser
  }
  adapter (res) {
    return res.data
  }
}
export class GetUpdateOneUserRole extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetUpdateOneUserRole
    this.url = url.GetUpdateOneUserRole
  }
  adapter (res) {
    return res.data
  }
}
export class GetUpdateOneRolePerm extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetUpdateOneRolePerm
    this.url = url.GetUpdateOneRolePerm
  }
  adapter (res) {
    return res.data
  }
}
export class GetQueryDspUserInfoDetails extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetQueryDspUserInfoDetails
    this.url = url.GetQueryDspUserInfoDetails
  }
  adapter (res) {
    return res.data
  }
}
export class GetqueryDspRoleList extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetqueryDspRoleList
    this.url = url.GetqueryDspRoleList
  }
  adapter (res) {
    return res.data
  }
}
export class GetQueryDspRoleDetails extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetQueryDspRoleDetails
    this.url = url.GetQueryDspRoleDetails
  }
  adapter (res) {
    return res.data
  }
}
export class GetQueryPermWithRole extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.GetQueryPermWithRole
    this.url = url.GetQueryPermWithRole
  }
  adapter (res) {
    return res.data
  }
}
