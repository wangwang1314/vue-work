<template>
  <a-card title="工作台" :bordered="false" size="medium" class="card-box">
    <template #extra>
      <GiNowTime></GiNowTime>
    </template>
    <a-row justify="space-between" align="center" class="work-platform">
      <a-space :size="15">
        <a-avatar :size="80">
          <img :src="userStore.userInfo.avatar" />
        </a-avatar>
        <div class="tip">
          <p>早安，{{ userStore.userName }}，开始您一天的工作吧！</p>
          <p>今日阴转大雨，15℃ - 25℃，出门记得带伞哦。</p>
        </div>
      </a-space>

      <a-space :size="50">
        <a-statistic :value="16" :value-from="0" :start="true" animation>
          <template #title>
            <a-space>
              <GiSvgIcon name="icon-num"></GiSvgIcon>
              <span>项目数</span>
            </a-space>
          </template>
        </a-statistic>
        <a-statistic :value="3" :value-from="0" :start="true" animation>
          <template #title>
            <a-space>
              <GiSvgIcon name="icon-wait"></GiSvgIcon>
              <span>待办</span>
            </a-space>
          </template>
          <template #suffix>/15</template>
        </a-statistic>
        <a-statistic :value="35" :value-from="0" :start="true" animation>
          <template #title>
            <a-space>
              <GiSvgIcon name="icon-msg"></GiSvgIcon>
              <span>消息</span>
            </a-space>
          </template>
        </a-statistic>
      </a-space>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
:deep(.arco-statistic-title) {
  margin-bottom: 0;
}
.card-box {
  // margin-top: $margin;
}
.work-platform {
  padding: 0 20px;
  .tip {
    color: $color-text-3;
    p {
      &:first-child {
        font-size: 1.25rem;
        color: $color-text-1;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
