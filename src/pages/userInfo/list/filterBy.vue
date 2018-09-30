<style lang="less" scoped>
  .filterWrapper {
    display: flex;
    justify-content: space-between;
    margin: 14px 30px 0;
    padding-bottom: 14px;
    border-bottom: 1px solid #f0f2f5;
    position: relative;
    .filters {
      .filter_item {
        list-style: none;
        margin: 0;
        padding-left: 0;
        background-color: #ffffff;
        // border: 1px solid #e0e6ed;
        border-radius: 2px;
        display: inline-block;
        margin-left: 8px;
        min-width: 104px;
        padding-right: 20px;
        border-right: 1px solid #E0E6ED;
        &:last-child {
          border-right: none;
        }
      }
      .filter_item_title {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #bec1c9;
        padding: 0 38px 0 10px;
        cursor: pointer;
        -webkit-transition: border-color 0.3s, background-color 0.3s, color 0.3s;
        transition: border-color 0.3s, background-color 0.3s, color 0.3s;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        i.icon_arrow {
          margin: -5px 0 0 10px;
          transition: transform 0.3s, -webkit-transform 0.3s;
          -webkit-transition: -webkit-transform 0.3s;
          width: 8px;
          height: 5px;
          background: url('./../../../assets/img/arrow_down@2x.png') no-repeat center/8px
            auto;
          position: absolute;
          right: 10px;
          top: 13px;
        }
        i.is_opened {
          transform: rotate(180deg);
        }
      }
    }
    .el-checkbox+.el-checkbox {
      margin-left: 0;
    }
    .filter_wrap {
      width: 300px;
      max-height: 390px;
      padding: 20px 20px 20px;
      position: absolute;
      top: 30px;
      right: 445px;
      z-index: 11;
      background-color: #ffffff;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
      .title {
        font-size: 14px;
        color: #717580;
        font-weight: normal;
      }
    }
    .type_right {
      right: 250px;
    }
    .project_right {
      right: 114px;
    }
    .filter_group {
      .title_wrap {
        display: flex;
        justify-content: space-between;
      }
      .el-checkbox-group {
        margin-top: 10px;
        .el-checkbox {
          margin: 10px 15px 0 0;
        }
      }
    }
    // .filter_date_wrap {
    //   position: absolute;
    //   top: 30px;
    //   right: 126px;
    // }
    .datepicker {
      width: 260px;
      border-color: #e0e6ed;
    }
  }
</style>

<template>
  <div class="filterWrapper">
    <blurSearch :inputWidth="360" :txtPlaceholder="'输入项目名称/创建人erp'" @getParam="getSearchParam"></blurSearch>
    <ul class="filters" :fingerprint="fingerprint">
      <li class="filter_item" @click="handleToggleFilters(1)">
        <div class="filter_item_title">
          产品类型
          <i class="icon_arrow" :class="{is_opened : showProjectType}"></i>
        </div>
      </li>
      <li class="filter_item" @click="handleToggleFilters(2)">
        <div class="filter_item_title">
          业务线
          <i class="icon_arrow" :class="{is_opened : showOnlineProject}"></i>
        </div>
      </li>
      <li class="filter_item" @click="handleToggleFilters(3)">
        <div class="filter_item_title">
          <div class="filter_date_wrap">
            <el-date-picker
              class="datepicker"
              v-model="createDate"
              type="daterange"
              :editable="false"
              :clearable="false"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="timestamp"
              range-separator="-"
              align="left"
              :default-time="['00:00:00', '23:59:59']"
              :picker-options="pickerOptions1"
            >
            </el-date-picker>
          </div>
          <!-- <i class="icon_arrow" :class="{is_opened : showCreateTime}"></i> -->
        </div>
      </li>
    </ul>
    <div class="filter_wrap type_right" v-if="showProjectType" :fingerprint="fingerprint">
      <div class="filter_group">
        <div class="title_wrap">
          <h6 class="title">筛选以下类型的产品</h6>
          <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllTypes" @change="handleCheckAllType">全选</el-checkbox> -->
        </div>
        <div class="noDataTip" v-if="typeGroupItems.length == 0">您没有选择任何产品类型</div>
        <el-checkbox-group v-model="checkedTypes" @change="handleCheckedTypes">
          <el-checkbox v-for="(item , index) in typeGroupItems" :label="item.id" :key="item+index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="filter_wrap project_right" v-if="showOnlineProject" :fingerprint="fingerprint">
      <div class="filter_group">
        <div class="title_wrap">
          <h6 class="title">筛选以下业务线的项目</h6>
          <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllProjects" @change="handleCheckAllProject">全选</el-checkbox> -->
        </div>
        <div class="noDataTip" v-if="projectGroupItems.length == 0">您没有选择任何项目</div>
        <el-checkbox-group v-model="checkedProjects" @change="handleCheckedProjects">
          <el-checkbox v-for="(item , index) in projectGroupItems" :label="item.id" :key="item+index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

  </div>
</template>

<script>
  import blurSearch from '@/components/blurSearch'
  import dateToObj from '@/assets/utils/dateToObj'
  import { mapGetters } from 'vuex'

  export default {
    name: 'filterBy',
    components: {
      blurSearch
    },
    computed: {
      ...mapGetters({
        globalPageInfo: 'getGlobalEnums',
      }),
      createDate: {
        get () {
          let {startTime, endTime} = this.dateObj
          return [startTime, endTime]
        },
        set (val) {
          let before = this.createDate
          if (val[0] === before[0] && val[1] === before[1]) return

          let {startTime, endTime} = this.dateObj

          if (val[0] === startTime && val[1] === endTime) return
          this.dateObj.startTime = val[0]
          this.dateObj.endTime = val[1]
          this.$emit('changeDate', this.dateObj)
        }
      },
    },
    data () {
      const _this = this
      return {
        fingerprint: '',
        handleFilterClick: '',
        showProjectType: false,
        showOnlineProject: false,
        showCreator: false,
        showCreateTime: false,
        isIndeterminate: false,
        checkAllTypes: false,
        checkedTypes: [],
        typeGroupItems: ['功能及优化', '流程优化', '营销转化', '用户增长'],
        isIndeterminate2: false,
        checkAllProjects: false,
        checkedProjects: [],
        projectGroupItems: [],
        dateObj: {
          startTime: '',
          endTime: ''
        },
        pickerOptions1: {
          disabledDate (time) {
            let hours = new Date().getHours()
            return time.getTime() > Date.now() + (3600 * 1000 * hours)
          },
          shortcuts: [
            {
              text: '昨日',
              onClick (picker) {
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', [start, start])
              }
            },
            {
              text: '上周', // 上周五到本周四为一周
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                const day = start.getDay()

                let offset = day - 4
                while (offset <= 0) {
                  offset += 7
                }

                start.setTime(start.getTime() - 3600 * 1000 * 24 * offset + 6)
                end.setTime(end.getTime() - 3600 * 1000 * 24 * offset)

                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '近七日',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                end.setTime(end.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '上个月',
              onClick (picker) {
                let start = new Date()
                const startObj = dateToObj(start.getTime())
                let startStr = `${startObj.y}-${Number(startObj.m) - 1}-01` // 上个月的第一天
                if (Number(startObj.m) === 1) {
                  startStr = `${Number(startObj.y) - 1}-12-01`
                }
                start = new Date(startStr)

                const end = new Date()
                const date = end.getDate()
                end.setTime(end.getTime() - 3600 * 1000 * 24 * date) // 获取上月的最后一天
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '近一个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                end.setTime(end.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '重置日期',
              onClick (picker) {
                _this.dateObj.startTime = '--'
                _this.dateObj.endTime = '--'
                _this.$emit('changeDate', _this.dateObj)
              }
            }
          ]
        },
      }
    },
    methods: {
      handleToggleFilters (flag) {
        if (flag === 1) {
          this.showProjectType = !this.showProjectType
          this.showOnlineProject = false
          this.showCreateTime = false
        } else if (flag === 2) {
          this.showOnlineProject = !this.showOnlineProject
          this.showProjectType = false
          this.showCreateTime = false
        } else if (flag === 3) {
          this.showCreateTime = !this.showCreateTime
          this.showProjectType = false
          this.showOnlineProject = false
        }
      },
      handleCheckAllType (val) {
        this.checkedTypes = val ? this.typeGroupItems : []
        this.isIndeterminate = false
        this.$emit('changeType', this.checkedTypes)
      },
      handleCheckedTypes (val) {
        let checkedCount = val.length
        this.$emit('changeType', val)
        this.checkAllTypes = checkedCount === this.typeGroupItems.length
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.typeGroupItems.length
      },
      handleCheckAllProject (val) {
        this.checkedProjects = val ? this.projectGroupItems : []
        this.isIndeterminate2 = false
        this.$emit('changeProject', this.checkedProjects)
      },
      handleCheckedProjects (val) {
        let checkedCount = val.length
        this.$emit('changeProject', val)
        this.checkAllProjects = checkedCount === this.projectGroupItems.length
        this.isIndeterminate2 =
          checkedCount > 0 && checkedCount < this.projectGroupItems.length
      },
      getSearchParam (val) {
        this.$emit('searchParam', val)
      },
      getBusinessList () {
        let arr = this.globalPageInfo.ServiceLineCode
        let list = []
        if (!arr) return
        arr.map(item => {
          list.push({
            id: item.code,
            name: item.value
          })
        })
        if (list.length > 0) this.projectGroupItems = list
      },
      getProductList () {
        let arr = this.globalPageInfo.ProductTypeCode
        let list = []
        if (!arr) return
        arr.map(item => {
          list.push({
            id: item.code,
            name: item.value
          })
        })
        if (list.length > 0) this.typeGroupItems = list
      }
    },
    mounted () {
      this.getBusinessList()
      this.getProductList()
      // const start = new Date()
      // const end = new Date()
      // this.dateObj.startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
      // this.dateObj.endTime = end.setTime(end.getTime())
      this.dateObj.startTime = '--'
      this.dateObj.endTime = '--'
      this.$emit('changeDate', this.dateObj)
      this.fingerprint = Math.random()
        .toString(36)
        .substring(7)
        .split('')
        .join('.')

      this.handleFilterClick = function (e) {
        let target = e.target
        let clickOutside = true
        while (target.parentNode) {
          if (target) {
            let fingerprint = target.getAttribute('fingerprint')
            if (fingerprint === this.fingerprint) {
              clickOutside = false
              break
            }
          }
          target = target.parentNode
        }

        if (clickOutside) {
          this.showProjectType = false
          this.showOnlineProject = false
          this.showCreateTime = false
        }
      }.bind(this)
      document.addEventListener('click', this.handleFilterClick)
    },
    beforeDestroy () {
      document.removeEventListener('click', this.handleFilterClick)
    }
  }
</script>
