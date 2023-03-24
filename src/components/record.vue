<template>
  <div>
    <router-link :to="{ path: 'AfterOrder', query:{ orderid:this.i.id} }">
      <div>
        <ul>
          <li>{{ seckill_name }}</li>
          <li>{{ orderid }}</li>
          <li>{{seckill_time}}</li>
          <li>{{condition}}</li>

        </ul>
      </div>
    </router-link>
  </div>
</template>

<script scoped>
export default {
  name: "record",
  props: ["i"],
  data() {
    return {
      seckill_time:this.i.createDate,
      seckill_name: this.i.goodsName,
      orderid: this.i.id,
      condition:this.i.status?"已支付":"未支付"
    };
  },
  created() {
    console.log(this.i.orderid);
  },
};
</script>

<style scoped>
ul {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(245, 245, 245);
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}
ul:hover {
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: rgb(245, 245, 245);
}
li {
  width: 300px;
  height: 45px;
  line-height: 45px;
  list-style: none;
}

a {
  text-decoration: none;
  color: rgb(144, 147, 154);
}
</style>