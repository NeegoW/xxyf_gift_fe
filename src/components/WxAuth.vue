<template>
  <div class="wx-auth">
    <p style="text-align: center">授权中...</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
// import { getWxCode } from '@/utils/wechat'
import { jump2Auth, getUserInfo } from '@/api/wechatAuth'

// 获取query中的code参数
const router = useRouter()
const code = router.currentRoute.value.query.code
// 2.如果有code，则已经授权
if (code) {
  getUserInfo(code).then((res) => {
    // TODO 授权标识
    sessionStorage.setItem('isAuth', 'true')
    // 用replace方法替换当前路由，避免用户点击返回按钮时返回到授权页面
    router.replace({ path: '/' })
  })
} else {
  // 1.跳转授权
  const callbackUrl = window.location.origin + window.location.pathname
  jump2Auth(callbackUrl)
}
</script>
