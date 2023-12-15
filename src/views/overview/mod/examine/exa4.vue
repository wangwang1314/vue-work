<template>
  <div class="inner-wrap">
    <img src="@/assets/images/success.png" alt="">
    <div class="tit">恭喜您，网站上线完成！</div>
    <div class="sub-tit">您可以继续进行 <span class="e-link" @click="gopro">产品发布</span>、<span class="e-link" @click="goweb">网站装修</span> 来提升网站质量，也可以通过 <span class="e-link">营销推广</span> 来快速获得访客商机</div>
  </div>
</template>
<script setup lang="ts" name="exa4">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import type { LoginParams } from '@/apis'
const router = useRouter()
const userStore = useUserStore()
const gopro = () => {
  router.push({path: '/web/webproduct/detail'})
}
const goweb = () => {
  router.push({path: '/web/navlink'})
}
</script>
<style lang="scss" scoped>
@import './common.scss';
.inner-wrap {
  padding: 58px 0 0 80px;
  img {
    width: 80px;
    height: 80px;
  }
  .tit {
    color: rgb(255, 255, 255);
    font-size: 36px;
    font-weight: 400;
    line-height: 44px;
    margin-top: 24px;
  }
  .sub-tit {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.64);
    .e-link {
      color: rgb(247, 186, 30);
      text-decoration: underline;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>