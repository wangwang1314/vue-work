<template>
  <div class="guide">
    <div class="guide-box">
      <div class="guide-box-top">
        <img src="@/assets/images/ecer-logo.png" alt="" />
        <div>宜选网建站平台</div>
      </div>
      <div class="guide-inner-box">
        <div class="guide-inner-top">
          <img src="@/assets/images/guide-text.png" alt="" />
          <div>开启您的网站出海之旅</div>
        </div>
        <div class="guide-inner-content">
          <a-form :model="form" layout="vertical" ref="formref">
            <a-form-item field="webname" label="您想建立的网站名称" :rules="rules">
              <a-input v-model="form.webname" placeholder="6~20个英文字符" />
            </a-form-item>
            <a-form-item field="companyname" label="您的英文公司名称" :rules="rules2">
              <a-input v-model="form.companyname" placeholder="60个以内英文字符" />
            </a-form-item>
            <div class="l-btn" v-loading="disabled" :class="{'disabled': disabled}" @click="submit" gi-loading-type="circle">
              <span>下一步</span><icon-arrow-right />
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Guide1">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import { useLoading } from '@/hooks'
import { Message, Form } from '@arco-design/web-vue'
import { guideCreatweb } from '@/apis'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const navTabStore = useNavTabStore()
const form = ref({
  webname: '',
  companyname: route.query.company_name || ''
})
const rules = [
  {
    validator: (value, cb) => {
      if (/^\s+$/.test(value)) {
        cb('不能输入全空格')
      }
      if (!/[a-zA-Z\s]{6,20}$/.test(value) || value === undefined) {
        cb('6~20个英文字符')
      }
    }
  }
]
const rules2 = [
  {
    validator: (value, cb) => {
      if (/^\s+$/.test(value)) {
        cb('不能输入全空格')
      }
      if (!/^[^\u4e00-\u9fa5]{1,60}$/.test(value) || value === undefined) {
        cb('60个以内英文字符')
      }
    }
  }
]
const disabled = ref(false)
const formref = ref()
const submit = () => {
  formref.value.validate(async(res) => {
    if (res) {
      return
    }
    disabled.value = true
    const result = await guideCreatweb({
      ...form.value
    }).finally(() => {
      disabled.value = false
    })
    if (result.code == 0) {
      Message.success(result.message || '操作成功')
      setTimeout(() => {
        router.push({ path: '/guide2' })
      })
    }
  })
}
</script>

<style lang="scss" scoped>
@import './mod/index.scss';
</style>
