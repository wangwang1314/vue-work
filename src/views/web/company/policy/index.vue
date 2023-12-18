<template>
  <div class="msg-detail-out">
    <div class="top-nav-tit">
      <div class="m-left">隐私协议</div>
      <div class="m-right"></div>
    </div>
    <div class="msg-detail detail">
      <a-card :bordered="false">
        <uedit v-model="form.privacy_policy"></uedit>
      </a-card>
    </div>
  </div>
</template>
<script setup lang="ts" name="adv">
import { reactive, ref, h, nextTick } from 'vue'
import { companyprivacypolicy, companysaveprivacypolicy } from '@/apis'
import { Message } from '@arco-design/web-vue'
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
import { useUserStore, useFileStore } from '@/store'
import uedit from '@/components/editor/uedit.vue'
const fileStore = useFileStore()
const form = reactive({
  privacy_policy: ''
})
const saveFn = async () => {
  fileStore.setloading(true)
  const res = await companysaveprivacypolicy({
    privacy_policy: form.privacy_policy
  }).finally(() => {
    fileStore.setloading(false)
  })
  if (res.code == 0) {
    Message.success(res.message || '操作成功')
  }
}
const getData = async () => {
  const res = await companyprivacypolicy({
  })
  if (res.code == 0) {
    form.privacy_policy = res.data.privacy_policy || ''
  }
}
getData()

fileStore.$onAction(({ name }) => {
  if (name === 'cancel') {
    getData()
  } else if (name === 'save') {
    saveFn()
  }
})
</script>
<style lang="scss" scoped>
@import './mod/index.scss';
</style>
