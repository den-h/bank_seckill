<template>
  <div class="all">
    <div class="fuzhu">
      <div class="sec">
        <div class="image">修改头像</div>
      </div>
      <div class="fir">
        <div class="one">姓名：</div>
        <div class="two">{{ name }}</div>
        <div class="three"></div>
      </div>
      <div class="fir">
        <div class="one">手机号：</div>
        <div class="two">{{ phone }}</div>
        <div class="three"></div>
      </div>
      <div class="fir">
        <div class="three">
          <div @click="changes" class="xiugai">修改密码</div>
        </div>
      </div>
    </div>
  </div>
  <div v-show="opens" id="change">
    <form action="">
      <div class="class1">
        旧密码：<input type="password" placeholder="请输入旧密码" id="old" />
      </div>
      <div class="class1">
        新密码：<input type="password" placeholder="请输入新密码" id="new1" />
      </div>
      <div class="class1">
        确认密码：<input
          type="password"
          placeholder="请再次输入新密码"
          id="new2"
        />
      </div>
    </form>
    <div class="class2">
      <div class="btn1" @click="submits">确认修改</div>
      <div class="btn2" @click="tuichu">取消</div>
    </div>
  </div>
</template>

<script scoped>
import axios from "axios";
export default {
  name: "PersonPage",
  data() {
    return {
      phone: "",
      name: "",
      opens: false,
      password:"",
      oldpassword:""
    };
  },
  methods: {
    changes() {
      this.opens = true;
    },
    tuichu() {
      var x = document.getElementById("old");
      var y = document.getElementById("new1");
      var z = document.getElementById("new2");

      x.value = "";
      y.value = "";
      z.value = "";

      this.opens = false;
    },
    submits() {
      var _this = this;
      var x = document.getElementById("old");
      var y = document.getElementById("new1");
      var z = document.getElementById("new2");




      if (y.value == z.value) {
        _this.password = y.value;
        _this.oldpassword = x.value;
        axios.post("/api/user/changePassword",{
          oldpassword:this.oldpassword,
          password:this.password
        }).then((res) => {
          if (res.data.code === 200) {
            _this.$message.success("密码更新成功");
            console.log("连接成功");
            x.value = "";
            y.value = "";
            z.value = "";
            _this.opens = false;
          }
          else if(res.data.code === 500210){
            this.$message.error("密码不正确");
          }
          else if(res.data.code === 500200){
            this.$message.error("密码修改失败");
          }
          else if(res.data.code === 500104){
            this.$message.error("权限错误");
            this.$router.push('/');
          }
          else if(res.data.code === 500217){
            this.$message.error("用户未登录");
            this.$router.push("/");
          }
        });
      } else {
        x.value = "";
        y.value = "";
        z.value = "";
        _this.$message.error("两次密码不一致；");
      }
    },
  },
  created() {
    var _this = this;
    axios.get("/api/user/getOne").then(
      (res) => {
        if (res.data.code === 200) {
          _this.phone = res.data.data.phone;
          _this.name = res.data.data.name;
        }
        else if(res.data.code === 500217) {
          this.$message.error("用户未登录");
          this.$router.push("/");
        }
        else if(res.data.code === 500104){
          this.$message.error("权限错误");
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
.xiugai {
  width: 90px;
  height: 40px;
  background-color: rgba(255, 121, 150);
  color: white;
  text-align: center;
  line-height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.xiugai:hover {
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: rgb(234, 4, 55);
}

.btn1 {
  width: 90px;
  height: 40px;
  background-color: rgba(255, 121, 150);
  color: white;
  text-align: center;
  line-height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.btn1:hover {
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: rgb(234, 4, 55);
}

.btn2 {
  width: 90px;
  height: 40px;
  background-color: rgb(242, 242, 242);
  color: black;
  text-align: center;
  line-height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.btn2:hover {
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: rgb(234, 4, 55);
  color: white;
}

#change {
  width: 550px;
  height: 450px;
  position: relative;
  margin-top: -550px;
  margin-left: 375px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 3px 15px gray;
  display: flex;
  justify-content: center;
  align-content: space-around;
  flex-wrap: wrap;
}

form {
  display: flex;
  justify-content: center;
  align-content: space-around;
  flex-wrap: wrap;
  height: 250px;
}

.class1 {
  width: 60%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  line-height: 50px;
}

#change > div {
  margin-top: 20px;
}

.class1 input {
  margin-top: 10px;
  width: 200px;
  height: 30px;
  line-height: 50px;
  border-radius: 5px;
  border: gray solid 1px;
}

.class2 {
  width: 50%;
  display: flex;
  justify-content: space-between;
}

.all {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.fuzhu {
  margin-top: 50px;
  width: 500px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-content: space-around;
  flex-wrap: wrap;
  border-radius: 15px;
  background-color: rgb(242, 242, 242);
  box-shadow: 3px 3px 12px gray;
}

.fir {
  width: 85%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid rgb(144, 147, 154); */
}
.sec {
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.one {
  width: 25%;
}
.two {
  width: 50%;
}
.three {
  width: 50%;
}

.image {
  width: 130px;
  height: 130px;
  border-radius: 65px;
  background-image: url("../assets/4.jpg");
  position: center;
  background-size: cover;
  opacity: 0.5;
  text-align: center;
  line-height: 130px;
  color: white;
  cursor: pointer;
}
</style>