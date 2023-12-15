<template>
  <div class="inner-wrap">
    <img src="@/assets/images/sad-face.png" alt="">
    <div class="tit">非常遗憾，上线审核未通过…</div>
    <div class="sub-tit">原因：您提交的材料经审核为无效内容</div>
    <div class="e-btn" @click="reset"><icon-refresh /><span>重新申请</span></div>
  </div>
</template>
<script setup lang="ts" name="exa2">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import type { LoginParams } from '@/apis'
const router = useRouter()
const userStore = useUserStore()
const reset = () => {
  userStore.setcheckstate(-1)
}
</script>
<style lang="scss" scoped>
@import './common.scss';
.inner-wrap {
  padding: 46px 0 0 80px;
  img {
    width: 64px;
    height: 64px;
    object-fit: cover;
  }
  .tit {
    margin-top: 16px;
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
  }
  .sub-tit {
    margin-top: 8px;
    color: rgba(255, 255, 255, 0.64);
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
  .e-btn {
    margin-top: 24px;
  }
}
</style>