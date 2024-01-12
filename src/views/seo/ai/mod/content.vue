<template>
  <div class="content-box">
    <div class="tab-box">
      <a-tabs type="capsule" size="large" hide-content v-model:active-key="tabkey">
        <a-tab-pane key="1" title="Tab 1">
          <template #title>
            <div class="tab-tit-box">
              <icon-robot strokeWidth="5" />
              <span>服务介绍</span>
            </div>
          </template>
        </a-tab-pane>
        <a-tab-pane key="2" title="Tab 2">
          <template #title>
            <div class="tab-tit-box">
              <icon-tags strokeWidth="5" />
              <span>包年价格</span>
            </div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
    <tab1 :pricelist="prop.pricelist" v-show="tabkey=='1'" @update="changeFn"></tab1>
    <tab2 :pricelist="prop.pricelist" @change="update" v-show="tabkey=='2'"></tab2>
  </div>
</template>

<script setup lang="ts" name="haiserver">
import { onMounted, ref, defineProps } from 'vue'
import tab1 from './tab1.vue'
import tab2 from './tab2.vue'
const tabkey = ref('1')
const changeFn = () => {
  tabkey.value = '2'
}
const prop = defineProps(['pricelist'])
const emit = defineEmits(['change'])
const update = () => {
  emit('change')
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
