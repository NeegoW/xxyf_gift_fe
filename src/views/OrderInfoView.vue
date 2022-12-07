<template>
  <el-header>
    <el-row align="middle">
      <el-col :span="2" @click="router.back()" id="back">
        <ArrowLeft style="width: 3rem"/>
      </el-col>
      <el-col :span="20">
        订单详情
      </el-col>
    </el-row>
    <el-row class="addr">
      <el-col :span="2">
        <img src="../assets/img/index/地址icon.png" alt="地址"/>
      </el-col>
      <el-col :span="18">
        <p>
          <b>杨洋</b>18884900530
        </p>
        <p>
          广东省 深圳区 南山区 西丽街道 留仙居南 区8栋c单元1层102
        </p>
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
            <span class="red">
              236.00
            </span>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-divider/>
    <el-row class="order-intro">
      <el-col>订单号：11114091327</el-col>
      <el-col>创建时间：2022-11-15 18:30:00</el-col>
      <el-col>支付时间：2022-11-15 18:31:02</el-col>
    </el-row>
  </section>
</template>

<script setup>
// import { useRouter } from 'vue-router'
// import { ref, reactive } from 'vue'
import { ArrowLeft } from '@element-plus/icons-vue'

// const router = useRouter()
// // 供应商列表
// const suppliers = reactive([])
// const pickSupplier = ref(0) // 选中的供应商
// // 商品列表
// const goods = reactive([])
//
// // 物流信息
// const deliverys = reactive([])
// const pickDelivery = ref(0) // 选中的物流
</script>

<style scoped lang="scss">
.el-header {
  height: 316px;
  padding-top: 55px;
  background-image: url('@/assets/img/index/订单背景.png');
  color: #FFFFFF;
  text-align: center;
  overflow: clip;
  font-size: 28px;

  .addr {
    width: 698px;
    height: 143px;
    background: #FFFFFF;
    border-radius: 10px;
    padding: 18px 24px;

    p {
      font-size: 20px;
      color: #666666;
      text-align: left;

      &:last-child {
        margin-top: 10px;
        width: 80%;
      }

      b {
        padding-right: 10px;
        font-size: 28px;
        color: #333333;
      }
    }
  }

  .edit {
    width: 80px;
    margin: auto;
    border: 2px solid #B3B3B3;
    border-radius: 20px;
    font-size: 24px;
    line-height: 32px;
    font-weight: 400;
    color: #666666;
  }
}

.intro {
  padding: 25px 45px;
  background-color: #fff;
  margin-bottom: 16px;

  & > p {
    color: #333333;
    font-size: 24px;
    margin-bottom: 28px;
  }

  .scrollbar-flex-content {
    display: flex;

    .item {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      width: 316px;
      height: 135px;
      background-image: url('@/assets/img/index/未选中@2x.png');
      //不是第一个子元素的item的margin-left:16px
      &:not(:first-child) {
        margin-left: 16px;
      }

      &.active {
        background-image: url('@/assets/img/index/选中@2x.png');

        p:first-child {
          color: #C51829;
        }
      }

      p {
        padding-left: 22px;

        &:first-child {
          color: #343434;
          font-size: 28px;
        }

        &:last-child {
          color: #B3B3B3;
          font-size: 20px;
        }
      }

      .el-col:last-child {
        text-align: center;

        .img {
          width: 120px;
          height: 120px;
          border: 1px solid #B3B3B3;
          border-radius: 10px;
        }
      }
    }
  }
}

.desc {
  padding: 15px 45px;
  background-color: #fff;

  .item {
    > :not(:first-child) {
      margin-top: 20px;
    }

    .flex-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    p {
      padding-left: 22px;

      &:first-child {
        color: #333333;
        font-size: 24px;
      }

      &:last-child {
        color: #B3B3B3;
        font-size: 16px;
        line-height: 32px;
      }
    }

    span {
      font-size: 32px;
      color: #333333;
    }

    .info {
      font-size: 24px;
      color: #333333;
      line-height: 36px;
    }

    .tot {
      font-size: 28px;
      color: #333333;

      .red {
        color: #C51829;
      }
    }
  }

  .img {
    width: 137px;
    height: 137px;
    border: 1px solid #B3B3B3;
    border-radius: 10px;
  }

  .order-intro {
    font-size: 24px;
    color: #666666;
    line-height: 36px;
    margin-bottom: 80px;
  }
}
</style>
