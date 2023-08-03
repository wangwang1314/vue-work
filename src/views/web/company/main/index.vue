<template>
  <div class="manage">
    <section class="tab">
      <a-tabs hide-content size="medium" type="capsule" @change="changeTab">
        <a-tab-pane :key="1">
          <template #title>
            <div class="tit">基本信息</div>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="2">
          <template #title>
            <div class="tit">公司介绍</div>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="3">
          <template #title>
            <div class="tit">公司服务</div>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="4">
          <template #title>
            <div class="tit">公司历史</div>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="5">
          <template #title>
            <div class="tit">公司团队</div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </section>
    <transition name="fade-slide" mode="out-in" appear>
      <pane1 v-if="activeKey == 1" :key="1"></pane1>
      <pane2 v-else-if="activeKey == 2" :key="2" type="intro"></pane2>
      <pane2 v-else-if="activeKey == 3" :key="3" type="history"></pane2>
      <pane2 v-else-if="activeKey == 4" :key="4" type="service"></pane2>
      <pane2 v-else-if="activeKey == 5" :key="5" type="team"></pane2>
      <!-- <component :is="PaneMap[activeKey]" @update="updateFn" @changeTab="changeTab"></component> -->
    </transition>
  </div>
</template>

<script setup lang="ts" name="productlist">
import { ref, reactive, nextTick } from 'vue'
import { throttle, debounce } from '@/utils/common'
import Pane1 from './Pane1.vue'
import Pane2 from './Pane2.vue'
// import Pane3 from './Pane3.vue'

const PaneMap: any = {
  1: Pane1,
  2: Pane2,
  3: Pane2,
  4: Pane2,
  5: Pane2
}

const titArray = reactive({count1: 0, count2: 0, count3: 0})
const activeKey = ref(1)
const updateFn = (data) => {
  titArray.count1 = data.status_normal_nums
  titArray.count2 = data.status_deleted_nums
  titArray.count3= data.hot_count
}
const changeTab = debounce((val: number) => {
  activeKey.value = val
}, 200)
</script>

<style lang="scss" scoped>
:deep(.arco-card) {
  .arco-card-header {
    border-bottom-style: dashed;
    margin: 0 16px;
    padding-left: 0;
    padding-right: 0;
  }
}
.manage {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-bg-1);
  .tab {
    .tit {
      color: var(--color-text-1);
      .s-span {
        font-size: 12px;
        color: var(--color-text-3);
      }
    }
    :deep(.arco-tabs-nav-tab) {
      justify-content: flex-start;
    }
    .arco-tabs-tab-active {
      .tit {
        color: rbg(var(--primary-6));
        font-size: 14px;
        .s-span {
          color: rbg(var(--primary-6));
        }
      }
    }
    padding: 12px 0 0 24px;
  }
}

:deep(.data-pane) {
  flex: 1;
  padding: $margin;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  .pane-left {
    width: 260px;
  }
  .pane-right {
    flex: 5;
    margin-left: $margin;
    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .table-box {
        flex: 1;
        overflow: hidden;
      }
    }
  }
}
</style>
