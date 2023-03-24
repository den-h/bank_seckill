<template>
  <div id="all">
    <router-link :to="{ path: 'Detail', query: { id: this.i.id } }">
      <div id="details">
        <div class="Name">{{ name }}</div>
        <div class="Rate">
          <p class="first">利率：</p>
          <p class="second">
            {{ rate }}
          </p>
        </div>
        <div class="Price">
          <p class="first">价格：</p>
          <p class="second">
            {{ price }}
          </p>
        </div>
        <div class="Num">
          <p class="first">剩余数量:</p>
          <div>
            <p class="second">
              {{ stock }}
            </p>
          </div>
        </div>
        <div class="Start"><span class="first">开始时间：</span>{{ start_dates }}</div>
        <div class="End"><span class="first">结束时间：</span>{{ end_dates }}</div>
      </div>
    </router-link>
  </div>
</template>

<script scoped>
export default {
  name: "detail",
  props: ["i"], 
  data() {
    return {
      id: this.i.id,
      name: this.i.seckillName,
      rate: this.i.seckillRate,
      price: this.i.seckillPrice,
      describe: this.i.seckillDescribe,
      stock: this.i.seckillStock,
      start_dates: this.i.beginDate,
      end_dates: this.i.finalDate,
    };
  },
};
</script>

<style scoped>
.differ {
  overflow: hidden;
  font-size: 14px;
  color: gray;
}
#all {
  width: 100%;
  height: 250px;
  background-color: #f5f5f7;
  color: black;
  margin-top: 30px;
  margin-bottom: 30px;
  border-top-right-radius: 75px;
  border-bottom-left-radius: 75px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  background-image: url("../assets/wenli.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

#all:hover {
  transform: scale(1.03);
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

#details {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 18% 17% 18% 24% 24%;
  grid-template-rows: 125px 125px;
  grid-template-areas:
    "name rate num time-1 time-1"
    "name price num time-2 time-2";
}

#details > div {
  width: 100%;
}
.second {
  font-size: 24px;
  color: rgb(234, 4, 55);
  font-weight: 600;
  text-decoration: underline;
  font-family: "songti";
  text-shadow: 3px 0 3px white;
}

.first {
  text-align: start;
  font-size: 21px;
  margin-left: 10px;
  font-family: "kaiti";
}

.Name {
  grid-area: name;
  line-height: 150px;
  font-size: 30px;
  color: rgb(234, 4, 55);
  text-shadow: 3px 0 3px white;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 700;
  margin-top: 50px;
  height: 150px;
  border-right: dotted 1px gray;
  font-style: oblique;
}
.Rate {
  margin-top: 20px;
  padding-top: 30px;
  grid-area: rate;
  border-bottom: dotted 1px gray;
  border-right: dotted 1px gray;
}
.Price {
  padding-top: 20px;
  grid-area: price;
  margin-bottom: 20px;
  border-right: dotted 1px gray;
}
.Num {
  height: 210px;
  line-height: 105px;
  margin-top: 20px;
  grid-area: num;
  border-right: dotted 1px gray;
}
.Start {
  grid-area: time-1;
  line-height: 125px;
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;
  color: orangered;
  text-shadow: 5px 0 5px white;
}
.End {
  grid-area: time-2;
  line-height: 125px;
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;
  color: orangered;
  text-shadow: 5px 0 5px white;
}

.Start .first {
  color: black;
}

.End .first {
  color: black;
} 

a {
  color: black;
  text-decoration: none;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>