import Vue from 'vue'
import Vuex from 'vuex'

// import { GetAllEnums, GetErpInfo, NoticeInReviewCount } from '@api/assistant'
// 获取全量枚举值
// const getAllEnums = new GetAllEnums()
// const getErpInfo = new GetErpInfo()
// const noticeInReviewCount = new NoticeInReviewCount()

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    applicationList: [
      {
        id: '1',
        name: '前景',
      },
      {
        id: '2',
        name: '奇点/极光'
      }
    ],
    globalEnums: {},
    userInfo: {},
    experimentData: {
      targetId: -1, // 指标id
      targetName: '', // 指标名称(用户自定义的)
      targetType: '', // 指标类型
      versionIds: '', // 版本ids
      experimentId: -1, // 实验id
      experimentTime: '', // 实验时间
      experimentStatus: 1, // 实验状态
      configFlag: 0, // 该实验是否可配置
      hasRealTime: '' // 当前指标是否有实时数据
    },
    // 权限菜单列表
    menuList: {},
    // 右上角顶部通知信息
    noticeInfo: {}
  },
  mutations: {
    // returnAllEnums (state) {
    //   getAllEnums.fetch({}).then(res => {
    //     if (res && res.code === '0000') {
    //       state.globalEnums = res.data
    //     }
    //   })
    // },

  },
  actions: {
    // getGlobalEnums (context) {
    //   context.commit('returnAllEnums')
    // },

  },
  getters: {
    // getGlobalEnums (state) {
    //   return state.globalEnums
    // },
    // getRealTime (state) {
    //   return state.experimentData.hasRealTime
    // }
  }
})

// store.dispatch('getUserInfo')
// store.dispatch('getGlobalEnums')
// store.dispatch('getNoticeInfo')

export default store
