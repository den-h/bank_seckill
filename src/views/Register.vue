<template>
  <div>
    <Nav />
    <div id="fuzhu">
      <div id="outside">
        <div id="title">
          <p class="big">Bank Second Kill System</p>
          <p class="small">发际线也和我作队</p>
        </div>
        <div id="inner">
          <div id="in-top">
            <p class="greens">欢迎注册</p>
            <p class="owns">
              已有账号？<router-link to="/">登录</router-link>
            </p>
          </div>
          <form action="">
            <table cellspacing="10px" padding="0">
              <tr>
                <td>真实姓名：</td>
                <td>
                  <input
                    type="text"
                    id="username"
                    placeholder="请输入您的真实姓名"
                  />
                </td>
              </tr>
              <tr>
                <td>身份证号：</td>
                <td>
                  <input
                    type="text"
                    id="number"
                    @blur="Check4"
                    placeholder="请输入您的身份证号"
                  />
                </td>
                <td style="font-size: 12px" class="under">{{ Rmsg5 }}</td>
              </tr>
              <tr>
                <td>手机号：</td>
                <td>
                  <input
                    type="text"
                    id="phonenumber"
                    @blur="Check3"
                    placeholder="请输入您的手机号"
                  />
                </td>
                <td style="font-size: 12px" class="under">{{ Rmsg4 }}</td>
              </tr>
              <tr>
                <td>设置密码：</td>
                <td>
                  <input
                    type="password"
                    id="password"
                    :onblur="Check2"
                    placeholder="请输入密码"
                  />
                </td>
                <td style="font-size: 12px" class="under">{{ Rmsg2 }}</td>
              </tr>
              <tr>
                <td>确认密码：</td>
                <td>
                  <input
                    type="password"
                    @blur="Check"
                    id="repeat"
                    placeholder="请再次输入密码"
                  />
                </td>
                <td style="font-size: 12px" class="under">{{ Rmsg3 }}</td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    type="button"
                    value="同意并开通用户"
                    id="buttons"
                    @click="getdatas()"
                  />
                </td>
              </tr>
              <tr>
                <td style="float: right; text-align: center">
                  <input
                    type="checkbox"
                    name="确认"
                    id="confirm"
                    v-model="flag5"
                  />
                </td>
                <td>
                  <p class="grays">
                    <span style="display: none">{{ flag5 }}</span>
                    我已阅读并同意<a href="#">《隐私政策》</a>和<a href="#"
                      >《用户协议》</a
                    >
                  </p>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
    <Under />
  </div>
</template>

<script scoped>
import axios from "axios";
import Under from "../components/Under.vue";
import Nav from "../components/Nav.vue";
export default {
  name: "Register",
  components: {
    Under,
    Nav,
  },
  data() {
    return {
      Rmsg2: "",
      Rmsg3: "",
      Rmsg4: "",
      Rmsg5: "",

      flag2: false,
      flag3: false,
      flag4: false,
      flag5: false,

      flag: false,
      resopnd: null,
    };
  },
  methods: {
    Check2() {
      var y = document.getElementById("password").value;
      if (y.trim().length == 0) {
        this.Rmsg2 = "密码不能为空";
      } else {
        if (/[a-zA-Z0-9]{4,15}$/.test(y)) {
          this.Rmsg2 = "密码格式正确";
          this.flag2 = true;
        } else {
          this.Rmsg2 = "密码是由5-16个数字或字母组成";
        }
      }
      console.log("可以调用2函数");
    },
    Check3() {
      var z = document.getElementById("phonenumber").value;
      if (z.trim().length == 0) {
        this.Rmsg4 = "手机号不能为空";
      } else {
        if (/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(z)) {
          this.Rmsg4 = "手机号格式正确";
          this.flag3 = true;
        } else {
          this.Rmsg4 = "手机号格式不正确";
        }
      } 
      console.log("可以调用3函数");
    },
    Check4() {
      var w = document.getElementById("number").value;
      if (w.trim().length == 0) {
        this.Rmsg5 = "身份证号不能为空";
      } else {
        if (/\d{4}\d{2}\d{8}\d{3}([0-9]|X)$/.test(w)) {
          this.Rmsg5 = "身份证格式正确";
          this.flag4 = true;
        } else {
          this.Rmsg5 = "身份证格式错误";
        }
      }
      console.log("可以调用4函数");
    },

    Check() {
      var x = document.getElementById("password").value;
      var y = document.getElementById("repeat").value;

      if (y.trim() == 0) {
        this.Rmsg3 = "密码不能为空";
      } else {
        if (x == y) {
          this.flag = true;
          this.Rmsg3 = "";
        } else {
          this.Rmsg3 = "两次密码不一致";
        }
      }
    },
    getdatas() {
      if (this.flag2 && this.flag3 && this.flag4 && this.flag5 && this.flag) {
        axios.post("/api/user/register", this.Infor).then((res) => {
          if (res.data.code === 200) {
            console.log("请求成功", res.data.message);
            this.$router.push("/");
          } else if (res.data.code === 500216) {
            alert("注册失败，请重试");
          } else if (res.data.code === 500211) {
            alert("手机号码格式不正确");
          } else if(res.data.code === 500218){
            alert("身份证验证未通过");
          }
        }).catch(error => {
          console.log(error);
        });
      } else if (
        !this.flag5 &&
        this.flag2 &&
        this.flag3 &&
        this.flag4 &&
        this.flag
      ) {
        alert("请勾选同意书！");
      } else {
        alert("请遵循各输入框提示！");
      }
    },
  },
  computed: {
    Infor() {
      var x = document.getElementById("username").value;
      var y = document.getElementById("password").value;
      var z = document.getElementById("phonenumber").value;
      var w = document.getElementById("number").value;
      var name;
      var password;
      var phone;
      var identity;


        name = x;

      if (this.flag2 && this.flag) {
        password = y;
      }
      if (this.flag3) {
        phone = z;
      }
      if (this.flag4) {
        identity = w;
      }
      return {
        name,
        password,
        phone,
        identity,
      };
    },
  },
  
  
};
</script>

<style scoped>
#load {
  display: none;
}

table {
  border-collapse: separate;
  border-spacing: 0px 30px;
}
.grays {
  font-size: 10px;
  color: gray;
}
.grays a {
  color: rgb(234, 4, 55);
}

input {
  width: 200px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  border: gray solid 1px;
}

#confirm {
  width: 10px;
}

#buttons {
  box-shadow: none;
  font-size: 14px;
  background-color: rgb(234, 4, 55);
  color: #fff;
  border: solid 1px gray;
  border-radius: 5px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  cursor: pointer;
}

#buttons:hover {
  background-color: #fff;
  color: rgb(234, 4, 55);
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.greens {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 34px;
  color: rgb(234, 4, 55);
}

.owns {
  font-size: 14px;
  color: gray;
}

.owns a {
  color: rgb(234, 4, 55);
  text-decoration: none;
}

#fuzhu {
  width: 100%;
  display: flex;
  justify-content: center;
  background-image: url("../assets/wenli2.webp");
  background-size: cover;
  background-position: 0 0;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

#outside {
  width: 1400px;
  height: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-left: rgb(255, 255, 255) solid 1px;
  border-right: rgb(255, 255, 255) solid 1px; */
}

#title {
  margin-left: 50px;
  width: 500px;
  height: 300px;
}

.big {
  font-size: 45px;
  font-weight: 700;
  color: rgb(234, 4, 55);
  margin-bottom: 40px;
  font-family: "Times New Roman", Times, serif;
  text-decoration: overline;
  font-style: italic;
  text-shadow: gray 5px 5px 3px;
}

.small {
  font-size: 20px;
  color: black;
  text-decoration: underline;
  font-style: italic;
}

#inner {
  text-align: left;
  margin-top: 100px;
  width: 650px;
  height: 550px;
  border: gray solid 1px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 12px 12px gray;
}

#in-top {
  margin-left: 250px;
}

#inner form {
  margin-left: 40px;
}
</style>