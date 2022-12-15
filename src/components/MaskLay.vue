<template>
  <section class="mask">
    <div class="container">
      <div class="info">
        <p>类型：{{ type }}</p>
        <p>{{ balance }}</p>
      </div>
    </div>
    <div class="close" @click="emits('update:showMask',false)"></div>
  </section>
</template>

<script setup>
import { computed, reactive } from 'vue'

const emits = defineEmits(['update:showMask'])

const cardInfo = reactive(JSON.parse(sessionStorage.getItem('userInfo'))?.card_info)
const type = computed(() => {
  return cardInfo?.type === '0' ? '储值卡' : '次卡'
})
const balance = computed(() => {
  const a = '余额：' + cardInfo?.Active?.balance
  const b = '次数：' + '1'
  return cardInfo?.type === '0' ? a : b
})
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

  .container {
    width: 668rem;
    height: 518rem;
    margin: 25vh 0 0 60rem;
    position: relative;
    background: {
      size: 100% 100%;
      image: url("@/assets/img/index/背景.png");
    };

    .info {
      width: 220rem;
      position: absolute;
      top: 178rem;
      left: 215rem;
      color: #F2131F;
      font-size: 28rem;
      line-height: 50rem;
    }
  }

  .close {
    width: 45rem;
    height: 44rem;
    margin: 36rem auto;
    background-image: url('@/assets/img/index/叉掉.png');
    background-size: 100% 100%;
  }
}
</style>
