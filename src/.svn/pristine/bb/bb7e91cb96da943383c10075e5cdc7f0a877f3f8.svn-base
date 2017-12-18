<template>
<div>
     <!-- 查询搜索 -->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.externalMerchantId" placeholder="请输入广告商外部ID"></el-input>
      </el-form-item>  
      <el-form-item>
        <el-date-picker v-model="filters.startDate" type="date" format="yyyy-MM-dd" placeholder="选择开始日期" :picker-options="startPickerOptions" @change="selectedOnline(filters.startDate)">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="filters.endDate" type="date" format="yyyy-MM-dd" placeholder="选择结束日期" :picker-options="endPickerOptions" @change="selectedEnd(filters.endDate)">
        </el-date-picker>
      </el-form-item>
       <el-form-item>
        <el-input v-model="search" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="searMerchantAd" >查询</el-button>
      </el-form-item>
     
      <el-button class="filter-item" type="primary" icon="document"  @click="handleExportExce()">导出数据
      </el-button>
    </el-form>
  </el-col>
  <!-- 列表 -->
 
  <el-table ref="singleTable" :data="getAdvertisTable" highlight-current-row v-loading="listLoading" style="width: 100%">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column property="insideMerchantId" label="广告商内部ID">
    </el-table-column>
    <el-table-column property="externalMerchantId" label="广告商外部ID">
    </el-table-column>
    <el-table-column width="100" property="adName" label="广告名称">
    </el-table-column>
    <el-table-column property="targetUrl" label="目标路径">
    </el-table-column>
    <el-table-column :render-header="renderHeader" align="center">
         <template scope="scope">
                 <p size="small" @click="isShow(scope.$index,scope.row)" v-if="scope.row.totalClick =='--'">点击显示</p>
                 <p v-if="scope.row.totalClick != '--'">{{scope.row.totalClick}}</p>
         </template>
    </el-table-column>
    <el-table-column property="gmtCreate" label="创建时间">
    </el-table-column>
    <el-table-column label="操作" width="200" align="center">
      <template scope="scope" >
                 <el-button size="small" @click="handleToDetails(scope.row)" >查看</el-button>
                 <el-button size="small" @click="handleEdit(scope.$index, scope.row)" > 编辑</el-button>
                 <el-button size="small" @click="handleOut(scope.row)" >下线</el-button>
            </template>
    </el-table-column>
  </el-table>
  <el-col :span="24" class="toolbar">
    <el-pagination layout="total, sizes, prev, pager, next" :current-page="advertisData.currentPage" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="advertisData.pageSize" :page-sizes="pageSizes" :total="advertisData.total" style="float:right;">
    </el-pagination>
  </el-col>
   <!-- <form :action="formAction" method="post" id="myForm" target="_blank"  URIEncoding="UTF-8" accept-charset="UTF-8" pageEncoding="UTF-8" contentType ="application/x-www-form-urlencoded;charset=utf-8">  -->
    <form :action="formAction" method="post" id="myForm" target="_blank" style="display: none;" URIEncoding="UTF-8" accept-charset="UTF-8" pageEncoding="UTF-8" contentType ="application/x-www-form-urlencoded;charset=utf-8"> 
        <input type="text" value="using" name="adUsing" /> 
        <input type="text" :value="getTimes.startDate" name="createStartTime" />
        <input type="text" :value="getTimes.endDate" name="createEndTime" />
        <input type="text" :value="filters.externalMerchantId" name="externalMerchantId" />
        <input type="text" :value="search" name="keywords" />
            <input type="submit" value="Submit" />
    </form>
   
</div>
</template>
<script>
 import global from '../../assets/js/global'
 import { clickLog,offline ,exportExce,markTable} from "../../api/api";

export default {
  props: {
    searchData: Array,
    tableData:Array,
    totalPage:Number,
    
  },
  data() {
    return {
         bbb:"",
        //  parem :{},
          startPickerOptions: this.beginDate(),
          start:'',
          end:"",
          cmarketMerchantComment:"",
          endPickerOptions: this.processDate(),
          search: '', //关键词搜素
          listLoading: false,
          pageSizes: [10, 20, 30, 40],
          advertisData:{
              currentPage:1,
              pageSize: 10,
              total: 0,
              list: []
          },
          filters:{
              externalMerchantId:"",
              startDate:"",
              endDate:"",
          },
          list:{},
          name:"using",
          times:{
                 startDate:"",
              endDate:"",
          },
             // 默认下载已上线的exl表格
         formAction: process.env.API_ROOT + '/engine-console/console/cmarketMerchantAd/cAdDOExportExcel.do'
    };
  },
  mounted() {
    this.searMerchantAd()
        // 使用中

  },
  computed: {
       getAdvertisTable(){
            let data = this.$store.getters.getAdvertisData 
           this.advertisData.currentPage = data.currentPage
           this.advertisData.pageSize = data.pageSize
            let list = global.replaceCellInfo(data.list, '--')
            for (let j = 0; j < list.length; j++) {
              if (list[j].gmtCreate != '--') {
                list[j].gmtCreate = global.formatTime(list[j].gmtCreate)
              }
            
            }
             this.advertisData.list = list
            var search = this.search;
            this.advertisData.total = data.total
             return this.advertisData.list
           
       },
        getTimes () {
          let vm = this
            vm.times.startDate= this.filters.startDate ?  Date.parse(this.filters.startDate) :"";
            vm.times.endDate = this.filters.endDate ?  Date.parse(this.filters.endDate)+(24*60*60-1)*1000 :"";
          return vm.times
      }
       
    },
   
   watch: {
        addFormVisible (val) {
            this.resetDateInfo()
        },
        editFormVisible (val) {
            this.resetDateInfo()
        },
       
    },
  methods: {
     renderHeader (createElement) {
        return createElement(
          'div',
          {
            'class': 'renderTableHead',
            'style': 'line-height: 16px; padding-top: 15px;'
          },
          [
            createElement('div', {
              attrs: { type: 'text' }
            }, ['统计']
            ),
            createElement('div', {
              attrs: { type: 'text', style: 'color: #FF4949; font-size: 10px;' }
            }, ['*指该广告当前的总点击数']
            )
          ]
        )
      },
      //   新增
      handleAdd(){
          this.$emit("listenHandleAdd")
      },
     
      isShow(index,row){
         let parem = {
               adId:row.adId,
         }
          clickLog(parem).then((data) => {
              if (data.data.code == 200) {
                 row.totalClick =data.data.data
              } else {
                  this.$message({
                      message: data.data.message,
                      type: 'error'
                  })
              }
          })
        
      },
       resetDateInfo () {
            this.start = this.end = ''
        },
        selectedOnline (start) {
            this.start = start
        },
        selectedEnd (endDate) {
            this.end = endDate

        },
        // 查询列表数据
        searMerchantAd(){
          let userParams = {
                keywords:this.search,  
                externalMerchantId:this.filters.externalMerchantId,
                createStartTime: this.getTimes.startDate,
                createEndTime: this.getTimes.endDate,
                adUsing:"using",
                currentPage:this.advertisData.currentPage,
                pageSize:this.advertisData.pageSize,  
                callback: function(res) {
                  console.log(res);
                } 
          }
           this.$store.dispatch('getAdvertisTable', userParams)
        },
       beginDate () {
            let vm = this
            return {
            disabledDate (time) {
                if (vm.end) {
                return new Date(vm.end).getTime() < time.getTime()
                }
            }
            }
        },
         processDate () {
            let vm = this
            return {
                disabledDate (time) {
                    if (vm.start) {
                        return new Date(vm.start).getTime() > time.getTime()
                    }
                }
            }
        },
        //   点击分页
         handleSizeChange(size) {
            this.$store.commit('changeAdvertise', {pageSize: size})
            
           this.advertisData.pageSize = size
            this.searMerchantAd()
          
        },
       
        handleCurrentChange(val) {
            this.$store.commit('changeAdvertise', {currentPage: val})
             this.advertisData.currentPage = val
            this.searMerchantAd()
        },
         // 编辑
        handleEdit(index, row){
            this.$emit("listenHandleEdit",row)
        },
        // 下线
        handleOut(row){
            let parem = {
               adId:row.adId,
               flag:"all"
             }
            offline(parem).then((data) => {
              if (data.data.code == 200) {
                // 更新下线数据
                  let downParams = {
                      keywords:"",
                      externalMerchantId:"",
                      createStartTime: "",
                      createEndTime: "",
                      allAdOlineEnd:"OFF ",
                      currentPage:1,
                      pageSize:10,
                      callback: function(res) {
                        console.log(res);
                      }
                  };
                  // 已下线
                  this.$store.dispatch("getAdvertisDown", downParams);
                  this.searMerchantAd()
              } else {
                  this.$message({
                      message: data.data.message,
                      type: 'error'
                  })
              }
          })
        },
        // 查看详情
        handleToDetails (row) {
          this.$router.push({
						path: '/adverDetails/details',
						query: {
							intellId: row.adId
						}
					});

       },
        handleExportExce(){
            // this.filters.startDate= this.filters.startDate ? Date.parse(this.filters.startDate) :"";
            // this.filters.endDate = this.filters.endDate ? Date.parse(this.filters.endDate) :"";
            console.log(this.filters)
             let myForm = document.getElementById('myForm')
            document.getElementById('myForm').submit();
 
             
       },
   

      
  }
};
</script>
