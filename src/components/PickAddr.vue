<template>
  <el-form-item label="所在地区：">
    <el-col :span="11">
      <el-select
        clearable
        v-model="province"
        placeholder="省"
        style="margin: 0 0.1rem"
      >
        <el-option
          v-for="item in allAreasList"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="11">
      <el-select
        clearable
        v-model="city"
        :disabled="!province"
        placeholder="市"
        style="margin: 0 0.1rem"
      >
        <el-option
          v-for="item in selectCityList"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="11">
      <el-select
        clearable
        v-model="county"
        :disabled="!province || !city"
        placeholder="区"
        style="margin: 0 0.1rem"
      >
        <el-option
          v-for="item in selectCountyList"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="11">
      <el-select
        clearable
        v-model="town"
        :disabled="!province || !city || !county"
        placeholder="街道"
        style="margin: 0 0.1rem"
      >
        <el-option
          v-for="item in selectTownList"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </el-col>
  </el-form-item>
</template>
<script setup>
import { ref, watch } from 'vue'
import allAreas from '../assets/pcas-code.json'

// 接收父组件传递的值
const props = defineProps({
  region: {
    type: Object,
    default: () => {
    }
  }
})

// 所有数据
const allAreasList = ref(allAreas)
// 下拉框选择省份的值
const province = ref(props.region?.province || '')
// 下拉框选择城市的值
const city = ref(props.region?.city || '')
// 下拉框选择区的值
const county = ref(props.region?.county || '')
// 下拉框选择街道的值
const town = ref(props.region?.town || '')

// 城市下拉框内容所有值
const selectCityList = ref([])
// 区域下拉框内容所有值
const selectCountyList = ref([])
// 街道下拉框内容所有值
const selectTownList = ref([])

// 监听props.value的变化
watch(
  () => props.value,
  (val) => {
    // console.log(val)
    if (val.length) {
      province.value = val[0]
      city.value = val[1]
      county.value = val[2]
      town.value = val[3]
    }
  }
)

// 分发事件给父组件
const emits = defineEmits(['update:change'])

// 监听选择省份
watch(
  () => province.value,
  val => {
    if (val) {
      selectCityList.value = allAreasList.value.find(item => item.name === province.value).children
    }

    city.value = ''
    county.value = ''
    town.value = ''
  }
)

// 监听选择城市
watch(
  () => city.value,
  val => {
    if (val) {
      selectCountyList.value = selectCityList.value.find(item => item.name === city.value).children
    }
    county.value = ''
    town.value = ''
  }
)

// 监听选择区域
watch(
  () => county.value,
  val => {
    if (val) {
      selectTownList.value = selectCountyList.value.find(item => item.name === county.value).children
    }
    town.value = ''
  }
)

// 监听选择街道
watch(
  () => town.value,
  val => {
    if (val) {
      emits('update:change', {
        // 下拉框选择省份的值
        province: province.value,
        // 下拉框选择城市的值
        city: city.value,
        // 下拉框选择区域的值
        county: county.value,
        // 下拉框选择街道的值
        town: val
      })
    }
  }
)
</script>
<style lang="scss" scoped></style>
