<template>
  <div>
    <el-table
      ref="outlineTable"
      :data="getOutlineTable"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        property="adName"
        label="广告名称">
      </el-table-column>
      <el-table-column label="目标路径">
        <template scope="scope">
          <span v-if="scope.row.targetURL == '--'" v-text="scope.row.targetURL"></span>
          <a v-else :href="scope.row.targetURL" target="_blank" v-text="scope.row.targetURL"></a>
        </template>
      </el-table-column>
      <el-table-column
        property="onlineRealStart"
        label="实际上线时间">
      </el-table-column>
      <el-table-column
        property="onlineRealEnd"
        label="实际下线时间">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button type="primary" size="small" @click="handleToDetails(scope.row)" v-if="viewShow">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination
        class="pull-right"
        layout="total, sizes, prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="outLineData.currentPage"
        :page-size="outLineData.pageSize"
        :page-sizes="outLineData.pageSizes"
        :total="outLineData.total">
      </el-pagination>
    </el-col>
  </div>
</template>
<script>
  import global from '../../assets/js/global'
  import bus from '../../assets/js/eventBus'
  export default {
    data () {
      return {
        search: '',
        outLineData: {
          currentPage: 0,
          pageSize: 0,
          pageSizes: [10, 20, 30, 40],
          total: 0,
          list: []
        },
        viewShow: false
      }
    },
    mounted () {
      var vm = this
      bus.$on('handleOutlineTable', function (search) {
        vm.search = search
      })
      vm.viewShow = global.judgePermissionName('banner:view', vm.$store.getters.getPermissionName)
    },
    methods: {
      handleCurrentChange (page) {
        this.$store.commit('changeOutLineTableData', {currentPage: page})
      },
      handleSizeChange (size) {
        this.$store.commit('changeOutLineTableData', {pageSize: size})
      },
      handleToDetails (row) {
        this.$router.push('/bannerManage/details/2/' + row.id)
      }
    },
    computed: {
      getOutlineTable () {
        let vm = this
        let data = vm.$store.getters.getOutlineData
        vm.outLineData.currentPage = data.currentPage
        vm.outLineData.pageSize = data.pageSize
        vm.outLineData.total = data.total
        let list = []
        if (vm.search != '' && vm.search != '--') {
          for (let i = 0; i < data.list.length; i++) {
            if (vm.search == data.list[i].adName) {
              list.push(data.list[i])
            }
          }
          vm.outLineData.total = list.length
        } else {
          list = data.list
        }
        list = global.replaceCellInfo(list, '--')
        for (let j = 0; j < list.length; j++) {
          if (list[j].onlineRealStart != '--') {
            list[j].onlineRealStart = global.formatTime(list[j].onlineRealStart)
          }
          if (list[j].onlineRealEnd != '--') {
            list[j].onlineRealEnd = global.formatTime(list[j].onlineRealEnd)
          }
        }
        vm.outLineData.list = global.fPage(list, data.currentPage, data.pageSize)
        return vm.outLineData.list
      }
    }
  }
</script>

<style  lang="less" rel="stylesheet/less" scoped>
  .toolbar {
    padding: 10px;
    margin: 10px 0;
  }
</style>
