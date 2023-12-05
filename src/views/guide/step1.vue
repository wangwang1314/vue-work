<template>
  <div class="guide">
    <div class="guide-box">
      <div class="guide-box-top">
        <img src="@/assets/images/ecer-logo.png" alt="">
        <div>宜选网建站平台</div>
      </div>
      <div class="guide-inner-box">
        <div class="guide-inner-top">
          <img src="@/assets/images/guide-text.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import { useLoading } from '@/hooks'
import { Message, Form } from '@arco-design/web-vue'
import type { LoginParams } from '@/apis'
const router = useRouter()
const userStore = useUserStore()
const navTabStore = useNavTabStore()

</script>

<style lang="scss" scoped>
@import './mod/index.scss';
</style>
