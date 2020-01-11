<template>
  <!-- 商品列表 -->
  <div class="productitem">
    <div class="productitem_search">
      <el-input placeholder="请输入内容" style="width:460px" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button @click="dialogFormVisible=true" type="primary">添加商品</el-button>
    </div>
    <!-- 表格 -->
    <div class="producttable">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop type="index" label="#" width></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
        <el-table-column prop="goods_number" label="商品数量"></el-table-column>
        <el-table-column prop="upd_time" label="创建时间"></el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope>
            <el-button type="primary" plain>编辑</el-button>
            <el-button type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->

    <div class="productpage">
      <el-pagination
        background
        layout="prev, pager, next, sizes, total, jumper"
        :total="tableData.length"
        :page-sizes="[5,10,15,20]"
        :page-size="pagesize"
        @size-change="handelSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import Product from "../../../../axiosBr/product/product_servies";
const _product = new Product();
export default {
  name: "Productitem",
  data() {
    return {
      token: this.$store.state.tokenr,
      input3: "", //搜索
      tableData: [],
      page: 1, //页数
      pagesize: 10
    };
  },
  created() {
    _product.productItem(this.token, this.page, this.pagesize).then(res => {
      console.log(res);
      this.tableData = res.data.data.goods;
      console.log(this.tableData);
    });
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      console.log(val);
    },
    handelSizeChange(val) {
      console.log(val);
      this.pagesize = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.productitem {
  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: white;
  .productitem_search {
    width: 100%;
  }
}
</style>