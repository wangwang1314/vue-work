<template>
  <div class="over-center">
    over-center
  </div>
</template>
<script setup lang="ts" name="Overcenter">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import type { LoginParams } from '@/apis'
const router = useRouter()
const userStore = useUserStore()

</script>
<style lang="scss" scoped>

</style>