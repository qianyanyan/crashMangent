<template>
  <div style="position: relative;">
    <el-table ref="singleTable" :data="tableData" highlight-current-row :row-class-name="tableRowClassName" @row-click="clickTale"
              @current-change="handleCurrentChange" style="width: 20%;float: left; margin-right: 1%;">
      <el-table-column property="roleExplain" label="角色">
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer" style="width: 65%;float: left;margin:0px;left:21%;position: absolute;top:-40px;">
      <el-button type="primary" @click.native="addSubmit" v-if="modifyShow">保存</el-button>
    </div>
    <el-table ref="singleTable1" :data="dataList" style="width: 65%;float: left;margin:0px;" @selection-change="handleSelectionChange">
      <el-table-column prop="menuName" label="模块" min-width="30%">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="resources.describe" label="功能权限">
        <template scope="scope">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="item in scope.row.resources" :label="item.permisstionId" :disabled="!modifyShow">{{item.describe}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { searchRole, searchPermissions, modifyPermisstion } from '../api/api'
  import global from '../assets/js/global'
  export default {
    data() {
      return {
        roleid: 1,
        tableData: [],
        dataList: [],
        boxIds: [],
        checkList: [],
        createShow: false,
        modifyShow: false,
        deleteShow: false
      }
    },
    created() {
      this.getData();
      this.menuList();
    },
    mounted() {
      this.modifyShow = global.judgePermissionName('permisstion:modify', this.$store.getters.getPermissionName)
    },
    methods: {
      tableRowClassName(row, index) {
        if (index === 0) {
          return 'current-row';
        }

      },
      getData() {
        let self = this;
        searchRole().then(data => {
          if (data.data.code === 200) {
            self.tableData = data.data.data;
            this.roleid = data.data.data[0].roleOrder


          }
        })
      },
      menuList() {
        let self = this;
        let params = {
          roleId: this.roleid
        };
        searchPermissions(params).then(data => {
          if (data.data.code === 200) {
            self.dataList = data.data.data;
            this.checkList = [];
            for (let i = 0; i < self.dataList.length; i++) {
              for (let j = 0; j < self.dataList[i].resources.length; j++) {
                if (self.dataList[i].resources[j].roleId != null && self.dataList[i].resources[j].roleId != 0) {
                  this.checkList.push(self.dataList[i].resources[j].permisstionId)
                }
              }
            }

          }
        })
      },
      clickTale(row, event, column) {
        this.roleid = row.id;
        this.menuList()

      },
      handleCurrentChange(val) {

      },
      handleSelectionChange(selection) {
        console.log(selection)
        console.log(this.checkList)
      },

      addSubmit() {
        if (this.checkList.length >= 1) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            let date = [];
            let self = this;
            let para = {
              sysRoleId: self.roleid,
              sysPermisstionsId: self.checkList
            }
            modifyPermisstion(para).then((data) => {
              if (data.data.code == 200 && data.data.message.toLowerCase() == 'ok') {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.menuList();
              } else {
                this.$message({
                  message: data.data.message,
                  type: 'error'
                })
              }
            })
          })
        } else {
          this.$confirm('请选择后再提交？', '提示')
        }

      },

    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .role-table {
    border: 1px solid #e0e0e0;
    border-bottom: none;
    padding: 0;
    position: relative;
  }

  .header {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e7e7e7;
    background: #F8F8F9;
    text-align: center;
  }

  .vertical-line {
    width: 1px;
    height: 100%;
    background: #ddd;
    position: absolute;
    left: 30%;
    top: 0
  }

  .left {
    width: 30%;
    float: left;
    padding-left: 10px;
    user-select: none;
    cursor: pointer;
  }
  .el-checkbox.el-checkbox {
    margin: 6px 16px 6px 0;
    width: 136px;
  }
  .one {
    padding-left: 20px;
  }

  .right {
    width: 65%;
    float: left;
    padding-left: 10px;
  }

  .item-icon {
    margin-left: -5px;
    padding: 5px;
  }

  .line {
    clear: both;
    width: 100%;
    height: 1px;
    background: #e0e0e0;
  }
  ul li{
    list-style: none;
  }
  .h40{
    height: 39px;
    line-height: 39px;
  }
  [v-cloak] {
    display: none;
  }
</style>
