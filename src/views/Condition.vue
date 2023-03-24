<template>
  <div>
    <Nav />
    <div id="condition">
      <div id="head">
        <h2>银行秒杀系统</h2>
        <div>
          <div>订单详情</div>
        </div>
      </div>
      <div id="first">
        <div class="rows">基本信息</div>
        <div class="rows">
          <div>订单编号：{{ orderid }}</div>
          <div>商品名称：{{ goodsname }}</div>
          <div>商品价格：{{ price }}</div>
          <div>购买份数：1</div>
        </div>
        <div class="rows">
          <div>下单时间：{{ time }}</div>
          <div>订单状态：{{ condition }}</div>
          <div>存款利率：{{ rate }}</div>
          <div>银行名称：湖南三湘银行</div>
        </div>
        <div class="rows">
          <div>购买用户：{{ usrname }}</div>
          <div>支付方式：银行卡支付</div>
        </div>
      </div>
      <div id="bottom">
        <div><button id="returns" @click="returnTo">返回主页面</button></div>
      </div>
    </div>
    <Under />
  </div>
</template>

<script scoped>
import axios from "axios";
import Nav from "../components/Nav.vue";
import Under from "../components/Under.vue";
export default {
  name: "Condition",
  components: {
    Nav,
    Under,
  },
  data() {
    return {
      orderid: "",
      usrname: "",
      number: "",
      goodsname: "",
      price: "",
      time: "",
      condition:0,
      rate: "",
      usr: "",
      // telephone: "",
      // usrnumber: "",
    };
  },
  created() {
    this.orderid = this.$route.query.orderid;
    console.log(this.orderid);
    axios
      .post("/api/order/showOrder", {
        orderid: this.orderid,
      })
      .then(
        (res) => {
          if (res.data.code === 200) {
            console.log("请求成功");
            this.goodsname = res.data.data.goodsName;
            this.price = res.data.data.goodsPrice;
            this.time = res.data.data.createDate;
            this.condition = res.data.data.status;
            if(this.condition===1)
              this.condition="已支付"
            else this.condition="未支付";
            this.rate = res.data.data.goodsRate;
            this.usr = res.data.data.userId;
            this.usrname = res.data.data.userName;
          }else  if(res.data.code === 500217){
            this.$message.error("用户未登录");
            this.$router.push('/');
          }
        },
        (error) => {
          console.log(error.data.message);
        }
      );
  },
  methods: {
    returnTo() {
      console.log("111");
      this.$router.push("/Main");
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

h2 {
  font-size: 37px;
  color: red;
  font-family: "Times New Roman", Times, serif;
}

#returns {
  width: 150px;
  height: 50px;
  background-color: whitesmoke;
  border: 1px solid gray;
  box-shadow: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: #fff;
}

#returns:hover {
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: rgb(234, 4, 55);
  color: #fff;
}

#fir-btn {
  width: 150px;
  height: 50px;
  background-color: whitesmoke;
  border: 1px solid gray;
  box-shadow: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: #fff;
}

#fir-btn:hover {
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: rgb(234, 4, 55);
  color: #fff;
}

#sec-btn {
  width: 150px;
  height: 50px;
  background-color: rgb(234, 4, 55);
  border: 1px solid gray;
  text-align: center;
}

#condition {
  display: flex;
  width: 100%;
  height: 1000px;
  justify-content: center;
  align-content: space-around;
  flex-wrap: wrap;
  /* background-color: rgb(242,243,240); */
  background-image: url("../assets/wenli.webp");
}

#head {
  width: 1200px;
  border: 1px solid gray;
  background-color: #fff;
  height: 100px;
  text-align: center;
}

#first {
  width: 1200px;
  border: 1px solid gray;
  background-color: #fff;
  height: 500px;
}

#second {
  width: 1200px;
  border: 1px solid gray;
  background-color: #fff;
}

#first .rows {
  width: 100%;
  height: 100px;
  line-height: 100px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dotted gray;
}

.rows div {
  width: 300px;
  height: 100px;
}

#second .rows {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px dotted gray;
}

#bottom {
  width: 1200px;
  height: 60px;
  display: flex;
  justify-content: space-around;
}

.rows:nth-child(1) {
  font-size: 30px;
  font-weight: 700;
}
</style>