<template lang="html">
  <aside class="left-nav-wrap">
    <!-- <router-link :to="'/'">
      <img src="../../assets/img/ABTest_Logo.png" class="logo" width="149px">
    </router-link> -->
    <span class="logo" width="149px">投放系统平台</span>
    <ul>
      <li class="left-nav" v-for="(item,index) in leftNavArr" :class="{'nav-active':navActiveIndex==index}" :key="'menu'+index">
        <a href="javascript:;" @click="leftNavClick(index,item)">
          <i class="left-nav-icon" :style="{background : (navActiveIndex==index ? 'url('+ item.icon +') no-repeat bottom/26px auto' : 'url('+ item.icon +') no-repeat top/26px auto')}"></i>{{item.name}}</a>
      </li>
    </ul>
  </aside>
</template>

<script>
import { GetQueryMenuList } from '@api/userInfo'
import { mapGetters } from 'vuex'
const getQueryMenuList = new GetQueryMenuList(true)
export default {
  name: 'cs-sidebar',
  props: {},
  data() {
    return {
      navActiveIndex: 1,
      leftNavArr: []
    }
  },
  computed: {
    ...mapGetters({
      // userInfo: 'getUserInfo'
    })
  },
  watch: {
    userInfo: {
      handler (newVal, oldVal) {
        if (newVal) {
          this.getAuthMenus()
        }
      }
    }
  },
  methods: {
    leftNavClick(index, obj) {
      this.navActiveIndex = index
      this.$router.push({ path: obj.path })
    },

    getQueryMenuList () {
      // let erp = this.userInfo.erp
      // console.log('erp:::', erp)
      getQueryMenuList.fetch({}).then(res => {
        console.log('777777res', res)
        if (res && res.code === '0000') {
          let result = res.data
          let arr = []
          for(let [k, v] of Object.entries(result)) {
            console.log(222,k, v)
            arr.push({
              name: k,
              level: v,
              icon: this.setMenuIcon(k, v),
              path: this.setMenuPath(k)
            })
          }
          if (arr.length === 0) return
          // console.log('arr:::', arr)
          this.leftNavArr = arr
        }
      })
    },
    setMenuIcon (menu, level) {
      if (level === 2) return
      let iconUrl = ''
      switch (menu) {
        case '实验项目':
          iconUrl = require('./../../assets/img/left_icon_project@2x.png')
          break;
        case '管理':
          iconUrl = require('./../../assets/img/left_icon_check@2x.png')
          break;
        default:
          iconUrl = require('./../../assets/img/left_icon_project@2x.png')
          break;
      }
      return iconUrl
    },
    setMenuPath (menu) {
      let pathStr = ''
      switch (menu) {
        case '实验项目':
          pathStr = ''
          break;
        case '全部项目':
          pathStr = '/project/list'
          break;
        case '用户信息':
          pathStr = ''
          break;
        case '用户列表':
          pathStr = '/user/list'
          break;

        default:
          pathStr = '/project/list'
          break;
      }
      return pathStr
    }
  },
  mounted() {
    this.getQueryMenuList()
  }
}
</script>

<style lang="less">
.left-nav-wrap {
  position: fixed;
  width: 210px;
  height: 100%;
  font-size: 14px;
  background-color: #f6f8fc;
  // padding-top: 28px;
  padding-top: 108px;
  min-height: 600px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 1000;
  .logo {
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 25px 30px 0px;
    color:#0074FF;
    font-size: 25px;
  }
  ul {
    li {
      padding: 0;
      margin: 0;
      // height: 40px;
      // overflow: hidden;
      margin-bottom: 12px;
      min-width: 100%;
      a {
        display: block;
        position: relative;
        height: 40px;
        padding-left: 65px;
        line-height: 40px;
        color: #727682;
        text-decoration: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 14px;
        .left-nav-icon {
          display: block;
          position: absolute;
          left: 28px;
          top: 0;
          bottom: 0;
          margin: auto 0;
          width: 26px;
          height: 26px;
        }
      }
    }
    li.nav-active > a {
      color: #0074ff;
      background: url(./../../assets/img/nav_item_bg.png) no-repeat 100% 0;
    }
  }
}
</style>
