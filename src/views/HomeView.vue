<template>
  <el-affix :offset="500" style="text-align: right;height: 0" @click="toCS()">
    <img width="80" src="@/assets/img/cs.gif" alt="">
  </el-affix>
  <BgImg :class="ofHidden">
    <MaskLay v-if="showMask" @update:showMask="handleShowMask"/>
    <HeadNav @update:showMask="handleShowMask"/>
    <el-container>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-row>
            <el-col class="item">
              <el-card body-style="{ padding: '8px'}">
                <el-carousel id="carousel" indicator-position="none">
                  <el-carousel-item v-for="item in bannerImgs" :key="item">
                    <img style="width:100%;max-width: 100%;border-radius: 8px" :src="item" alt="banner">
                  </el-carousel-item>
                </el-carousel>
              </el-card>
            </el-col>
            <el-col v-for="v in ch1" :key="v" class="item">
              <el-card @click="toInfo( v.id )" :body-style="{ padding: '8px' }">
                <img
                  :src="v.show_img"
                  class="image"
                  @load="setBannerHeight"
                />
                <div style="padding: .5rem">
              <span style="font-size: 1.2rem;color: #333333">
                {{ v.name }}
              </span>
                  <el-row align="middle">
                    <el-col :span="20" style="font-size: 1.5rem;color: #C51829 ">
                      <img width="24" src="../assets/img/index/豆.png" alt="">
                      <span>{{ v.selling_price }}</span>
                    </el-col>
                    <el-col style="text-align: right" :span="4">
                      <img width="24" src="../assets/img/index/兑换按钮.png" alt="">
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col el-col :span="12">
          <el-row>
            <el-col v-for="v in ch2" :key="v" class="item">
              <el-card @click="toInfo( v.id )" :body-style="{ padding: '8px' }">
                <img
                  :src="v.show_img"
                  class="image"
                />
                <div style="padding: .5rem">
              <span style="font-size: 1.2rem;color: #333333">
                {{ v.name }}
              </span>
                  <el-row align="middle">
                    <el-col :span="20" style="font-size: 1.5rem;color: #C51829 ">
                      <img width="24" src="../assets/img/index/豆.png" alt="">
                      <span>{{ v.selling_price }}</span>
                    </el-col>
                    <el-col style="text-align: right" :span="4">
                      <img width="24" src="../assets/img/index/兑换按钮.png" alt="">
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-container>
  </BgImg>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

import BgImg from '@/components/BgImg'
import HeadNav from '@/components/HeadNav'
import MaskLay from '@/components/MaskLay'
import api from '@/api'

localStorage.setItem('showMask', 'false')
// 查看sessionStorage中是否有showMask
const showMask = ref(localStorage.getItem('showMask') !== 'false')
const ofHidden = ref(showMask.value ? 'ofHidden' : '')
// 蒙层显示隐藏
const handleShowMask = (val) => {
  showMask.value = val
  localStorage.setItem('showMask', val)
}

const router = useRouter()
const toInfo = (id) => {
  router.push({
    name: 'goodInfo',
    params: { id: id }
  })
}

// banner图
const bannerImgs = [
  require('../assets/img/index_banner/1.png'),
  require('../assets/img/index_banner/2.png'),
  require('../assets/img/index_banner/3.png'),
  require('../assets/img/index_banner/4.png'),
  require('../assets/img/index_banner/5.png')
]
// 列表
const packageList = reactive([])
// packageList中的奇数项放到ch1中，偶数项放到ch2中
const ch1 = computed(() => {
  return packageList.filter((v, i) => i % 2 === 1)
})
const ch2 = computed(() => {
  return packageList.filter((v, i) => i % 2 === 0)
})
// 联系客服
const toCS = () => {
  const url = 'https://work.weixin.qq.com/kfid/kfcd4d3cef620aa8656'
  window.open(url)
}

const setBHFlag = ref(false)
// 设置轮播图外框高度
const setBannerHeight = () => {
  if (setBHFlag.value) return
  setBHFlag.value = true
  const imgs = document.getElementById('carousel').querySelectorAll('img')
  const c = document.querySelector('.el-carousel__container')
  const bannerHeightArr = []
  imgs.forEach(v => {
    bannerHeightArr.push(v.height)
  })
  c.style.height = Math.max(...bannerHeightArr) + 'px'
}

onMounted(async () => {
  // 获取packageList数据
  await api.get('/api/package').then(res => {
    packageList.push(...res.data)
  })
})
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 1rem;

  .el-card {
    border: none;
    background-color: #F7EED3;
    width: 100%;
    border-radius: 10px;

    .image {
      display: block;
      width: 100%;
      max-width: 100%;
      border-radius: 10px;
    }
  }
}

.ofHidden {
  overflow: hidden;
  max-height: 100vh;
}
</style>

<style lang="scss">
.body {
  .el-carousel__container {
    border-radius: 10px;
    overflow: hidden;
  }
}

.el-affix--fixed {
  padding-right: 2vw;
}
</style>
