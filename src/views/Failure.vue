<template>
  <div class="outer">

    <div class="nav">
      <img src=../assets/Logo-3.png alt="">
      <span>|</span>
    </div>

    <div class="underline"></div>


    <p>购买失败</p>

    <el-button type="danger" @click="returns" class="bt">返回主页</el-button>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Failure",
  methods:{
    returns() {
      this.$router.push('/Main');
    }
  },
  mounted() {
    clearInterval();
    axios.post('/api/user/intercept').then(

        res=>{
          if(res.data.code === 500217){
            console.log("登陆拦截");
            this.$message.error("用户未登录");
            this.$router.push('/');
          }
        }
    ).catch(error=>{
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

.nav{
  width: 70%;
  height: 80px;
  margin: 0 auto;
}
.nav img{
  height: 30px;
  margin-top: 25px;
}
.nav span{
  font-size: 40px;
  margin-left: 20px;
  color:#aaaaaa;
}
.underline{
  width: 100%;
  background-color: #EE4C4F;
  height: 2px;
}
p {
  margin-top: 100px;
  text-align: center;
  font-size: 40px;
}

.bt{
  width: 100px;
  height: 40px;
  margin: 40px auto;
  display: block;
}

</style>