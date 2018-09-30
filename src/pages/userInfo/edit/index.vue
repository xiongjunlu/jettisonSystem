<style lang="less" scoped>
  @import './index.less';
</style>
<!-- 上传图片控件 -->
<style lang="css" scoped>
  @import './upload.css';
</style>
<template>
  <div class="dialogForm">

    <el-dialog width="800px" :visible.sync="isShow"  :close-on-click-modal="false" :close-on-press-escape="false" :top="'20vh'" :show-close="false">
      <div class="line">
          <!-- <h1 class="test">ceshi</h1> -->
        <p class="title">{{this.canEdit === 'add' ? '新增用户' : '修改用户'}}</p>
        <!-- <p class="tip">{{action === 'add' ? welcomeTip : '修改当前项目设置'}}</p> -->
      </div>
      <div class="line">
        <label class="label_wrapper">
          <span class="label_text">
            <i class="require">*</i>
            登录名称：
          </span>
          <input type="text" class="csInput" maxlength="15" v-model.trim="userName" placeholder="请输入项目名称"/>
          <span class="error-info" v-show="validate.name"><i class="icon"></i>项目名称不能为空</span>
        </label>
      </div>
      <div class="line">
        <div class="label_wrapper">
          <span class="label_text">
            <i class="require">*</i>
            登录类型：
          </span>
          <csDropdown v-model="userType" prop="id" placeholder="请选择" label="name" :optionList="businessLineList"></csDropdown>
          <span class="error-info" v-show="validate.type"><i class="icon"></i>业务线不能为空</span>
        </div>
      </div>
      <div class="line">
        <label class="label_wrapper">
          <span class="label_text">
            <i class="require">*</i>
            手机：
          </span>
          <input type="text" class="csInput" maxlength="15" v-model.trim="iphone" placeholder="请输入项目名称"/>
          <span class="error-info" v-show="validate.iphone"><i class="icon"></i>项目名称不能为空</span>
        </label>
      </div>
      <div class="line">
        <label class="label_wrapper">
          <span class="label_text">
            <i class="require">*</i>
            邮箱：
          </span>
          <input type="text" class="csInput" maxlength="15" v-model.trim="email" placeholder="请输入项目名称"/>
          <span class="error-info" v-show="validate.email"><i class="icon"></i>项目名称不能为空</span>
        </label>
      </div>
      <div slot="footer" class="dialog-footer">
        <button type="button" name="button" class="csButton-ghost" @click="handleClose">关闭</button>
        <button type="button" name="button" class="csButton" @click="handleSubmit">确定</button>
      </div>
    </el-dialog>
    <div class="close-dialog-icon" v-show="isShow" @click="handleClose"></div>
</div>
</template>
<script>
  import csDropdown from '@/components/csDropdown'
  import { GetInsertDspUserInfo, GetUpdateDspUserInfo } from '@api/userInfo'
  import { mapGetters } from 'vuex'

  const getInsertDspUserInfo = new GetInsertDspUserInfo()
  const getUpdateDspUserInfo = new GetUpdateDspUserInfo()
  export default {
    name: 'user_edit',
    components: {
      csDropdown
    },
    props: ['isShow', 'editId', 'canEdit'],
    data () {
      return {
        businessLine: {id: '-1', label: '请选择'},
        businessLineList: [
          {
            id: 0,
            name: 'pin'
          },
          {
            id: 1,
            name: 'erp'
          }
        ],
        form: {
          userName: '',
          userType: {},
          iphone: '',
          email: '',
          businessLine: {id: '-1', label: '请选择'},

        },
        validate: {
          name: false,
          type: false,
          iphone: false,
          email: false
        }
      }
    },
    watch: {
      // 'form.flowPercent': function (newVal, oldVal) {
      //   if (newVal) this.validate.percent = false
      // }
    },
    computed: {
      ...mapGetters({
        // globalPageInfo: 'getGlobalEnums',
      }),

      userName: {
        get () {
          return this.form.userName
        },
        set (val) {
          this.form.userName = val
          this.validate.name = false
        }
      },
      userType: {
        get () {
          return this.form.userType
        },
        set (val) {
          this.form.userType = val
          this.validate.type = false
        }
      },
      iphone: {
        get () {
          return this.form.iphone
        },
        set (val) {
          this.form.iphone = val
          this.validate.name = false
        }
      },
      email: {
        get () {
          return this.form.email
        },
        set (val) {
          this.form.email = val
          this.validate.email = false
        }
      },
    },
    methods: {
      getParams () {
        let params = {
          userType: this.form.userType.id,
          userName: this.form.userName,
          iphone: this.form.iphone,
          email: this.form.email
        }
        return params
      },
      loadGetInsertDspUserInfo () {
        let params = this.getParams()
        getInsertDspUserInfo.fetch(params).then(res => {
          // console.log(111, res)
          if (res.resultCode === 0) {
            // addSuccess
            this.$emit('showDialog', false)
            this.$emit('addSuccess', true)
          } else {
            this.$emit('addSuccess', false)
          }
        })
      },
      loadGetUpdateDspUserInfo () {
        let params = this.getParams()
        let editParams = {
          ...params,
          id: this.editId
        }
        console.log('editParams', editParams)
        getUpdateDspUserInfo.fetch(editParams).then(res => {
          // console.log(222, res)
          if (res.resultCode === 0) {
            // addSuccess
            this.$emit('showDialog', false)
            this.$emit('addSuccess', true)
          } else {
            this.$emit('addSuccess', false)
          }
        })
      },
      handleSubmit () {
        // console.log(8888, this.canEdit)
        if (this.canEdit === 'add') {
          this.loadGetInsertDspUserInfo()
        } else {
          this.loadGetUpdateDspUserInfo()
        }

      },
      handleClose () {
        this.validate = {
          name: false,
          line: false,
          type: false,
          collection: false,
          id: false,
          percent: false
        }
        this.$emit('showDialog', false)
      },

      initData () {

      },
      validateFields () {
        let obj = this.form
        let hasError = false

        if (obj.projectName === '') {
          hasError = true
          this.validate.name = true
        } else {
          this.validate.name = false
        }
        return hasError
      },

    },
    mounted () {

    }
  }
</script>
