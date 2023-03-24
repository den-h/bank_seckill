<template>
  <div id="fuzhu">
    <div id="all">

      <p>账户流水:{{banlance}}</p>

      <el-table
          :data="account"
          border
          style="width: 98%;margin-left: 10px;margin-top: 10px">

        <el-table-column
            label="流水"
            fixed
            width="400">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.flow }}</span>
          </template>
        </el-table-column>


        <el-table-column
            label=交易时间>
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </template>
        </el-table-column>

<!--        <el-table-column-->
<!--            label=账户余额>-->
<!--          <template #default="scope">-->
<!--            <span style="margin-left: 10px">{{ scope.row.balance }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
  name: "AccountStat",
  data() {
    return {
      id: "",
      account: [
      ],
      balance:'',
      total:100,
      CurrentPage:1,
      PageSize:12
    };
  },

  mounted() {
    axios.post("/api/accountStat/getAll",{
      currentPage:this.CurrentPage
    }).then(
        (res) => {
          console.log("返回");
          if (res.data.code === 200) {

            this.account = res.data.data;

            // this.balance=res.data.data.get(0).balance;
            let k=this.account;
            for(let i=0;i<k.length;i++)
            {
              if(i==0) {
                this.balance = k[i].balance;
                // this.total=k[i].total;
              }
              if(k[i].flow>0)
                k[i].flow="+"+ k[i].flow;

            }

            console.log(res.data.data);
          }else if(res.data.code === 500217){
            console.log("登陆拦截");
            this.$message.error("用户未登录");
            this.$router.push('/');
          }

        },
        (error) => {
          console.log("错了" + error.message);
        }
    );
  }
};
</script>

<style scoped>
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
#in {
  width: 300px;
  height: 30px;
  line-height: 30px;
}
#all {
  width: 100%;
}
 p{
  display: block;
  margin:15px 15px;
   font-size: 20px;
}
.el-pagination {
  width: 50%;
  margin: 20px auto;
  height: 50px;
}
.el-table{
  height: 600px;
}

</style>