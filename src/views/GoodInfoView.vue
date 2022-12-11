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
      <p>{{ info?.alias || info?.name }}</p>
      <p>
        <img class="i-dou" src="../assets/img/index/豆.png">
        <span class="word-red">{{ info?.selling_price }}</span>
      </p>
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
import { reactive, onMounted, computed, ref, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { Picture as IconPicture } from '@element-plus/icons-vue'

import InnerPageHeader from '@/components/InnerPageHeader.vue'
import LoadingMask from '@/components/LoadingMask.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

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
const userInfo = reactive(JSON.parse(sessionStorage.getItem('userInfo')))
// 获取卡券信息
const cardInfo = userInfo.card_info
// 余额
const balance = ref(cardInfo?.Active?.balance)
// 差价
const diff = ref(0.00)
// 微信补差价
const exPay = ref(0.00)
// 提示信息
const tip = ref('')

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
    // 兑换
    api.post('/api/order', {
      openid: userInfo.openid,
      unionid: userInfo.unionid,
      order_amount: info.value.selling_price,
      pay_type: exPay.value > 0,
      pay_card: {
        code: cardInfo.code,
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
    }).then(res => {
      // 更新用户信息
      sessionStorage.setItem('userInfo', JSON.stringify(res.data))
      // 跳转到兑换记录
      ElMessage.success('兑换成功')
    }).catch(err => {
      console.log(err)
    })
  }).catch(() => {
    console.log('取消')
  })
}

watch(() => info.value, (val) => {
  // 计算差价，如果余额不足，使用微信支付补差价
  diff.value = (balance.value - val?.selling_price).toFixed(2)
  exPay.value = Math.abs(diff.value)
  tip.value = diff.value < 0 ? `卡券剩余不足，使用微信支付${exPay.value}，确认兑换吗` : `卡券剩余${balance.value}，确认兑换吗？`
})

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
