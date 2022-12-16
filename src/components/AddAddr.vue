<template>
  <section class="add-address">
    <el-card>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        :show-message="false"
        hide-required-asterisk
      >
        <el-form-item label="姓 名：" prop="name">
          <el-input v-model="form.name" placeholder="请输入收货人姓名"/>
        </el-form-item>
        <el-form-item label="电 话：" prop="tel">
          <el-input type="tel" v-model.number="form.tel" placeholder="请输入手机号码" maxlength="11"/>
        </el-form-item>
        <PickAddr @update:change="handleAddrChange" :region="region"/>
        <el-form-item label="门牌号：" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址"/>
        </el-form-item>
        <el-form-item label="默认地址：" class="def-address">
          <el-switch
            v-model="form.status"
            class="ml-2" size="large" active-value=1 inactive-value=0
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #DBDBDB"
          />
        </el-form-item>
      </el-form>
    </el-card>
    <el-form-item>
      <div class="red-btn" @click="submitForm(formRef)">{{ actionName }}</div>
    </el-form-item>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import PickAddr from '@/components/PickAddr.vue'
import api from '@/api'
import { showFailToast } from 'vant'

const props = defineProps({
  addrInfo: {
    type: Object,
    default: () => {
    }
  }
})
const emit = defineEmits(['save:contact'])

// 用户信息
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
const {
  openid,
  unionid
} = userInfo
// 新增或者编辑地址
const isEdit = ref(!!props.addrInfo?.id)
const actionName = computed(() => {
  return isEdit.value ? '修改' : '保存'
})

// 新增则将数据传递给子组件PickAddr，region为对象，props.addrInfo中的province、city、county、town组成
const region = reactive({
  province: props.addrInfo?.province,
  city: props.addrInfo?.city,
  county: props.addrInfo?.county,
  town: props.addrInfo?.town
})

// 表单数据
const formRef = ref(null)

const form = reactive({
  name: props.addrInfo?.name,
  tel: props.addrInfo?.tel,
  province: props.addrInfo?.province,
  city: props.addrInfo?.city,
  county: props.addrInfo?.county,
  town: props.addrInfo?.town,
  address: props.addrInfo?.address,
  status: props.addrInfo?.status,
  openid: openid,
  unionid: unionid
})

// 表单验证规则
const rules = {
  name: [
    {
      required: true,
      message: '请输入收货人姓名',
      trigger: 'blur'
    }
  ],
  tel: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    },
    {
      minLength: 11,
      maxLength: 11,
      pattern: /^1[3456789]\d{9}$/,
      message: '手机号码格式不正确',
      trigger: 'blur'
    }
  ],
  region: [
    {
      required: true
    }
  ],
  address: [
    {
      required: true,
      message: '请输入详细地址',
      trigger: 'blur'
    }
  ]
}

const handleAddrChange = (val) => {
  form.province = val.province
  form.city = val.city
  form.county = val.county
  form.town = val.town
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (!form.town) valid = false
    if (valid) {
      // 新增post，编辑put
      const apiMethod = isEdit.value ? 'put' : 'post'
      api[apiMethod]('api/user_address', form).then(res => {
        const isChange = isEdit.value && !!res.data
        const isAdd = !isEdit.value && !!res.data
        emit('save:contact', form, isAdd, isChange)
      })
    } else {
      showFailToast('请检查信息')
    }
  })
}

onMounted(() => {
// 如果是编辑地址，需要form中追加id
  if (isEdit.value) {
    form.id = props.addrInfo.id
  }
})
</script>

<style lang="scss">
.add-address {
  width: 700rem;
  margin: auto;

  .el-card {
    margin-bottom: 130rem;

    .el-card__body {
      padding: 0 30rem;
    }

    .el-form-item {
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.102);
      height: 120rem;
      margin-bottom: 0;

      &:last-child {
        border-bottom: none;
      }
    }

    // input框前的icon
    .el-form-item__label {
      height: auto;
      font-size: 26rem;
    }

    .el-input {
      // 取消input框的阴影
      .el-input__wrapper {
        box-shadow: none !important;

        :focus {
          box-shadow: none !important;
        }
      }

      .el-input__inner {
        color: #848E9C;
        font-size: 26rem;
        line-height: 40rem;
      }
    }

    .def-address .el-form-item__content {
      justify-content: flex-end;
    }
  }

  .red-btn {
    width: 630rem;
    line-height: 98rem;
    margin: auto;
    background: #C51829;
    border-radius: 50rem;
    text-align: center;
    font-size: 30rem;
    color: #FFFFFF;
  }
}
</style>
