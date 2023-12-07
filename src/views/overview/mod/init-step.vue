<template>
  <div class="init-step">
    <div v-if="examine=='0'">
      <start></start>
    </div>
    <div v-else-if="examine=='1'">
      <exa1></exa1>
    </div>
    <div v-else-if="examine=='2'">
      <exa2></exa2>
    </div>
    <div v-else-if="examine=='3'">
      <exa3></exa3>
    </div>
    <div v-else-if="examine=='4'">
      <exa4></exa4>
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
// 审核状态 0 未开始审核 1审核中 2审核失败 3审核成功 4网站上线 
const examine = ref('0')
</script>
<style lang="scss" scoped>
.init-step {
  margin-top: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 40px 4px rgba(0, 30, 125, 0.08);
  height: 296px;
  background: url('@/assets/images/progress_bg.jpeg') no-repeat;
  background-position: center;
  background-size: auto 100%;
}

</style>
