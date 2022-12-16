<template>
  <InnerPageHeader>
    收货地址
  </InnerPageHeader>
  <section class="addr" v-if="!addAddr">
    <AddrList :contact="contact"
              @del:contact="handleUpdateAddr"
              @edit:contact="handleEditAddr"
    />
    <div class="red-btn" @click="toAddAddr">
      添加新地址
    </div>
  </section>
  <section class="addr" v-if="addAddr">
    <AddAddr :addrInfo="addrInfo" @save:contact="handleSaveAddr"/>
  </section>
</template>

<script setup>
import InnerPageHeader from '@/components/InnerPageHeader'
import AddrList from '@/components/AddrList'
import AddAddr from '@/components/AddAddr'
import { ref, onMounted, reactive, watch } from 'vue'
import api from '@/api'

// 获取用户信息
const userInfo = reactive(JSON.parse(sessionStorage.getItem('userInfo')))

const contact = reactive([])
const addAddr = ref(false)

// 编辑地址时，传递给子组件AddAddr的数据
let addrInfo = {}
const toAddAddr = () => {
  // 清空addrInfo
  addrInfo = {}
  addAddr.value = true
}

// 刷新地址
const handleUpdateAddr = () => {
  getAddr()
}

// 编辑地址，从AddrList中获取到的数据传递通过addrInfo传递给AddAddr组件
const handleEditAddr = (val) => {
  // 将val赋值给addrInfo
  addrInfo = val
  addAddr.value = true
}

// 数据保存后，返回到AddrList
const handleSaveAddr = async () => {
  getAddr()
  addAddr.value = false
}

const getAddr = async () => {
  const unionid = userInfo.unionid
  contact.length = 0
  await api.get('api/user_address?unionid=' + unionid).then(res => {
    contact.push(...res.data)
    userInfo.user_address = res.data
  })
}

watch(() => userInfo.user_address, (val) => {
  sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
  const def_ = val.find(item => item.status === 1)
  const c_ = def_ || val[0] || {}
  sessionStorage.setItem('contact_address', JSON.stringify(c_))
})

onMounted(() => {
  getAddr()
})
</script>

<style scoped lang="scss">
.addr {
  padding: 22px 0;
  width: 700rem;
  margin: auto;

  .red-btn {
    width: 630rem;
    line-height: 98rem;
    margin: auto;
    background: #C51829;
    border-radius: 50rem;
    text-align: center;
    font-size: 30rem;
    color: #FFFFFF;
  }
}
</style>
