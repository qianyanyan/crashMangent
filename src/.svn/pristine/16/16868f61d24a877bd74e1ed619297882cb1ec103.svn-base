<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button type="primary" @click="handleAdd" v-if="createShow">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="menuName"
        label="菜单"
        min-width="30%">
      </el-table-column>
      <el-table-column
        label="资源"
        min-width="55%">
        <template scope="scope">
          <el-checkbox-group v-model="scope.row.selectList">
            <el-checkbox v-for="item in scope.row.resources" :label="item">{{item.describe + '(' + item.permissionName + ')'}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="15%"
        width="180">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)" v-if="modifyShow">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" v-if="deleteShow">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="菜单" prop="menuId">
          <el-select v-model="addForm.menuId" placeholder="请选择菜单">
            <el-option
              v-for="item in tableData"
              :key="item.menuId + ''"
              :label="item.menuName"
              :value="item.menuId + ''">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源名称" prop="permissionName">
          <el-input v-model="addForm.permissionName" auto-complete="off" placeholder="请输入资源名称,例:user:create"></el-input>
        </el-form-item>
        <el-form-item label="资源描述" prop="describe">
          <el-input v-model="addForm.describe" auto-complete="off" placeholder="请输入资源描述"></el-input>
        </el-form-item>
        <el-form-item label="资源排序" prop="permisstionOrder">
          <el-input v-model="addForm.permisstionOrder" auto-complete="off" placeholder="请输入资源排序(数字*非必填)"  type="number" min="0"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="资源名称" prop="permissionName">
          <el-input v-model="editForm.permissionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源描述" prop="describe">
          <el-input v-model="editForm.describe" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import { searchResources, addResources, deleteResources, modifyResources } from '../api/api'
  import global from '../assets/js/global'
  export default {
    data () {
      let validatePermissionName = (rule, value, callback) => {
        let vm = this
        let flag = true
        let errorSting = ''
        if (value == undefined || value.trim().length == 0) {
          flag = false
          errorSting = '请输入资源名'
        }
        for (let i = 0; i < vm.tableData.length; i++) {
          for (let j = 0; j < vm.tableData[i].resources.length; j++) {
            if (value == vm.tableData[i].resources[j].permissionName) {
              flag = false
              errorSting = '该资源名称已存在'
              break
            }
          }
        }
        if (flag) {
          callback()
        } else {
          callback(new Error(errorSting))
        }
      }
      return {
        search: '',
        tableData: [],
        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          permissionName: [
            { required: true, trigger: 'blur', validator: validatePermissionName}
          ],
          describe: [
            { required: true, message: '请输入资源描述', trigger: 'blur' }
          ],
          menuId: [
            { required: true, message: '请选择菜单', trigger: 'blur' }
          ]
        },
        addForm: {
          permissionName: '',
          describe: '',
          permisstionOrder: ''
        },
        filters: {},
        createShow: false,
        modifyShow: false,
        deleteShow: false,
        // 编辑界面数据
        editForm: {},
        editFormContainer: {},
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
          permissionName: [
            { required: true, message: '请输入资源名', trigger: 'blur' }
          ],
          describe: [
            { required: true, message: '请输入资源描述', trigger: 'blur' }
          ]
        },
      }
    },
    mounted () {
      this.searchResources();
      this.createShow = global.judgePermissionName('resources:create', this.$store.getters.getPermissionName)
      this.modifyShow = global.judgePermissionName('resources:modify', this.$store.getters.getPermissionName)
      this.deleteShow = global.judgePermissionName('resources:delete', this.$store.getters.getPermissionName)
    },
    methods: {
      searchResources () {
        let vm = this
        searchResources().then(data => {
          if (data.data.code === 200) {
            for (let i = 0; i < data.data.data.length; i++) {
              data.data.data[i].selectList = []
            }
            vm.tableData = data.data.data
          }
        })
      },
      // 显示新增界面
      handleAdd () {
        this.addFormVisible = true
      },
      // 新增
      addSubmit () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true
              let addResourcesParams = this.addForm
              addResources(addResourcesParams).then((data) => {
                this.addLoading = this.addFormVisible = false
                this.$refs['addForm'].resetFields()
                if (data.data.code == 200 && data.data.message.toLowerCase() == 'ok') {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                  this.searchResources()
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
      },
      handleDel (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          let array = []
          for (let i = 0; i < row.selectList.length; i++) {
            array.push(row.selectList[i].permisstionId)
          }
          let para = { ids: array}
          deleteResources(para).then((data) => {
            this.listLoading = false
            if (data.data.code == 200 && data.data.message.toLowerCase() == 'ok') {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.searchResources()
            } else {
              this.$message({
                message: data.data.message,
                type: 'error'
              })
            }
          })
        })
      },
      // 显示编辑界面
      handleEdit (index, row) {
        if (row.selectList.length == 0){
          return false
        }
        if (row.selectList.length > 1) {
          this.$message({
            message: '只能1个个编辑',
            type: 'error'
          })
        } else {
          this.editFormVisible = true
          this.editFormContainer = Object.assign({}, row.selectList[0]);
          this.editForm = Object.assign({}, row.selectList[0]);
        }
      },
      // 编辑
      editSubmit () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              if (this.editFormContainer.permissionName == this.editForm.permissionName  && this.editFormContainer.describe == this.editForm.describe) {
                this.editFormVisible = this.editLoading = false
                this.$refs['editForm'].resetFields()
                this.$message({
                  message: '编辑数据不能与原数据相同',
                  type: 'error'
                })
              } else {
                let modifyResourcesParams = {
                  id: this.editForm.permisstionId,
                  menuId: this.editForm.menuId,
                  permissionName: this.editForm.permissionName,
                  describe: this.editForm.describe
                }
                modifyResources(modifyResourcesParams).then(data => {
                  this.editFormVisible = this.editLoading = false
                  this.$refs['editForm'].resetFields()
                  if (data.data.code == 200 && data.data.message.toLowerCase() == 'ok') {
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    })
                    this.searchResources()
                  } else {
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
      }
    },
    watch: {
      addFormVisible (val) {
        if (!val) {
          this.$refs['addForm'].resetFields()
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
  .el-checkbox.el-checkbox {

    width: 255px;
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
