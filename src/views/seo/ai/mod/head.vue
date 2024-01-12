<template>
  <div class="head-box">
    <div class="left">
      <div class="s-box">
        <div class="s-box-img">
          <img src="@/assets/images/ai-icon-b.png" alt="ser" />
        </div>
        <div class="s-box-tit">
          <div class="main-tit">AI发布服务</div>
          <div class="sub-tit">自动智能化发品和优化SEO，提升排名效果，触达更多优质买家</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-box" v-if="userStore.getAiService > 0">
        <div class="right-box-inner">
          <div class="r-tit"><icon-check-circle-fill /><span>AI发布服务已启用</span></div>
          <div class="r-subtit" v-for="(item, index) in props.service" :key="index">
            <span>{{ item.name }} ：</span>{{ item.date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="haiserver">
import { onMounted, defineProps } from 'vue'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const props = defineProps({ service: Array })
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
