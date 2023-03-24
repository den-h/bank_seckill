<template>
<h>提示：非法访问!</h>
  <el-button type="danger" id="return" @click="returns">返回主页</el-button>
</template>

<script scoped>
export default {
  name: "Detect",
  methods:{
    returns()
    {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
*{
  text-align: center;
}
h{
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  text-align: center;
  display: block;
}
.el-button{
  width: 160px;
  height: 30px;
  margin:40px auto;
  display: block;
}
</style>