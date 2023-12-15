<template>
  <div class="inner-wrap">
    <img src="@/assets/images/hourglass.png" alt="">
    <div class="tit">系统审核处理中…</div>
  </div>
</template>
<script setup lang="ts" name="exa1">
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

.inner-wrap {
  padding: 74px 0 0 80px;
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
  .tit {
    color: rgb(255, 255, 255);
    font-size: 36px;
    font-weight: 400;
    line-height: 44px;
    margin-top: 24px;
  }
}

</style>