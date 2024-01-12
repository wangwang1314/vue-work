<template>
  <div class="manage">
    <div class="top-nav-tit">
      <div class="m-left">商机管理</div>
    </div>
    <section class="tab">
      <a-tabs hide-content size="large" type="capsule" v-model:active-key="activeKey" @change="change">
        <a-tab-pane key="1">
          <template #title>
            <div class="tit">全部商机</div>
          </template>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #title>
            <div class="tit">智能询盘</div>
          </template>
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #title>
            <div class="tit">在线询盘</div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </section>
    <transition name="zoom-fade" mode="out-in" appear>
      <Pane @changeTab="changeTab" :tab="activeKey" />
    </transition>
  </div>
</template>

<script setup lang="ts" name="inquiry">
import { ref } from 'vue'
import Pane from './Pane.vue'

const activeKey = ref('1')

const change = (val: any) => {
  activeKey.value = val
  changeTab(val)
}
const changeTab = (val: string) => {
  activeKey.value = val
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
  // background: var(--color-bg-1);
  .tab {
    .tit {
      color: var(--color-text-8);
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
    padding: 18px 0 0 20px;
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
