<template>
  <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item>
      <div class="image-1">
        <a href="#"><img src="../assets/cac1.jpg" alt=""></a>
      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="image-2">
        <a href="#"><img src="../assets/cac2.jpg" alt=""></a>
      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="image-3">
        <a href="#"><img src="../assets/pic1.jpg" alt=""></a>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script scoped>
export default {
  name: "carousels",
};
</script>

<style scoped>
/* .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
} */

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.image-1,
.image-2,
.image-3 {
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
}
</style>