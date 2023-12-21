<template>
  <div class="overview-out">
    <div class="overview">
      <init-step v-if="userStore.getmgkshow!=1"></init-step>
      <overcenter></overcenter>
      <overbot></overbot>
    </div>
  </div>
</template>
<script setup lang="ts" name="Overview">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import type { LoginParams } from '@/apis'
import initStep from './mod/init-step.vue'
import overcenter from './mod/overcenter.vue'
import overbot from './mod/overbot.vue'
const router = useRouter()
const userStore = useUserStore()
onMounted(() => {
  userStore.getHomeinfo()
})
</script>
<style lang="scss" scoped>
.overview-out {
  overflow: auto;
}
.overview {
  padding: 0 20px 30px 20px;
}
</style>