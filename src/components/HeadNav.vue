<template>
  <div class="nav">
    <el-row justify="space-around" align="bottom">
      <div @click="emits('update:showMask',true)">
        <el-row justify="center">
          <img style="width: 39rem" src="../assets/img/index/卡券.png" alt="">
        </el-row>
        <p>卡券中心</p>
      </div>
      <router-link to="exLog">
        <el-row justify="center">
          <img style="width: 39rem" src="../assets/img/index/兑换记录.png" alt="">
        </el-row>
        <p>兑换记录</p>
      </router-link>
      <router-link to="exManual">
        <el-row justify="center">
          <img style="width: 41rem" src="../assets/img/index/说明.png" alt="">
        </el-row>
        <p>兑换说明</p>
      </router-link>
    </el-row>
  </div>
</template>

<script setup>
const emits = defineEmits(['update:showMask'])
</script>

<style scoped lang="scss">
.nav {
  width: 100%;
  background: #F7EED3;
  border-radius: 10rem;
  padding: 21rem 0 16rem;
  margin: 0 auto 24rem;
  font-size: 22rem;

  p {
    margin-top: 10rem;
  }
}

a {
  color: #343434;
  text-decoration: none;
}
</style>
