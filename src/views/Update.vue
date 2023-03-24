<template>
  <div id="all">
    <div class="tishi">下拉线处双击两下可修改,禁用状态下不可修改</div>
    <div class="second">
      <div>脚本防刷功能： <el-switch v-model="flag2" /></div>
      <div>秒杀地址隐藏： <el-switch v-model="flag3" /></div>
      <div>初筛配置功能： <el-switch v-model="flag1" /></div>
    </div>
    <div id="fuzhu" v-show="flag1">
      <div class="first" style="grid-area: first1">
        <p class="one">逾期记录</p>
        <p>
          近<span @dblclick="edit" class="years">{{ year }}</span
          >年逾期
          <span
            @dblclick="edit1"
            ref="element1"
            style="cursor: pointer"
            id="One"
          >
            {{ expire_status }} </span
          >次
        </p>
        <p>
          (金额小于<span @dblclick="edit3" class="moneys">{{ money }}</span
          >元，<span @dblclick="edit4" class="days">{{ day }}</span
          >天内还清外)
        </p>
      </div>
      <div class="Second" style="grid-area: second1">
        <p>
          <el-switch v-model="expire" />
        </p>
      </div>
      <div class="first" style="grid-area: first2">
        <p class="one">个人客户工作状态异常：</p>
      </div>
      <div class="Second" style="grid-area: second2">
        <p>
          <el-switch v-model="work_status" />
        </p>
      </div>
      <div class="first" style="grid-area: first3">
        <p class="one">个人客户被列入失信人名单：</p>
      </div>
      <div class="Second" style="grid-area: second3">
        <el-switch v-model="credit_status" />
      </div>
      <div class="first" style="grid-area: first4">
        <p class="one">个人客户年龄：</p>
        <p>
          小于
          <span
            @dblclick="edit2"
            ref="element2"
            style="cursor: pointer"
            id="Two"
          >
            {{ age }}
          </span>
          岁
        </p>
      </div>
      <div class="Second" style="grid-area: second4">
        <el-switch v-model="uage" />
      </div>
    </div>
    <div id="btns">
      <input type="button" value="修改" id="change" @click="trans" />
    </div>
  </div>
</template>

<script scoped>
import axios from "axios";
export default {
  name: "Update",
  data() {
    return {
      expire_status: 2,
      credit_status: true,
      age: 18,
      work_status: true,
      year: 3,
      money: 1000,
      day: 3,
      flag1: true,
      flag2: true,
      flag3: true,
      expire: true,
      uage: true,
    };
  },
  methods: {
    edit(element) {
      var _this = this;
      //获取老元素的值
      var old = element.target.innerText;
      //创建一个新的input框
      var newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = old;
      element.target.innerText = "";
      newInput.style.width = "70px";
      newInput.style.height = "30px";
      newInput.style.color = "gray";
      newInput.style.fontSize = "20px";
      //把新框放入原先的节点
      element.target.appendChild(newInput);
      newInput.setSelectionRange(0, old.length);
      newInput.focus();
      var x;
      newInput.onblur = function () {
        //判断值是否改变
        if (this.value != "") {
          element.target.innerText = this.value === old ? old : this.value;
          x = element.target.innerText;
          console.log(x); //后执行这个
          _this.year = x;
          console.log(_this.year);
        } else {
          element.target.innerText = old;
        }
        //耗时异步操作
      };
    },
    edit1(element) {
      var _this = this;
      //获取老元素的值
      console.log(this.expire_status);
      var old = element.target.innerText;
      //创建一个新的input框
      var newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = old;
      element.target.innerText = "";
      newInput.style.width = "70px";
      newInput.style.height = "30px";
      newInput.style.color = "gray";
      newInput.style.fontSize = "20px";

      //把新框放入原先的节点
      element.target.appendChild(newInput);
      newInput.setSelectionRange(0, old.length);
      newInput.focus();
      var x;
      newInput.onblur = function () {
        //判断值是否改变
        if (this.value != "") {
          element.target.innerText = this.value === old ? old : this.value;
          x = element.target.innerText;
          console.log(x); //后执行这个
          _this.expire_status = x;
          console.log(_this.expire_status);
        } else {
          element.target.innerText = old;
        }
        //耗时异步操作
      };
    },
    edit2(element) {
      //获取老元素的值
      var _this = this;
      var old = element.target.innerText;
      //创建一个新的input框
      var newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = old;
      newInput.style.width = "70px";
      newInput.style.height = "30px";
      newInput.style.color = "gray";
      newInput.style.fontSize = "20px";
      element.target.innerText = "";
      //把新框放入原先的节点
      element.target.appendChild(newInput);
      newInput.setSelectionRange(0, old.length);
      newInput.focus();
      var x;
      newInput.onblur = function () {
        //判断值是否改变
        if (this.value != "") {
          console.log(this.value);
          element.target.innerText = this.value === old ? old : this.value;
          x = element.target.innerText;
          console.log(x); //后执行这个
          _this.age = x;
          console.log(_this.age);
        } else {
          element.target.innerText = old;
          _this.age = old;
        }
      };
    },
    edit3(element) {
      var _this = this;
      //获取老元素的值
      console.log(this.money);
      var old = element.target.innerText;
      //创建一个新的input框
      var newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = old;
      element.target.innerText = "";
      newInput.style.width = "70px";
      newInput.style.height = "30px";
      newInput.style.color = "gray";
      newInput.style.fontSize = "20px";

      //把新框放入原先的节点
      element.target.appendChild(newInput);
      newInput.setSelectionRange(0, old.length);
      newInput.focus();
      var x;
      newInput.onblur = function () {
        //判断值是否改变
        if (this.value != "") {
          element.target.innerText = this.value === old ? old : this.value;
          x = element.target.innerText;
          console.log(x); //后执行这个
          _this.money = x;
          console.log(_this.money);
        } else {
          element.target.innerText = old;
        }
        //耗时异步操作
      };
    },
    edit4(element) {
      var _this = this;
      //获取老元素的值
      console.log(this.day);
      var old = element.target.innerText;
      //创建一个新的input框
      var newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = old;
      element.target.innerText = "";
      newInput.style.width = "70px";
      newInput.style.height = "30px";
      newInput.style.color = "gray";
      newInput.style.fontSize = "20px";

      //把新框放入原先的节点
      element.target.appendChild(newInput);
      newInput.setSelectionRange(0, old.length);
      newInput.focus();
      var x;
      newInput.onblur = function () {
        //判断值是否改变
        if (this.value != "") {
          element.target.innerText = this.value === old ? old : this.value;
          x = element.target.innerText;
          console.log(x); //后执行这个
          _this.day = x;
          console.log(_this.day);
        } else {
          element.target.innerText = old;
        }
        //耗时异步操作
      };
    },
    submit() {
      var btn = document.getElementById("change");
      btn.style.display = "block";
    },
    trans() {
      alert("您确定要修改吗？");
      var btn = document.getElementById("change");
      axios
        .post("/api/filter/alter", {
          creditStatus: this.credit_status,
          age: this.age,
          workStatus: this.work_status,
          scriptIsopen: this.flag2,
          hidePathIsopen: this.flag3,
          expireIsopen: this.expire,
          expireYear: this.year,
          expireCount: this.expire_status,
          expireMoney: this.money,
          expireDays: this.day,
          ageIsopen: this.uage,
          filterIsopen: this.flag1,
        })
        .then(
          (res) => {
            if (res.data.code === 200) {
              console.log(res.data.message);
              btn.style.display = "none";
            } else if (res.data.code === 500104) {
              this.$message.error("初筛配置修改失败");
              this.$router.push("/Admin/Update");
            } else if (res.data.code === 500217) {
              this.$message.error("用户未登录");
              this.$router.push("/");
            }
          },
          (error) => {
            console.log(error.message);
          }
        );
    },
  },
  watch: {
    credit_status: {
      handler(newval, oldval) {
        this.submit()
        console.log("old:", oldval, "new:", newval);
      },
      deep: true,
    },
    expire_status: {
      handler(newval, oldval) {
        this.submit();
        console.log("old:", oldval, "new:", newval);
      },
      deep: true,
    },
    age: {
      handler(newval, oldval) {
        this.submit();
        console.log("old:", oldval, "new:", newval);
      },
      deep: true,
    },
    work_status: {
      handler(newval, oldval) {
        this.submit();
        console.log("old:", oldval, "new:", newval);
      },
      deep: true,
    },
    flag1: {
      handler(newval, oldval) {
        console.log("old:", oldval, "new:", newval);
        this.submit();
      },
    },
    flag2: {
      handler(newval, oldval) {
        console.log("old:", oldval, "new:", newval);
        this.submit();
      },
    },
    flag3: {
      handler(newval, oldval) {
        console.log("old:", oldval, "new:", newval);
        this.submit();
      },
    },
    year: {
      handler(newval, oldval) {
        console.log("old:", oldval, "new:", newval);
        this.submit();
      },
    },
    money: {
      handler(newval, oldval) {
        console.log("old:", oldval, "new:", newval);
        this.submit();
      },
    },
    day: {
      handler(newval, oldval) {
        console.log("old:", oldval, "new:", newval);
        this.submit();
      },
    },
    expire: {
      handler(newval, oldval) {
        console.log("old:", oldval, "new:", newval);
        var x = document.getElementsByClassName("first");
        if (newval == false) {
          x[0].style.pointerEvents = "none";
        } else {
          x[0].style.pointerEvents = "";
        }
        this.submit();
      },
    },
    uage: {
      handler(newval, oldval) {
        console.log("old:", oldval, "new:", newval);
        var x = document.getElementsByClassName("first");
        if (newval == false) {
          x[3].style.pointerEvents = "none";
        }
        else {
          x[3].style.pointerEvents = "";
        }
        this.submit();
      },
    },
  },
  created() {
    var _this = this;
    axios.get("/api/filter/show").then(
      (res) => {
        if (res.data.code === 200) {
          console.log(res.data.message);
          _this.expire_status = res.data.data.expireCount;
          _this.credit_status = res.data.data.creditStatus;
          _this.age = res.data.data.age;
          _this.work_status = res.data.data.workStatus;
          (_this.money = res.data.data.expireMoney),
            (_this.year = res.data.data.expireYear),
            (_this.day = res.data.data.expireDays),
            (_this.flag1 = res.data.data.filterIsopen),
            (_this.flag2 = res.data.data.scriptIsopen),
            (_this.flag3 = res.data.data.hidePathIsopen),
            (_this.expire = res.data.data.expireIsopen),
            (_this.uage = res.data.data.ageIsopen);
        }
        else if(res.data.code === 500217) {
          this.$message.error("用户未登录");
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
#all {
  height: 650px;
}

.tishi {
  margin-top: 20px;
  width: 80%;
  margin-right: 150px;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
  color: rgb(144, 147, 153);
  text-align: center;
  height: 50px;
  line-height: 50px;
  margin-bottom: 20px;
  font-weight: 700;
}
#btns {
  margin-top: 50px;
  width: 80%;
}
.second {
  font-weight: 700;
  margin-right: 150px;
  color: rgb(144, 147, 153);
  width: 80%;
  font-size: 18px;
  border-bottom: 1px solid rgb(214, 215, 217);
}
#all {
  display: flex;
  justify-content: center;
  align-content: space-around;
  width: 100%;
  flex-wrap: wrap;
}
#fuzhu {
  margin-top: 50px;
  width: 1100px;
  display: grid;
  grid-template-columns: 820px 200px;
  grid-template-rows: 80px 80px 80px 80px;
  row-gap: 30px;
  grid-template-areas:
    "first1 second1"
    "first2 second2"
    "first3 second3"
    "first4 second4";
}
.Second {
  height: 80px;
  line-height: 80px;
}

.first {
  height: 40px;
  width: 800px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  border-bottom: solid 1px rgb(214, 215, 217);
  color: rgb(144, 147, 153);
}
.first:nth-child(1) {
  line-height: 40px;
}
.one {
  line-height: 40px;
  font-size: 16px;
  font-weight: 700;
}

#One,
#Two,
.years,
.moneys,
.days {
  font-size: 20px;
}

span {
  width: 50px;
  text-decoration: underline;
}

#change {
  display: none;
  background-color: rgb(234, 4, 55);
  font-size: 15px;
  height: 30px;
  width: 150px;
  line-height: 30px;
  color: white;
  border: none;
  cursor: pointer;
}
</style>