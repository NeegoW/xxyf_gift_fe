<template>
  <InnerPageHeader>
    商品详情
  </InnerPageHeader>
  <section class="goodInfo">
    <div class="img">
      <img :src="info.info.show_img || ''"/>
    </div>
    <div class="shadow">
      <p style="font-weight: bold">{{ info.info.alias || info.info.name }}</p>
      <p>
        <img src="../assets/img/index/豆.png">
        <span class="word-red">{{ info.info.selling_price }}</span>
      </p>
    </div>
    <div class="shadow">
      <el-row class="li" align="middle" justify="space-between">
        <el-col :span="3">
          <img src="../assets/img/index/货运32PX.png"/>
        </el-col>
        <el-col :span="18">
          <b>广东深圳</b>
          <p>配送至：深圳市 南山区 西丽街道</p>
        </el-col>
        <el-col :span="3">
          <img src="../assets/img/index/展开.png"/>
        </el-col>
      </el-row>
      <el-row class="li" align="middle">
        <el-col :span="3">
          <img src="../assets/img/index/保障.png"/>
        </el-col>
        <el-col :span="18">
          正品保障·全国快递·快递速达·售后无忧
        </el-col>
      </el-row>
      <el-row class="li" align="middle">
        <el-col :span="3">
          <img src="../assets/img/index/运费.png"/>
        </el-col>
        <el-col :span="18">
          <b>运费</b>免运费
        </el-col>
      </el-row>
      <el-row class="li" align="middle">
        <el-col :span="3">
          <img src="../assets/img/index/规格.png"/>
        </el-col>
        <el-col :span="18">
          <b>规格</b>牛腩块 500g*1袋 牛肉粒 500g*1袋 牛眼肉 500g*1袋
        </el-col>
        <el-col :span="3">
          <img src="../assets/img/index/展开.png"/>
        </el-col>
      </el-row>
    </div>
  </section>
  <InnerPageFooter/>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'

import InnerPageHeader from '@/components/InnerPageHeader.vue'
import InnerPageFooter from '@/components/InnerPageFooter.vue'

// 获取路由参数
const router = useRouter()
const packageId = router.currentRoute.value.params.id
const info = reactive({ info: {} })

onBeforeMount(async () => {
  // 获取商品详情数据
  await api.get('/api/package?id=' + packageId).then(res => {
    info.info = res.data[0]
  })
})
</script>

<style scoped lang="scss">
.goodInfo {
  background-color: #EEEEEE;
  font-size: 1.2rem;
  color: #333333;

  .shadow {
    background: #FFFFFF;
    box-shadow: -6px 0px 10px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    padding: 1rem 1.5rem;

    .li {
      padding: 10px 0;
      border-bottom: 1px solid #B3B3B3;
      font-size: 1.1rem;

      b {
        font-weight: bold !important;
        margin-right: 10px;
      }
    }
  }

  .word-red {
    color: #C51829;
    font-size: 1.5rem;
  }

  .img {
    background-color: #fff;

    img {
      width: 100%;
    }
  }
}
</style>
