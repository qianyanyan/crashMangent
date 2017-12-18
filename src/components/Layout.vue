<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed ? '' : sysName}}
      </el-col>
      <el-col :span="14" class="userinfo">
        <span class="el-dropdown-link userinfo-inner" v-text="'欢迎 ' + getSysUserName"></span>
        <!--<el-dropdown trigger="hover">-->
          <!---->
         <!---->
          <!--<el-dropdown-menu slot="dropdown">-->
           <!---->
            <!--<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
          <el-dropdown>
            <span class="el-dropdown-link">
              账户操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
             </el-dropdown-menu>
          </el-dropdown>
        </el-col>
    </el-col>

    <el-col :span="24" class="main">
      <aside class="menu-expanded">
        <!--导航菜单-->
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu :index="index + ''" v-for="(item,index) in getList">
            <!--<template slot="title"><i class="el-icon-menu"></i>{{item.menuName}}</template>-->
             <template slot="title"><i :class="item.menuIcon"></i>{{item.menuName}}</template>
            <el-menu-item-group>
              <!--@click="$router.push(child.menuUrl)"-->
              <el-menu-item :index="index + '-' + index2" v-for="(child, index2) in item.children"
                            @click="$router.push(child.menuUrl)"><i :class="child.menuIcon"></i>{{child.menuName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <!--<el-breadcrumb separator="/" class="breadcrumb-inner">-->
            <!--<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">-->
            <!--{{ item.name }}-->
            <!--</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>
<script>
  import {toIndex, logout} from '../api/api'

  export default {
    data() {
      return {
        sysName: '现金超市',
        collapsed: false,
        sysUserName: '',
        roleName: '',
        menuList: this.$store.state.menuList
      }
    },
    computed: {
      getList() {
        this.menuList = this.$store.getters.getMenuList
        return this.menuList
      },
      getSysUserName: {
        get() {
          return this.$store.getters.getSysUserName
        }
      },
      getRoleName: {
        get() {
          return this.$store.getters.getRoleName
        }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
//        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
//        console.log(key, keyPath)
      },
      logout: function () {
        var _this = this
        this.$confirm('确认退出吗?', '提示', {}).then(() => {
          logout().then(data => {
            if (data.data.code === 200) {
              _this.$store.commit('deleteUserId')
              localStorage.removeItem('userId')
              _this.$router.push('/login')
            }
          })
        })
      }
    },
    mounted() {
      if (this.$route.path === '/') {
        if (localStorage.getItem('userId') == undefined || localStorage.getItem('userId') == '') {
          this.$router.push('/login')
        } else {
          this.$router.push('/main')
        }
      }
      let vm = this
      let value = {
        callback(res) {
          vm.logining = false
          if (res.code != 200) {
          //  vm.$message({
          //    message: res.message,
          //    type: 'error'
          //  })
            vm.$router.push({path: '/login'})
          }
        },
        userId: vm.$store.getters.getUserId
      }
      this.$store.dispatch('getIndexInfo', value);
    }
  }

</script>

<style scoped lang="scss">
  @import '../styles/vars';

  .container {
    position: absolute;
    top: 0px;
    left:0;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: $color-primary;
      color: #fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color: #fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        height: 60px;
        font-size: 22px;
        padding-left: 20px;
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color: #fff;
        }
      }
      .logo-width {
        width: 230px;
      }
      .logo-collapse-width {
        width: 60px
      }
      .tools {
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex: 0 0 230px;
        width: 230px;
        .el-menu {
          height: 100%;
        }
        .collapsed {
          width: 60px;
          .item {
            position: relative;
          }
          .submenu {
            position: absolute;
            top: 0px;
            left: 60px;
            z-index: 99999;
            height: auto;
            display: none;
          }

        }
      }
      .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
      }
      .menu-expanded {
        flex: 0 0 230px;
        width: 230px;
      }
      .content-container {
        flex: 1;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          //margin-bottom: 15px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-dropdown-link {
    color: #fff;
  }
</style>
