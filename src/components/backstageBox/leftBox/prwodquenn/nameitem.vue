<template>
  <!-- 角色列表 -->
  <div class="nameitem">
    <div class="additem">
      <el-button type="primary">添加角色</el-button>
    </div>
    <div class="itemtable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label>
                <!-- <span>{{ props.row }}</span> -->
                <div v-for="(item,key) in props.row.children" :key="key" class="classify_box">
                  <div class="classify_left">
                    <div class="classify_title">
                      <el-tag
                        closable
                        @click="del(item,key)"
                        :disable-transitions="false"
                      >{{item.authName}}</el-tag>
                    </div>
                  </div>

                  <div class="classify_right">
                    <div class="classify_right_box" v-for="(item,key) in item.children" :key="key">
                      <div class="classify_right_label">
                        <div class="classify_right_title">
                          <div>
                            <el-tag
                              type="success"
                              @click="del(item,key)"
                              closable
                              :disable-transitions="false"
                            >{{item.authName}}</el-tag>
                          </div>
                        </div>

                        <div
                          class="classify_right_content"
                          v-for="(item,key) in item.children"
                          :key="key"
                        >
                          <el-tag
                            style="marginLeft:5px"
                            @click="del(item,key)"
                            closable
                            :disable-transitions="false"
                            type="warning"
                          >{{item.authName}}</el-tag>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label=" ID" prop type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <div>
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
            <el-button @click="allocation()" size="mini" type="warning">分配权限</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分配权限 -->
    <div>
      <el-dialog title="权限分配" :default-expand-all="true" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div>
          <el-tree :data="arr" show-checkbox node-key="id" :props="defaultProps"></el-tree>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Product from "../../../../axiosBr/product/product_servies";
const _product = new Product();
export default {
  name: "Nameitem",
  data() {
    return {
      token: this.$store.state.tokenr,
      tableData: [],
      dialogVisible: false,
      arr: [],//权限列表数据
      defaultProps: {
        label: "authName",
        children: "children"
      }
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handle(row) {
      console.log(row);
    },
    //删除权限未完成
    del(item, key) {
      console.log(item);
      let id = item.id;
      console.log(id);
      _product.delpower(this.token, id).then(res => {
        console.log(res);
      });
    },
    //分配权限
    allocation() {
      this.dialogVisible = true;
      console.log(this.tableData);
    },
    //对话框确认
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created() {
    //角色列表
    _product.nameitemr(this.token).then(res => {
      console.log(res);
      this.tableData = res.data.data;
      console.log(this.tableData);
    });
     
     //权限列表
    _product.poweritelT(this.token).then(res => {
      this.arr=res.data.data
      console.log(this.arr)
    });
  }
};
</script>
<style lang="scss" scoped>
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
.classify_box {
  height: 100%;
  width: 142%;
  border-bottom: 1px solid darkgray;
  display: flex;
  padding: 5px;
  // box-sizing: border-box;
  .classify_left {
    width: 10%;
  }
  .classify_right {
    width: 90%;
    .classify_right_box {
      padding: 5px;
      border-bottom: 1px solid darkgray;

      box-sizing: border-box;
      .classify_right_label {
        display: flex;
        .classify_right_title {
          width: 10%;
        }
        .classify_right_content {
        }
      }
    }
    .classify_right_box:last-child {
      border: none;
    }
  }
}

.classify_box:first-child {
  border-top: 1px solid darkgray;
}
</style>