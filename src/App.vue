<template>
  <div class="app">
    <csHeader></csHeader>
    <csSidebar></csSidebar>
    <router-view class="main-content"></router-view>
  </div>
</template>

<script>
import csHeader from '@components/csHeader'
import csSidebar from '@components/csSidebar'

export default {
  name: 'App',
  components: {
    csSidebar,
    csHeader,
  },
  data () {
    return {
      topMenu: {}
    }
  },

  computed: {
    // topMenuList () {
    //   let result = this.$root.menuList.filter(item => (item.parentMenu === 1))
    //   return result
    // },
    // secondaryMenuTree () {
    //   let parentId = this.topMenu.id
    //   let menuList = this.$root.menuList.filter(item => (item.parentMenu === parentId))
    //   // menuList.push(this.topMenu)
    //   let menuTree = this.plantToTree(menuList)
    //   // console.log('menuTree', menuTree)
    //   return menuTree
    // }
  },

  mounted () {
    // this.$store.commit('setExperimentId', 75)
    // 防止页面刷新后 vuex里实验相关参数置空
    let eid = sessionStorage.getItem('eData_experimentId')
    if (eid && eid !== '') this.$store.commit('setExperimentId', eid)
    let status = sessionStorage.getItem('eData_experimentStatus')
    if (status && status !== '') this.$store.commit('setExperimentStatus', status)
    let time = sessionStorage.getItem('eData_experimentTime')
    if (time && time !== '') this.$store.commit('setExperimentTime', time)
    let config = sessionStorage.getItem('eData_configFlag')
    if (config && config !== '') this.$store.commit('setConfigFlag', config)
    let tid = sessionStorage.getItem('eData_targetId')
    if (tid && tid !== '') this.$store.commit('setTargetId', tid)
    let tname = sessionStorage.getItem('eData_targetName')
    if (tname && tname !== '') this.$store.commit('setTargetName', tname)
    let ttype = sessionStorage.getItem('eData_targetType')
    if (ttype && ttype !== '') this.$store.commit('setTargetType', ttype)
    let vids = sessionStorage.getItem('eData_versionIds')
    if (vids && vids !== '') this.$store.commit('setVersionId', vids)
    let real = sessionStorage.getItem('eData_hasRealTime')
    if (real && real !== '') this.$store.commit('setRealTime', real)
  },
  methods: {
    plantToTree (list) {
      if (list.length === 0) return
      let temp = list.reduce((combin, item) => {
        let id = item.id
        combin[id] = item
        return combin
      }, {})

      let keys = Object.keys(temp)
      let result = []
      keys.forEach(key => {
        let item = temp[key]
        let parentId = item.parentMenu
        let parent = temp[parentId]
        if (parent) {
          parent.children = parent.children || []
          parent.children.push(item)
        } else {
          result.push(item)
        }
      })

      return result
    },
  }
}
</script>

<style lang="less">
html{
  height: 100%;
}
body{
  margin: 0;
  font-size: 12px;
  min-width: 1200px;
  font-family: 'San Francisco,PingFang SC,Hiragino Sans GB,Segoe UI,Microsoft Yahei,微软雅黑,Tahoma,Arial,sans-serif;San Francisco,PingFang SC,Hiragino Sans GB,Segoe UI,Microsoft Yahei,微软雅黑,Tahoma,Arial,sans-serif';
  height: 100%;
  overflow: auto;
}
.app{
  height: 100%;
}

.flex-end{
  display: flex;
  justify-content: flex-end;
}
.flex-start{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex_center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin: 35px 20px 50px;
}
.clearfix:after{
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfix{
  zoom: 1;
}

/*error info 样式 */
.error-info {
  color: red;
  margin-left: 20px;
  font-size: 12px;

  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url(./assets/img/error.png);
    margin-right: 4px;
    position: relative;
    top: 1px;
  }
  p {
    margin-top: 6px;
  }
}
.close-dialog-icon {
  width: 32px;
  height: 32px;
  background: url('./assets/img/close-default@2x.png') no-repeat center center;
  position: fixed;
  right: 40px;
  top: 40px;
  z-index: 9999;
  &:hover {
    cursor: pointer;
    background: url('./assets/img/close-hover@2x.png') no-repeat center center;
  }
}
</style>

<style lang="less">
.main-content{
  margin-left: 210px;
  user-select: text;
  padding-top: 80px;
  min-height: 768px;
  // padding-bottom: 80px;
}
.page-title{
  position: relative;
  font-size: 18px;
  color: #283039;
  padding: 30px 0px 20px;
  border-bottom: 2px solid #f0f2f5;
  margin: 0px 30px 30px;
  span{
    font-size: 18px;
    color:#283039;
  }
}
</style>
