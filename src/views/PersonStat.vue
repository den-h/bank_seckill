<template>
  <div id="fuzhu">
    <div id="forms">
      <div class="tou">
        <ul>
          <li>秒杀产品名字</li>
          <li>订单编号</li>
          <li>下单时间</li>
          <li>支付状态</li>
        </ul>  
      </div>
      <div class="you" v-show="account.length">
        <record v-for="i in account" :key="i.orderid" :i="i"/>
      </div>
      <div v-show="!account.length" class="tidai">
        No Data
      </div>
    </div>
  </div>
</template>

<script scoped>
import axios from "axios";
import record from "../components/record.vue"
export default {
  name: "PersonStat",
  components:{
    record,
  },
  data() {
    return {
      account: [
      ],
    };
  },
  created() {
    axios.post("/api/order/selectUserOrder", { userid: this.id }).then(
      (res) => {
        console.log("返回");
        if (res.data.code === 200) {
          console.log(res.data.message);
          this.account = res.data.data;
          console.log(res.data.data);
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
#forms {
  width: 100%;
}
.tou {
  border-bottom: 1px solid rgb(237,240,246);
}
.tou ul{
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 45px;
}

.tou li {
  font-weight: 700;
  width: 300px;
  height: 45px;
  color: rgb(144,147,154);
  list-style: none;
  line-height: 50px;
}
.you {
  width: 100%;
}

.tidai {
  width: 100%;
  height: 200px;
  text-align: center;
  line-height: 200px;
  color: rgb(154,155,161);
  border-bottom: 1px solid rgb(237,240,246);

}
</style>