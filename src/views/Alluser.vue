<template>
  <div>
    <div>

      <el-table
          :data="position"
          border
          style="width: 98%;margin:10px 10px;">

        <el-table-column
            fixed
            label="秒杀成功时间"
            width="200">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.payDate }}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="商品id"
            width="200">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.goodsId}}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="商品名称"
            width="200">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.goodsName}}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="用户Id"
            width="200">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.userId}}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="用户姓名">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>


      </el-table>

      <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="total"
          class="mt-4"
          :page-size="PageSize"
          :current-page="CurrentPage"
          @current-change="handleCurrentChange"
      />

    </div>

  </div>

</template>

<script scoped>
import axios from "axios";

export default {
  name: "Alluser",
  data() {
    return {

      position: [{
        payDate:'',
        goodsId: '',
        goodsName: '',
        userName:'',
        userId:''
      }],
      total:100,
      CurrentPage:1,
      PageSize:12

    }
  },

  methods: {
    handleCurrentChange(val){
      this.CurrentPage=val;
      this.initposition();
    }
    },
  mounted() {
   axios.post('/api/user/seckillSuccess',{
     currentPage:this.CurrentPage
   }).then(res=>{
     if(res.data.code===200)
     {
       // this.total=res.data.total;
       this.position=res.data.data;
     }else if(res.data.code === 500217){
               this.$message.error("用户未登录");
               this.$router.push('/');
             }
   }).catch(error=>{
     console.log(error);
   })
  }
}
</script>

<style scoped>
.el-pagination {
  width: 50%;
  margin: 20px auto;
  height: 50px;
}
.el-table{
  height: 650px;
}

</style>