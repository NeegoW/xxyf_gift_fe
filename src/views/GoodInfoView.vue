<template>
  <InnerPageHeader>
    商品详情
  </InnerPageHeader>
  <LoadingMask v-if="isLoading"/>
  <section class="goodInfo" v-if="!isLoading">
    <div class="img">
      <el-image :src="info?.show_img">
        <template #placeholder>
          <div class="image-slot">
            <el-icon>
              <icon-picture/>
            </el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <div class="shadow">
      <p>{{ info?.name }}</p>
      <!--      <p>-->
      <!--        <img class="i-dou" src="../assets/img/index/豆.png">-->
      <!--        <span class="word-red">{{ info?.selling_price }}</span>-->
      <!--      </p>-->
    </div>
    <div class="shadow">
      <el-row class="li" align="middle" justify="space-between">
        <el-col :span="1">
          <img class="i-li-prefix" src="../assets/img/index/货运32PX.png"/>
        </el-col>
        <el-col :span="20">
          <b>{{ deliveryArea }}</b>
          <p>配送至：{{ deliveryAddr }}</p>
        </el-col>
        <el-col :span="1">
          <img @click="toAddr" class="i-li-prefix" src="../assets/img/index/展开.png"/>
        </el-col>
      </el-row>
      <el-row class="li" align="middle" justify="space-between">
        <el-col :span="1">
          <img class="i-li-prefix" src="../assets/img/index/保障.png"/>
        </el-col>
        <el-col :span="20">
          正品保障 · 全国快递 · 快递速达 · 售后无忧
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row class="li" align="middle" justify="space-between">
        <el-col :span="1">
          <img class="i-li-prefix" src="../assets/img/index/运费.png"/>
        </el-col>
        <el-col :span="20">
          <b>运费</b>免运费
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row class="li" align="middle" justify="space-between">
        <el-col :span="1">
          <img class="i-li-prefix" src="../assets/img/index/规格.png"/>
        </el-col>
        <el-col :span="20">
          <b>规格</b> 暂无信息
        </el-col>
        <el-col :span="1">
          <img class="i-li-prefix" src="../assets/img/index/展开.png"/>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <el-row justify="space-around">
        <el-button @click="toCS" class="cs">联系客服</el-button>
        <el-button @click="doEx" class="ex">立即兑换</el-button>
      </el-row>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted, computed, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { Picture as IconPicture } from '@element-plus/icons-vue'

import InnerPageHeader from '@/components/InnerPageHeader.vue'
import LoadingMask from '@/components/LoadingMask.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import onBridgeReady from '@/utils/wechatPay'

const isLoading = ref(true)

// 从sS中获取地址信息
const contactAddress = JSON.parse(sessionStorage.getItem('contact_address') || '{}')
const address = reactive(contactAddress ?? {})
const deliveryArea = computed(() => {
  return address?.province + address?.city || '暂无地址信息'
})
const deliveryAddr = computed(() => {
  return address?.county + address?.town + address?.address || '暂无地址信息'
})

// 获取路由参数
const router = useRouter()
const packageId = router.currentRoute.value.params.id
const info = ref({})

// 获取用户信息
const userInfo = ref(JSON.parse(sessionStorage.getItem('userInfo')))
// 获取卡券信息
const cardInfo = computed(() => userInfo.value.card_info)
// 余额
const balance = computed(() => cardInfo.value.Active.balance)
// 差价
const diff = computed(() => (balance.value - info.value.selling_price).toFixed(2))
// 微信补差价
const exPay = computed(() => diff.value < 0 ? Math.abs(diff.value) : 0)
// 提示信息
const tip = computed(() => diff.value < 0 ? `卡券剩余不足，使用微信支付${exPay.value}，确认兑换吗` : `卡券剩余${balance.value}，确认兑换吗？`)

const toAddr = () => {
  router.push({
    name: 'addr'
  })
}

// 联系客服
const toCS = () => {
  const url = 'https://work.weixin.qq.com/kfid/kfcd4d3cef620aa8656'
  window.open(url)
}

const doPay = async (openid, fee, data) => {
  await api.post(
    'wechat/pay_info',
    {
      openid: openid,
      fee: fee
    }
  ).then(res => {
    onBridgeReady(res.data, createOrder, data)
  })
}

// eslint-disable-next-line no-unused-vars
const createOrder = async (data) => {
  api.post('/api/order', data).then(res => {
    // 更新用户信息
    userInfo.value = res.data
    sessionStorage.setItem('userInfo', JSON.stringify(res.data))
    // 跳转到兑换记录
    ElMessage.success({
      message: '兑换成功',
      duration: 1000
    })
  }).catch(err => {
    console.log(err)
  })
}

// 兑换操作
const doEx = () => {
  ElMessageBox.confirm(
    tip.value,
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '兑换',
      cancelButtonText: '取消'
    }
  ).then(() => {
    // 整理数据
    const data = {
      openid: userInfo.value.openid,
      unionid: userInfo.value.unionid,
      order_amount: info.value.selling_price,
      pay_type: exPay.value > 0 ? 1 : 0,
      pay_card: {
        code: cardInfo.value.code,
        amount: balance.value > info.value.selling_price ? info.value.selling_price : balance.value
      },
      pay_wechat: exPay.value > 0 ? exPay.value : null,
      receiver_name: address.name,
      receiver_phone: address.tel,
      receiver_province: address.province,
      receiver_city: address.city,
      receiver_county: address.county,
      receiver_town: address.town,
      receiver_address: address.address,
      Item: {
        product_id: info.value.id,
        product_pic: info.value.show_img,
        product_name: info.value.name,
        product_price: info.value.selling_price
      }
    }
    // console.log(data)
    // 兑换
    // console.log(exPay.value)
    if (exPay.value > 0) {
      doPay(userInfo.value.openid, exPay.value, data)
    } else {
      // console.log('有余额')
      createOrder(data)
    }
  }).catch(() => {
    // console.log('点了取消')
  })
}

onMounted(async () => {
  // 获取商品详情数据
  await api.get('/api/package?id=' + packageId).then(res => {
    info.value = res.data
  })
  await nextTick()
  isLoading.value = false
})
</script>

<style scoped lang="scss">
.goodInfo {
  background-color: #EEEEEE;
  font-size: 28rem;
  color: #333333;

  .shadow {
    background: #FFFFFF;
    box-shadow: -6px 0px 10px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 20rem;
    padding: 10rem 25rem;

    .li {
      padding: 10px 0;
      border-bottom: 1px solid #B3B3B3;
      font-size: 20rem;

      &:last-child {
        border-bottom: none;
      }

      b {
        font-weight: bold !important;
        margin-right: 10px;
      }
    }
  }

  .word-red {
    color: #C51829;
    font-size: 32rem;
  }

  .img {
    .el-image {
      width: 100%;
    }

    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: var(--el-fill-color-light);
      color: var(--el-text-color-secondary);
      font-size: 30rem;

      .el-icon {
        font-size: 30rem;
      }
    }
  }

  .i-li-prefix {
    width: 32rem;
    height: 32rem;
  }

  .footer {
    width: 100%;
    background: #FFFFFF;
    padding: 20rem 0 30rem;

    .el-button {
      width: 270rem;
      height: 75rem;
      font-size: 28rem;
      border-radius: 35rem;
    }

    .cs {
      border: 2px solid #B3B3B3;
      color: #666666;
    }

    .ex {
      margin: 0;
      background: #C51829;
      border: 2px solid #C51829;
      color: #FFFFFF;
    }
  }
}
</style>
