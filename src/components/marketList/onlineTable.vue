<template>
  <div>
    <el-table
      ref="onlineTable"
      :data="getOnlineTable"
      highlight-current-row
      @current-change="currentChange"
      style="width: 100%">
      <el-table-column
        property="orderNo"
        label="展示排序"
        width="100">
      </el-table-column>
      <el-table-column
        property="adName"
        label="广告名称">
      </el-table-column>
      <el-table-column
        property="tags"
        label="标签">
      </el-table-column>
      <el-table-column label="目标路径">
        <template scope="scope">
          <a v-if="scope.row.targetUrl != '--'" :href="scope.row.targetUrl" target="_blank"
             v-text="scope.row.targetUrl"></a>
          <span v-else v-text="scope.row.targetUrl"></span>
        </template>
      </el-table-column>
      <el-table-column
        property="details"
        label="申请条件">
      </el-table-column>
      <el-table-column
        property="sysTags"
        label="系统标签">
      </el-table-column>
      <el-table-column
        property="onlineRealStart"
        label="实际上线时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="小图像"
        width="140">
        <template scope="scope">
          <img class="pic-small" :src="scope.row.img2" alt="pic" v-if="scope.row.img2 != '--'">
          <span v-else v-text="scope.row.img2"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="统计">
        <template scope="scope">
          <a v-if="scope.row.totalClick == '--'" href="javascript:;"
             @click="handleTotalClick(scope.$index, scope.row.adId, 2)">点击显示</a>
          <span v-else v-text="scope.row.totalClick"></span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template scope="scope">
          <!--v-if="infoShow"-->
          <el-button type="primary" size="small" @click="handleToDetails(scope.row)">查看</el-button>
          <!--v-if="modifyShow"-->
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleOffline(scope.row)">下线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination
        class="pull-right"
        layout="total, sizes, prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="marketOnLineData.currentPage"
        :page-size="marketOnLineData.pageSize"
        :page-sizes="marketOnLineData.pageSizes"
        :total="marketOnLineData.total">
      </el-pagination>
    </el-col>

  </div>
</template>
<script>
  import { clickLog, offline } from '../../api/api'
  import global from '../../assets/js/global'
  import bus from '../../assets/js/eventBus'

  export default {
    data () {
      return {
        marketOnLineData: {
          currentPage: 0,
          pageSize: 0,
          pageSizes: [2, 10, 20, 30, 40],
          total: 0,
          list: []
        }
      }
    },
    methods: {
      handleTotalClick (index, adId, positionType) {
        let vm = this
        let params = {
          adId: adId,
          positionType: positionType
        }
        clickLog(params).then(res => {
          if (res.data.code == 200) {
            vm.marketOnLineData.list[index].totalClick = res.data.data
            vm.$store.commit('changeOnLineMarketTableData', {list: vm.marketOnLineData.list})
          } else {
            vm.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 选中当前row
      currentChange (newRow, oldRow) {
        bus.$emit('noticeCurrentRow', newRow)
      },
      handleCurrentChange (page) {
        let vm = this
        vm.marketOnLineData.currentPage = page
        bus.$emit('noticeGetOnlineTable', vm.marketOnLineData)
      },
      handleSizeChange (size) {
        let vm = this
        vm.marketOnLineData.pageSize = size
        bus.$emit('noticeGetOnlineTable', vm.marketOnLineData)
      },
      handleToDetails (row) {
        this.$router.push('/marketList/details/' + row.id)
      },
      handleEdit (row) {
        let editFormVisible = true
        bus.$emit('handleEditBox', {
          editFormVisible: editFormVisible,
          detail: row
        })
      },
      handleOffline (row) {
        let vm = this
        let params = {
          adId: row.adId,
          flag: 'plan'
        }
        vm.$confirm('确认下线吗？', '提示', {}).then(() => {
          offline(params).then(res => {
            if (res.data.code == 200) {
              vm.$message({
                message: '下线成功',
                type: 'success'
              })
              bus.$emit('noticeGetOnlineTable', vm.marketOnLineData)
            } else {
              vm.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
        }, cancel => {
          console.log(cancel)
        })
      }
    },
    computed: {
      getOnlineTable () {
        let vm = this
        let data = vm.$store.getters.getOnlineMarketData
        vm.marketOnLineData.currentPage = data.currentPage
        vm.marketOnLineData.pageSize = data.pageSize
        vm.marketOnLineData.total = data.total
        let list = global.replaceCellInfo(data.list, '--')
        for (let j = 0; j < list.length; j++) {
          if (list[j].onlineRealStart != '--') {
            list[j].onlineRealStart = global.formatTime(list[j].onlineRealStart)
          }
        }
        vm.marketOnLineData.list = list
        return vm.marketOnLineData.list
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .toolbar {
    padding: 10px;
    margin: 10px 0;
  }

  .pic-small {
    width: 100px;
    height: 100px;
  }

  .v-modal {
    background: transparent !important;
  }
</style>
