<template>

  <div class="nav">
    <img src=../assets/Logo-3.png alt="">
    <span>|</span>
  </div>

  <header>
    <h>{{ seckill_name }}</h>
    <p>详情:{{ seckill_describe }}</p>
  </header>
  <main>
    <div class="left">
      <p>利率:<br><span>{{ seckill_rate }}</span></p>
      <p>价格:<br><span>{{ seckill_price }}</span></p>
      <p>库存:<br><span>{{ seckill_stock }}</span></p>
    </div>
    <div class="right">
      <p>开始时间:<br><span>{{ startdate }}</span></p>
      <p>结束时间:<br><span>{{ enddate }}</span></p>
    </div>
  </main>

  <footer>
    <div class="time">

      <div id="countdown">
        距离秒杀<span class="hhh"></span>还有<span class="day">00</span>天
        <span class="hour">00</span>时
        <span class="min">00</span>分
        <span class="sec">00</span>秒
      </div>

      <div id="ended">
        秒杀已结束
      </div>

      <div id="choose">
       初筛未通过
      </div>

    </div>

    <div class="btn">
      <el-button type="danger" class="danger" @click="rushin()" id="clickbtn"> 抢购</el-button>
    </div>

  </footer>


</template>

<script scoped>
import axios from "axios";

export default {
  name: 'Details',
  stopclick: false,
  data() {
    return {
      goodsid: '',
      seckill_name: '',
      seckill_rate: '',
      seckill_price: '',
      seckill_describe: '',
      seckill_stock: '',
      startdate: '',
      enddate: '',
      begintime:'',
      finaltime:'',
    }
  },
  methods: {
    rushin() {
      var _this = this;
      if (_this.stopclick) {
        alert("请勿频繁点击");
        return false
      } else {
        _this.stopclick = true;
        axios.post('/api/order/createOrder', {
          goodsid: this.goodsid
        }).then((res) => {
          if (res.data.code === 200) {

            this.$router.push({
              path:'Order',
              query:{
               goodsid: this.goodsid
              }
            })
          } else if(res.data.code===500104)
          {
            this.$message.error("权限错误");
            this.$router.push('/Login')
          }else if(res.data.code===500)
          {
            this.$message.error("服务端异常");
          }else if(res.data.code===500502)
          {
            this.$message.error("请求非法，请重新尝试")
          }else if(res.data.code===500501)
          {
            this.$message.error("该商品每人限购一件");
          }

        }), (error) => {
          console.log(error);
        }
        setTimeout(() => {
          _this.stopclick = false
        }, 1000)
        console.log("success");
      }
    },
    counttimer(e) {

      var timer = null;

      var jieshu = document.getElementById('ended');
      var Ocount = document.getElementById('countdown');

      var spans = Ocount.getElementsByTagName('span');
      var qianggou = document.getElementById('clickbtn');




        this.timer = setInterval(counttime, 200);

        function counttime() {

          var nowtime = new Date().getTime();

          var begintime = e.begintime;
          var endtime = e.finaltime;

          clearInterval(timer);



          if (nowtime <= begintime) {
            qianggou.disabled = "disable";
            qianggou.style.background = "#aaaaaa";
            qianggou.style.border = "none";
            Ocount.style.display = 'block';
            jieshu.style.display = 'none';

            var ltime = (begintime - nowtime) / 1000;
            var day = parseInt(ltime / 60 / 60 / 24);
            var hour = parseInt(ltime / 60 / 60 % 24);
            var min = parseInt(ltime / 60 % 60);
            var sec = parseInt(ltime % 60)

            spans[0].innerHTML = "开始"
            spans[1].innerHTML = day;
            spans[2].innerHTML = hour;
            spans[3].innerHTML = min;
            spans[4].innerHTML = sec;

          } else {

            var lasttime = (endtime - nowtime) / 1000;
            if (lasttime >0) {
              Ocount.style.display = 'block';
              jieshu.style.display = 'none';
              qianggou.disabled = "";
              qianggou.style.background = "#F46C6C";
              qianggou.style.border = "1px solid #F46C6C";

              var day = parseInt(lasttime / 60 / 60 / 24);
              var hour = parseInt(lasttime / 60 / 60 % 24);
              var min = parseInt(lasttime / 60 % 60);
              var sec = parseInt(lasttime % 60)

              spans[0].innerHTML = "结束"
              spans[1].innerHTML = day;
              spans[2].innerHTML = hour;
              spans[3].innerHTML = min;
              spans[4].innerHTML = sec;

            } else {
              Ocount.style.display = 'none';
              jieshu.style.display = 'block';
              jieshu.style.fontSize="30px";
              qianggou.disabled = "disable";
              qianggou.style.background = "#aaaaaa";
              qianggou.style.border = "none";
              qianggou.style.cursor = "";
            }

          }
        }

      },
    prescreen(){
      var a=document.getElementById('choose');
      var b=document.getElementById('countdown');
      var c=document.getElementById('clickbtn');
      a.style.display="block";
      a.style.fontSize="30px";
      b.style.display="none";
      c.disabled="disabled";
      c.style.color="#aaaaaa";
      c.style.border = "none";
    }
    },



  mounted(){
    var _this = this;
    this.goodsid = this.$route.query.id;
    axios.post('/api/goods/details', {
      goodsid: this.goodsid
    }).then((res) => {
      if (res.data.code === 200) {
        this.$message.success("初筛通过");
        _this.seckill_name = res.data.data.goods.seckillName;
        _this.seckill_rate = res.data.data.goods.seckillRate;
        _this.seckill_price = res.data.data.goods.seckillPrice;
        _this.seckill_describe = res.data.data.goods.seckillDescribe;
        _this.seckill_stock = res.data.data.goods.seckillStock;
        _this.startdate = res.data.data.goods.beginDate;
        _this.enddate = res.data.data.goods.finalDate;
        _this.begintime=res.data.data.beginMilliseconds;
        _this.finaltime=res.data.data.finalMilliseconds;
        this.counttimer(_this);
      } else if (res.data.code === 500401) {
        this.$message.error("初筛不通过");
        _this.seckill_name = res.data.data.goods.seckillName;
        _this.seckill_rate = res.data.data.goods.seckillRate;
        _this.seckill_price = res.data.data.goods.seckillPrice;
        _this.seckill_describe = res.data.data.goods.seckillDescribe;
        _this.seckill_stock = res.data.data.goods.seckillStock;
        _this.startdate = res.data.data.goods.beginDate;
        _this.enddate = res.data.data.goods.finalDate;
        _this.begintime=res.data.data.beginMilliseconds;
        _this.finaltime=res.data.data.finalMilliseconds;
        this.prescreen();
      }else if(res.data.code === 500217){
        this.$message.error("用户未登录");
        this.$router.push('/');
      }else if(res.data.code===500104)
      {
        this.$message.error("权限错误");
        this.$router.push('Login');
      }
    }, (error) => {
      console.log(error);
    })

  },
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

header {
  height: 200px;
  width: 100%;
  background-color: #EE4C4F;
  text-align: center;
  color: white;
}
header h {
  font-size: 30px;
  margin-top: 20px;
  display: inline-block;
}

header p {
  width: 60%;
  text-align: left;
  margin: 30px auto;
}

main {
  width: 80%;
  height: 400px;
  margin: 0 auto;
  /*border: 1px sienna solid;*/
}

main .left {
  width: 40%;
  height: 400px;
  /*background-color: #c54242;*/
  float: left;
  margin-left: 10%;

}

.left p:nth-child(1) {
  margin-top: 20px;
  font-size: 20px;
}

.left p:nth-child(1) span {
  font-size: 40px;
  margin-left: 40px;
}

.left p:nth-child(2) {
  margin-top: 20px;
  font-size: 20px;
}

.left p:nth-child(2) span {
  font-size: 40px;
  margin-left: 40px;
}

.left p:nth-child(3) {
  margin-top: 20px;
  font-size: 20px;
}

.left p:nth-child(3) span {
  font-size: 40px;
  margin-left: 40px;
}

main .right {
  width: 40%;
  height: 400px;
  /*background-color: #c54242;*/
  float: left;
  margin-left: 10%;
}

.right p:nth-child(1) {
  margin-top: 80px;
  font-size: 20px;
}

.right p:nth-child(1) span {
  font-size: 40px;
  margin-left: 40px;
}

.right p:nth-child(2) {
  margin-top: 20px;
  font-size: 20px;
}

.right p:nth-child(2) span {
  font-size: 40px;
  margin-left: 40px;
}
.time{
  width: 80%;
  height: 100px;
}
#countdown{
  display: block;
  height: 100px;
  line-height: 100px;
}
#ended{
  height: 100px;
  display: none;
}
#choose{
  height: 100px;
  display: none;
}
footer {
  width: 80%;
  height: 100px;
  /*background-color: #42b983;*/
  margin: 0 auto;
}

footer .time {
  width: 50%;
  line-height: 100px;
  margin-left: 50px;
  float: left;
  height: 100px;
}

footer .btn {
  width: 40%;
  float: left;
  height: 100px;
}

footer .danger {
  margin-left: 100px;
  width: 120px;
  height: 40px;
  margin-top: 30px;
}

#countdown span {
  font-size: 30px;
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
</style>