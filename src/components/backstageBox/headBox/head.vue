<template>
    <div class="head">
        <p>愣子后台管理系统</p>
        <div>
             <el-button type="info">退出</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'Head'
}
</script>
<style lang="scss" scoped>
      .head{
          height:60px;
          width: 100%;
          line-height: 60px;
          display: flex;
          justify-content: space-between;
          p{
              font-size: 25px;
              color: white;
              text-indent: 2rem;
              width: 240px;
          }
          div{
              margin-right: 18px;
          }
      }
</style>