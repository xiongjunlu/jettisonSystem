<style lang="less" scoped>
  .userTag {
    display: inline-block;
    input {
      width: 220px;
      cursor: pointer;
      margin-left: 10px;
    }
  }
</style>
<template>
  <div class="userTag">
    <csDropdown v-model="selectTags" prop="id" label="name" :optionList="selectOptionList"></csDropdown>
    <input type="text" class="csInput" v-model="userTag" placeholder="请选择人群" readonly @click="openWinChoiceData('userTag')" v-show="selectOption.id === '2'"/>
  </div>
</template>
<script>
  import csDropdown from '@/components/csDropdown'
  export default {
    name: 'userTag',
    components: {
      csDropdown
    },
    props:['titleName'],
    data () {
      return {
        setFieldsVal: {
          labelType: '',
          labelTypeName: ''
        },
        selectOption: { id: '1', name: '全部受众' },
        selectOptionList: [{
          id: '1',
          name: '全部受众'
        }, {
          id: '2',
          name: '数据部标签定向'
        }]
      }
    },
    watch: {
      titleName: {
        handler: function(newVal, oldVal) {
          if (newVal && newVal.length > 0) {
            this.selectOption = { id: '2', name: '数据部标签定向' }
          }
        },
        immediate: true
      }
    },
    computed: {
      selectTags: {
        get () {
          return this.selectOption
        },
        set (val) {
          console.log('selectTags:::', val)
          this.selectOption = val
          if (val.id === '1') {
            sessionStorage.setItem('eData_experimentPeople_flag', 1)
            // this.openWinChoiceData('userTag')
            this.setFieldsVal.labelType = ''
            this.setFieldsVal.labelTypeName = ''
            this.$emit('changeUserTag', this.setFieldsVal)
          } else {
            sessionStorage.setItem('eData_experimentPeople_flag', 2)
          }
        }
      },
      userTag: {
        get () {
          return this.setFieldsVal.labelTypeName || this.titleName
        },
        set (val) {
          console.log('userTag_val:::', val)
          this.setFieldsVal.labelTypeName = val
        }
      }
    },
    methods: {
      openWinChoiceData (field) {
        let fieldValue = null
        let midUrl = ''
        if (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production') {
          if (window.location.host === 'minner.jr.jd.com') {
            midUrl = 'minner.jr.jd.com/jrfe/abTest/mid.html'
          } else {
            midUrl = 'text.jr.jd.com/abTest/mid.html'
          }
        } else {
          midUrl = 'dev.jr.jd.com/mid.html'
        }
        let url = 'http://web-jrbdp.jd.com/html/list.html?ruleRelaProj=123ea71d615456d51de6f60ce41f4745&btnArr=%5B%7B%22name%22%3A%22%E7%A1%AE%E5%AE%9A%22%2C%22link%22%3A%22http%3A%2F%2F' + midUrl + '%3Ffield%3DuserTag%26oper%3Dcert%22%7D%2C%7B%22name%22%3A%22%E6%B8%85%E7%A9%BA%22%2C%22link%22%3A%22http%3A%2F%2F' + midUrl + '%3Ffield%3DuserTag%26oper%3Dclean%22%7D%5D'
        if (field !== null && field !== 'undefined') {
          let fieldObj = document.getElementById(field)
          if (fieldObj) fieldValue = fieldObj.value
          let [name, width, height] = ['选择标签', 1000, 600]
          // 获得窗口的水平位置
          let left = (screen.availWidth - width) / 2
          // 获得窗口的垂直位置
          let top = (screen.availHeight - height) / 2
          url = url + `&field=${field}` + `&choiceData=${fieldValue}`
          window.open(url, name, `width=${width}` + `,height=${height}` + `,top=${top}` + `,left=${left}` + `,toolbar=no,scrollbars=no,location=no,menubar=no,z-look=yes,alwaysRaised=yes`)
          window.addEventListener('message', this.chooseDataCallback, false)
        }
      },
      chooseDataCallback (e) {
        let field = 'userTag'
        let data = e.data
        console.log(JSON.stringify(data))
        if (data === 'cancel') {
          window.removeEventListener('message', this.chooseDataCallback, false)
          return
        }

        if (data === 'clean') {
          window.removeEventListener('message', this.chooseDataCallback, false)
          // document.getElementById(field).value = ''
          // document.getElementById(field + 'Text').value = ''
          this.setFieldsVal.typeId = ''
          this.setFieldsVal.typeName = ''
          return
        }
        let datas = null
        if(data.split) datas = data.split('|_|')

        // if (datas[0] !== field) {
        //   window.removeEventListener('message', this.chooseDataCallback, false)
        //   return
        // }
        if (field != null && field !== 'undefined' && data !== '') {
          if(data.replace) data = data.replace(field + '|_|', '')
          try {
            if (data !== '' && data !== undefined) {
              let userTagData = JSON.parse(data)
              console.log(JSON.stringify(userTagData))
              this.setFieldsVal.labelType = userTagData.labelType
              this.setFieldsVal.labelTypeName = userTagData.labelTypeName.replace('#/project/list', '')
              this.$emit('changeUserTag', this.setFieldsVal)
            }
          } catch (err) {

          }
          window.removeEventListener('message', this.chooseDataCallback, false)
        }
      }
    },
    mounted() {
      console.log('titleName:::', this.titleName)
    },
  }
</script>
