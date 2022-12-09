<template>
  <div class="card"
       v-for="(v, k) in props.contact"
       :key="k"
  >
    <el-row class="nav">
      <b>{{ v.name }}</b>
      <span>{{ v.phone }}</span>
    </el-row>
    <el-row class="ctx">
      {{ v.addr }}
    </el-row>
    <el-divider/>
    <el-row class="footer" justify="space-between">
      <el-radio v-model="checkRadio" class="def" :label="k">设为默认</el-radio>
      <div>
        <el-button link type="">
          <el-icon>
            <Edit/>
          </el-icon>
          <span>编辑</span>
        </el-button>
        <el-button link type="" @click="delAddr">
          <el-icon>
            <Delete/>
          </el-icon>
          <span>删除</span>
        </el-button>
      </div>
    </el-row>
  </div>
  <el-empty v-if="!props.contact.length" :image-size="200" description="暂无数据"/>
</template>

<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'

const props = defineProps({
  contact: {
    type: Array,
    required: true
  }
})
const checkRadio = ref(props.contact[0]?.id)

const delAddr = () => {
  console.log('delAddr')
}
</script>

<style scoped lang="scss">
.card {
  width: 700px;
  margin: 0 auto 22px;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 32px 28px;

  .nav {
    b {
      font-size: 32px;
      color: #393A3B;
      line-height: 36px;
    }

    span {
      font-size: 26px;
      color: #848E9C;
    }
  }

  .ctx {
    font-size: 26px;
    color: #393A3B;
    line-height: 36px;
  }

  .footer {
    .el-icon, span {
      font-size: 22px;
      color: #393A3B;
    }

    .def {
      --el-radio-input-height: 22px;
      --el-radio-input-width: 22px;
      --el-radio-font-size: 22px;
      color: #848E9C;
    }
  }
}
</style>

<style lang="scss">
.addr {
  --el-color-primary: #C51829;
  // radio选中改为勾勾
  .el-radio__input.is-checked .el-radio__inner::after {
    transform: rotate(-45deg);
  }

  .el-radio__inner::after {
    content: "";
    width: 12px;
    height: 6px;
    border: 2px solid white;
    border-top: transparent;
    border-right: transparent;
    text-align: center;
    display: inline-block;
    position: absolute;
    top: 4px;
    left: 4px;
    vertical-align: middle;
    transform: rotate(-45deg);
    border-radius: 0px;
    background: none;
  }
}
</style>
