<template>
  <div id="total">
    <div id="up">
      <div id="nav">
        <img src="../assets/Logo-3.png" alt="三湘银行" />
        <div id="infor" @mouseenter="Enter" @mouseleave="Out">
          <img src="../assets/Circle.png" />个人信息
          <ul>
            <li v-show="isshow"><router-link to="/Person/PersonPage">个人主页</router-link></li>
            <li v-show="isshow" @click="returnTo" style="cursor:pointer">退出登录</li>
          </ul>
        </div>
      </div>
      <div id="symbol">
        <div id="special">
          <p id="fir-p">-中部地区首家民营银行-</p>
          <p id="sec-p">湖南三湘银行·老百姓自己的银行</p>
        </div>
      </div>
      <div id="symbol-two">银行秒杀系统(Bank Second Kill System)</div>
    </div>
    <div class="down">
      <div>
        <div id="shows">
          <p class="first-p">高利率，低风险</p>
          <carousels />
        </div>
      </div>
    </div>
    <div id="middle">
      <!-- <div>
        <carousels />
      </div> -->
    </div>
    <div class="down">
      <div id="first-part">
        <p class="parts">秒杀商品</p>
        <div class="present" v-show="two.length">
          <detail v-for="i in two" :key="i.id" :i="i"></detail>
        </div>
        <div class="present-2" v-show="!two.length">
          <img src="../assets/loading-2.gif" alt="" />
        </div>
      </div>
    </div>
    <Sub ref="Sub"/>
  </div>
  <Under />
</template>

<script scoped>
import detail from "../components/detail.vue";
import carousels from "../components/carousels.vue";
import axios from "axios";
import Under from "../components/Under.vue";
import Sub from "../components/Sub.vue";
export default {
  name: "Main",
  components: {
    detail,
    carousels,
    Under,
    Sub,
  },
  data() {
    return {
      two: [],
      uid: "",
      // user: {},
      isshow:false,
    };
  },
  created() {
    axios.post("api/goods/all").then(
      (res) => {
        if (res.data.code === 200) {
          console.log(res.data.message);
          this.two = res.data.data;
          // this.user = res.data.data.user;
          console.log(this.two);
        }else if (res.data.code === 500217) {
          this.$message.error("用户未登录");
          this.$router.push('/');
        }else if(res.data,code === 500104){
          this.$message.error("权限错误");
          this.$router.push("/");
        }
      },
      (error) => {
        this.$message.error(error.message);
      }
    );
  },
  mounted() {
    console.log(this.two);
  },
  methods: {
    Enter() {
      console.log("此函数进入了");
      this.isshow=true;
    },
    Out(){
      console.log("鼠标出去了");
      this.isshow=false;
    },
    returnTo() {
      axios.get('/api/user/logout').then((res) => {
            if (res.data.code === 200) {
              this.$router.push("/");
              console.log("成功")
            }
            else if(res.data.code === 500219){
              this.$message.error("用户退出登录失败");
            }
            else if(res.data.code === 500217){
              this.$message.error("用户未登录");
              this.$router.push("/");
            }
          },
          (error) => {
            this.$message.error("连接失败");
          })
    }
  },
  beforeRouteLeave (to, from, next) {
    next();
    console.log(this.$refs.Sub.timer);
    console.log("路由跳转了")
    if(this.$refs.Sub.timer){
      clearInterval(this.$refs.Sub.timer);
      
    }
  }
};
</script>

<style scoped>
@keyframes  fadeEffect{
  from{
    opacity: 0;
  }
  to {
    opacity: 1;
  }

}

@-webkit-keyframes  fadeEffect{
  from{
    opacity: 0;
  }
  to {
    opacity: 1;
  }

}
#special {
  border-radius: 5px;
}

#fir-p {
  margin-top: 20px;
  font-size: 34px;
  margin-bottom: 30px;
  color: rgb(234, 4, 55);
  text-shadow: 5px 0 7px gray;
  animation: fadeEffect  3s;
  -webkit-animation: fadeEffect  3s;
}

#sec-p {
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  font-family: Times, serif;
  font-size: 50px;
  font-weight: 700;
  letter-spacing: 2px;
  color: rgb(234, 4, 55);
  text-shadow: 5px 0 7px gray;
  animation: fadeEffect  3s;
  -webkit-animation: fadeEffect  3s;
}
#total {
  width: 100%;
  /* background-color: rgb(0, 0, 0); */
  background-color: rgb(242, 243, 240);
  color: black;
  text-align: center;
}

#up {
  width: 100%;
  height: 800px;
  background-image: url("../assets/Main-bac.jpg");
  background-size: cover;
  background-position: 0 0;
}


#nav {
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: rgb(242, 243, 240); */
}

#nav:hover {
  background-color: rgb(199,206,222,0.7);
}


#infor {
  margin-right: 20px;
  height: 30px;
  width: 130px;
  text-align: center;
  line-height: 30px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  border: 1px solid rgb(152,165,189);
  border-radius: 15px;
  background-color: rgb(152,165,189);
  color: black;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

#infor img {
  height: 30px;
  width: 30px;
  border-radius: 15px;
}

#infor:hover {
  color: white;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: rgb(234, 4, 55);
  border: 1px solid rgb(234, 4, 55);
  border-radius: 0px;
}

#infor li {
  color: black;
  list-style: none;
  height: 30px;
  width: 130px;
  background-color: #fff;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

#infor li a {
  color: black;
  text-decoration: none;
}

#infor li a:hover {
  color: #fff;
}

#infor li:hover {
  color: white;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: rgb(234, 4, 55);
}

#symbol {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  clear: both;
}

h1 {
  font-size: 60px;
}

#symbol-two {
  text-align: end;
  font-family: "Times New Roman", Times, serif;
  padding-right: 30px;
  font-size: 25px;
  /* text-shadow: 3px 0px 3px white; */
  color: rgb(234, 4, 55);
  animation: fadeEffect  5s;
  -webkit-animation: fadeEffect  5s;
}

.first-p {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 50px;
}

#middle {
  margin-top: 150px;
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-image: url("../assets/pic2.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.2;
}

#middle > div {
  width: 100%;
  height: 350px;
}

.parts {
  font-size: 40px;
  font-weight: 700;
}
.down {
  margin-top: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.down > div {
  width: 1200px;
}
.present {
  width: 1200px;
  display: flex;
  margin-top: 150px;
  align-content: space-between;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 200px;
}

.present-2 {
  margin-top: 150px;
  width: 1200px;
  height: 800px;
  background-color: #fff;
  margin-bottom: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.parts {
  margin-top: 20px;
}
</style>