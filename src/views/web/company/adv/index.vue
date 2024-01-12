<template>
  <div class="adv-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <a-row>
        <a-col :span="18">
          <a-card title="公司优势1" :bordered="false">
            <a-form-item label="优势标题">
              <a-input
                v-model="form.companylist[0].name"
                :max-length="{ length: 20, errorOnly: true }"
                allow-clear
                show-word-limit
              ></a-input>
            </a-form-item>
            <a-form-item label="优势内容">
              <a-textarea
                :auto-size="{
                  minRows: 4
                }"
                :max-length="{ length: 350, errorOnly: true }"
                allow-clear
                show-word-limit
                v-model="form.companylist[0].value"
              ></a-textarea>
              <template #extra> 优势内容说明，建议<span class="warning-color">200-300</span>个字符 </template>
            </a-form-item>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="18">
          <a-card title="公司优势2" :bordered="false">
            <a-form-item label="优势标题">
              <a-input v-model="form.companylist[1].name" :max-length="{ length: 20, errorOnly: true }" allow-clear show-word-limit></a-input>
            </a-form-item>
            <a-form-item label="优势内容">
              <a-textarea
                :auto-size="{
                  minRows: 4
                }"
                :max-length="{ length: 350, errorOnly: true }"
                allow-clear
                show-word-limit
                v-model="form.companylist[1].value"
              ></a-textarea>
              <template #extra> 优势内容说明，建议<span class="warning-color">200-300</span>个字符 </template>
            </a-form-item>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="18">
          <a-card title="公司优势3" :bordered="false">
            <a-form-item label="优势标题">
              <a-input v-model="form.companylist[2].name" :max-length="{ length: 20, errorOnly: true }" allow-clear show-word-limit></a-input>
            </a-form-item>
            <a-form-item label="优势内容">
              <a-textarea
                :auto-size="{
                  minRows: 4
                }"
                :max-length="{ length: 350, errorOnly: true }"
                allow-clear
                show-word-limit
                v-model="form.companylist[2].value"
              ></a-textarea>
              <template #extra> 优势内容说明，建议<span class="warning-color">200-300</span>个字符 </template>
            </a-form-item>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="18">
          <a-card title="公司优势4" :bordered="false">
            <a-form-item label="优势标题">
              <a-input v-model="form.companylist[3].name" :max-length="{ length: 20, errorOnly: true }" allow-clear show-word-limit></a-input>
            </a-form-item>
            <a-form-item label="优势内容">
              <a-textarea
                :auto-size="{
                  minRows: 4
                }"
                :max-length="{ length: 350, errorOnly: true }"
                allow-clear
                show-word-limit
                v-model="form.companylist[3].value"
              ></a-textarea>
              <template #extra> 优势内容说明，建议<span class="warning-color">200-300</span>个字符 </template>
            </a-form-item>
          </a-card>
        </a-col>
      </a-row>
      <a-row class="full-width">
        <a-col :span="18">
          <div class="com-btn-box">
            <a-form-item label="">
              <a-space :size="12">
                <a-button type="primary" @click="saveFn" :loading="loading">保存</a-button>
                <a-button @click="getData" :disabled="loading">取消</a-button>
              </a-space>
            </a-form-item>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts" name="adv">
import { reactive, ref, h, nextTick } from 'vue'
import { getCompanyAdv, saveCompanyAdv } from '@/apis'
import { Message } from '@arco-design/web-vue'
const formRef = ref()
const loading = ref(false)
const form = reactive({
  companylist: [
    { name: '', value: '' },
    { name: '', value: '' },
    { name: '', value: '' },
    { name: '', value: '' }
  ]
})
const getData = async () => {
  const res = await getCompanyAdv()
  if (res.code === 0) {
    form.companylist = res.data.advantage
  }
}
getData()
const saveFn = async () => {
  loading.value = true
  const res = await saveCompanyAdv({
    advantage: form.companylist
  }).finally(() => {
    loading.value = false
  })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
  }
}
</script>
<style lang="scss" scoped>
@import './mod/list.scss';

</style>
