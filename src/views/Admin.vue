<template>
  <div class="outer">

    <header>
      <img src="../assets/Logo-2.png" alt="">
      <el-button type="danger" @click="exit">退出登录</el-button>
    </header>

    <el-aside>


      <el-menu
          active-text-color="#F46C6C"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          :router="true"
          text-color="#fff"
      >
        <el-menu-item index="/Admin/Allgoods">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>商品信息</span>
        </el-menu-item>
        <el-menu-item index="/Admin/Alluser">
          <el-icon>
            <tickets/>
          </el-icon>
          <span>秒杀成功信息</span>
        </el-menu-item>
        <el-menu-item index="/Admin/Screen">
          <el-icon>
            <files/>
          </el-icon>
          <span>初筛信息</span>
        </el-menu-item>
        <el-menu-item index="/Admin/Update">
          <el-icon>
            <set-up/>
          </el-icon>
          <span>初筛设置</span>
        </el-menu-item>
        <el-menu-item index="/Admin/Account">
          <el-icon>
            <printer/>
          </el-icon>
          <span>账户流水</span>
        </el-menu-item>
      </el-menu>

    </el-aside>

    <div class="show">
      <router-view>
      </router-view>
    </div>
    <!--    <footer>-->
    <!--      <p>2021  Copyright 湖南三湘银行股份有限公司   备案号：湘ICP备17012314号</p>-->
    <!--    </footer>-->


  </div>
</template>

<script>

import {
  Menu as IconMenu,
  Printer,
  Files,
  SetUp,
  Tickets
} from '@element-plus/icons-vue'
import axios from "axios";

export default {
  name: "Admin",
  components: {
    IconMenu,

    Printer,

    Files,
    SetUp,
    Tickets
  },
  methods: {

    exit() {
      if (confirm("确定退出吗？")) {
        axios.post('/api/user/logout').then(res => {
          if (res.data.code === 200) {
            this.$router.replace('/', () => {
              window.location.reload();
            });
          }
        }).catch(error => {
          console.log(error);
        })

      }
    }
  },
  mounted() {
    axios.post('/api/user/intercept').then(
        res => {
          if (res.data.code === 500217) {
            console.log("登陆拦截");
            this.$message.error("用户未登录");
            this.$router.push('/');
          } else this.$router.push('/Admin/Allgoods')
        }
    ).catch(error => {
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
  background-color: #232730;
}

header img {
  margin: 10px 0 10px 20px;
}


.el-button {
  position: absolute;
  right: 30px;
  margin-top: 15px;
}

a {
  text-decoration: none;
  color: white;
}

.nav p {
  float: left;
  line-height: 60px;
  margin-left: 20px;
  font-size: 20px;
}

.nav p + p {
  color: #be6262;
  position: absolute;
  right: 30px;
}

.el-aside {
  width: 20%;
  height: 800px;
  float: left;
  background-color: #545C63;
  text-align: center;
}

.el-menu .el-menu-item {
  display: block;
  font-size: 15px;
}

.el-menu {
  border: none;
}


.show {
  width: 80%;
  float: left;
  height: 800px;

}

/*footer{*/
/*  height: 70px;*/
/*  background-color: #232730 ;*/
/*  width: 100%;*/
/*  float: left;*/
/*}*/
/*footer p{*/
/*  font-size: 10px;*/
/*  margin-top: 50px;*/
/*  text-align: center;*/
/*}*/

</style>