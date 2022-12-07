<template>
  <div class="mask">
    <div class="img">
      <div class="info">
        <p>类型：储值卡</p>
        <p>余额：100.00元</p>
      </div>
    </div>
    <div class="close" @click="emits('update:showMask',false)"></div>
  </div>
</template>

<script setup>
const emits = defineEmits(['update:showMask'])
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 999;

  .img {
    width: 350px;
    height: 550px;
    margin: auto;
    position: relative;
    top: 30vh;
    display: flex;
    justify-content: center;
    background: {
      image: url('@/assets/img/index/背景.png');
      size: contain;
      repeat: no-repeat;
    };

    .info {
      width: 220px;
      position: absolute;
      top: 107px;
      left: 109px;
      color: #F2131F;
      font-size: 1.1rem;
      line-height: 2rem;
    }
  }

  .close {
    width: 45px;
    height: 44px;
    margin: 0 auto;
    position: relative;
    top: 2rem;
    background-image: url('@/assets/img/index/叉掉.png');
  }
}
</style>
