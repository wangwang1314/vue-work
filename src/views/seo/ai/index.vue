<template>
  <div class="seo-box">
    <div class="ai-box">
      <headtop :service="service"></headtop>
      <content :pricelist="pricelist" @change="getdata"></content>
    </div>
  </div>
</template>

<script setup lang="ts" name="aiserver">
import { onMounted, ref } from 'vue'
import headtop from './mod/head.vue'
import content from './mod/content.vue'
import {
  seogetprice,
  seoopenaiservice
} from '@/apis'
const pricelist = ref([])
const service = ref([])
const getdata = async () => {
  const res = await seogetprice({})
  if (res.code == 0) {
    pricelist.value = res.data.price || []
    service.value = res.data.service || []
  }
}
onMounted(() => {
  getdata()
})
</script>
<style lang="scss" scoped>
@import './mod/index.scss'
</style>
