<style lang="less" scoped>
  .btnSearch {
    .csInput {
      border: none;
      font-size: 14px;
      &:-webkit-input-placeholder {
        color:#BEC1CA;
      }
      &:-moz-placeholder {
        color:#BEC1CA;
      }
      &:-ms-input-placeholder {
        color:#BEC1CA;
      }
      &:hover,
      &:focus{
        outline: none;
        border-color: transparent;
        box-shadow: none;
        color: #283039;
      }
    }
    .el-button {
      padding: 0;
    }
    .el-button--primary {
      width: 74px;
      height: 32px;
      background-color: #0074FF;
      border-color: #0074FF;
      box-shadow:0px 4px 6px 0px rgba(0,116,255,0.3);
      // margin-left: 20px;
    }
  }
</style>
<template lang="html">
  <!-- <div class="query el-input el-input--suffix" :style="{width:inputWidth+'px'}">
    <input type="text" autocomplete="off" class="el-input__inner" :placeholder="txtPlaceholder" v-model="searchParam" @focus="$event.target.select()"
                            @blur="rtnParam" @keyup.13="rtnParam"/>
    <span class="el-input__suffix">
        <span class="el-input__suffix-inner">
            <i class="el-input__icon el-icon-search"></i>
        </span>
    </span>  
  </div> -->
  <div class="btnSearch">
    <input type="text" class="csInput" v-model.trim="searchParam" :placeholder="txtPlaceholder" :style="{width:inputWidth+'px'}" @focus="$event.target.select()" @keyup.13="rtnParam"/>
    <el-button type="primary" icon="el-icon-search" @click="rtnParam">搜索</el-button>
  </div>
</template>

<script>
export default {
  name: 'blurSearch',
  props: {
    inputWidth: {
      type: Number,
      default: 320
    },
    txtPlaceholder: {
      type: String,
      default: '输入后按Enter可搜索'
    }
  },
  data() {
    return {
      searchVal: ''
    }
  },
  watch: {
    $route: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.searchParam = ''
        }
      },
      deep: true
    }
  },
  computed: {
    searchParam: {
      get () {
        return this.searchVal
      },
      set (val) {
        this.searchVal = val
      }
    }
  },
  methods: {
    rtnParam() {
      this.$emit('getParam', this.searchParam)
    }
  }
}
</script>
