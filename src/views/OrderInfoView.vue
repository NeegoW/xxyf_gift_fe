<template>
  <LoadingMask v-if="loading"/>
  <div class="order-info">
    <el-header>
      <el-row align="middle" justify="space-between">
        <el-col class="icon" :span="4" @click="router.back()" id="back">
          <ArrowLeft style="width: 40rem"/>
        </el-col>
        <el-col :span="10">
          订单详情
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
      <el-row class="addr">
        <el-col :span="2">
          <img class="icon-addr" src="../assets/img/index/地址icon.png" alt="地址"/>
        </el-col>
        <el-col :span="18">
          <p>
            <b>杨洋</b>18884900530
          </p>
          <p class="region"> {{ region }} </p>
          <p> {{ addr }} </p>
        </el-col>
        <el-col :span="4">
          <div class="edit">
            修改
          </div>
        </el-col>
      </el-row>
    </el-header>
    <section class="intro">
      <p>你的订单将由以下仓库发出：</p>
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <div class="item">
            <el-col :span="12">
              <p>仓库1</p>
              <p>共1件</p>
            </el-col>
            <el-col :span="12">
              <img class="img" src="../assets/22.png" alt=""/>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <p>仓库1</p>
              <p>共1件</p>
            </el-col>
            <el-col :span="12">
              <img class="img" src="../assets/22.png" alt=""/>
            </el-col>
          </div>
          <div class="item active">
            <el-col :span="12">
              <p>仓库1</p>
              <p>共1件</p>
            </el-col>
            <el-col :span="12">
              <img class="img" src="../assets/22.png" alt=""/>
            </el-col>
          </div>
        </div>
      </el-scrollbar>
    </section>

    <section class="desc">
      <el-row>
        <el-col class="item">
          <el-row>
            <el-col :span="5">
              <img class="img" src="../assets/22.png" alt="">
            </el-col>
            <el-col :span="15" style="align-self: center">
              <p>良品铺子 良品甄选礼1035g</p>
              <p>薄皮核桃200g 高蛋白</p>
            </el-col>
            <el-col :span="4" class="flex-right">
              <div>
                <img src="../assets/img/index/豆.png" alt="">
                <span>118</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </section>

    <section class="price">
      <el-row class="info" justify="space-between">
        <div>商品总价</div>
        <div>236.00</div>
      </el-row>
      <el-row class="info" justify="space-between">
        <div>运费</div>
        <div>0</div>
      </el-row>
      <el-row class="tot" justify="space-between">
        <div>总计</div>
        <div>
          <img src="../assets/img/index/豆.png" alt="">
          <span class="red">236.00</span>
        </div>
      </el-row>
      <el-divider/>
      <el-row class="order-intro">
        <el-col>订单号：11114091327</el-col>
        <el-col>创建时间：2022-11-15 18:30:00</el-col>
        <el-col>支付时间：2022-11-15 18:31:02</el-col>
      </el-row>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import router from '@/router'
import api from '@/api'
import { ArrowLeft } from '@element-plus/icons-vue'
import LoadingMask from '@/components/LoadingMask.vue'

const loading = ref(true)
const info = ref({})
const region = ref('')
const addr = ref('')

// // 供应商列表
// const suppliers = reactive([])
// const pickSupplier = ref(0) // 选中的供应商
// // 商品列表
// const goods = reactive([])
//
// // 物流信息
// const deliverys = reactive([])
// const pickDelivery = ref(0) // 选中的物流

// 拼接地址信息
watch(() => info.value, (val) => {
  if (val) {
    region.value = `${val.receiver_province}  ${val.receiver_city}  ${val.receiver_county}  ${val.receiver_town}`
    addr.value = val.receiver_address
  }
})

onMounted(async () => {
  // 获取订单详情，从query中获取id
  const id = router.currentRoute.value.params.id
  await api.get('/api/ex_info?id=' + id).then((res) => {
    info.value = res.data
  })
  loading.value = false
})
</script>

<style scoped lang="scss">
.order-info {
  .el-header {
    height: 316rem;
    padding-top: 55rem;
    background-image: url('@/assets/img/index/订单背景.png');
    background-size: 100%;
    color: #FFFFFF;
    text-align: center;
    overflow: clip;
    font-size: 28rem;

    .icon {
      display: flex;
      align-self: center;
    }

    .addr {
      width: 700rem;
      height: 143rem;
      background: #FFFFFF;
      border-radius: 10rem;
      margin-top: 45rem;
      padding: 18rem 24rem 0;

      .icon-addr {
        margin-top: 5rem;
      }

      p {
        font-size: 20rem;
        color: #666666;
        text-align: left;

        &.region {
          margin-top: 10rem;
        }

        b {
          padding-right: 10rem;
          font-size: 28rem;
          color: #333333;
        }
      }
    }

    .edit {
      width: 80rem;
      margin: auto;
      border: 2px solid #B3B3B3;
      border-radius: 20rem;
      font-size: 24rem;
      line-height: 32rem;
      font-weight: 400;
      color: #666666;
    }
  }

  .intro {
    padding: 25rem 45rem;
    background-color: #fff;
    margin-bottom: 16rem;

    & > p {
      color: #333333;
      font-size: 24rem;
      margin-bottom: 28rem;
    }

    .scrollbar-flex-content {
      display: flex;

      .item {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        width: 316rem;
        height: 135rem;
        background-image: url('@/assets/img/index/未选中@2x.png');
        background-size: 100% 100%;
        //不是第一个子元素的item的margin-left:16px
        &:not(:first-child) {
          margin-left: 16rem;
        }

        &.active {
          background-image: url('@/assets/img/index/选中@2x.png');

          p:first-child {
            color: #C51829;
          }
        }

        p {
          padding-left: 22rem;

          &:first-child {
            color: #343434;
            font-size: 28rem;
          }

          &:last-child {
            color: #B3B3B3;
            font-size: 20rem;
          }
        }

        .el-col:last-child {
          text-align: center;

          .img {
            width: 120rem;
            height: 120rem;
            border: 1px solid #B3B3B3;
            border-radius: 10rem;
          }
        }
      }
    }
  }

  .desc {
    padding: 15rem 45rem;
    background-color: #fff;
    margin-bottom: 16rem;

    .item {
      > :not(:first-child) {
        margin-top: 20rem;
      }

      .flex-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      p {
        padding-left: 22rem;

        &:first-child {
          color: #333333;
          font-size: 24rem;
        }

        &:last-child {
          color: #B3B3B3;
          font-size: 16rem;
          line-height: 32rem;
        }
      }

      span {
        font-size: 32rem;
        color: #333333;
      }
    }

    .img {
      width: 137rem;
      height: 137rem;
      border: 1px solid #B3B3B3;
      border-radius: 10rem;
    }
  }

  .order-intro {
    font-size: 24rem;
    color: #666666;
    line-height: 36rem;
    margin-bottom: 80rem;
  }

  .price {

    padding: 15rem 45rem;
    background-color: #fff;

    span {
      font-size: 32rem;
      color: #333333;
    }

    .info {
      font-size: 24rem;
      color: #333333;
      line-height: 36rem;
    }

    .tot {
      font-size: 28rem;
      color: #333333;

      .red {
        color: #C51829;
      }
    }
  }
}
</style>
