<template>

<div class="nav">
  <img src=../assets/Logo-3.png alt="">
<span>|</span>
</div>

  <div class="underline"></div>

  <div class="order">
    <p>订单信息</p>
    <p>商品名称:{{seckill_name}}</p><hr>
    <p>商品利率:{{seckill_rate}}</p><hr>
    <p>商品价格:{{seckill_price}}</p><hr>
    <p>购买数量:{{goodsCount}}</p><hr>
    <p>下单时间:{{seckill_time}}</p>
  </div>

    <el-button type="danger" class="button" @click="buy()">立即支付</el-button>

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


</template>

<script scoped>
import axios from "axios";

export default {
  name: "Order",
  props: [
    "order",
    "orderid"
  ],
  data() {
    return {
      orderid: '',
      goodsid: '',
      flag: 0,
      seckill_name: '',
      seckill_rate: '',
      goodsCount: '',
      seckill_price: '',
      seckill_time: '',
      seckill_stock: '',
      index:0
    }
  },
  methods: {
    getapi() {
      var _this=this;
      axios.post('/api/goods/getResult',{
        goodsid:_this.goodsid
      }).then(res => {
        if (res.data.code === 200) {
          _this.flag = res.data.data;
          if (_this.flag===1) {
            _this.$router.push({
              path:'/Success',
              query:{
                orderid:_this.flag
              }
            })
            return false;
          }
          else
          {
            if(_this.flag===0){
              if(_this.index===0)
              {
                alert("正在排队，请耐心等待");
              }
              _this.index++;
              setTimeout(this.getapi,200);
            }else {
              this.$message.error("秒杀失败");
              this.$router.push('/Failure');
            }
          }
        }
      })
    },

    buy() {
      var _this = this;
      if (_this.stopclick) {
        alert("请勿频繁点击");
        return false
      } else {
        _this.stopclick = true;
        axios.post('/api/goods/seckill', {goodsid: this.goodsid}).then((res) => {
          if (res.data.code === 200) {
            if(res.data.data===0)
              _this.getapi();
          }else if(res.data.code===500501)
          {
            this.$message.error("该商品每人限购一件");
            this.$router.push('/Main');
          }else if(res.data.code===500300)
          {
            this.$message.error("订单信息不存在");
            this.$router.push('Main');
          }else if(res.data.code===500500)
          {
            this.$message.error("库存不足");
            this.$router.push('Main');
          }else if(res.data.code===500104)
          {
            this.$message.error("权限错误");
            this.$router.push('Login');
          }else if(res.data.code===500506)
          {
            this.$message.error("账户资金不足");
            this.$router.push('Main');
          }
          //前端轮询 0为等待中，1为描述成功，-1为秒杀失败   是否要判断-1的情况？

          else {
            this.$router.push('/Failure');
          }
        }).catch(error => {
          console.log(error);
        })
      }
      setTimeout(() => {
        _this.stopclick = false
      }, 1000)
    },
  },

    mounted() {
    this.goodsid=this.$route.query.goodsid;
      axios.post("/api/order/show",{
        goodsid:this.goodsid
      }).then((res) => {
        if (res.data.code === 200) {
          this.seckill_name = res.data.data.goodsName;
          this.seckill_rate = res.data.data.goodsRate;
          this.seckill_price = res.data.data.goodsPrice;
          this.seckill_time = res.data.data.createDate;
          this.goodsCount = res.data.data.goodsCount;
          this.goodsid = res.data.data.goodsId;
          this.orderid=res.data.data.id;

        } else if (res.data.code === 500217) {

          this.$message.error("用户未登录");
          this.$router.push('/');
        }else if(res.data.code===500104)
        {
          this.$message.error("权限错误")
          this.$router.push('/Login');
        }
      }), (error) => {
        console.log(error);
      }
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
.order{
  width: 80%;
  height: 390px;
  box-shadow: 0px 0px 10px 1px  #aaaaaa;
  border-radius: 5px;
  margin: 100px auto;
}
.order p{
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
}
.order p:first-child{
  font-size: 25px;
}
.button{
  margin: 30px auto;
  display: block;
  width: 120px;
  height: 30px;
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