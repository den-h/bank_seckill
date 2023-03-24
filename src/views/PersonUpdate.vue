<template>
 <div class="yu-e">余额：</div>
  <div id="fuzhu">
    <div id="forms">
      <el-table :data="account" style="width: 100%">
        <el-table-column prop="flow" label="交易金额" width="360" />
        <el-table-column prop="time" label="支付时间" />
      </el-table>
    </div>
    <el-pagination
        style="height: 50px;"
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
</template>

<script scoped>
import axios from "axios";
export default {
  name: "PersonStat",
  data() {
    return {
      account: [
        
      ],
      PageSize:12,
      CurrentPage:1,
      total:100
    };
  },
  created() {
    var _this = this;
    axios.post("/api/accountStat/getOne").then(
      (res) => {
        console.log("返回");
        if (res.data.code === 200) {
          this.account = res.data.data;
        }else if(res.data.code === 500217) {
          this.$message.error("用户未登录");
          this.$router.push("/");
        }
      },
      (error) => {
        this.$message.error(error.message);
      }
    );
  },
};
</script>

<style scoped>
.yu-e {
  width: 350px;
  height: 150px;
  border-radius: 5px;
  margin-bottom: 20px;
  line-height: 150px;
  font-size: 24px;
}
#forms {
  width: 100%;
}
</style>