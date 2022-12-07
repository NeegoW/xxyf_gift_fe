// 微信登陆授权登录
export const getWxCode = () => {
  // 公众号唯一标识
  const appid = 'wxab2e5de70c26b71e'
  // 重定向地址
  const redirectUri = 'https://gift.xinxuanyf.com'
  // 授权作用域
  // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx807d86fb6b3d4fd2&redirect_uri=http%3A%2F%2Fdevelopers.weixin.qq.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}
