<template>
  <InnerPageHeader>
    兑换记录
  </InnerPageHeader>
  <section class="exLog">
    <div class="item" v-if="info.length">
      <div v-for="item in info" :key="item.order_sn" @click="toInfo(item.id)">
        <el-row justify="space-between" class="title">
          <span>
            订单号：{{ item.order_sn }}
          </span>
          <span>
            下单时间：{{ orderDate(item.order_time) }}
          </span>
        </el-row>
        <el-row justify="space-between" align="middle" class="card">
          <el-col :span="7" class="img">
            <img :src="item.OrderItem.product_pic" alt="">
          </el-col>
          <el-col :span="10" class="ctx">
            <p>{{ item.OrderItem.product_name }}</p>
            <p><!--{{ item.OrderItem.product_intro || 'NaN' }}--></p>
          </el-col>
          <el-col :span="7" class="amount">
            <!--            <p>合计：{{ item.OrderItem.product_price }}</p>-->
          </el-col>
        </el-row>
      </div>
    </div>
    <el-empty v-if="!info.length" :image-size="200" description="暂无数据"/>
  </section>
</template>

<script setup>
import InnerPageHeader from '@/components/InnerPageHeader'
import { reactive, onBeforeMount } from 'vue'
import api from '@/api'
import router from '@/router'

const info = reactive([])

const orderDate = (val) => {
  const date = new Date(val * 1000)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const toInfo = (id) => {
  router.push({
    name: 'orderInfo',
    params: { id: id }
  })
}

onBeforeMount(async () => {
  const unionid = JSON.parse(sessionStorage.getItem('userInfo')).unionid
  await api.get('/api/ex_log?unionid=' + unionid).then(res => {
    info.push(...res.data)
  })
})
</script>

<style scoped lang="scss">
.exLog {
  padding-top: 20px;

  .none {
    text-align: center;
    padding: 20px 0;
    font-size: 28px;
  }

  .item {
    width: 700rem;
    margin: 0 auto 20rem;
    font-size: 18rem;
    color: #666666;

    > div {
      margin-bottom: 20rem;
      border-radius: 10rem;
      background: #FFFFFF;
    }

    .title {
      padding: 16rem;
    }

    .card {
      padding: 10px 17rem;
      background: {
        image: url('@/assets/img/index/兑换记录背图.png');
        repeat: round;
      };
      // 绘制心形
      .img {
        //clip-path: path('M 50 60 A 30 40 0 1 1 130 60 A 40 30 0 1 1 130 130 A 30 40 0 1 1 50 130 A 40 30 0 1 1 50 60');
        img {
          width: 178rem;
          height: 176rem;
          border-radius: 10px;
        }
      }

      .ctx {
        p {
          &:first-child {
            font-size: 24rem;
            color: #fff;
            margin-bottom: 14rem;
          }

          &:last-child {
            font-size: 16rem;
            color: rgba(255, 255, 255, 0.65);
          }
        }
      }

      .amount {
        font-size: 24rem;
        text-align: center;
        color: #fff;
        align-self: flex-end;
      }
    }
  }
}
</style>
