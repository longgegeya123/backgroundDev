<template>
  <div class="homepage">
    <div class="homepage_content">
      <p class="homepage_content_img">
        <img src="../../assets/image/微信图片_20190925181429.jpg" />
      </p>
      <p class="homepage_content_user">
        <el-input v-model="user" placeholder="用户"></el-input>
      </p>
      <p class="homepage_content_pss">
        <el-input placeholder="密码" v-model="pss" show-password></el-input>
      </p>
      <p class="homepage_content_btn">
        <router-link to="/viewr">
            <el-button type="primary" @click="submiT">提交</el-button>
        </router-link>
        <el-button type="info" @click="reseT">重置</el-button>
      </p>
    </div>
  </div>
</template>
<script>
import Product from '../../axiosBr/product/product_servies';
const _product = new Product();
export default {
  name: "Homepage",
  data(){
      return{
          user:null,
          pss:null,
          token:null,
      }
  },
  methods:{
      //提交
      submiT(){
          if(this.user=="" || this.pss==""){
              alert('请输入用户名或密码')
              return
          }
          
            let obj={
                username:this.user,
                password:this.pss
            }
            console.log(obj)
          _product.login(obj).then((res)=>{
              console.log(res)
              this.token=res.data.data.token

              this.$store.commit('addtoken',this.token)
          })
      },
      //重置
      reseT(){
          this.user=""
          this.pss="";
      }
  }
};
</script>
<style lang="scss" scoped>
.homepage {
  height: 100vh;
  width: 100%;
  background:pink;
  display: flex;
  align-items: center;
  .homepage_content {
    width: 560px;
    height: 360px;
    margin: 0 auto;
    .homepage_content_img {
      img {
        display:block;
        width: 130px;
        height: 130px;
        border-radius: 50%;
         margin: 0 auto;
         border: 10px solid white;
          box-shadow: 3px  #F4F4F4;
      }
    }
    .homepage_content_user{
        margin:10px 0;
    }
    .homepage_content_btn{
        width: 160px;
        margin: 0 auto;
        margin-top: 10px;
    }
  }
}
</style>