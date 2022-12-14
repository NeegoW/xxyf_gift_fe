const onBridgeReady = (payInfo, callBack, args) => {
  console.log(args)
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      appId: payInfo.appId,
      timeStamp: payInfo.timeStamp,
      nonceStr: payInfo.nonceStr,
      package: payInfo.package,
      signType: payInfo.signType,
      paySign: payInfo.paySign
    },
    function (res) {
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        // 使用以上方式判断前端返回,微信团队郑重提示：
        // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        callBack(args)
      }
    })
}

if (typeof WeixinJSBridge === 'undefined') {
  if (document.addEventListener) {
    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
  } else if (document.attachEvent) {
    document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
  }
}

export default onBridgeReady
