<template>
  <div class="com-intro com-detail detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="vertical" :auto-label-width="true">
      <a-card :bordered="false">
        <a-row class="full-width">
          <a-col :span="24">
            <a-form-item field="name" label="描述">
              <uedit v-model="form.remark" ref="ueditref"></uedit>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="24">
            <a-form-item field="name" label="历史概要" class="no-bot">
              <a-textarea
                :auto-size="{
                  minRows: 5
                }"
                :max-length="150"
                show-word-limit
                v-model="form.brief"
              ></a-textarea>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, h, nextTick, onBeforeUnmount, onMounted } from 'vue'
import { companyTypeInfo, saveCompanyTypeInfo } from '@/apis'
import uedit from '@/components/editor/uedit.vue'
import { Message } from '@arco-design/web-vue'
import { useFileStore } from '@/store'
const fileStore = useFileStore()
const form = reactive({ brief: '', remark: '' })
const ueditref = ref()
const loading = ref(false)
const props = defineProps({
  type: String
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
const saveFn = async() => {
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
getData()

fileStore.$onAction(({ name }) => {
  if (name === 'cancel') {
    cancelFn()
  } else if (name === 'save') {
    saveFn()
  }
})
</script>
<style lang="scss" scoped>
@import './mod/list.scss';
</style>
