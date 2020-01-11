<template>
  <!-- 权限列表 -->
  <div class="power">
    <el-table :data="powerList" height="250" border style="width: 100%">
      <el-table-column prop type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="权限等级">
        <template slot-scope="scope">
          <div>
               {{scope.row.level==0?'一级':scope.row.level==1?'二级':scope.row.level==2&&scope.row.level!==1||0?'三级':'一级'}}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Product from "../../../../axiosBr/product/product_servies";
const _product = new Product();
export default {
  name: "Quennitem",
  data() {
    return {
      token: this.$store.state.tokenr,
      powerList: []
    };
  },
  created() {
    _product.poweritel(this.token).then(res => {
      console.log(res.data.data);
      this.powerList = res.data.data;
      console.log(res);
    });
  },
};
</script>
<style lang="scss" scoped>
</style>