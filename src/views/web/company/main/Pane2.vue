<template>
  <div class="com-intro com-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <a-row class="full-width">
        <a-col :span="22">
          <a-form-item field="name" label="产品名称" :hide-label="true">
            <a-textarea
              :auto-size="{
                minRows: 5
              }"
              :max-length="150"
              show-word-limit
              v-model="form.brief"
            ></a-textarea>
            <template #extra> 公司介绍概要，建议<span class="warning-color">100-120</span>个字符 </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="full-width">
        <a-col :span="22">
          <uedit v-model="form.remark" ref="ueditref" v-if="moed"></uedit>
        </a-col>
      </a-row>
      <a-row class="full-width">
        <a-col :span="22">
          <div class="com-btn-box">
            <a-space :size="12">
              <a-button type="primary" @click="saceFn" :loading="loading">保存</a-button>
              <a-button @click="cancelFn" :disabled="loading">取消</a-button>
            </a-space>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, h, nextTick, onBeforeUnmount, onMounted } from 'vue'
import { companyTypeInfo, saveCompanyTypeInfo } from '@/apis'
import uedit from '@/components/editor/uedit.vue'
import { Message } from '@arco-design/web-vue'
const form = reactive({ brief: '', remark: '' })
const ueditref = ref()
const moed = ref(false)
const loading = ref(false)
const props = defineProps({
  type: String
})
onMounted(() => {
  moed.value = true
  getData()
})
onBeforeUnmount(() => {
  moed.value = false
})
const getData = async () => {
  const res = await companyTypeInfo({
    type: props.type
  })
  if (res.code === 0) {
    form.brief = res.data.brief
    form.remark = res.data.remark
  }
}
const saceFn = async() => {
  const { brief, remark } = form
  loading.value = true
  const res = await saveCompanyTypeInfo({
    type: props.type,
    brief,
    remark
  }).finally(() => {
    loading.value = false
  })
  if (res.code === 0) {
   Message.success(res.message || '操作成功')
  }
}
const cancelFn = () => {
  getData()
}
</script>
<style lang="scss" scoped>
@import './mod/list.scss';
</style>
