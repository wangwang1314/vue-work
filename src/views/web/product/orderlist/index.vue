<template>
  <div class="manage">
    <section class="tab">
      <a-tabs hide-content size="medium" type="capsule" v-model:active-key="activeKey">
        <a-tab-pane :key="1">
          <template #title>
            <div class="tit">首页置顶<span class="s-span">({{titArray.count1}})</span></div>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="2">
          <template #title>
            <div class="tit">Top Products<span class="s-span">({{titArray.count2}})</span></div>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="3">
          <template #title>
            <div class="tit">页脚产品（左）</div>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="4">
          <template #title>
            <div class="tit">页脚产品（中）</div>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="5">
          <template #title>
            <div class="tit">页脚产品（右）</div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </section>

    <transition name="zoom-fade" mode="out-in" appear>
      <component :is="PaneMap[activeKey]" @update="updateFn"></component>
    </transition>
  </div>
</template>

<script setup lang="ts" name="orderlist">
import { ref, reactive } from 'vue'
import Pane1 from './Pane1.vue'
import Pane2 from './Pane2.vue'
import Pane3 from './Pane3.vue'
import Pane4 from './Pane4.vue'
import Pane5 from './Pane5.vue'

const PaneMap: any = {
  1: Pane1,
  2: Pane2,
  3: Pane3,
  4: Pane4,
  5: Pane5
}

const titArray = reactive({count1: 0, count2: 0})
const activeKey = ref(1)
const updateFn = (data) => {
  titArray.count1 = data.flags_count['1']
  titArray.count2 = data.flags_count['2']
}
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
