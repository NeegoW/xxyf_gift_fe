<template>
  <el-header>
    <el-row align="middle">
      <el-col :span="2" @click="router.back()" id="back">
        <ArrowLeft style="width: 3rem"/>
      </el-col>
      <el-col :span="20">
        兑换说明
      </el-col>
    </el-row>
  </el-header>
  <section>
    <div class="ex">
      <div class="title">
        <p>兑换方式</p>
      </div>
      <div class="content">
        <el-row :gutter="10">
          <el-col :span="4" class="img">
            <img src="../assets/img/ex_info/移动端.png" alt="">
          </el-col>
          <el-col :span="20">
            <b>移动端</b>
            <p>
              打开微信扫一扫 → 扫描下方二维码进入兑换平台 → 输入卡号及密码 → 进入商品兑换界面 → 选择礼包 → 填写配送信息 → 兑换完成
            </p>
          </el-col>
        </el-row>
        <el-divider style="border-top-color: #F7EED3"/>
        <el-row :gutter="20">
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
          <li>本兑换券有效期截止至{{validity}}，因礼包具有时令性，限期供应，请您尽早完成兑换。</li>
          <li>请妥善保管好您的提货劵或拍照保存，可便于二次登录，兑换界面可查询物流信息。</li>
          <li>本劵权利归心选优福合作客户享有，此券不记名、不挂失、不提供发票，一经丢失不予补办，本礼券为一次性消费使用，礼包价值与提货券面值相等, 不兑现。</li>
          <li>每种礼包数量有限，请尽早兑换，如遇某种礼包缺货，有权更换等价值其他礼包，所有商品以最终实物为准。</li>
          <li>此券一旦下单，无质量问题，不退不换，如遇质量问题，请在收到货品24小时内拨打客服热线，并将有质量问题的产品图片、订单信息及联系方式发送至在线客服，将由客服专员为您妥善处理。</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const validity = '1970-01-01 08:00:00'
</script>

<style scoped lang="scss">
#back {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-center {
  text-align: center;
}

.ex {
  width: 700px;
  height: 341px;
  background-image: url('../assets/img/ex_info/兑换背景.png');
  margin: 40px auto;
}

.desc {
  width: 700px;
  height: 562px;
  background-image: url('../assets/img/ex_info/特别说明背景.png');
  margin: 40px auto;
}

.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
}

.title {
  width: 224px;
  height: 47px;
  margin: auto;
  text-align: center;
  background-image: url('../assets/img/ex_info/特别说明标题.png');
  position: relative;
  top: -20px;

  p {
    width: 224px;
    height: 47px;
    font-size: 30px;
    font-weight: bold;
    color: #F7EED3;
    line-height: 47px;
    text-shadow: 0 1px 3px rgba(190, 38, 19, 0.79);
  }
}

.content{
  padding: 0 45px;
  color: #F7EED3;
  font-size: 18px;
  line-height: 27px;

  .img{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.desc{
  .content{
    padding: 0 45px 0 75px;
    li{
      list-style-image: url('../assets/img/ex_info/金币.png');
      margin-bottom: 20px;
      :last-child{
        margin-bottom: 0;
      }
    }
  }
}

.el-header {
  height: 114px;
  padding-top: 55px;
  background: #C51829;
  color: #FFFFFF;
  text-align: center;
  overflow: clip;
  font-size: 28px;
}
</style>
