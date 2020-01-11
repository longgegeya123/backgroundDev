<template>
  <!-- 商品分类 -->
  <div class="product">
    <div class="product_box">
      <div class="product_box_head">
        <el-button type="primary">添加分类</el-button>
      </div>
      <div class="product_content">
        <div>
          <el-table
            :data="tableData.slice((page-1)*pagesize,page*pagesize)"
            style="width: 100%;margin-bottom: 20px;"
            row-key="cat_id"
            border
            :default-expand-all="false"
            :tree-props="{children: 'children'}"
          >
            <el-table-column prop type="index" label="#" sortable width="180"></el-table-column>
            <el-table-column prop="cat_name" label="分类名称" sortable width="180"></el-table-column>
            <el-table-column prop="cat_deleted" label="是否有效">
              <template slot-scope="scope">
                   <div style="color:red" :class="scope.row.cat_delete==false?'el-icon-circle-close':'el-icon-circle-check'">
                   </div>
              </template>
            </el-table-column>
            <el-table-column prop="cat_level" label="排序">
              <template
                slot-scope="scope"
              >{{scope.row.cat_level==0?'一级':scope.row.cat_level==1?'二级':scope.row.cat_level==2&&scope.row.cat_level!==1||0?'三级':'一级'}}</template>
            </el-table-column>
            <el-table-column prop label="操作">
              <template slot-scope="">
                 <el-button type="primary" plain>编辑</el-button>
                    <el-button type="danger" plain>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页器 -->
        <div class="classifypage">
          <el-pagination
            background
            layout="prev, pager, next, sizes, total, jumper"
            :total="tableData.length"
            :page-sizes="[5,10,15,20]"
            :page-size="pagesize"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="page"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Product from "../../../../axiosBr/product/product_servies";
const _product = new Product();
export default {
  name: "Productclassify",
  data() {
    return {
      token: this.$store.state.tokenr,
      tableData: [],
      page: 1, //页数
      pagesize: 5,
      total: null
    };
  },
  created() {
    _product.productclassify(this.token, this.page).then(res => {
      console.log(res);
      this.tableData = res.data.data;
    });
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
    },
    handleSizeChange(val) {
      console.log(val);
      this.page = val;
    }
  },
  watch: {
    page: function(val) {
      _product.productclassify(this.token, val).then(res => {
        console.log(res);
        this.tableData = res.data.data;
        this.total = this.tableData.length;
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.product {
  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .product_box {
    width: 100%;
    height: 94%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background: white;
    padding: 10px;
    box-sizing: border-box;
    .product_box_head {
      padding: 10px 0;
    }
  }
}
</style>