<template>
  <div class="manage">
    <section class="tab">
      <a-tabs hide-content size="medium" v-model:active-key="activeKey">
        <a-tab-pane :key="1" :title="'普通产品(' + titArray[0] + ')'"> </a-tab-pane>
        <a-tab-pane :key="2" :title="'已删除产品(' + titArray[0] + ')'"> </a-tab-pane>
        <a-tab-pane :key="3" :title="'卖点产品(' + titArray[0] + ')'"> </a-tab-pane>
      </a-tabs>
    </section>

    <transition name="zoom-fade" mode="out-in" appear>
      <keep-alive>
        <component :is="PaneMap[activeKey]"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script setup lang="ts" name="DataManage">
import { ref } from 'vue'
import Pane1 from './Pane1.vue'
import Pane2 from './Pane2.vue'
import Pane3 from './Pane3.vue'

const PaneMap: any = {
  1: Pane1,
  2: Pane2,
  3: Pane3
}

const titArray = [
  23,
  45,
  56
]
const activeKey = ref(2)
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
  .tab {
    background: var(--color-bg-1);
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
