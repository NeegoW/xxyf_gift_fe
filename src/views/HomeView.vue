<template>
  <img class="cs-img" src="@/assets/img/cs.gif" alt="" @click="toCS">
  <BgImg :class="ofHidden">
    <div class="count-time">
      <div>
        <p>卡券有效期至：</p>
        <p>{{ validDate }}</p>
      </div>
    </div>
    <MaskLay v-if="showMask" @update:showMask="handleShowMask"/>
    <HeadNav @update:showMask="handleShowMask"/>
    <section class="home">
      <el-row class="row" justify="space-between">
        <el-col :span="12">
          <el-row>
            <el-col class="item">
              <el-card :body-style="{ padding: '16rem'}" class="banner">
                <el-carousel indicator-position="none">
                  <el-carousel-item v-for="item in bannerImgs" :key="item">
                    <img ref="banner"
                         style="width:100%;max-width: 100%"
                         :src="item"
                         alt="banner"/>
                  </el-carousel-item>
                </el-carousel>
              </el-card>
            </el-col>
            <el-col v-for="v in ch1" :key="v" class="item" @click="toInfo(v.id)">
              <el-card :body-style="{ padding: '16rem' }">
                <el-image :src="v.show_img">
                  <template #placeholder>
                    <div class="loading-slot">
                      <el-icon>
                        <icon-picture/>
                      </el-icon>
                    </div>
                  </template>
                </el-image>
                <el-row class="item-name" justify="space-between">
                  <el-col :span="18">
                    {{ v.name }}
                  </el-col>
                  <el-col :span="4">
                    <img class="i-ex" src="../assets/img/index/兑换按钮.png" alt="">
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col v-for="v in ch2" :key="v" class="item" @click="toInfo(v.id)">
              <el-card :body-style="{ padding: '16rem' }">
                <el-image :src="v.show_img">
                  <template #placeholder>
                    <div class="loading-slot">
                      <el-icon>
                        <icon-picture/>
                      </el-icon>
                    </div>
                  </template>
                </el-image>
                <el-row class="item-name" justify="space-between">
                  <el-col :span="18">
                    {{ v.name }}
                  </el-col>
                  <el-col :span="4">
                    <img @click="toInfo( v.id )" class="i-ex" src="../assets/img/index/兑换按钮.png" alt="">
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </section>
  </BgImg>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Picture as IconPicture } from '@element-plus/icons-vue'

import BgImg from '@/components/BgImg'
import HeadNav from '@/components/HeadNav'
import MaskLay from '@/components/MaskLay'
import api from '@/api'

// 查看sessionStorage中是否有showMask
const showMask = ref(localStorage.getItem('showMask') !== 'false')
const ofHidden = computed(() => {
  return showMask.value ? 'ofHidden' : ''
})
// 蒙层显示隐藏
const handleShowMask = (val) => {
  showMask.value = val
  localStorage.setItem('showMask', val)
}

// 截止时间
const cardInfo = reactive(JSON.parse(sessionStorage.getItem('userInfo'))?.card_info)
const validDate = computed(() => {
  const date = new Date(cardInfo?.Active?.end_time * 1000)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
})

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
const banner = reactive([])

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

onMounted(async () => {
  // 获取packageList数据
  const levelId = cardInfo?.Active?.level_id
  // console.log(levelId)
  await api.get('/api/package?level_id=' + levelId).then(res => {
    packageList.push(...res.data)
  })
})
</script>

<style lang="scss" scoped>
.cs-img {
  position: fixed;
  z-index: 500;
  right: 0;
  top: 60vh;
  width: 108rem;
}

.count-time {
  color: #eee;
  font-size: 28rem;
  line-height: 40rem;
  margin-top: -60rem;
  text-align: center;
}

.home {
  position: relative;

  .row {
    > .el-col-12 {
      max-width: calc(50% - 10rem);
      flex: 0 0 calc(50% - 10rem);
    }
  }

  .item {
    .el-card {
      border: none;
      background-color: #FFFFFF;
      width: 100%;
      border-radius: 10rem;
      margin-bottom: 20rem;

      &.banner {
        background-color: #F7EED3;
      }

      .image {
        display: block;
        width: 100%;
        max-width: 100%;
        border-radius: 10rem;
        border: 2rem solid rgba(239, 239, 239, 1);
      }

      .item-name {
        color: #333333;
        font-size: 28rem;
        margin: 14rem 0 10rem;
      }

      .a-i-bsl {
        align-items: baseline;

        .item-price {
          color: #C51829;
          font-size: 32rem;
        }
      }
    }

    .loading-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 300rem;
      background: var(--el-fill-color-light);
      color: var(--el-text-color-secondary);

      .el-icon {
        font-size: 30rem;
      }
    }
  }
}

.ofHidden {
  overflow: hidden;
  max-height: 100vh;
}
</style>

<style lang="scss">
.el-carousel__container {
  height: 350rem;
}
</style>
