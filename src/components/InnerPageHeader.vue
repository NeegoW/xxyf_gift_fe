<template>
  <el-header>
    <el-col>
      <el-row align="middle">
        <el-col class="icon" :span="2" @click="router.back()" id="back">
          <ArrowLeft style="width: 1.2rem"/>
        </el-col>
        <el-col :span="20">
          <slot></slot>
        </el-col>
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
  font-size: 1.2rem;
  display: flex;
  align-items: center;

  .icon {
    display: flex;
    align-self: center;
  }
}
</style>
