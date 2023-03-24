<template>
  <div id="condition">
    <div id="first">
      <div class="rows">订单信息</div>
      <div class="rows">
        <div>订单编号：{{ id }}</div>
        <div>商品价格：{{ price }}</div>
        <div>购买份数：1</div>
      </div>
      <div class="rows">
        <div>下单时间：{{ time }}</div>
        <div>订单状态：{{ condition }}</div>
        <div>存款利率：{{ rate }}</div>
      </div>
      <div class="rows">
        <div>下单时间：{{ time }}</div>
        <div>支付时间：{{time2}}</div>
        <div>银行名称：湖南三湘银行</div>
      </div>
    </div>
    <div id="bottom">
      <div><button id="returns" @click="returnTo">返回</button></div>
    </div>
  </div>
</template>

<script scoped>
import axios from "axios";
export default {
  name: "AfterOrder",
  props: ["orderid"],
  data() {
    return {
      id: this.$route.query.orderid,
      goodsname: "",
      price: "",
      time: "",
      condition: "",
      rate: "",
      time2:"",
      number:"",
    };
  },
  created() {
    console.log(this.$route.query.orderid);
    axios.post("/api/order/selectOneOrder", { orderid: this.id }).then((res) => {
      if (res.data.code === 200) {
        this.goodsname = res.data.data.goodsName;
        this.price = res.data.data.goodsPrice;
        this.time = res.data.data.createDate;
        this.time2 = res.data.data.payDate;
        this.condition = res.data.data.status?"已支付":"未支付";
        this.rate = res.data.data.goodsRate;
      }
      else if(res.data.code === 500217){
        this.$message.error("用户未登录");
        this.$router.push("/");
      }
    },
    (error)=>{
      this.$message.error(error.message);
    });
  },
  methods: {
    returnTo() {
      console.log("111");
      this.$router.push("/Person/PersonStat");
    },
  },
  mounted(){
    console.log(this.$route.query.orderid);
  }

};
</script>

<style scoped>
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
  height: 650px;
  justify-content: center;
  align-content: space-around;
  flex-wrap: wrap;
}

#first {
  width: 1000px;
  border: 1px solid gray;
  background-color: #fff;
  height: 450px;
}

#second {
  width: 1000px;
  border: 1px solid gray;
  background-color: #fff;
}

#first .rows {
  width: 100%;
  height: 90px;
  line-height: 90px;
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
  width: 1000px;
  height: 50px;
  display: flex;
  justify-content: space-around;
}

.rows:nth-child(1) {
  font-size: 20px;
  font-weight: 700;
}
</style>