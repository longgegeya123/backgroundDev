import HTTP from '../utils/http'
const _http = new HTTP();

class Product {
  //登录
  login(obj) {
    return _http.request({
      type: 'post',
      url: 'login',
      data: {
        username: obj.username,
        password: obj.password
      }
    })
  }
  //菜单
  menu(token) {
    return _http.request({
      type: 'get',
      url: 'menus',
      data: {
        token: token
      }
    })
  }

  //用户列表
  userItem(token, pagenum, pagesize) {
    return _http.request({
      type: 'get',
      url: `users?query=&pagenum=${pagenum}&pagesize=${pagesize}`,
      data: {
        token: token
      }
    })
  }

  //商品列表
  productItem(token,pagenum,pagesize) {
    return _http.request({
      type: 'get',
      url: `goods?&pagenum=${pagenum}&pagesize=${pagesize}`,
      data:{
        token:token
      }
    })
  }
  //用户搜索
  usersearch(token,pagenum,pagesize,queryr) {
    return _http.request({
      type: 'get',
      url: `users?query=${queryr}&pagenum=${pagenum}&pagesize=${pagesize}"`,
      data: {
        token:token,
      }
    })
  }

  //添加用户
  adduser(obj){
      return _http.request({
          type:'post',
          url:'users',
          data:{
            token:obj.token,
             username:obj.username,
             password:obj.password,
             email:obj.email,
             mobile:obj.mobile
          }
      })
  }

  //修改用户
  amenduser(obj,id){
    return _http.request({
        type:'put',
        url:`users/${id}`,
        data:{
          token:obj.token,
           username:obj.username,
           email:obj.email,
           mobile:obj.mobile
        }
    })
}

//删除用户

delUser(token,id){
    return _http.request({
        type:'delete',
        url:`users/${id}`,
        data:{
            token:token
        }
    })
}

//修改用户状态

updatestate(token,id,state){
  return _http.request({
     type:'put',
     url:`users/${id}/state/${state}`,
     data:{
       token:token
     }
  })
}


//角色分配
allotr(id,rid,token){
  return _http.request({
    type:'put',
    url:`users/${id}/role`,
    data:{
      token:token,
      rid:rid
    }
  })
}

//角色列表
nameitemr(token){
  return _http.request({
    type:'get',
    url:'roles',
    data:{
      token:token
    }
  })
}

//删除权限

delpower(token,id){
  return _http.request({
    type:'delete',
    url:`roles/${id}`,
    data:{
       token:token
    }
  })
}

//权限列表
poweritel(token){
   return _http.request({
     type:'get',
     url:'rights/list',
     data:{
       token:token
     }
   })
}

//权限列表
poweritelT(token){
  return _http.request({
    type:'get',
    url:'rights/tree',
    data:{
      token:token
    }
  })
}


//商品分类

productclassify(token,page){
  return _http.request({
    type:'get',
    url:`categories?type=${page}`,
    data:{
      token:token
    }
  })
}

//静态属性

staticproperty(token,id){
  return _http.request({
    type:'get',
    url:`categories/${id}/attributes?sel=only`,
    data:{
      token:token
    }
  })
}

//动态属性

dynamicstate(token,id){
  return _http.request({
    type:'get',
    url:`categories/${id}/attributes?sel=many`,
    data:{
      token:token,
    }
  })
}

//订单列表
  
order(token,page,pagesize){
  return _http.request({
    type:'get',
    url:`orders?params=&pagenum=${page}&pagesize=${pagesize}`,
    data:{
      token:token,
    }
  })
}

//数据报表

   statis(token){
     return _http.request({
       type:'get',
       url:'reports/type/1',
       data:{
         token:token
       }
     })
   }
  }
export default Product;
