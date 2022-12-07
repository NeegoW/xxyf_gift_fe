<template>
  <div class="header">
    <nav>
      <router-link class="el-col" to="/couponCenter">
        <el-row>灯笼</el-row>
        <el-row>卡券中心</el-row>
      </router-link>
      <router-link  class="el-col" to="">
        <el-row>礼盒</el-row>
        <el-row>兑换记录</el-row>
      </router-link>
      <router-link  class="el-col">
        <el-row>钱袋</el-row>
        <el-row>兑换说明</el-row>
      </router-link>
    </nav>
  </div>
</template>

<script setup>

</script>

<style scoped>
.header {
  background-color: #F7EED3;
  color: #343434;
  min-height: 100%;
  padding: 0 5%;
}
</style>
