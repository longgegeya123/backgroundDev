<template>
  <!-- 分类参数 -->
  <div class="classifyparmetar">
    <div class="classifyparmetar_box">
      <div class="classifyparmetar_box_title">
        <el-tag style="width:100%" type="danger">注意！只允许为第三级分类设置参数</el-tag>
      </div>
      <div class="selectclassify">
        <span>选择商品分类:</span>
        <el-cascader
          v-model="value"
          :options="classifyArr"
          :props="{ expandTrigger: 'hover',value:'cat_id',label:'cat_name' ,children:'children' }"
          @change="handleChange"
        ></el-cascader>
      </div>

      <div class="selectproperty">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="first"></el-tab-pane>
          <el-tab-pane label="静态属性" name="second"></el-tab-pane>
        </el-tabs>
      </div>

      <div class="classify_table">
        <div class="classify_add">
          <el-button :disabled='false' type="primary">{{btntxt}}</el-button>
        </div>

        <!-- 静态属性 -->
        <div v-show="btnflag" class="tabler">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label>
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="#" prop type="index"></el-table-column>
            <el-table-column label="商品名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <div>
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </div>
            </el-table-column>
          </el-table>
        </div>

        <!-- 静态属性 -->
        <div v-show="!btnflag" class="tableT">
          <el-table :data="dyamiArr" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label>
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="#" prop type="index"></el-table-column>
            <el-table-column label="商品名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <div>
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Product from "../../../../axiosBr/product/product_servies";
const _product = new Product();
export default {
  name: "Classifysorting",
  data() {
    return {
      token: this.$store.state.tokenr,
      classifyArr: [],
      value: "",
      activeName: "second",
      id: null, //获取静态属性要传的id
      btntxt: "添加属性",
      btnflag: false,
      tableData: [],//静态数据
      dyamiArr:[],//动态参数
    };
  },
  created() {
    _product.productclassify(this.token).then(res => {
      console.log(res.data.data);
      this.classifyArr = res.data.data;
    });
  },
  methods: {
    //动态select
    handleChange(value) {
      console.log(value);

      this.id = value[value.length - 1];
        
      //静态属性
      _product.staticproperty(this.token, this.id).then(res => {
        console.log(res.data.data);
        this.tableData = res.data.data;
      });

      //动态属性
      _product.dynamicstate(this.token, this.id).then(res => {
        console.log(res);
        this.dyamiArr=res.data.data
      });
    },

    handleClick(tab, event) {
      console.log(event);
      console.log(tab.label);
      if (tab.label == "静态属性") {
        this.btntxt = "静态属性";
        this.btnflag = true;
      } else if (tab.label == "动态参数") {
        this.btntxt = "动态参数";
        this.btnflag = !this.btnflag;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.classifyparmetar {
  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .classifyparmetar_box {
    width: 100%;
    height: 94%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background: white;
    padding: 10px;
    box-sizing: border-box;
    .selectclassify {
      height: 100px;
      width: 100%;
      padding-top: 10px;
      box-sizing: border-box;
    }
    .classify_table {
      .tabler {
        .demo-table-expand {
          font-size: 0;
        }
        .demo-table-expand label {
          width: 90px;
          color: #99a9bf;
        }
        .demo-table-expand .el-form-item {
          margin-right: 0;
          margin-bottom: 0;
          width: 50%;
        }
      }
    }
  }
}
</style>