<template>
  <div id="Bottom">
    <div id="all">
      <div id="symbol">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div>
        <div id="middle">
          <div class="first">
              <p class="differ">关于我们</p>
              <p class="same">银行简介</p>
              <p class="same">发展历程</p>
              <p class="same">三湘荣誉</p>
              <p class="same">影像三湘</p>
              <p class="same">三湘动态</p>
              <p class="same">三湘潮</p>
          </div>
          <div class="second">
              <p class="differ">联系地址</p>
              <p class="same">湖南省岳麓区滨江景观大道楷林</p>
              <p class="same">国际D座</p>
              <p class="differ">询证函邮寄中心</p>
              <p class="differ">帮助中心</p>
              <p class="differ">网站地图</p>
          </div>
          <div class="third">
              <p class="differ">投诉受理</p>
              <p class="same">电话渠道： 0731-96500</p>
              <p class="same">网络渠道： kfbos@csxbank.com</p>
              <p class="same">信函渠道：湖南省长沙市岳麓区楷林国际A座20楼法</p>
              <p class="same">律合规部</p>
              <p class="same">湖南金融三湘投诉受理流程</p>
          </div>
      </div>
      </div>
      <div id="ercode">
        <img src="../assets/2Dcode1.jpg" alt="" />
      </div>
    </div>
    <p class="down">
      2021 © Copyright 湖南三湘银行股份有限公司   备案号：湘ICP备17012314号 
    </p>
  </div>
</template>

<script scoped>
export default {
  name: "Under",
};
</script>

<style scoped>

#Bottom {
  width: 100%;
  height: 220px;
  background-image: url("../assets/bgc.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

#all {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
}

#symbol {
  width: 300px;
  height: 200px;
  line-height: 200px;
}

#middle {
  margin-top: 10px;
  width: 900px;
  display: grid;
  grid-template-columns: 20% 30% 50%;
  grid-template-rows: 190px;
  grid-template-areas: 
  "first second third";
}

.first {
    grid-area: first;
}
.second {
    grid-area: second;
}
.third {
    grid-area: third;
}

#ercode {
  margin-top: 20px;
  width: 200px;
}
p {
  color: rgb(244, 244, 245);
  margin-bottom: 2px;
}

.down {
  text-align: center;
  font-size: 14px;
}

.differ {
  font-size: 19px;
  font-weight: 700;
}

.same {
  font-size: 15px;
}

</style>