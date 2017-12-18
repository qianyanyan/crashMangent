<template>
  <div id="app">
    <!--<div v-if="$route.name != 'download'">-->
      <!--<xuehe-header></xuehe-header>-->
      <!--<div class="hr"></div>-->
      <!--<router-view></router-view>-->
      <!--<xuehe-footer></xuehe-footer>-->
    <!--</div>-->
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data () {
      return {
        isTrue: true
      }
    },
    components: {
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .el-checkbox.el-checkbox {
    margin: 6px 16px 6px 0;
  }
</style>

