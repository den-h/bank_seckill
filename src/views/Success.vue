<template>
  <div class="outer">

    <div class="nav">
      <img src=../assets/Logo-3.png alt="">
      <span>|</span>
    </div>

    <div class="underline"></div>

    <div class="success">
      <p>支付成功!</p>
      <el-button type="danger" id="view" @click="view">查看订单</el-button>
      <el-button type="danger" id="return" @click="returns">返回主页</el-button>
    </div>
  </div>
</template>

<script scoped>
import axios from "axios";
export default {
  name: "Success",
  data() {
    return {
      orderid: '',
    }

  },
  methods: {
    view() {
      this.$router.push({
        path: '/Condition',
        query: {
          orderid: this.orderid,
        }
      });
      console.log("hhh")
    },
    returns() {
      this.$router.push("/Main");
    }
  },
  created() {
    this.orderid = this.$route.query.orderid;
    console.log("对对对");
  console.log(this.orderid);
  },
  mounted() {
    clearInterval();
    axios.post('/api/user/intercept').then(
        res => {
          if (res.data.code === 500217) {
            this.$message.error("用户未登录");
            this.$router.push('/');
          }
        }
    ).catch(error => {
      console.log(error);
    })

  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.nav {
  width: 70%;
  height: 80px;
  margin: 0 auto;

}

.nav img {
  height: 30px;
  margin-top: 25px;
}

.nav span {
  font-size: 40px;
  margin-left: 20px;
  color: #aaaaaa;
}

.underline {
  width: 100%;
  background-color: #EE4C4F;
  height: 2px;
}

.success {
  width: 600px;
  height: 400px;
  margin: 150px auto;
  position: relative;
}

.success p {
  text-align: center;
  font-size: 30px;
  width: 100%;
  height: 60px;
}

#view {
  width: 100px;
  height: 40px;
  margin-top: 20px;
  margin-left: 160px;
}

#return {
  width: 100px;
  height: 40px;
  margin-top: 20px;
  position: absolute;
  right: 160px;
}
</style>