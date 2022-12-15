<template>
  <!-- import style -->
  <link
    rel="stylesheet"
    href="https://fastly.jsdelivr.net/npm/vant@4/lib/index.css"
  />
  <LoadingMask v-if="loading"/>
  <div class="order-info">
    <el-header>
      <el-row align="middle" justify="space-between">
        <el-col class="icon" :span="4" @click="back" id="back">
          <ArrowLeft style="width: 40rem"/>
        </el-col>
        <el-col :span="10">
          订单详情
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
      <el-row class="addr">
        <el-col :span="3">
          <img class="icon-addr" src="../assets/img/index/地址icon.png" alt="地址"/>
        </el-col>
        <el-col :span="18">
          <p>
            <b>{{ info.receiver_name }}</b>{{ info.receiver_phone }}
          </p>
          <p class="region"> {{ region }} </p>
          <p> {{ addr }} </p>
        </el-col>
        <el-col :span="4">
          <!--          <div class="edit">-->
          <!--            修改-->
          <!--          </div>-->
        </el-col>
      </el-row>
    </el-header>
    <section class="intro">
      <p>你的订单将由以下仓库发出：</p>
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <div class="item" v-for="(sup,idx) in info.Suborder" :key="sup.id" ref="supRef" @click="itemActive(idx)">
            <el-col :span="12">
              <p>仓库{{ sup.goods_class }}</p>
              <p>共{{ sup.goods_count }}件</p>
            </el-col>
            <el-col :span="12">
              <img class="img" :src="sup.goods_item[0].thumbnail_image" :alt="sup.goods_item[0].name"/>
            </el-col>
          </div>
        </div>
      </el-scrollbar>
      <!--      <el-row class="d-div" v-if="!logistics.length" style="font-size: 24rem">-->
      <!--        暂无物流信息-->
      <!--      </el-row>-->
      <el-row class="d-div">
        <el-col class="d-steps" :span="18">
          <!--          <van-steps direction="vertical" :active="0"-->
          <!--                     class="logistics-ctx"-->
          <!--                     active-color="#C51829" inactive-color="#B3B3B3">-->
          <!--            <van-step v-for="(v,k) in logisticsCtx" :key="k">-->
          <!--              <template #inactive-icon>-->
          <!--                <img src="../assets/img/ex_info/coin_01.png" alt="">-->
          <!--              </template>-->
          <!--              <template #active-icon>-->
          <!--                <img src="../assets/img/ex_info/coin_02.png" alt="">-->
          <!--              </template>-->
          <!--              <h3>{{ v.status }}</h3>-->
          <!--              <p>{{ v.time }}</p>-->
          <!--            </van-step>-->
          <!--          </van-steps>-->
        </el-col>
        <el-col class="d-info-span" :span="6" @click="isShow=true">
          <span>物流详情 ></span>
        </el-col>
        <van-popup
          :show="isShow"
          @click-close-icon="isShow=false"
          @click-overlay="isShow=false"
          round closeable
          close-icon="close"
          position="bottom"
          :style="{ height: '80%'}"
        >
          <div class="d-info">
            <div class="d-info-title">
              <span>物流详情</span>
            </div>
            <van-space direction="vertical" size="22rem" fill>
              <van-cell-group inset>
                <van-cell title="">
                  <template #label>
                    <el-row class="logistics-list">
                      <el-col :span="6" v-for="(sup,idx) in info.Suborder" :key="idx"
                              @click="getLogistics(sup?.delivery_sn,idx)">
                        <div class="title">仓库{{ sup.goods_class }}</div>
                        <div class="image">
                          <img :src="sup.goods_item[0].thumbnail_image" alt="">
                        </div>
                      </el-col>
                    </el-row>
                  </template>
                </van-cell>
              </van-cell-group>
              <van-cell-group inset>
                <van-cell>
                  <van-tabs>
                    <el-empty v-if="!logistics.length" description="暂无物流信息"/>
                    <van-tab v-for="(item,k) in logistics" :title="'物流 ' + (k+1)" :key="k">
                      <van-cell :title="item.expressCompany+' '+item.expressNo" class="expressNo">
                      </van-cell>
                      <van-steps direction="vertical" :active="0"
                                 class="logistics-ctx"
                                 active-color="#C51829" inactive-color="#B3B3B3">
                        <van-step v-for="(_s,_k) in item.tracks" :key="_k">
                          <template #inactive-icon>
                            <img src="../assets/img/ex_info/coin_01.png" alt="">
                          </template>
                          <template #active-icon>
                            <img src="../assets/img/ex_info/coin_02.png" alt="">
                          </template>
                          <h3>{{ _s.context }}</h3>
                          <p>{{ _s.time }}</p>
                        </van-step>
                      </van-steps>
                    </van-tab>
                  </van-tabs>
                  <el-row class="logistics-bot" v-if="logistics.length">
                    <div class="receive">
                      收
                    </div>
                    <div class="logistics-bot-right">
                      <span>{{ info.receiver_name }}，{{ info.receiver_phone }}，{{ region }}{{ addr }}</span>
                    </div>
                  </el-row>
                </van-cell>
              </van-cell-group>
              <div></div>
            </van-space>
          </div>
        </van-popup>
      </el-row>
    </section>

    <section class="desc">
      <el-row>
        <el-col class="item" v-for="(item,idx) in supActiveInfo?.goods_item" :key="idx">
          <el-row>
            <el-col :span="5">
              <img class="img" :src="item.thumbnail_image" :alt="item.name">
            </el-col>
            <el-col :span="19" style="align-self: center">
              <p>{{ item.name }}</p>
              <p>{{ item.goods_spec }}</p>
            </el-col>
            <!--            <el-col :span="4" class="flex-right">-->
            <!--              <div>-->
            <!--                <img src="../assets/img/index/豆.png" alt="">-->
            <!--                <span>118</span>-->
            <!--              </div>-->
            <!--            </el-col>-->
          </el-row>
        </el-col>
      </el-row>
    </section>

    <section class="price">
      <!--      <el-row class="info" justify="space-between">-->
      <!--        <div>商品总价</div>-->
      <!--        <div>236.00</div>-->
      <!--      </el-row>-->
      <!--      <el-row class="info" justify="space-between">-->
      <!--        <div>运费</div>-->
      <!--        <div>0</div>-->
      <!--      </el-row>-->
      <!--      <el-row class="tot" justify="space-between">-->
      <!--        <div>总计</div>-->
      <!--        <div>-->
      <!--          <img src="../assets/img/index/豆.png" alt="">-->
      <!--          <span class="red">236.00</span>-->
      <!--        </div>-->
      <!--      </el-row>-->
      <!--      <el-divider/>-->
      <el-row class="order-intro">
        <el-space direction="vertical">订单号：{{ info.order_sn }}</el-space>
        <el-space direction="vertical">兑换时间：{{ orderTime }}</el-space>
      </el-row>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import router from '@/router'
import api from '@/api'
import { ArrowLeft } from '@element-plus/icons-vue'
import {
  Cell as VanCell, CellGroup as VanCellGroup,
  Popup as VanPopup,
  Space as VanSpace,
  Tabs as VanTabs, Tab as VanTab,
  Steps as VanSteps, Step as VanStep
} from 'vant'
import LoadingMask from '@/components/LoadingMask.vue'

// 页面加载
const loading = ref(true)
// 物流信息展示 TODO
const isShow = ref(false)

// 订单信息
const info = ref({})
// 用户地区
const region = ref('')
// 用户地址
const addr = ref('')
// 供应商Element
const supRef = ref([])
// 选中的供应商的下标
const supIdx = ref(0)

// 选中的供应商的信息
const supActiveInfo = ref()
// 物流信息
const logistics = ref([])
// 物流信息简述
// const logisticsCtx = computed(() => {
//   if (logistics.value.length) {
//     if (logistics.value[0].tracks.length > 1) {
//       return [logistics.value[0].tracks[0], logistics.value[0].tracks[logistics.value[0].tracks.length - 1]]
//     } else {
//       return [logistics.value[0].tracks[0]]
//     }
//   } else {
//     return []
//   }
// })

// 格式化兑换时间
const orderTime = computed(() => {
  const date = new Date(info.value.order_time * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})

// 发起请求获取物流信息
const getLogistics = (numList, idx) => {
  logistics.value = []
  console.log(numList)
  console.log(idx)
  if (numList) {
    // console.log(numList)
    numList.forEach(async (num) => {
      await api.post(
        '/api/logistics/getLogistics_public',
        {
          logistics_number: num
        },
        {
          baseURL: 'https://xxht.xinxuanyf.com'
        }
      ).then((res) => {
        logistics.value.push(...JSON.parse(res))
      })
      console.log(logistics.value)
    })
  }
}

// 切换仓库
const itemActive = (idx) => {
  // 先删除现有的active再添加
  supRef.value.forEach((item) => {
    item.classList.remove('active')
  })
  supIdx.value = idx
  supRef.value[idx].classList.add('active')
  supActiveInfo.value = info.value.Suborder[idx]
  // console.log(supActiveInfo.value.goods_item[0].thumbnail_image)
}

// 返回上一页
const back = () => {
  // 从wxAuth来的就replace到首页
  if (router.currentRoute.value.query.from === 'wxAuth') {
    router.replace('/')
  } else {
    router.back()
  }
}

// 拼接地址信息
watch(() => info.value, (val) => {
  if (val) {
    region.value = `${val.receiver_province}  ${val.receiver_city}  ${val.receiver_county}  ${val.receiver_town}`
    addr.value = val.receiver_address
    supActiveInfo.value = info.value.Suborder[supIdx.value]
  }
})

onMounted(async () => {
  // 获取订单详情，从query中获取id
  const id = router.currentRoute.value.params.id
  await api.get('/api/ex_info?id=' + id).then((res) => {
    info.value = res.data
  })
  loading.value = false
  // 默认选中第一个仓库
  supIdx.value = 0
  supRef.value[supIdx.value]?.classList.add('active')
  getLogistics(info.value.Suborder[0].delivery_sn, 0)
})
</script>

<style scoped lang="scss">
.order-info {
  .el-header {
    height: 316rem;
    padding-top: 55rem;
    background-image: url('@/assets/img/index/订单背景.png');
    background-size: 100%;
    color: #FFFFFF;
    text-align: center;
    overflow: clip;
    font-size: 28rem;

    .icon {
      display: flex;
      align-self: center;
    }

    .addr {
      width: 700rem;
      height: 143rem;
      background: #FFFFFF;
      border-radius: 10rem;
      margin-top: 45rem;
      padding: 18rem 24rem 0;

      .icon-addr {
        margin-top: 5rem;
      }

      p {
        font-size: 20rem;
        color: #666666;
        text-align: left;

        &.region {
          margin-top: 10rem;
        }

        b {
          padding-right: 10rem;
          font-size: 28rem;
          color: #333333;
        }
      }
    }

    .edit {
      width: 80rem;
      margin: auto;
      border: 2px solid #B3B3B3;
      border-radius: 20rem;
      font-size: 24rem;
      line-height: 32rem;
      font-weight: 400;
      color: #666666;
    }
  }

  .intro {
    padding: 25rem 45rem;
    background-color: #fff;
    margin-bottom: 16rem;

    & > p {
      color: #333333;
      font-size: 24rem;
      margin-bottom: 28rem;
    }

    .scrollbar-flex-content {
      display: flex;

      .item {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        width: 316rem;
        height: 135rem;
        background-image: url('@/assets/img/index/未选中@2x.png');
        background-size: 100% 100%;
        //不是第一个子元素的item的margin-left:16px
        &:not(:first-child) {
          margin-left: 16rem;
        }

        &.active {
          background-image: url('@/assets/img/index/选中@2x.png');

          p:first-child {
            color: #C51829;
          }
        }

        p {
          padding-left: 22rem;

          &:first-child {
            color: #343434;
            font-size: 28rem;
          }

          &:last-child {
            color: #B3B3B3;
            font-size: 20rem;
          }
        }

        .el-col:last-child {
          text-align: center;

          .img {
            width: 120rem;
            height: 120rem;
            border: 1px solid #B3B3B3;
            border-radius: 10rem;
          }
        }
      }
    }

    .d-div {
      margin-top: 30rem;

      .d-steps {
        --van-step-font-size: 20rem;
      }

      .d-info-span {
        color: #C51829;
        font-size: 24rem;
        text-align: right;
      }

      .d-info {
        .d-info-title {
          margin: 25rem auto 35rem;
          color: #333333;
          font-size: 28rem;
          text-align: center;
        }

        .expressNo {
          text-align: left;
          line-height: 48rem;
        }

        .logistics-list {
          .el-col {
            text-align: -webkit-center;
          }

          .title {
            color: #333333;
            font-size: 28rem;
            line-height: 45rem;
          }

          .image {
            width: 120rem;
            height: 120rem;
            border: 1px solid #B3B3B3;
            border-radius: 10rem;
            overflow: hidden;

            img {
              width: 100%;
            }
          }
        }

        .logistics-ctx {
          text-align: left;
          --van-step-font-size: 20rem;
        }

        .logistics-bot {
          .receive {
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: center;
            width: 27rem;
            height: 27rem;
            margin-right: 15rem;
            color: #C51829;
            font-size: 16rem;
            text-align: center;
            border: 1px solid #C51829;
            border-radius: 100%;
          }

          .logistics-bot-right {
            flex: 1;
            text-align: left;
            color: #333333;
            font-size: 20rem;
          }
        }

      }
    }
  }

  .desc {
    padding: 15rem 45rem;
    background-color: #fff;
    margin-bottom: 16rem;

    .item {
      // 同级中不是第一的加上margin-top
      &:not(:first-child) {
        margin-top: 20rem;
      }

      .flex-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      p {
        padding-left: 22rem;

        &:first-child {
          color: #333333;
          font-size: 24rem;
        }

        &:last-child {
          color: #B3B3B3;
          font-size: 16rem;
          line-height: 32rem;
        }
      }

      span {
        font-size: 32rem;
        color: #333333;
      }
    }

    .img {
      width: 137rem;
      height: 137rem;
      border: 1px solid #B3B3B3;
      border-radius: 10rem;
    }
  }

  .order-intro {
    font-size: 24rem;
    color: #666666;
    line-height: 36rem;
  }

  .price {
    padding: 15rem 45rem;
    background-color: #fff;

    span {
      font-size: 32rem;
      color: #333333;
    }

    .info {
      font-size: 24rem;
      color: #333333;
      line-height: 36rem;
    }

    .tot {
      font-size: 28rem;
      color: #333333;

      .red {
        color: #C51829;
      }
    }
  }
}
</style>

<style lang="scss">
.order-info {
  .el-step__line {
    background-color: #C51829;
  }

  .el-step.is-vertical {
    .el-step__title {
      font-size: 22rem;
      color: #333333;

      &.is-finish {
        font-size: 24rem;
        color: #C51829;
      }
    }
  }

  .van-popup {
    --van-popup-background: #EEEEEE;
  }

  .van-cell {
    --van-cell-font-size: 24rem;
  }
}
</style>
