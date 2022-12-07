<template>
  <div class="nav">
    <el-row justify="space-around" align="bottom">
      <div @click="emits('update:showMask',true)">
        <el-row justify="center">
          <img src="../assets/img/index/卡券.png" alt="">
        </el-row>
        <p>卡券中心</p>
      </div>
      <router-link to="exLog">
        <el-row justify="center">
          <img src="../assets/img/index/兑换记录.png" alt="">
        </el-row>
        <p>兑换记录</p>
      </router-link>
      <router-link to="exInfo">
        <el-row justify="center">
          <img src="../assets/img/index/说明.png" alt="">
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
  border-radius: 10px;
  padding: .8rem 0;
  margin: 0 auto .8rem;
  font-size: 1.2rem;

  p {
    margin-top: .5rem;
  }
}

a {
  color: #343434;
  text-decoration: none;
}
</style>
