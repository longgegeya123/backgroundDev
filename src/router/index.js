import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../components/Home/homepage.vue'//首页
import Viewr from "../components/backstageBox/viewr.vue"//视图
import Useritem from "../components/backstageBox/leftBox/userquenn/useritem.vue"//用户列表
import Nameitem from "../components/backstageBox/leftBox/prwodquenn/nameitem.vue"//角色列表
import Quennitem from "../components/backstageBox/leftBox/prwodquenn/quennitem.vue"//权限列表
import Productitem from "../components/backstageBox/leftBox/productquenn/productitem.vue"//商品列表
import Productclassify from "../components/backstageBox/leftBox/productquenn/productclassify.vue"//商品分类
import Classifysorting from "../components/backstageBox/leftBox/productquenn/classifysorting.vue" //分类参数
import OrderItem from "../components/backstageBox/leftBox/orderquenn/orderItem.vue"//订单列表
import  Statistics from "../components/backstageBox/leftBox/datastatistics/statistics.vue" //数据报表
Vue.use(Router)

export default new Router({
  routes: [
       {
         path:'/homepage',
         name:'Homepage',
         component:Homepage
       },
       {
         path:'/viewr',
         name:'Viewr',
         component:Viewr,
         children:[
           {
             path:'useritem',//用户列表
             name:'Useritem',
             component:Useritem
           },
           {
            path:'nameitem',//角色列表
            name:'Nameitem',
            component:Nameitem
           },
           {
            path:'quennitem',//权限列表
            name:'Quennitem',
            component:Quennitem
           },
           {
            path:'productitem',//商品列表
            name:'Productitem',
            component:Productitem
           },
           {
            path:'productclassify',//商品分类
            name:'Productclassify',
            component:Productclassify
           },
           {
            path:'classifysorting',//分类参数
            name:'classifysorting',
            component:Classifysorting
           },
           {
            path:'orderItem',//订单参数
            name:'OrderItem',
            component:OrderItem
           },
           {
            path:'statistics',//数据报表
            name:'Statistics',
            component:Statistics
           },
         ]
       },
       {
         path:'/',
         redirect:'/homepage'
       }
  ]
})
 