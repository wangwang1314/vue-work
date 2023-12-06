<template>
  <div class="init-step">

  </div>
</template>
<script setup lang="ts" name="Initstep">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import type { LoginParams } from '@/apis'
const router = useRouter()
const userStore = useUserStore()

</script>
<style lang="scss" scoped>
.init-step {
  margin-top: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 40px 4px rgba(0, 30, 125, 0.08);
  height: 296px;
  background: url('@/assets/');
}
</style>