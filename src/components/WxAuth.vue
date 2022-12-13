<template>
  <LoadingMask/>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { jump2Auth, getUserInfo } from '@/api/wechat'
import LoadingMask from '@/components/LoadingMask.vue'

// 获取query中的code参数
const router = useRouter()
const code = router.currentRoute.value.query.code
const from = router.currentRoute.value.query.from
// 2.如果有code，则已经授权
if (code) {
  getUserInfo(code).then((res) => {
    // TODO 授权标识
    sessionStorage.setItem('isAuth', 'true')
    sessionStorage.setItem('userInfo', JSON.stringify(res.data))
    const address = res.data?.user_address?.[0] || {}
    const cardInfo = res.data?.card_info || {}
    sessionStorage.setItem('contact_address', JSON.stringify(address))
    // 用replace方法替换当前路由，避免用户点击返回按钮时返回到授权页面
    const land = sessionStorage.getItem('fromPath') || '/'
    if (cardInfo?.id) {
      router.replace(land)
    } else {
      router.replace('/bind')
    }
  })
} else {
  // 1.跳转授权
  if (from) sessionStorage.setItem('fromPath', from)
  const callbackUrl = window.location.origin + window.location.pathname
  jump2Auth(callbackUrl)
}
</script>
