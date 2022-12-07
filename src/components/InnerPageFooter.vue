<template>
  <el-footer>
    <el-col>
      <el-row justify="space-around">
        <el-button @click="toCS" class="cs">联系客服</el-button>
        <el-button class="ex">立即兑换</el-button>
      </el-row>
    </el-col>
  </el-footer>
</template>

<script setup>
// 联系客服
const toCS = () => {
  const url = 'https://work.weixin.qq.com/kfid/kfcd4d3cef620aa8656'
  window.open(url)
}
</script>

<style scoped lang="scss">
.el-footer {
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.5rem;

  > .el-col {
    margin: 10px 0;
  }

  .el-button {
    height: auto;
  }

  .cs {
    border: 2px solid #B3B3B3;
    border-radius: 2rem;
    color: #666666;
    font-size: 1.5rem;
  }

  .ex {
    background: #C51829;
    border: 2px solid #C51829;
    border-radius: 2rem;
    color: #FFFFFF;
    font-size: 1.5rem;
  }
}
</style>
