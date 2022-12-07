<template>
  <InnerPageHeader>
    兑换记录
  </InnerPageHeader>
  <section class="exLog">
    <div class="item" v-if="info.info.id">
      <el-row justify="space-between" class="title">
        <el-col :span="10">
          订单号：11114091327
        </el-col>
        <el-col :span="10">
          下单时间：2022-11-15
        </el-col>
      </el-row>
      <el-row justify="space-between" align="middle" class="card">
        <el-col :span="6" class="img">
          <img style="width: 100%" src="../assets/22.png" alt="">
        </el-col>
        <el-col :span="10" class="ctx">
          <p>燕值坊五谷米礼盒</p>
          <p>薄皮核桃200g 高蛋白</p>
        </el-col>
        <el-col :span="6" class="amount">
          <p>合计：118.00</p>
        </el-col>
      </el-row>
    </div>
    <el-empty v-if="!info.info.id" :image-size="200" description="暂无数据"/>
  </section>
</template>

<script setup>
import InnerPageHeader from '@/components/InnerPageHeader'
import { reactive, onBeforeMount } from 'vue'
import api from '@/api'

const info = reactive({ info: {} })

onBeforeMount(async () => {
  await api.get('/api/exLog').then(res => {
    info.info = res.data
    console.log(info.info)
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
    width: 95vw;
    margin: 0 auto 20px;
    background: #FFFFFF;
    border-radius: 10px;
    font-size: .8rem;
    color: #666666;

    .title {
      padding: 16px;
    }

    .card {
      padding: 10px 5%;
      background: {
        image: url('@/assets/img/index/兑换记录背图.png');
        repeat: round;
      };
      // 绘制心形
      .img {
        //clip-path: path('M 50 60 A 30 40 0 1 1 130 60 A 40 30 0 1 1 130 130 A 30 40 0 1 1 50 130 A 40 30 0 1 1 50 60');
        img {
          border-radius: 10px;
        }
      }

      .ctx {
        p {
          &:first-child {
            font-size: 1rem;
            color: #fff;
            margin-bottom: .2rem;
          }

          &:last-child {
            font-size: .8rem;
            color: rgba(255, 255, 255, 0.65);
          }
        }
      }

      .amount {
        font-size: .8rem;
        text-align: center;
        color: #fff;
        align-self: flex-end;
      }
    }
  }
}
</style>
