import api from '@/api/index'

/**
 * 获取微信授权的跳转地址
 * @param callbackUrl 授权后回调链接
 * @returns
 */
export async function jump2Auth (callbackUrl) {
  await api({
    url: '/wechat/auth',
    params: {
      redirect_url: callbackUrl
    }
  }).then((res) => {
    if (process.env.NODE_ENV === 'development') {
      window.location.href = callbackUrl + '?code=test'
    } else {
      window.location.href = res.data
    }
  })
}

/**
 * 提交code进行登录
 * @param code
 * @returns
 */
export async function getUserInfo (code) {
  return await api.post('/wechat/auth', { code })
}
