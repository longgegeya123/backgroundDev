<template>
  <!-- 用户管理 -->
  <div class="useritem">
    <div class="useritem_search">
      <el-input placeholder="请输入内容" style="width:460px" v-model="input3" class="input-with-select">
        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button @click="dialogFormVisible=true" type="primary">添加</el-button>
    </div>
    <!-- 添加用户 -->
    <div class="addUser">
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <p>
          <label>
            用户名
            <el-input v-model="inputuser"></el-input>
          </label>
        </p>
        <p>
          <label>
            密码
            <el-input v-model="inputpss"></el-input>
          </label>
        </p>
        <p>
          <label>
            邮箱
            <el-input v-model="inputemail"></el-input>
          </label>
        </p>
        <p>
          <label>
            手机
            <el-input v-model="inputmobile"></el-input>
          </label>
        </p>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibler">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop type="index" label="#" width="150"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
      <el-table-column prop="role_name" label="角色" width="300"></el-table-column>
      <!-- 修改状态 -->
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tooltip>
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              @change="changestate(scope.row)"
              inactive-color="#ff4949"
            ></el-switch>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <!-- 修改 -->

          <el-button @click="amend(scope.row)" type="text" size="small">
            <i class="el-icon-edit"></i>
          </el-button>
          <!-- 删除 -->
          <el-button type="text" @click="deluser(scope.row)" size="small">
            <i class="el-icon-delete"></i>
          </el-button>
          <!-- 分配角色-->
          <el-button type="text" @click="allot(scope.row)" size="small">
            <i class="el-icon-setting"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next, sizes, total, jumper"
      :total="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="page"
    ></el-pagination>
    <!-- 修改用户 -->
    <div>
      <el-dialog title="修改用户" :visible.sync="dialogForm">
        <p>
          <label>
            用户名
            <el-input v-model="inputuser" :placeholder="inputuser" :disabled="true"></el-input>
          </label>
        </p>
        <p>
          <label>
            手机
            <el-input v-model="inputmobile" :placeholder="inputmobile"></el-input>
          </label>
        </p>
        <p>
          <label>
            邮箱
            <el-input v-model="inputemail" :placeholder="inputemail"></el-input>
          </label>
        </p>
        <div slot="footer">
          <el-button @click="dialogForm= false">取 消</el-button>
          <el-button type="primary" @click="amendEnter()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 分配角色 -->

    <div>
      <el-dialog title="分配角色" :visible.sync="dialogF">
        <p>
          <label>
            用户名:
            <span>{{role_name}}</span>
          </label>
        </p>
        <p>
          <label>
            当前角色：
            <span>{{usernume}}</span>
          </label>
        </p>
        <p>
          <label>
            分配新教色
            <el-dropdown>
              <el-dropdown-menu></el-dropdown-menu>
              <el-select v-model="valueT" placeholder="请选择">
                <el-option
                  v-for="item in nameArr"
                  :key="item.id"
                  :label="item.label"
                  :value="item.roleName"
                ></el-option>
              </el-select>
            </el-dropdown>
          </label>
        </p>
        <div slot="footer">
          <el-button @click="dialogF= false">取 消</el-button>
          <el-button type="primary" @click="enterclassifyname">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Product from "../../../../axiosBr/product/product_servies";
const _product = new Product();
export default {
  name: "Useritem",
  data() {
    return {
      token: this.$store.state.tokenr,
      tableData: [],
      valueT: "", //状态
      pagesize: 10, //每页展示条数
      pagenum: null,
      page: 1, //页数
      input3: null,
      searchArr: [],
      adduserflag: false, //添加状态
      inputuser: "",
      inputpss: "",
      inputemail: "",
      inputmobile: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogForm: false, //修改用户
      dialogF: false, //分配角色
      id: null,
      allotID: null,
      nameArr: [], //角色列表
      role_name: "", //分配脚色用户名字，
      usernume: "", //分配角色角色
      ID: null //分配角色id
    };
  },
  created() {
    //用户列表
    _product.userItem(this.token, this.page, this.pagesize).then(res => {
      console.log(res);
      this.tableData = res.data.data.users;
      console.log(this.tableData);
      this.pagenum = res.data.data.total;
      console.log(this.pagenum);
    });

    //角色列表
    _product.nameitemr(this.token).then(res => {
      console.log(res);
      this.nameArr = res.data.data;
    });
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      console.log(`${val}`);
      console.log(this.page);
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    //搜索
    search() {
      _product
        .usersearch(this.token, this.page, this.pagesize, this.input3)
        .then(res => {
          console.log(res);
          this.searchArr = res.data.data.users;
          console.log(this.searchArr);
          this.tableData = this.searchArr;
        });
    },
    //添加
    dialogFormVisibler() {
      let obj = {
        token: this.token,
        username: this.inputuser,
        password: this.inputpss,
        email: this.inputemail,
        mobile: this.inputmobile
      };
      console.log(obj);
      this.dialogFormVisible = false;
      _product.adduser(obj).then(res => {
        console.log(res);
      });

      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      });
    },

    //修改
    amend(scode) {
      this.dialogForm = true;
      console.log(scode);
      this.id = scode.id;
      this.inputuser = scode.username;
      this.inputemail = scode.email;
      this.inputmobile = scode.mobile;
    },

    // 确定修改
    amendEnter() {
      this.dialogForm = false;
      console.log(this.id);
      let obj = {
        token: this.token,
        username: this.inputuser,
        email: this.inputemail,
        mobile: this.inputmobile
      };
      console.log(obj);
      _product.amenduser(obj, this.id).then(res => {
        console.log(res);
      });
    },
    //修改用户状态
    changestate(scope) {
      console.log(scope);
      let id = scope.id;
      let state = scope.mg_state;
      _product.updatestate(this.token, id, state).then(res => {
        console.log(res.data.msg);
        if (res.data.meta.msg == "设置状态成功") {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        } else {
          this.$message("修改失败");
        }
      });
    },
    //删除用户
    deluser(scode) {
      console.log(scode);
      let id = scode.id;
      console.log(id);
      let index = this.tableData.findIndex((a, i, arr) => {
        return scode.id == a.id;
      });
      this.tableData.splice(index, 1);
      _product.delUser(this.token, id).then(res => {
        console.log(res);
      });
    },

    //分配脚色
    allot(scode) {
      console.log(scode);
      this.dialogF = true;
      this.role_name = scode.username;
      this.usernume = scode.role_name;
      this.ID = scode.id;
    },

    //确认
    enterclassifyname() {
      this.dialogF = false;
      console.log(this.valueT);
      let rid = Number();
      for (var i in this.nameArr) {
        console.log(this.nameArr[i].roleName);
        if (this.valueT === this.nameArr[i].roleName) {
          rid = this.nameArr[i].id;
        }
      }
      console.log(rid);
      console.log(this.ID);

      _product.allotr(this.ID, rid, this.token).then(res => {
        console.log(res);
        this.$message({
          message: res.data.meta.msg,
          type: "success"
        });
      });
    }
  },
  watch: {
    page: function(val) {
      _product.userItem(this.token, val, this.pagesize).then(res => {
        console.log(res);
        this.tableData = res.data.data.users;
        console.log(this.tableData);
        this.pagenum = res.data.data.total;
        console.log(this.pagenum);
      });
    }
  },
  valueT: function(val) {
    console.log(val);
  }
};
</script>
<style lang="scss" scoped>
.useritem {
  position: relative;
  .seritem_search {
    width: 586px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>