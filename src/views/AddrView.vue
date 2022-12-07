<template>
  <InnerPageHeader>
    收货地址
  </InnerPageHeader>
  <section class="addr">
    <AddrList :contact="contact"/>
    <div class="add-btn" @click="addAddrItem">
      <div>添加新地址</div>
    </div>
  </section>
</template>

<script setup>
import InnerPageHeader from '@/components/InnerPageHeader'
import AddrList from '@/components/AddrList'
import { reactive } from 'vue'
import api from '@/api'

const contact = reactive(
  [
    {
      id: 0,
      name: '杨洋',
      phone: '123456',
      addr: '广东省深圳市南山区西丽街道'
    },
    {
      id: 1,
      name: '杨洋',
      phone: '123456',
      addr: '广东省深圳市南山区西丽街道'
    }
  ]
)
const addAddrItem = () => {
  api.post('/api/tt', {
    name: '杨洋'
  })
}
</script>

<style scoped lang="scss">
.addr {
  padding: 22px 0;

  .add-btn {

    div {
      width: 631px;
      margin: auto;
      background: #C51829;
      border-radius: 49px;
      text-align: center;
      font-size: 30px;
      color: #FFFFFF;
      line-height: 98px;
    }
  }
}
</style>
