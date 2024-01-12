<template>
  <div class="manage">
    <div class="top-nav-tit">
      <div class="m-left">幻灯管理</div>
      <div class="m-right">
      </div>
    </div>
    <section class="tab">
      <a-tabs hide-content size="large" type="capsule" v-model:active-key="activeKey">
        <a-tab-pane :key="1">
          <template #title>
            <div class="tit">首页幻灯</div>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="2">
          <template #title>
            <div class="tit">内页顶图</div>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="3">
          <template #title>
            <div class="tit">网站插图</div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </section>
    <div class="banner-detail-out">
      <transition name="zoom-fade" mode="out-in" appear>
        <component :is="PaneMap[activeKey]" @update="updateFn" @changeTab="changeTab"></component>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts" name="productlist">
import { ref, reactive } from 'vue'
import Pane1 from './Pane1.vue'
import Pane2 from './Pane2.vue'
import Pane3 from './Pane3.vue'

const PaneMap: any = {
  1: Pane1,
  2: Pane2,
  3: Pane3,
}

const titArray = reactive({count1: 0, count2: 0, count3: 0})
const activeKey = ref(1)
const updateFn = (data) => {
  titArray.count1 = data.status_normal_nums
  titArray.count2 = data.status_deleted_nums
  titArray.count3= data.hot_count
}
const changeTab = (val: number) => {
  activeKey.value = val
}
</script>

<style lang="scss" scoped>
.banner-detail-out {


  margin: 16px var(--inner-padding) 10px var(--inner-padding);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex: 1;
}
:deep(.arco-card) {

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
