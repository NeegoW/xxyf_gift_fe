<template>
  <BgImg>
    <section class="bind">
      <el-card>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          hide-required-asterisk
        >
          <el-form-item prop="code">
            <template #label>
              <el-icon>
                <UserFilled/>
              </el-icon>
            </template>
            <el-input type="tel" v-model.number="form.code" placeholder="请输入提货券卡号"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <template #label>
              <el-icon>
                <GoodsFilled/>
              </el-icon>
            </template>
            <el-input type="tel" v-model.number="form.pwd" placeholder="请输入提货券密码" maxlength="8"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button id="login-btn" @click="submitForm(formRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </section>
  </BgImg>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserFilled, GoodsFilled } from '@element-plus/icons-vue'

import BgImg from '@/components/BgImg'
import api from '@/api'

const router = useRouter()
const formRef = ref()
const form = reactive({
  code: '1234000',
  pwd: '8273601',
  user_id: JSON.parse(sessionStorage.getItem('userInfo')).id
})
const rules = {
  code: [
    {
      required: true,
      message: '请输入提货券卡号',
      trigger: 'blur'
    },
    {
      type: 'number',
      minLength: 4,
      maxLength: 16,
      message: '长度 4 - 16 位数字',
      trigger: 'blur'
    }
  ],
  pwd: [
    {
      required: true,
      message: '请输入提货券密码',
      trigger: 'blur'
    },
    {
      type: 'number',
      minLength: 8,
      message: '长度为 8 位数字',
      trigger: 'blur'
    }
  ]
}

const submitForm = async (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      api.post('/api/bind', form).then(res => {
        if (res.data) {
          router.push('/')
          console.log(res.data)
        }
      })
    } else {
      return false
    }
  })
}
</script>

<style lang="scss">
.bind {

  .el-card {
    border-radius: 10rem;
  }

  .el-form-item {
    border-bottom: 1px solid #dcdfe6;
    margin: 60rem;
    align-items: center;

    &:last-child {
      width: 630rem;
      margin: 20rem auto;
    }

    // 登录框的父元素
    &:last-child {
      border-bottom: none;
    }

    // input框前的icon
    .el-form-item__label {
      height: auto;

      .el-icon {
        font-size: 32rem;
        color: #333333;
      }
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
        font-size: 32rem;
        line-height: 40rem;
      }
    }
  }

  #login-btn {
    width: 100%;
    height: 64rem;
    background-color: #c41829;
    color: #f7f2d9;
    font-size: 32rem;
    line-height: 64rem;
    font-weight: 500;
    border-radius: 32rem;
  }
}
</style>
