<template>
  <BgImg>
    <div class="box-card">
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
          <el-form-item style="justify-content: center">
            <el-button id="login-btn" @click="submitForm(formRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
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
  pwd: '8273601'
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
      }).catch(err => {
        console.log(err)
      })
    } else {
      return false
    }
  })
}
</script>

<style lang="scss">
.box-card {

  .el-card {
    border-radius: .5rem;
  }
}

.el-form-item {
  border-bottom: 1px solid #dcdfe6;
  width: 90%;
  margin: 2rem auto;

  // 登录框的父元素
  &:last-child {
    border-bottom: none;
  }

  // input框前的icon
  .el-form-item__label {
    height: auto;

    .el-icon {
      font-size: 3rem;
      color: #333333;
    }
  }

  // 验证时的报错信息
  .el-form-item__error {
    font-size: 1rem;
  }

  .el-input {
    --el-input-height: 3rem;

    // 取消input框的阴影
    .el-input__wrapper {
      box-shadow: none !important;

      :focus {
        box-shadow: none !important;
      }
    }

    // input框
    .el-input__inner {
      font-size: 1.5rem;
    }
  }

}

#login-btn {
  width: 100%;
  height: 4rem;
  background-color: #c41829;
  color: #f7f2d9;
  font-size: 1.5rem;
  font-weight: 500;
  border-radius: 3rem;
  margin-top: 2rem;
}
</style>
