<template>
  <section class="add-addr">
    <el-card>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        :show-message="false"
        hide-required-asterisk
      >
        <el-form-item label="收货人名" prop="name">
          <el-input v-model="form.name" placeholder="请输入收货人姓名"/>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input type="tel" v-model.number="form.phone" placeholder="请输入手机号码" maxlength="11"/>
        </el-form-item>
        <PickAddr @update:change="handleAddrChange"/>
        <el-form-item label="详细地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入详细地址"/>
        </el-form-item>
      </el-form>
    </el-card>
    <el-form-item>
      <el-button class="red-btn" @click="submitForm(formRef)">保存</el-button>
    </el-form-item>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import PickAddr from '@/components/PickAddr.vue'
// import api from '@/api'

const formRef = ref(null)
const form = reactive({
  name: '',
  phone: '',
  region: {},
  addr: ''
})
const rules = {
  name: [
    {
      required: true,
      message: '请输入收货人姓名',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    },
    {
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
  addr: [
    {
      required: true,
      message: '请输入详细地址',
      trigger: 'blur'
    }
  ]
}

defineEmits(['update:contact'])
const handleAddrChange = (val) => {
  form.region = val
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (!form.region.street) valid = false
    if (valid) {
      console.log(form)
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped lang="scss">
.add-addr {
  width: 95vw;
  margin: auto;
}

.red-btn {
  width: 80vw;
  margin: 2rem auto;
  height: 3rem;
  line-height: 3rem;
  background: #C51829;
  border-radius: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: #FFFFFF;
}
</style>
