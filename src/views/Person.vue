<template>
  <div id="all">
    <div id="mains">
      <router-link to="/Main">返回主页面</router-link>
    </div>
    <div id="nav">
      <img src="../assets/4.jpg" alt="" />
      <ul>
        <li class="router-link-active"><router-link to="/Person/PersonPage">信息总览</router-link></li>
        <li class="router-link-active"><router-link to="/Person/PersonUpdate">账户流水</router-link></li>
        <li class="router-link-active"><router-link to="/Person/PersonStat">历史订单</router-link></li>
      </ul>
    </div>
    <div id="present">
      <div id="shanglan">
        <div></div>
        <div></div>
        <div><img src="../assets/4.jpg" alt="" /></div>
        <div @click="returnTo" id="returns">退出登录</div>
      </div>
      <div id="jiange">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script scoped>
import axios from "axios";
import Under from "../components/Under.vue";
export default {
  name: "Person",
  components: {
    Under,
  },
  methods: {
    returnTo() {
      axios.post('/api/user/logout').then((res)=>{
            if (res.data.code === 200) {
              this.$router.push("/");
              this.$message.info("成功")
            }
            else if(res.data.code === 500219){
              this.$message.error("用户退出登录失败");
            }
            else if(res.data.code === 500217){
              this.$message.error("用户未登录");
              this.$router.push("/");
            }
          },
          (error)=>{
            this.$message.error("连接失败");
          })
    },
  },
};
</script>

<style scoped>
#mains {
  width: 150px;
  height: 70px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  position: absolute;
  left: -50px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgb(67, 67, 67);
}
#mains:hover {
  left: 0;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}
#mains a {
  display: block;
  margin-left: 50px;
  height: 70px;
  line-height:70px;
}
#returns {
  width: 120px;
  height: 30px;
  border-radius: 20px;
  background-color: #fff;
  text-align: center;
  margin-left: 30px;
  line-height: 30px;
  cursor: pointer;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

#returns:hover {
  background-color: rgb(234, 4, 55);
  color: white;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

#top {
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
}

#all {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
}
#nav {
  border-right: 1px solid rgb(168, 157, 154);
  background-color: rgb(94, 94, 94);
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 13%;
}
ul {
  margin-top: 50px;
  height: 60vh;
  width: 205px;
}

li {
  margin-right: 6px;
  width: 200px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  list-style: none;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

li:hover {
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: rgb(67, 67, 67);
}

.router-link-exact-active {
  border-right: 5px solid goldenrod;
  background-color: rgb(67, 67, 67);
}

a {
  text-decoration: none;
  color: #ffffff;
  display: block;
  width: 200px;
  height: 100px;
  line-height: 100px;
}
li img {
  width: 25px;
  height: 25px;
}

img {
  margin-top: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
}


#present {
  width: 87%;
  height: 90vh;
}

#shanglan {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: rgb(242, 243, 240);
  height: 70px;
}

#shanglan img {
  margin-top: 0;
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

#jiange {
  margin-left: 20px;
}
</style>