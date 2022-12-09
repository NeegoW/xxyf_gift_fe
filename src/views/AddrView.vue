<template>
  <InnerPageHeader>
    收货地址
  </InnerPageHeader>
  <section class="addr" v-if="!addAddr">
    <AddrList :contact="contact"/>
    <div class="red-btn" @click="addAddr=true">
      添加新地址
    </div>
  </section>
  <section class="addr" v-if="addAddr">
    <AddAddr @update:contact="handleAddAddr"/>
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

const handleAddAddr = (val) => {
  contact.push(val)
}

onMounted(async () => {
  await api.get('/api/user_address').then(res => {
    contact.push(...res.data)
  })
})
</script>

<style scoped lang="scss">
.addr {
  padding: 22px 0;

  .red-btn {
    width: 80vw;
    height: 3rem;
    line-height: 3rem;
    margin: auto;
    background: #C51829;
    border-radius: 2rem;
    text-align: center;
    font-size: 1.2rem;
    color: #FFFFFF;
  }
}
</style>
