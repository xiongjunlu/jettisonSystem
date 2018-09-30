<template lang="html">
  <header class="csHeader">
    <div class="headInfo" id="headInfo">
      <div class="breadcrumbs_top">
        <span class="breadcrumb_item">
          <span role="link" :class="[{'normal': breadVal1 || breadVal2}, {'active': !breadVal1&&!breadVal2}]">全部项目</span>
          <i class="el-breadcrumb__separator el-icon-arrow-right" v-show="breadVal1"></i>
        </span>
        <span class="breadcrumb_item" v-show="breadVal1">
          <span role="link" :class="[{'normal': breadVal1&&breadVal2}, {'active': breadVal1&&!breadVal2}]">{{breadVal1}}</span>
          <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
        </span>
        <span class="breadcrumb_item" v-show="breadVal2">
          <span role="link" class="active">222</span>
          <!-- <i class="el-breadcrumb__separator el-icon-arrow-right"></i> -->
        </span>
      </div>

      <div class="rightInfo">
        <div class="noticeWrap" @click="linkTo">
          <span class="icon"></span>
          <span class="num" v-show="true">11</span>
        </div>
        <div class="userWrap" @mouseenter="showAlt = true" @mouseleave="showAlt = false">
          <img v-if="true" class="after" :src="userTitle" width="42px" height="42px">
          <div class="alt-wrapper">
            <ul class="alt" v-show="showAlt">
              <li><a href="javascript:void(0)" @click="loginOut">退出登录</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'csHeader',
  props: {},
  data() {
    return {
      showAlt: false,
      breadVal1: '',
      breadVal2: ''
    }
  },
  watch: {
    $route() {
      this.breadVal1 = sessionStorage.getItem('breadcrumb_val1')
      this.breadVal2 = sessionStorage.getItem('breadcrumb_val2')
      console.log(this.breadVal1 + ' , ' + this.breadVal2)
    }
  },
  computed: {
    ...mapGetters({

    }),
    userTitle () {
      return  require('./../../assets/img/user_title.png')
    },
    infoNum () {
      return 1
    }
  },
  methods: {
    loginOut () {
      sessionStorage.clear() // 清除所有sessionStorage数据
      let uriStr = window.location.href
      uriStr = encodeURI(uriStr)
      if (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production') {
        window.location.href = 'https://ssa.jd.com/sso/login?ReturnUrl=' + uriStr
      } else { // 暂时都走线上登录
        // window.location.href = 'http://test.ssa.jd.com/sso/login?ReturnUrl=' + uriStr
        window.location.href = 'https://ssa.jd.com/sso/login?ReturnUrl=' + uriStr
      }
    },
    linkTo () {
      // this.$router.push({
      //   name: 'pendingList'
      // })
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.csHeader {
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  background: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
  padding-left: 210px;
  #headInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    margin: 0 30px;
    .breadcrumbs_top {
      .breadcrumb_item {
        font-size: 12px;
        span {
          &.normal {
            color: #BEC1CA;
          }
          &.active {
            color: #283039;
          }
        }
      }
    }
  }
  .rightInfo {
    display: flex;
  }
  .noticeWrap {
    position: relative;
    width: 42px;
    height: 42px;
    border-radius: 100%;
    background-color: #3170ff;
    margin-right: 20px;
    // cursor: pointer;
    .icon {
      width: 42px;
      height: 42px;
      background: url(../../assets/img/header_notice_2x.png) no-repeat bottom/42px auto;
      position: absolute;
      left: 0;
      top: 0;
    }
    .num {
      display: inline-block;
      width: 16px;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      color: #ffffff;
      background-color: #0BDBA8;
      box-shadow: 0 1px 5px 0 #D8D8D8;
      border-radius: 100%;
      position: absolute;
      right: 3px;
      top: -3px;
      text-align: center;
    }
    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: 20px 17px;
  }
  .userWrap {
    position: relative;
    width: 42px;
    height: 42px;
    cursor: pointer;
    & > img {
      border-radius: 100%;
    }
    .alt-wrapper {
      position: absolute;
      top: 40px;
      right: 0px;
      .alt {
        margin-top: 20px;
        // padding: 10px 0px;
        width: 140px;
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
        border-radius: 2px;
        cursor: default;
      }

      li {
        padding: 9px 0px;
      }
      a {
        display: block;
        padding: 0 20px;
        line-height: 16px;
        color: #717580;
        text-decoration: none;

        &:hover {
          color: #0074ff;
        }
      }
    }
  }
}
</style>
