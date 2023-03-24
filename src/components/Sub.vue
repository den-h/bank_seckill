<template>
  <div id="sub">
    <div id="all">
      <ul>
        <li><img src="../assets/advise.png" alt="" /></li>
        <li class="erCode" @mouseenter="appear" @mouseleave="disappear">
          <img src="../assets/2Dcode2.png" alt="" />
        </li>
        <li id="to" @click="returns">
          <img src="../assets/up.png" alt="" />
        </li>
      </ul>
    </div>
  </div>
  <div id="img">
    <img src="../assets/2Dcode1.jpg" alt="" />
  </div>
</template>

<script scoped>
export default {
  name: "Sub",
  methods: {
    appear() {
      var x = document.getElementById("img");
      setTimeout(function () {
        x.style.display = "block";
      }, 500);
      console.log("二维码出现");
    },
    disappear() {
      var x = document.getElementById("img");
      setTimeout(function () {
        x.style.display = "none";
      }, 500);
      console.log("二维码隐藏");
    },
    returns() {
      this.timer = setInterval(() => {
        //获取滚动条的滚动高度
        var osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        //用于设置速度差，产生缓动的效果
        var speed = Math.floor(-osTop / 6);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + speed;
        this.isTop = true; //用于阻止滚动事件清除定时器
        if (osTop == 0) {
          clearInterval(this.timer);
        }
      }, 50);
    },
    shows() {
      this.timer = setInterval(() => {
        var osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var x = document.getElementById("sub");
        if (osTop <= 450) {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
        console.log(osTop);
      }, 100);
    },
    debounce(fn,delay){
      let timer=null;
      return function(){
        if(timer){
          clearTimeout(timer);
          timer=setTimeout(fn,delay);
        }
        else {
          timer=setTimeout(fn,delay); 
        }
      }
    }
  },
  mounted() {
    var _this=this;
    this.debounce(_this.shows(),100);
  },
};
</script>

<style scoped>
#sub {
  position: fixed;
  right: 0;
  bottom: 20px;
  width: 80px;
  height: 240px;
  background-color: #fff;
  border-radius: 10px;
}

#img {
  position: fixed;
  right: 90px;
  bottom: 90px;
  display: none;
}

#img img {
  width: 100px;
  height: 100px;
}

#all {
  position: fixed;
  bottom: 50px;
  right: 20px;
}
li {
  width: 40px;
  height: 40px;
  list-style: none;
  margin-top: 30px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

li:hover {
  background-color: rgb(234, 4, 55);
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

img {
  margin-top: 5px;
  width: 30px;
  height: 30px;
}
</style>