<template>
  <!-- 订单列表 -->
  <div class="orderitem">
    <div class="order_box">
      <div class="productitem_search">
        <el-input
          placeholder="请输入内容"
          style="width:460px"
          v-model="input3"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <div class="order-tabel">
        <el-table :data="tableData" height="" border style="width: 100%">
          <el-table-column prop="" type="index" label="#" width="180"></el-table-column>
          <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
          <el-table-column prop="order_price" label="订单价格"></el-table-column>
          <el-table-column prop="trade_no" label="是否付款"></el-table-column>
          <el-table-column prop="is_send" label="是否发货"></el-table-column>
          <el-table-column prop="create_time" label="下单时间"></el-table-column>
          <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                  <el-button type="primary" @click="handelchange(scope.rwo)">编辑</el-button>
                   <el-button type="success">坐标</el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="order_page">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :total="totalAll" :current-page="page" :page-sizes="[5,10,15]" :page-size="page" @current-change='handelCurrent' @size-change='handelSize'></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Product from "../../../../axiosBr/product/product_servies";
const _product = new Product();
export default {
  name: "OrderItem",
  data() {
    return {
      input3: "",
      token: this.$store.state.tokenr,
      tableData: [],
      page:1,//页数
      pagesize:10,//条数
      totalAll:null

    };
  },
  created() {
    _product.order(this.token,this.page,this.pagesize).then(res => {
      console.log(res);
      console.log(this.pagesize)
      this.tableData = res.data.data.goods;
      this.totalAll=res.data.data.total
    });
  },
  methods:{
      handelCurrent(val){
          this.page=val
             console.log(val)

      },
      handelSize(val){
        //   this.pagesize=val
          console.log(val)
      }
  },
  watch:{
      page:function(val){
        _product.order(this.token,val,this.pagesize).then(res => {
      console.log(res);
      this.tableData = res.data.data.goods;
      this.totalAll=res.data.data.total
    });     
      }
  }
};
</script>
<style lang="scss" scoped>
.orderitem {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  .order_box {
    height: 95%;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background: white;
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>