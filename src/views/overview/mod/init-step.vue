<template>
  <div class="init-step-wrap">
    <div class="top-nav-tit">
      <div class="m-left">网站初始上线步骤</div>
      <div class="m-right"></div>
    </div>
    <div class="init-step">
      <div v-if="userStore.getcheckstate == '1'">
        <exa4></exa4>
      </div>
      <div v-else-if="userStore.getcheckstate == '-1'">
        <start></start>
      </div>
      <div v-else-if="userStore.getcheckstate == '0'">
        <exa1></exa1>
      </div>
      <div v-else-if="userStore.getcheckstate == '2'">
        <exa2></exa2>
      </div>
      <!-- <div v-else-if="userStore.getcheckstate == '1'">
        <exa3></exa3>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts" name="Initstep">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import type { LoginParams } from '@/apis'
import start from './examine/start.vue'
import exa1 from './examine/exa1.vue'
import exa2 from './examine/exa2.vue'
import exa3 from './examine/exa3.vue'
import exa4 from './examine/exa4.vue'
const router = useRouter()
const userStore = useUserStore()
// 审核状态-1 未开始审核 0审核中 1审核成功 2审核失败

</script>
<style lang="scss" scoped>
.init-step {
  margin-top: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 40px 4px rgba(0, 30, 125, 0.08);
  height: 316px;
  background: url('@/assets/images/progress_bg.jpeg') no-repeat;
  background-position: center;
  background-size: auto 100%;
}
.top-nav-tit {
  margin: 16px 0 0px 0;
}
</style>
