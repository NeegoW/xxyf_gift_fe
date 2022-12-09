<template>
  <div>
    <el-form-item label="所在地区">
      <el-col :span="11">
        <el-select
          clearable
          v-model="province"
          placeholder="请选择省份"
          style="margin: 0 0.1rem"
        >
          <el-option
            v-for="item in allAreasList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="11">
        <el-select
          clearable
          v-model="city"
          :disabled="!province"
          placeholder="请选择城市"
          style="margin: 0 0.1rem"
        >
          <el-option
            v-for="item in selectCityList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="11">
        <el-select
          clearable
          v-model="area"
          :disabled="!province || !city"
          placeholder="请选择区域"
          style="margin: 0 0.1rem"
        >
          <el-option
            v-for="item in selectAreaList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="11">
        <el-select
          clearable
          v-model="street"
          :disabled="!province || !city || !area"
          placeholder="请选择街道"
          style="margin: 0 0.1rem"
        >
          <el-option
            v-for="item in selectStreetList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-col>
    </el-form-item>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import allAreas from '../assets/pcas-code.json'

// 所有数据
const allAreasList = ref(allAreas)
// 下拉框选择省份的值
const province = ref('')
// 下拉框选择城市的值
const city = ref('')
// 下拉框选择区域的值
const area = ref('')
// 下拉框选择街道的值
const street = ref('')

// 城市下拉框内容所有值
const selectCityList = ref([])
// 区域下拉框内容所有值
const selectAreaList = ref([])
// 街道下拉框内容所有值
const selectStreetList = ref([])

// 分发事件给父组件
const emits = defineEmits(['update:change'])

// 监听选择省份
watch(
  () => province.value,
  val => {
    if (val) {
      selectCityList.value = allAreasList.value.find(item => item.code === province.value).children
    }

    city.value = ''
    area.value = ''
    street.value = ''
  }
)

// 监听选择城市
watch(
  () => city.value,
  val => {
    if (val) {
      selectAreaList.value = selectCityList.value.find(item => item.code === city.value).children
    }
    area.value = ''
    street.value = ''
  }
)

// 监听选择区域
watch(
  () => area.value,
  val => {
    if (val) {
      selectStreetList.value = selectAreaList.value.find(item => item.code === area.value).children
    }
    street.value = ''
  }
)

// 监听选择街道
watch(
  () => street.value,
  val => {
    if (val) {
      // 下拉框选择省份的值
      const provinceData = {
        code: province.value,
        name:
          province.value &&
          allAreasList.value.find(item => item.code === province.value).name
      }
      // 下拉框选择城市的值
      const cityData = {
        code: city.value,
        name:
          city.value &&
          selectCityList.value.find(item => item.code === city.value).name
      }
      // 下拉框选择区域的值
      const areaData = {
        code: area.value,
        name:
          area.value &&
          selectAreaList.value.find(item => item.code === area.value).name
      }
      // 下拉框选择街道的值
      const streetData = {
        code: val,
        name:
          val &&
          selectStreetList.value.find(item => item.code === val).name
      }
      emits('update:change', {
        province: provinceData,
        city: cityData,
        area: areaData,
        street: streetData
      })
    }
  }
)
</script>
<style lang="scss" scoped></style>
