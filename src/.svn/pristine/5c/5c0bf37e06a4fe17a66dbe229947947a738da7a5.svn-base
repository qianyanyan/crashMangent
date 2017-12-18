<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button type="primary" @click="handleAdd" v-if="createShow">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filters.value" placeholder="请选择状态">
            <el-option
              v-for="item in filters.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="startDate"
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择开始日期"
            :picker-options="startPickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="endDate"
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择结束日期"
            :picker-options="endPickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="selectUser({status: filters.value,startCreatetime: startDate, endCreatetime: endDate})">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model="search" placeholder="请输入关键字"></el-input>
        </el-form-item>
      </el-form>
    </el-col>


    <el-table
      ref="singleTable"
      :data="searchData"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%">
      <el-table-column
        property="accounts"
        label="账户">
      </el-table-column>
      <el-table-column
        property="createPeople"
        label="创建人">
      </el-table-column>
      <el-table-column
        property="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        property="lastLoginTime"
        label="上次登陆时间">
      </el-table-column>
      <el-table-column
        property="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        property="status"
        label="状态">
        <!--<template scope="scope">-->
          <!--{{scope.row.isShow}}-->
          <!--<el-switch on-text="1" off-text="0" v-model="scope.row.isShow" @cilck="changeStatus()"></el-switch>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)" v-if="modifyShow">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="账户" prop="accounts">
          <el-input v-model="editForm.accounts" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch on-text="启用" off-text="禁用" v-model="currentStatus"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>



    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="账户" prop="accounts">
          <el-input v-model="addForm.accounts" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch on-text="启用" off-text="禁用" v-model="currentAddStatus"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <el-col :span="24" class="toolbar">
      <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
      <el-pagination layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageSize" :page-sizes="pageSizes" :total="totalPage" style="float:right;">
      </el-pagination>
    </el-col>

  </div>
</template>
<script>
  import { selectUser, modifyUser, removeUser, addUser } from '../api/api'
  import global from '../assets/js/global'

  export default {
    data () {
      return {
        totalPage: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        search: '',
        currentAddStatus: false,
        listLoading: false,
        currentStatus: false,
        logining: false,
        tableData: [],
        tableFData: [],
        // 编辑界面是否显示
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
          accounts: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        // 编辑界面数据
        editForm: {},
        // 编辑界面临时存放数据，用于比较是否有修改
        editFormContainer: {},
        // 新增界面是否显示
        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          accounts: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        // 新增界面数据
        addForm: {},
        filters: {
          value: '',
          options: [{
            value: '',
            label: '全部'
          }, {
            value: '0',
            label: '启用'
          }, {
            value: '1',
            label: '禁用'
          }]
        },
        startPickerOptions: {
          disabledDate (time) {
            return ''
          }
        },
        startDate: '',
        endPickerOptions: {
          disabledDate (time) {
            return ''
          }
        },
        endDate: '',
        createShow: false,
        modifyShow: false,
        deleteShow: false
      }
    },
    components: {},
    mounted () {
      let userParams = {
        status: '',
        startCreatetime: '',
        endCreatetime: ''
      }
      this.selectUser(userParams)
      this.createShow = global.judgePermissionName('user:create', this.$store.getters.getPermissionName)
      this.modifyShow = global.judgePermissionName('user:modify', this.$store.getters.getPermissionName)
      this.deleteShow = global.judgePermissionName('user:delete', this.$store.getters.getPermissionName)
    },
    computed: {
      searchData () {
        var search = this.search;
        if (search) {
          return this.tableFData.filter(function(item) {
            return Object.keys(item).some(function(key) {
              return String(item[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableFData;
      }
    },
    methods: {

      selectUser (userParams) {
        let vm = this
        if (typeof userParams.startCreatetime == 'object') {
          userParams.startCreatetime = Date.parse(userParams.startCreatetime)
        }
        if (typeof userParams.endCreatetime == 'object') {
          userParams.endCreatetime = Date.parse(userParams.endCreatetime)
        }
        selectUser(userParams).then(data => {
          if (data.data.code === 200) {
            vm.totalPage = data.data.total
            vm.tableData = data.data.data
            for (var i = 0; i < vm.tableData.length; i++) {
              vm.tableData[i].status = vm.tableData[i].status == 0 ? '启用' : '禁用'
            }
            vm.fPage (vm.tableData)
          }
        })
      },
      fPage (list) {
        this.tableFData = list.slice((this.currentPage - 1)*10,(this.currentPage - 1)*10 + this.pageSize)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.fPage(this.tableData)
      },
      handleSizeChange (size){
        this.pageSize = size
        this.fPage(this.tableData)
      },
      // 显示编辑界面
      handleEdit (index, row) {
        this.editFormVisible = true
        this.editForm = Object.assign({}, row);
        this.editFormContainer = Object.assign({}, row);
        this.editFormContainer.currentStatus = this.currentStatus = row.status == '启用'
      },
      // 显示新增界面
      handleAdd () {
        this.addFormVisible = true
      },
      handleDel (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          let arr = []
          arr.push(row.id)
          let para = { ids: arr }
          removeUser(para).then((data) => {
            this.listLoading = false
            if (data.data.code == 200 && data.data.message.toLowerCase() == 'ok') {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.selectUser({
                status: this.filters.value,
                startCreatetime: this.startDate,
                endCreatetime: this.endDate
              })
            } else {
              this.$message({
                message: data.data.message,
                type: 'error'
              })
            }
          })
        })
      },
      // 编辑
      editSubmit () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              if (this.editFormContainer.id == this.editForm.id && this.editFormContainer.accounts ==  this.editForm.accounts && this.editFormContainer.password == this.editForm.password && this.editFormContainer.currentStatus == this.currentStatus) {
                this.editFormVisible = this.editLoading = false
                this.$refs['editForm'].resetFields()
                this.$message({
                  message: '编辑数据不能与原数据相同',
                  type: 'error'
                })
              } else {
                let userParams = {
                  id: this.editForm.id,
                  accounts: this.editForm.accounts,
                  password: this.editForm.password,
                  status: this.currentStatus ? 0 : 1
                }
                modifyUser(userParams).then(data => {
                  this.editFormVisible = this.editLoading = false
                  this.$refs['editForm'].resetFields()
                  if (data.data.code == 200 && data.data.message.toLowerCase() == 'ok') {
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    })
                    this.selectUser({status: this.filters.value, startCreatetime: this.startDate, endCreatetime: this.endDate})
                  } else{
                    this.$message({
                      message: data.data.message,
                      type: 'error'
                    })
                  }
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 新增
      addSubmit () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true
              let addUserParams = this.addForm
              addUserParams.status = this.currentAddStatus ? 0 : 1
              addUser(addUserParams).then((data) => {
                this.addLoading = this.addFormVisible = false
                this.$refs['addForm'].resetFields()
                if (data.data.code == 200 && data.data.message.toLowerCase() == 'ok') {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                  this.selectUser({status: this.filters.value, startCreatetime: this.startDate, endCreatetime: this.endDate})
                } else {
                  this.$message({
                    message: data.data.message,
                    type: 'error'
                  })
                }
              })
            })
          }
        })
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less" scoped>
  body {
    margin: 0px;
    padding: 0px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
  .toolbar {
    padding: 10px;
    margin: 10px 0px;
  }
  .toolbar .el-form-item {
    margin-bottom: 10px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>




