<template>
  <el-header>
    <el-col>
      <el-row justify="space-between" align="middle">
        <el-col class="icon" :span="4" @click="back" id="back">
          <ArrowLeft style="width: 40rem"/>
        </el-col>
        <el-col :span="10">
          <slot></slot>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </el-col>
  </el-header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const back = () => {
  // 从wxAuth来的就replace到首页
  if (router.currentRoute.value.query.from === 'wxAuth') {
    router.replace('/')
  } else {
    router.back()
  }
}
</script>

<style scoped lang="scss">
.el-header {
  background: #C51829;
  color: #FFFFFF;
  text-align: center;
  font-size: 28rem;
  line-height: 40rem;
  display: flex;
  align-items: center;
  height: 80rem;

  .icon {
    display: flex;
    align-self: center;
  }
}
</style>
