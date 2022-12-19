<template>
  <InnerPageHeader>
    商品详情
  </InnerPageHeader>
  <LoadingMask v-if="isLoading"/>
  <section class="goodInfo" v-if="!isLoading">
    <van-space direction="vertical" fill size="20rem">
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
        <span class="f-big">{{ info?.name }}</span>
      </div>
      <div class="items shadow">
        <div class="item" v-for="(item,_k) in cGoods" :key="_k">
          <el-row :gutter="10">
            <el-col :span="6">
              <img class="thumb" :src="item.thumbnail_image" alt="">
            </el-col>
            <el-col :span="14">
              <van-space class="item-ctx" size="20rem" direction="vertical" fill>
                <div class="f-big">{{ item.name }}</div>
                <div>
                  <p>联系人：{{ Object.values(item.address).slice(0, 2).join(' ') || '' }}</p>
                  <p>配送至：{{ Object.values(item.address).slice(2).join(' ') || '' }}</p>
                </div>
              </van-space>
            </el-col>
            <el-col :span="4" class="item-right" @click="chooseAddr(_k)">
              修改地址
            </el-col>
          </el-row>
        </div>
      </div>
      <div></div>
    </van-space>
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
import { showConfirmDialog, showFailToast, showSuccessToast } from 'vant'

import { Picture as IconPicture } from '@element-plus/icons-vue'
import api from '@/api'
import InnerPageHeader from '@/components/InnerPageHeader.vue'
import LoadingMask from '@/components/LoadingMask.vue'

const isLoading = ref(true)

// 从sS中获取地址信息
const contactAddress = JSON.parse(sessionStorage.getItem('contact_address') || '{}')
const address = reactive(contactAddress ?? {})

// 获取路由参数
const router = useRouter()
const packageId = router.currentRoute.value.params.id
const info = ref({})
// 套餐内商品
const cGoods = computed(() => {
  const changeItemAddr = JSON.parse(sessionStorage.getItem('changeItemAddr')) || []
  const p = changeItemAddr.find((item) => item.packageId === packageId)
  // 设置默认地址
  info.value?.Goods.forEach((item, k) => {
    const temp = {
      name: address?.name,
      tel: address?.tel,
      province: address?.province,
      city: address?.city,
      county: address?.county,
      town: address?.town,
      address: address?.address
    }
    if (p?.addresses[k]) {
      item.address = p.addresses[k]
    } else {
      item.address = temp || {}
    }
  })
  return info.value?.Goods || []
})

// 获取用户信息
const userInfo = ref(JSON.parse(sessionStorage.getItem('userInfo')))
// 获取卡券信息
const cardInfo = computed(() => userInfo.value.card_info)
// 是否次卡
const isOneTime = computed(() => cardInfo.value.type === '1')
// 使用次数
const countUse = computed(() => cardInfo.value.Active.count_use)
// 余额
const balance = computed(() => cardInfo.value.Active.balance)
// 差价
const diff = computed(() => (balance.value - info.value.selling_price).toFixed(2))
// 微信补差价
const exPay = computed(() => diff.value < 0 ? Math.abs(diff.value) : 0)
// 提示信息
const tip = computed(() => {
  if (isOneTime.value) {
    // TODO : 次数判断
    // 次卡只能一次
    if (process.env.NODE_ENV === 'development') {
      return true
    } else {
      return parseInt(countUse.value) === 0
    }
  } else {
    return true
  }
})

// 修改地址
const chooseAddr = (_idx) => {
  const changeItemAddr = JSON.parse(sessionStorage.getItem('changeItemAddr') || '{}')
  if (changeItemAddr.length) {
    // 有修改地址数据
    // 查找changeItemAddr中下标为packageId的数据
    const idx = changeItemAddr.findIndex((item) => item.packageId === packageId)
    if (idx >= 0) {
      // 如果存在，则修改
      changeItemAddr[idx].addresses[_idx] = cGoods.value[_idx].address
    } else {
      // 如果不存在，则添加
      const temp = {
        packageId: packageId,
        addresses: {}
      }
      temp.addresses[_idx] = cGoods.value[_idx].address
      changeItemAddr.push(temp)
    }
    // 保存到sessionStorage
    sessionStorage.setItem('changeItemAddr', JSON.stringify(changeItemAddr))
  } else {
    // 无修改地址数据，初始化并添加
    const temp = {
      packageId: packageId,
      addresses: {}
    }
    temp.addresses[_idx] = cGoods.value[_idx].address
    // 保存到sessionStorage
    sessionStorage.setItem('changeItemAddr', JSON.stringify([temp]))
  }
  router.push({
    name: 'addr',
    params: {
      packageId: packageId,
      idx: _idx
    }
  })
}
// 联系客服
const toCS = () => {
  const url = 'https://work.weixin.qq.com/kfid/kfcd4d3cef620aa8656'
  window.open(url)
}

const createOrder = async (data) => {
  api.post('/api/order', data).then(res => {
    // 更新用户信息
    userInfo.value = res.data
    sessionStorage.setItem('userInfo', JSON.stringify(res.data))
    // 跳转到兑换记录
    showSuccessToast('兑换成功')
    router.push({
      name: 'exLog'
    })
  }).catch(/* err => {
    console.log(err)
  } */)
}

const confirm = () => {
  showConfirmDialog({
    title: '兑换'
  }).then(() => {
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
        // 套餐主信息
        product_id: info.value.id,
        product_pic: info.value.show_img,
        product_name: info.value.name,
        product_price: info.value.selling_price,
        // 套餐内所涵盖商品信息
        SubItem: []
      }
    }
    // 将cGoods.value添加到SubItem中
    cGoods.value.forEach((item, k) => {
      const temp = {
        one_gid: item.id,
        class: item.class,
        receiver_name: item.address.name,
        receiver_phone: item.address.tel,
        receiver_province: item.address.province,
        receiver_city: item.address.city,
        receiver_county: item.address.county,
        receiver_town: item.address.town,
        receiver_address: item.address.address
      }
      data.Item.SubItem.push(temp)
    })
    // console.log(data)
    // TODO : 发送请求
    createOrder(data)
  }).catch(() => {
  })
}

// 兑换操作
const doEx = () => {
  // 判断是否可兑换
  if (cardInfo.value.end_time * 1000 < new Date().getTime()) {
    showFailToast('会员卡已过期')
    return
  }
  if (tip.value) {
    // 判断是否有地址
    if (cGoods.value.every((item) => item.address?.name)) {
      // TODO : 确认兑换
      confirm()
    } else {
      showFailToast('请填写地址')
    }
  } else {
    showFailToast('无法重复兑换')
  }
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

  // 阴影
  .shadow {
    box-shadow: 0 0 10rem 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 20rem;
  }

  .f-big {
    font-size: 28rem;
  }

  .items {

    .item {
      &:not(:last-child) {
        margin-bottom: 20rem;
        padding-bottom: 10rem;
        border-bottom: 1px solid #EEEEEE;
      }

      .thumb {
        width: 100%;
        border: 1rem solid #EEEEEE;
        border-radius: 10rem;
        overflow: hidden;
      }

      .item-ctx {
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-size: 20rem;
      }

      .item-right {
        margin-bottom: 5rem;
        padding: 5rem 3rem;
        border: 1rem solid #c41829;
        border-radius: 20rem;
        justify-self: center;
        align-self: flex-end;
        font-size: 20rem;
        text-align: center;
        color: #c41829;
      }
    }
  }

  .footer {
    width: 100%;
    background: #FFFFFF;
    height: auto;
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
