<template>
  <div class="bg-img" :style="{backgroundImage: 'url('+ bgImg +')'}">
    <img class="sp" src="../assets/img/bg_img/hd_02.png" alt="">
    <section class="body">
      <slot></slot>
    </section>
  </div>
</template>

<script setup>
const bgImg = require('../assets/img/bg_img/bg_02.png')
</script>

<style scoped lang="scss">
.bg-img {
  background-size: contain;
  min-height: 100vh;

  .sp {
    width: 100%;
  }

  .body {
    width: 95vw;
    margin: auto;
    height: auto;
  }
}
</style>
