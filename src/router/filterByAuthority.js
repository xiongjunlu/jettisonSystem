/**
 * 根据用户权限,配置路由
 * @param  {Object} routerMap eg: { 页面:路由配置 }
 * @return {routes}           用于生成路由的routes
 */
export default function filterByAuthority (routerMap) {
  function toString (any) {
    return Object.prototype.toString.call(any).slice(8, -1)
  }

  function pushToRoutes (collection) {
    if (toString(collection) === 'Object') {
      routes.push(collection)
    }
    if (toString(collection) === 'Array') {
      routes.push(...collection)
    }
  }

  const routes = []
  let keys = Object.keys(routerMap)
  keys.forEach(key => {
    pushToRoutes(routerMap[key])
  })

  return routes
}
