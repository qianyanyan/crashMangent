<template>
  <div style="margin: 15px 0;">
    <el-tabs
      v-model="activeName">
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
          <el-date-picker
            v-model="filters.times"
            type="daterange"
            range-separator=" 至 "
            placeholder="请选择开始及结束日期">
          </el-date-picker>
          <el-form-item>
            <el-input v-model="filters.search" placeholder="请输入关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchMarket">查询</el-button>
          </el-form-item>
          <div v-if="activeName == 'first'" style="display: inline-block;">
            <label>调整顺序</label>
            <el-form-item>
              <el-input v-model="order" :placeholder="placeholder"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleSort">保存</el-button>
          </div>
          <el-button type="primary" icon="upload2" id="download" @click="handleDownLoad">导出数据</el-button>
        </el-form>
      </el-col>

      <el-tab-pane label="已上线" name="first">
        <online-table></online-table>
      </el-tab-pane>
      <el-tab-pane label="待上线" name="second">
        <future-table></future-table>
      </el-tab-pane>
      <el-tab-pane label="已下线" name="third">
        <outline-table></outline-table>
      </el-tab-pane>
    </el-tabs>
    <!--<edit></edit>-->
    <!--<addData ref="editTable"></addData>-->

    <form :action="formAction" method="post" accept-charset="utf-8" id="myForm" target="_blank" style="display: none;">
      <div v-if="activeName == 'first' || activeName == 'third'">
        <input type="text" name="onlineRealStart" :value="getTimes.onlineRealStart"/>
        <input type="text" name="onlineRealEnd" :value="getTimes.onlineRealEnd"/>
      </div>
      <div v-else>
        <input type="text" name="onlineStartParamStart" :value="getTimes.onlineStartParamStart"/>
        <input type="text" name="onlineStartParamEnd" :value="getTimes.onlineStartParamEnd"/>
      </div>
      <input type="text" name="planKeywords" :value="filters.search"/>
      <input type="text" name="adStatusParam" :value="adStatusParam"/>
      <input type="submit" value="Submit"/>
    </form>
    <!-- <detailedit v-on:childMethod="getDetails"></detailedit> -->
    <addata></addata>
    <detailedit></detailedit>
  </div>
</template>

<script>
  import { updateOrderNo } from '../api/api'
  import onlineTable from '../components/marketList/onlineTable.vue'
  import outlineTable from '../components/marketList/outlineTable.vue'
  import futureTable from '../components/marketList/futureTable.vue'
  import addata from '../components/marketList/addata.vue'
  import detailedit from '../components/marketList/detailEdit.vue'
  import bus from '../assets/js/eventBus'

  export default {
    data () {
      return {
        activeName: 'first',
        filters: {
          times: [],
          search: '',
          currentPage: 1,
          pageSize: 10
        },
        order: '',
        maxOrder: 0,
        placeholder: '',
        currentRow: {},
        formAction: process.env.API_ROOT + '/engine-console/console/adPlan/exportCMerchantAdPlanExcel.do',
        times: {
          createStartTime: '',
          createEndTime: ''
        },
        adStatusParam: 'ON'
      }
    },
    components: {onlineTable, futureTable, outlineTable, addata, detailedit}, //    outlineTable, futureTable
//  , addData, edit
    computed: {
      getTimes () {
        let vm = this
        if (vm.activeName == 'second') {
          if (vm.filters.times[0] != undefined) {
            vm.times.onlineStartParamStart = vm.filters.times[0].getTime()
            vm.times.onlineStartParamEnd = vm.filters.times[1].getTime()
          } else {
            vm.times.onlineStartParamStart = vm.times.onlineStartParamEnd = ''
          }
        } else {
          if (vm.filters.times[0] != undefined) {
            vm.times.onlineRealStart = vm.filters.times[0].getTime()
            vm.times.onlineRealEnd = vm.filters.times[1].getTime()
          } else {
            vm.times.onlineRealStart = vm.times.onlineRealEnd = ''
          }
        }
        return vm.times
      }
    },
    mounted () {
      let vm = this
//      this.getOutlineTable()
      vm.getOnlineMarketList(vm.filters)
      bus.$on('noticeGetOnlineTable', function (data) {
        vm.filters.currentPage = data.currentPage
        vm.filters.pageSize = data.pageSize
        vm.getOnlineMarketList(vm.filters)
      })
      bus.$on('noticeCurrentRow', function (row) {
        vm.currentRow = row
      })
      bus.$on('noticeGetFutureTable', function (data) {
        vm.filters.currentPage = data.currentPage
        vm.filters.pageSize = data.pageSize
        vm.getFutureMarketList(vm.filters)
      })
      bus.$on('noticeGetOfflineTable', function (data) {
        vm.filters.currentPage = data.currentPage
        vm.filters.pageSize = data.pageSize
        vm.getOutlineMarketList(vm.filters)
      })
      bus.$on('handleAdded', function (data) {
        switch (data) {
          case 'second':
            vm.getFutureMarketList(vm.filters)
            break
          case 'third':
            vm.getOutlineMarketList(vm.filters)
            break
          default:
            vm.getOnlineMarketList(vm.filters)
        }
      })
      bus.$on('handleEdited', function () {
        if (vm.activeName == 'first') {
          vm.getOnlineMarketList(vm.filters)
        } else {
          vm.getFutureMarketList(vm.filters)
        }
      })
    },
    methods: {
      handleDownLoad () {
        document.getElementById('myForm').submit()
      },
      handleSort () {
        let vm = this
        let message = ''
        let flag = false
        if (vm.currentRow.id == undefined) {
          message = '请选择你要排序的行'
        } else if (vm.order == '' || isNaN(vm.order) || Number(vm.order) < 1 || Number(vm.order) > vm.maxOrder) {
          message = '请输入正确的排序位置'
        } else {
          flag = true
        }
        if (flag) {
          let params = {
            id: vm.currentRow.id,
            version: vm.currentRow.version,
            orderNo: Number(vm.order)
          }
          updateOrderNo(params).then(res => {
            if (res.data.code == 200) {
              vm.$message({
                message: '排序成功',
                type: 'success'
              })
            } else {
              vm.$message({
                message: res.data.message,
                type: 'error'
              })
            }
            // 排序后无论成功与否，全部刷新下已在线表格
            vm.getOnlineMarketList(vm.filters)
          })
        } else {
          vm.$message({
            message: message,
            type: 'error'
          })
        }
      },
      handleAdd () {
        let vm = this
        let addFormVisible = true
        bus.$emit('handleAddBox', {
          addFormVisible: addFormVisible,
          activeName: vm.activeName
        })
      },
      searchMarket () {
        let vm = this
        switch (vm.adStatusParam) {
          case 'W':
            vm.getFutureMarketList(vm.filters)
            break
          case 'OFF':
            vm.getOutlineMarketList(vm.filters)
            break
          default:
            vm.getOnlineMarketList(vm.filters)
        }
      },
      getOnlineMarketList (params) {
        let vm = this
        let onlineVal = {
          params: {
            keywords: params.search,
            adStatusParam: 'ON',
            currentPage: params.currentPage,
            pageSize: params.pageSize
          },
          callback (res) {
            if (res.data.code == 200) {
              vm.maxOrder = res.data.total
              vm.placeholder = '请输入排序位置（1-' + vm.maxOrder + '）'
            } else {
              vm.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          }
        }
        if (params.times[0] != undefined) {
          onlineVal.params.onlineRealStart = params.times[0].getTime()
          onlineVal.params.onlineRealEnd = params.times[1].getTime() + 86400000 - 1000
        } else {
          onlineVal.params.onlineRealStart = ''
          onlineVal.params.onlineRealEnd = ''
        }
        vm.$store.dispatch('getOnlineMarketList', onlineVal)
      },
      getFutureMarketList (params) {
        let vm = this
        let futureVal = {
          params: {
            keywords: params.search,
            adStatusParam: 'W',
            currentPage: params.currentPage,
            pageSize: params.pageSize
          },
          callback (res) {
            if (res.data.code == 200) {
//              vm.maxOrder = res.data.total
//              vm.placeholder = '请输入排序位置（1-' + vm.maxOrder + '）'
            } else {
              vm.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          }
        }
        if (params.times[0] != undefined) {
          futureVal.params.onlineStartParamStart = params.times[0].getTime()
          futureVal.params.onlineStartParamEnd = params.times[1].getTime() + 86400000 - 1000
        } else {
          futureVal.params.onlineStartParamStart = ''
          futureVal.params.onlineStartParamEnd = ''
        }
        vm.$store.dispatch('getFutureMarketList', futureVal)
      },
      getOutlineMarketList (params) {
        let vm = this
        let offlineVal = {
          params: {
            keywords: params.search,
            adStatusParam: 'OFF',
            currentPage: params.currentPage,
            pageSize: params.pageSize
          },
          callback (res) {
            if (res.data.code == 200) {
//              vm.maxOrder = res.data.total
//              vm.placeholder = '请输入排序位置（1-' + vm.maxOrder + '）'
            } else {
              vm.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          }
        }
        if (params.times[0] != undefined) {
          offlineVal.params.onlineRealStart = params.times[0].getTime()
          offlineVal.params.onlineRealEnd = params.times[1].getTime() + 86400000 - 1000
        } else {
          offlineVal.params.onlineRealStart = ''
          offlineVal.params.onlineRealEnd = ''
        }
        vm.$store.dispatch('getOutlineMarketList', offlineVal)
      },
      resetFilters (val) {
        let vm = this
        vm.filters.times = []
        vm.filters.search = ''
        vm.filters.currentPage = 1
        vm.filters.pageSize = 10
        switch (val) {
          case 'W':
            vm.getFutureMarketList(vm.filters)
            break
          case 'OFF':
            vm.getOutlineMarketList(vm.filters)
            break
          default:
            vm.getOnlineMarketList(vm.filters)
        }
      }
    },
    watch: {
      activeName (val) {
        let vm = this
        switch (val) {
          case 'second':
            vm.adStatusParam = 'W'
            break
          case 'third':
            vm.adStatusParam = 'OFF'
            break
          default:
            vm.adStatusParam = 'ON'
        }
        vm.resetFilters(vm.adStatusParam)
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less" scoped>
  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000 !important;
  }

  .v-modal {

    background: transparent !important;
  }
</style>
