<template>
  <!-- 视图 -->
  <div class="viewr">
    <div class="viewr_head">
      <Head></Head>
    </div>
    <div class="viewr_content">
      <div class="viewr_content_left">
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#333744"
          text-color="white"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-info"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item >
              <router-link to="/viewr/useritem" tag="p">用户列表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

             <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-success"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item>
              <router-link to="/viewr/nameitem" tag="p">角色列表</router-link>
              </el-menu-item>
              <el-menu-item>
              <router-link to="/viewr/quennitem" tag="p">权限列表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

             <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item >
              <router-link to="/viewr/productitem" tag="p"> 商品列表</router-link>
              </el-menu-item>
              <el-menu-item >
              <router-link to="/viewr/classifysorting" tag="p">分类参数</router-link>
              </el-menu-item>
              <el-menu-item >
              <router-link to="/viewr/productclassify" tag="p">商品分类</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item>
              <router-link to="/viewr/orderItem" tag="p"> 订单列表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

           <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-mobile-phone"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item>
              <router-link to="/viewr/statistics" tag="p">数据报表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="viewr_content_right">
        <div class="viewr_content_right_title">
          <span>首页</span>
          <span class="el-icon-arrow-right"></span>
          <span>用户管理</span>
          <span class="el-icon-arrow-right"></span>
          <span>用户列表</span>
        </div>
        <keep-alive>
             <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import Head from "../backstageBox/headBox/head";
import Product from "../../axiosBr/product/product_servies"
const _product = new Product()
export default {
  name: "Viewr",
  components: { Head },
  data() {
    return {
      isCollapse:false,
      token:this.$store.state.tokenr,
      menuArr:[]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created(){
    _product.menu(this.token).then((res)=>{
      console.log(res)
      this.menuArr=res.data.data
      console.log(this.menuArr)
    })
    console.log(this.token)
  }
};
</script>
<style lang='scss' scoped>
.viewr {
  width: 100%;
  height: 100%;
  background: #333744;
  .viewr_head {
    height: 100%;
    width: 100%;
  }
  .viewr_content {
    width: 100%;
    height:100%;
    display: flex;
    .viewr_content_left {
      width: 204px;
      height:870px ;
    }
        .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 204px;
        height:870px;
      }
    .viewr_content_right {
      width: 100%;
      height: 870px;
      background: #eaedf1;
      .viewr_content_right_title{
        height: 50px;
        line-height: 50px;
      }
    }
  }
}
</style>