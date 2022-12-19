<template>
  <div class="card"
       v-for="(v, k) in props.contact"
       :key="k"
  >
    <el-col @click="chooseAddress(v)">
      <el-row class="nav">
        <b>{{ v.name }}</b>
        <span>{{ v.tel }}</span>
      </el-row>
      <el-row class="ctx">
        <el-col>{{ v.province + v.city + v.county + v.town + v.address }}</el-col>
      </el-row>
    </el-col>
    <el-divider/>
    <el-row class="footer" justify="space-between">
      <el-radio v-model="checkRadio" class="def" :label="v.id">设为默认</el-radio>
      <el-row>
        <el-button link type="" @click="emit('edit:contact',v)">
          <el-icon>
            <Edit/>
          </el-icon>
          <span>编辑</span>
        </el-button>
        <el-button link type="" @click="delAddr(v.id)">
          <el-icon>
            <Delete/>
          </el-icon>
          <span>删除</span>
        </el-button>
      </el-row>
    </el-row>
  </div>
  <el-empty v-if="!props.contact.length" :image-size="200" description="暂无数据"/>
</template>

<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import api from '@/api'
import router from '@/router'

const props = defineProps({
  contact: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['edit:contact', 'del:contact'])

const checkRadio = computed({
  get () {
    // 设置默认地址
    const temp = props.contact.find((v) => v.status === '1') || {}
    sessionStorage.setItem('contact_address', JSON.stringify(temp))
    return temp?.id
  },
  set (val) {
    props.contact.forEach((v) => {
      v.status = v.id === val ? '1' : '0'
    })
  }
})
const _packageId = router.currentRoute.value.params.packageId
const _idx = router.currentRoute.value.params.idx

const changeDefault = async (val) => {
  const unionid = JSON.parse(sessionStorage.getItem('userInfo')).unionid
  await api.put('api/change_def_addr', {
    id: val,
    unionid: unionid
  })
}

// 删除地址
const doDel = ref(false)
const delAddr = async (id) => {
  if (doDel.value) return
  doDel.value = true
  await api.delete('api/user_address?id=' + id).then(res => {
    if (res.code === 200) {
      doDel.value = false
      emit('del:contact', id)
    }
  })
}

// 选择该地址
const chooseAddress = (v) => {
  const changeItemAddr = JSON.parse(sessionStorage.getItem('changeItemAddr'))
  // console.log(changeItemAddr.find(item => item.packageId === _packageId))
  // 去除v.status
  const temp = { ...v }
  delete temp.status
  changeItemAddr.find(item => item.packageId === _packageId).addresses[_idx] = temp
  sessionStorage.setItem('changeItemAddr', JSON.stringify(changeItemAddr))
  router.back()
}

watch(checkRadio, (val) => {
  changeDefault(val)
})
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  margin: 0 auto 22rem;
  background: #FFFFFF;
  border-radius: 10rem;
  padding: 32rem 28rem;

  .nav {
    b {
      font-size: 32rem;
      color: #393A3B;
      line-height: 36rem;
    }

    span {
      font-size: 26rem;
      color: #848E9C;
      margin-left: 30rem;
    }
  }

  .ctx {
    font-size: 26rem;
    color: #393A3B;
    line-height: 36rem;
    margin-top: 28rem;
  }

  .footer {
    .el-icon, span {
      font-size: 22rem;
      color: #393A3B;
    }

    .def {
      --el-radio-input-height: 22rem;
      --el-radio-input-width: 22rem;
      --el-radio-font-size: 22rem;
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
    width: 12rem;
    height: 6rem;
    border: 2px solid white;
    border-top: transparent;
    border-right: transparent;
    text-align: center;
    display: inline-block;
    position: absolute;
    top: 4rem;
    left: 4rem;
    vertical-align: middle;
    transform: rotate(-45deg);
    border-radius: 0rem;
    background: none;
  }

  .el-empty__description p {
    font-size: 28rem;
  }
}
</style>
