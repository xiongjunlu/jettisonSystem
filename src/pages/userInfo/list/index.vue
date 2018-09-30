<style lang="less" scoped>
  @import './index.less';
</style>

<template>
  <div class="proList_index">
    <div class="project-list">
      <section class="topInfo">
        <div class="statistic">项目用户信息list：<span>{{pageInfo.total}}</span>个</div>
        <button type="button" name="button" class="csButton" @click="handleAdd" v-if="isShowBtn">新建项目</button>
      </section>
      <!-- 筛选条件 -->
      <!-- <filterBy @searchParam="handleSearch" @changeProject="handleChangeProject" @changeType="handleChangeType" @changeDate="handleChangeDate"></filterBy> -->
      <!--新增&编辑项目弹窗-->
      <projectEdit :isShow="showFormDialog" :editId="editId" :canEdit="canEditFlag" @showDialog="isShowDialog" @addSuccess="isAddSuccess"></projectEdit>
      <!-- 用户信息的列表 -->
      <div class="list-table">
        <!-- <h3 class="test2">ceshi</h3> -->
        <el-table
        :data="tableData"
        style="width: 100%">
          <el-table-column
          prop="userName"
          label="用户名"
          width="180">
          </el-table-column>
          <el-table-column
          label="创建时间"
          width="180">
            <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createdTime | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
          label="修改时间"
          width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.modifyTime | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
          prop="phone"
          label="手机"
          width="180">
          </el-table-column>
          <el-table-column
          prop="email"
          label="姓名"
          width="邮箱">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 暂无数据提示 -->
      <!-- <div class="nodata_tip_wrap" v-if="pageInfo.total===0">
        <div class="nodata_bg"></div>
        <p class="tip">暂无项目</p>
      </div> -->
    </div>
    <!-- 分页  start-->
    <div class="pagination">
      <el-pagination
          @size-change="handleSizeChange($event)"
          @current-change="handleCurrentChange($event)"
          :current-page="pageInfo.curPage"
          :page-sizes="[15, 30, 45, 60]"
          :page-size="pageInfo.size"
          layout="prev, pager, next, sizes, total"
          :total="pageInfo.total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
  import filterBy from './filterBy.vue'
  import projectEdit from './../edit/index'
  import { GetQueryDspUserInfoList, GetDeleteDspUserInfo } from '@api/userInfo'
  import { formatDate } from '@/assets/utils/dateFormat'
  // import parseDate from '@/assets/utils/parseDate'
  import { mapMutations, mapGetters } from 'vuex'
  const getQueryDspUserInfoList = new GetQueryDspUserInfoList()
  const getDeleteDspUserInfo = new GetDeleteDspUserInfo()
  export default {
    name: 'proList_index',
    components: {
      filterBy,
      projectEdit
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    watch: {
      // 'showFormDialog': function (newVal, oldVal) {
      //   if (!newVal) this.loadProjectList()
      // }
    },
    data () {
      return {
        value3: true,
        value4: true,
        editId: 0,
        curProjectId: -1,
        canEditFlag: 'add',
        dateRange: [],
        projectName: '',
        projectTypes: '',
        businessLine: '',
        pageInfo: {
          curPage: 1,
          size: 15,
          total: 0
        },
        tableData: [],
        itemsDate: [],
        items: [],
        showFormDialog: false,
        isShowBtn: true
      }
    },
    computed: {
      ...mapGetters({
        globalPageInfo: 'getGlobalEnums',
      })
    },
    methods: {
      ...mapMutations({

      }),
      handleAdd () {
        this.showFormDialog = true
        this.canEditFlag = 'add'
      },
      isShowDialog (val) {
        // console.log(val)
        this.showFormDialog = false
      },
      isAddSuccess (val) {
        console.log('isAddSuccess', val)
        if (val) this.loadGetQueryDspUserInfoList()
      },

      handleSizeChange (pageSize) {
        this.pageInfo.size = pageSize
        this.pageInfo.curPage = 1

      },

      handleDelete (index, row) {
        console.log(index, row)
        let params = {
          id: row.id
        }
        getDeleteDspUserInfo.fetch(params).then(res => {
          if (res.resultCode === 0) {
            this.loadGetQueryDspUserInfoList()
          }
        })
      },
      handleEdit (index, row) {
        this.showFormDialog = true
        this.canEditFlag = 'edit'
        this.editId = row.id
      },
      typeIndex (index) {
        let page = this.pageInfo.curPage
        let size = this.pageInfo.size
        // return  index+(page-1)*10+1
        return index + (page - 1) * size + 1
      },
      handleCurrentChange (page) {
        this.pageInfo.curPage = page
        this.loadProjectList()
      },
      routerGo (routeName, status, pid, pName, num) {
        // if (num === 0) return // 数量为0不能进入实验列表
        // sessionStorage.setItem('breadcrumb_val1', pName)
        // this.$router.push({
        //   name: routeName,
        //   params: { id: pid, status: status, pName: pName }
        // })
      },
      handleSearch (vals) {
        // console.log('search--->', vals)
        this.projectName = vals
        this.loadProjectList()
      },

      getParams () {
        let params = {
          pageNo: 1,
          pageSize: 20
        }
        return params
      },
      toParseInt (num) {
        return parseInt(num)
      },
      loadGetQueryDspUserInfoList () {
        let params = this.getParams()
        getQueryDspUserInfoList.fetch(params).then(res => {
          console.log(111, res, res.resultCode, typeof res.resultCode, res.resultData)
          if (res.resultCode === 0) {
            this.tableData = res.resultData.data
          }
        })
      }
    },
    mounted () {
      this.loadGetQueryDspUserInfoList()
    }
  }
</script>
