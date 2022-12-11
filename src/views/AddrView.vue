<template>
  <InnerPageHeader>
    收货地址
  </InnerPageHeader>
  <section class="addr" v-if="!addAddr">
    <AddrList :contact="contact"
              @del:contact="handleDelAddr"
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
import { ref, onMounted, reactive } from 'vue'
import api from '@/api'

const contact = reactive([])
const addAddr = ref(false)

// 编辑地址时，传递给子组件AddAddr的数据
let addrInfo = {}
const toAddAddr = () => {
  // 清空addrInfo
  addrInfo = {}
  addAddr.value = true
}

// 删除地址
const handleDelAddr = (id) => {
  // 删除contact中的id=传入id的项
  contact.splice(contact.findIndex(item => item.id === id), 1)
}

// 编辑地址，从AddrList中获取到的数据传递通过addrInfo传递给AddAddr组件
const handleEditAddr = (val) => {
  // 将val赋值给addrInfo
  addrInfo = val
  addAddr.value = true
}

// 数据保存后，返回到AddrList
const handleSaveAddr = async (val, isAdd, isChange) => {
  if (isChange) {
    // 用find找到contact中的id=传入id的项，将传入的val赋值给该项
    contact.splice(contact.findIndex(item => item.id === val.id), 1, val)
  }
  if (isAdd) {
    // 将传递过来的val添加到contact中
    contact.push(val)
  }
  addAddr.value = false
}

const getAddr = async () => {
  const unionid = JSON.parse(sessionStorage.getItem('userInfo')).unionid
  await api.get('api/user_address?unionid=' + unionid).then(res => {
    contact.push(...res.data)
  })
}

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
