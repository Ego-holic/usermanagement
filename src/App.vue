<template>
  <div id="app">
    <el-container class="container">
      <el-header class="header">
        <el-menu :default-active="activeIndex" mode="horizontal" 
        background-color="#009999" text-color="	#ffffff" active-text-color="#ddff99" 
        align="center" style="height:100%">
        <el-row>
          <el-col :span="3"><el-menu-item><p>后台认证管理</p></el-menu-item></el-col>
          <el-col :span="2"><el-menu-item><el-image 
          :src="flightUrl" 
          class="image">
          </el-image></el-menu-item></el-col>
          <el-col :span="2"><el-menu-item ><el-link>首页</el-link></el-menu-item></el-col>
          <el-col :span="2"><el-menu-item ><el-link href="#/applications">APP管理</el-link></el-menu-item></el-col>
          <el-col :span="2"><el-menu-item ><el-link href="#/users">User列表</el-link></el-menu-item></el-col>
          <el-col :span="11"><el-menu-item></el-menu-item></el-col>
          <el-col :span="2"><el-menu-item ><el-link>登录</el-link></el-menu-item></el-col>    
          </el-row>      
        </el-menu>
      </el-header>
      <!-- <el-main>
      </el-main> -->
    </el-container>
    <router-view style="height: calc(100% - 80px)"/>
      <p class="router">Copyright ©2019 Powered By 航科院中宇 (北京) 新技术发展有限公司 Version 1.0.0</p>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
const flightUrl = require('@/assets/flight.png') 
@Component
export default class App extends Vue {
  activeIndex ="1"
  flightUrl = flightUrl
}
</script>
<style lang="stylus">
#app {
  height 100%;
  background-color white
}
.header {
  padding 0 0 0 0 
}
.router {
  text-align center;
  // position: absolute;
  height 20px;
  width 100%;
  line-height 20px;
  color gainsboro;
  // background-color rgba(255, 255, 255, 0.1);
  font-size 12px;
}
.image{
  width 90%
  height 100%
  padding 0 0 0 0
}
el-link{
  color #ffffff
}
// }
</style>
