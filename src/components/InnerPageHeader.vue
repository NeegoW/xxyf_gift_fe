<template>
  <el-header>
    <el-col>
      <el-row justify="space-between" align="middle">
        <el-col class="icon" :span="4" @click="router.push('/')" id="back">
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
