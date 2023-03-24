<template>
  <div class="outer">
    <header>
      <img src="../assets/Logo-3.png" alt="">
    </header>
    <main>
      <div class="describe">
        <p>银行秒杀系统</p>

        <span>地点：长沙</span>
      </div>

      <div class="login">
        <div class="form">
          <p>欢迎登录</p>

          <div class="name">

            <el-input type="text" name="phone" :prefix-icon="Cellphone" placeholder="请输入手机号" v-model="phone" class="na" />


          </div>
          <div class="pasd">

            <el-input type="password" :prefix-icon="Lock" name="password" placeholder="请输入密码" v-model="password" class="pa"/>

          </div>
          <div class="sub">

            <input type="submit" name="submit" id="submit" value="登录" @click="login()"><br>

          </div>
          <div class="register">
            <span>还未注册?&nbsp;&nbsp;&nbsp;</span>
            <router-link to="/Register" active-class="active">点击注册</router-link>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <div class="left">

        <div class="img">
          <img src="../assets/logo.png" alt="">
        </div>

        <div class="call">
          <img src="../assets/phone.png" alt="">
          <p>24小时服务热线</p>
          <p>0731-96500</p>
        </div>
      </div>
      <div class="right">

        <div class="us">
          <p><a href="https://www.csxbank.com/gysx.html">关于我们</a></p>
          <ul>
          <li>
            <a href="https://www.csxbank.com/yhjj.html">银行简介</a>
          </li>
          <li>
            <a href="https://www.csxbank.com/fzlc.html">发展历程</a>
          </li>
          <li>
            <a href="https://www.csxbank.com/sxry.html">三湘荣誉</a>
          </li>
          <li>
            <a href="https://www.csxbank.com/xxp.html">影像潇湘</a>
          </li>
            <li>
              <a href="https://www.csxbank.com/sxdt.html">三湘动态</a>
            </li>
          </ul>


        </div>
        <div class="addr">
          <p><a href="https://www.csxbank.com/kffk.html">联系地址</a></p>
          <p>湖南省长沙市岳麓区滨江景观大道楷林国际D座</p>
          <p><a href="https://www.csxbank.com/Upload/Template/yizhu/attached/image/20210305/20210305190837_6354.png">询证函邮寄信息</a></p>
          <p><a href="https://www.csxbank.com/kffk.html">帮助中心</a></p>
          <p><a href="https://www.csxbank.com/map">网站地图</a></p>
        </div>

        <div class="complaint">
          <p>投诉受理</p>
          <ul>
            <li>电话渠道： 0731-96500   </li>
            <li>网络渠道： kfbos@csxbank.com</li>
            <li>信函渠道：湖南省长沙市岳麓区楷林国际A座20楼法律合规部</li>
            <li><a href="https://www.csxbank.com/Upload/Template/yizhu/Files/202009/727ed673-3908-491d-adda-a51a69e0f2d3.jpg">湖南三湘银行金融消费者投诉流程</a></li>
          </ul>
        </div>

        <div class="gzh">
          <p>官方微信公众号</p>
          <img src="../assets/2Dcode.jpg" alt="">

        </div>


      </div>
    </footer>

  </div>

</template>

<script>

import axios from "axios";
import {Cellphone,Lock} from "@element-plus/icons-vue";


export default {
  setup(){
    return{
      Cellphone,
      Lock
    }
  },
  name: "Login",
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  methods: {
    login() {
      let phone = this.phone;
      let password = this.password;
      let phonereg = /[0-9]{11}$/g;
      let passreg = /[a-zA-Z0-9]{5,16}$/g;
      if (phonereg.test(phone) !== true) {
        alert("手机号不规范，请输入正确的手机号码");
      } else if (passreg.test(password) !== true) {
        alert("密码应以字母开头，在5-16位之间，只包含数字字母，请重新输入");
      }
      else{
        axios.post('/api/user/login', {
          phone: this.phone,
          password: this.password
        }).then((res) => {
          if (res.data.code === 200) {
            if (!res.data.data) {
              console.log(res);
              this.$router.push('/Main');
              this.$message.success("登录成功")
            }
            else {
              this.$router.push('/Admin/Allgoods')
            }
          } else if (res.data.code === 500211) {
            this.$message.error("手机号码格式不正确")
          } else if (res.data.code === 500215) {
            this.$message.error("用户未注册")
          } else if (res.data.code === 500210) {
            this.$message.error("密码不正确")
          }else if(res.data.code===500){
            this.$message.error("服务端异常，请稍后重试");
          }
        })
      }
      }
  },
  mounted() {
    axios.post('/api/user/hasLogin').then(res=>{
      if(res.data.code===200)
        this.$router.push('/Main');
    }).catch(error=>{
      console.log(error);
    })
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 60px;
  background-color: white;
}

header img {
  margin: 10px 0 10px 20px;
}

main {
  width: 100%;
  height: 600px;
  background-image: url("../assets/wallhaven-odv9z7.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.describe {
  width: 50%;
  height: 600px;
  float: left;
  color: black;
}

.describe p {

  font-size: 40px;
  margin: 170px 0 0 130px;
}

.describe span {
  display: block;
  margin: 50px 0 0 150px;

}

.login {
  width: 50%;
  height: 600px;
  float: right;
}

.login .form {
  width: 55%;
  height: 400px;
  margin: 100px auto;
  border: 1px darkcyan solid;
  border-radius: 10px;
  text-align: center;
  background-color: rgb(255, 255, 255,0.5);
}

.login .form p {
  color: black;
  font-size: 30px;
  margin-top: 60px;
}

.name,
.pasd,
.sub {
  margin: 20px 0 20px 0;
  text-align: center;
}

.pasd .pa{
  width: 200px;
  height: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 3px #aaa;
  border: none;
}

.name .na{
  width: 200px;
  height: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 3px #aaa;
  border: none;
}

#submit {
  text-align: center;
  width: 170px;
  height: 30px;
  background-color:#EE4C4F;
  border-radius: 5px;
  border: none;
  color: white;
}

footer {
  height: 161px;
  background-color: #b5b6b9;
  color: white;


}

.left {
  height: 0;
  width: 20%;
  border-top: 161px solid #EE4C4F;
  border-right: 50px solid transparent;
  position: relative;
  float: left;
  color: #F5F5F7;
}
.left .img {
  width: 100%;
  position: absolute;
  top: -140px;
  left: 20px;
}

.left  .call p + p {
  font-size: 30px;
}

.left .call {
  width: 100%;
  position: absolute;
  top: -80px;
  left: 40px;
}

.left .call img{
  width: 30px;
  float: left;
}

.right {
  float: right;
  width: 75%;
}

.right .us {
  width: 20%;
  height: 161px;
  float: left;
}

footer a{
  text-decoration: none;
  color: white ;
}

.us p{
  margin-top: 20px;
  color: white;
  font-size: 15px;
}
.us li{
  list-style: none;
  margin-top: 3px;
  font-size: 10px;
}
.addr{
  width: 20%;
  float: left;
}
.addr p{
  margin-top: 3px;
  font-size: 10px;
}
.addr p:first-child{
  margin-top: 20px;
  font-size: 15px;
}
.addr p:nth-child(4){
  font-size: 15px;
}
.complaint{
  width: 25%;
  float: left;
  margin-left: 100px;
}
.complaint p{
  margin-top: 20px;
  font-size: 15px;
}
.complaint li{
  list-style: none;
  font-size: 10px;
  margin-top: 3px;
}
.gzh{
  float: left;
  margin-left: 80px;
}
.gzh p{
  margin-top: 20px;
  font-size: 15px;
}
.gzh img{
  width: 80px;
  margin-top: 20px;
  margin-left: 12px;
}
</style>

