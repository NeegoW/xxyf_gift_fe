<template>
  <InnerPageHeader>
    兑换说明
  </InnerPageHeader>
  <section class="ex-info">
    <div class="ex">
      <div class="title">
        <p>兑换方式</p>
      </div>
      <div class="content">
        <el-row>
          <el-col :span="4" class="img">
            <img src="../assets/img/ex_info/移动端.png" alt="">
          </el-col>
          <el-col :span="20">
            <b>移动端</b>
            <p>
              打开微信扫一扫 → 扫描下方二维码进入兑换平台 → 输入卡号及密码 → 进入商品兑换界面 → 选择礼包 → 填写配送信息
              → 兑换完成
            </p>
          </el-col>
        </el-row>
        <el-divider/>
        <el-row>
          <el-col :span="4" class="img">
            <img src="../assets/img/ex_info/电话.png" alt="">
          </el-col>
          <el-col :span="20">
            <b>客服热线：400-0439-313</b>
            <p>服务时间:（周一至周日 9:00-21:00）</p>
            <p>兑换过程中如遇任何问题可拨打热线电话，将由客服专员竭诚为您服务。</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="desc">
      <div class="title">
        <p>特别说明</p>
      </div>
      <div class="content">
        <ul>
          <li>本兑换券有效期截止至 {{ validDate }} ，因礼包具有时令性，限期供应，请您尽早完成兑换。</li>
          <li>请妥善保管好您的提货劵或拍照保存，可便于二次登录，兑换界面可查询物流信息。</li>
          <li>本劵权利归心选优福合作客户享有，此券不记名、不挂失、不提供发票，一经丢失不予补办，本礼券为一次性消费使用，礼包价值与提货券面值相等,
            不兑现。
          </li>
          <li>每种礼包数量有限，请尽早兑换，如遇某种礼包缺货，有权更换等价值其他礼包，所有商品以最终实物为准。</li>
          <li>
            此券一旦下单，无质量问题，不退不换，如遇质量问题，请在收到货品72小时内拨打客服热线，并将有质量问题的产品图片、订单信息及联系方式发送至在线客服，将由客服专员为您妥善处理。
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import InnerPageHeader from '@/components/InnerPageHeader.vue'
import { computed, onMounted, reactive } from 'vue'

const cardInfo = reactive(JSON.parse(sessionStorage.getItem('userInfo'))?.card_info)
const validDate = computed(() => {
  const date = new Date(cardInfo?.Active?.end_time * 1000)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
})

onMounted(() => {
  const t = document.querySelector('body')
  // 修改t下的自定义属性--xx-prim
  document.querySelector('body').style.setProperty('--xx-prim', 'white')
  console.log(t)
})
</script>

<style scoped lang="scss">
.ex-info {
  #back {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-center {
    text-align: center;
  }

  .ex {
    width: 700rem;
    min-height: 341rem;
    background: {
      size: contain;
      image: url('@/assets/img/ex_info/兑换背景.png');
      repeat: round;
    };
    margin: 38rem auto;
    padding-bottom: .5rem;

    .content {
      width: calc(100% - 90rem);
      margin: auto;
      padding: 0 1rem 0 2rem;
      color: #F7EED3;
      font-size: 18rem;

      b {
        font-size: 20rem;
        font-weight: bold !important;
      }

      .img {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 68rem;
        }
      }
    }
  }

  .el-divider {
    margin: 32rem auto;
    border-top-color: #F7EED3
  }

  .desc {
    width: 700rem;
    min-height: 562rem;
    background: {
      image: url('@/assets/img/ex_info/特别说明背景.png');
      repeat: round;
    };
    margin: 1rem auto;

    .content {
      width: calc(100% - 90rem);
      margin: auto;
      color: #F7EED3;
      font-size: 18rem;
      padding-left: 30rem;
      padding-bottom: 30rem;

      li {
        list-style-image: url('@/assets/img/ex_info/金币.png');
        margin-bottom: 30rem;

        :last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .title {
    width: 224rem;
    height: 47rem;
    margin: auto;
    text-align: center;
    background: {
      image: url('@/assets/img/ex_info/特别说明标题.png');
      repeat: round;
    };
    position: relative;
    top: -20rem;

    p {
      font-size: 30rem;
      font-weight: 500;
      color: #F7EED3;
      text-shadow: 0 1px 3px rgba(190, 38, 19, 0.79);
    }
  }
}
</style>
