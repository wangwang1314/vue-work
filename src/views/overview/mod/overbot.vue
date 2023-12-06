<template>
  <div class="over-bot">
    <div class="tab-wrap">
      <div class="left">

      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Overbot">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import type { LoginParams } from '@/apis'
const router = useRouter()
const userStore = useUserStore()

</script>
<style lang="scss" scoped>

</style>