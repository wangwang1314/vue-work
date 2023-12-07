<template>
  <div class="start-wrap">
    <div class="s-left">
      <a-steps :current="tabCurrent" direction="vertical">
        <a-step
          >网站名称设定<template #icon><icon-more v-if="tabCurrent == 1" /></template
        ></a-step>
        <a-step
          >产品资料信息导入<template #icon><icon-more v-if="tabCurrent == 2" /></template
        ></a-step>
        <a-step
          >链接域名，上线申请
          <template #icon><icon-more v-if="tabCurrent == 3" /></template>
        </a-step>
        <a-step
          >上线完成，扬帆启航<template #icon><icon-more v-if="tabCurrent == 4" /></template
        ></a-step>
      </a-steps>
    </div>
    <div class="s-right">
      <div class="s-box" v-if="tabCurrent == 2">
        <div class="s-tit">选择信息录入方式：</div>
        <a-radio-group direction="vertical" v-model="choseType">
          <a-radio value="1"
            ><span class="label-box"><i></i><span>Alibaba 展厅获取</span></span></a-radio
          >
          <div class="input-wrap" v-show="choseType == '1'">
            <a-input class="nor-input" plcaceholder="填写展厅地址 例：xxxx.en.made-in-china.com"></a-input>
            <div class="status-box-wrap">
              <div class="status-box" v-if="status[choseType] == '1'">
                <div class="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>校验中</span>
              </div>
              <div class="status-box success" v-else-if="status[choseType] == '2'">
                <icon-check-circle-fill /><span>校验通过，该地址可用</span>
              </div>
              <div class="status-box error" v-else-if="status[choseType] == '3'">
                <icon-exclamation-circle-fill /><span>校验失败，该地址不可用</span>
              </div>
            </div>
          </div>

          <a-radio value="2"
            ><span class="label-box"><i></i><span>Made-in-China 展厅获取</span></span></a-radio
          >
          <div class="input-wrap" v-show="choseType == '2'">
            <a-input class="nor-input" plcaceholder="填写展厅地址 例：xxxx.en.made-in-china.com"></a-input>
            <div class="status-box-wrap">
              <div class="status-box" v-if="status[choseType] == '1'">
                <div class="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>校验中</span>
              </div>
              <div class="status-box success" v-else-if="status[choseType] == '2'">
                <icon-check-circle-fill /><span>校验通过，该地址可用</span>
              </div>
              <div class="status-box error" v-else-if="status[choseType] == '3'">
                <icon-exclamation-circle-fill /><span>校验失败，该地址不可用</span>
              </div>
            </div>
          </div>
          <a-radio value="3"><span class="label-box">自主创建</span></a-radio>
        </a-radio-group>
        <div class="e-btn"><span>下一步</span><icon-arrow-right /></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="startwrap">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import type { LoginParams } from '@/apis'
const router = useRouter()
const userStore = useUserStore()
const tabCurrent = ref(2)
const choseType = ref('1')
const form = ref({
  ali: '',
  made: ''
})
// 0 无状态 1 校验中 2 成功 3 失败
const status = reactive({
  '1': '3',
  '2': '2',
  '3': '0'
})
</script>
<style lang="scss" scoped>
@import './common.scss';
.start-wrap {
  padding: 32px 20px;
  display: flex;
  --primary-6: 8, 90, 255 !important;
  --color-neutral-3: rgba(229, 230, 235, 0.4);
  .s-right {
    flex: 1;
    color: rgb(255, 255, 255);
    .e-btn {
      margin-top: 16px;
      span {
        margin: 0px 8px 0 0;
      }
    }
    .input-wrap {
      display: flex;
      align-items: center;
    }
    :deep(.nor-input) {
      width: 400px;
      margin-left: 24px;
      border: 1px solid rgb(255, 255, 255);
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.4);

      &.arco-input-focus {
        border: 1px solid rgb(38, 90, 255);
      }
    }
    .label-box {
      color: rgb(255, 255, 255);
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('@/assets/images/ai-icon.png') no-repeat;
        background-size: cover;
        vertical-align: middle;
        margin-right: 8px;
        position: relative;
        top: -2px;
      }
    }
    :deep(.arco-radio-group) {
      .arco-radio {
        margin-top: 10px;
      }
    }
  }
  :deep(.arco-steps) {
    .arco-steps-item-content {
      float: left;
      width: 180px;
      margin-right: 24px;
      text-align: right;

      .arco-steps-item-title {
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        margin-top: 1px;
      }
    }
    .arco-steps-item-active {
      .arco-steps-item-title {
        color: rgb(255, 255, 255);
        font-size: 18px;
      }
    }
    .arco-steps-item:not(:last-child) {
      min-height: 67px;
      .arco-steps-item-tail {
        left: 217px;
        top: -6px;
        height: calc(100% + 12px);
      }
    }
    .arco-steps-item-wait .arco-steps-icon {
      color: rgb(230, 236, 255);
      background: rgb(186, 154, 255);
    }
  }
}

.status-box {
  color: rgb(38, 90, 255);
  font-size: 14px;
  font-weight: 400;
  display: flex;
  height: 20px;
  align-items: center;
  margin-left: 8px;
  span {
    margin-left: 4px;
  }
}
.status-box.success {
  color: rgb(var(--success-6));
}
.status-box.error {
  color: rgb(var(--danger-6));
}

.loading,
.loading > div {
  position: relative;
  box-sizing: border-box;
}

.loading {
  display: block;
  font-size: 0;
  color: rgb(38, 90, 255);
}

.loading.la-dark {
  color: rgb(38, 90, 255);
}

.loading > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading {
  // width: 54px;
  // height: 18px;
}

.loading > div:nth-child(1) {
  animation-delay: -200ms;
}

.loading > div:nth-child(2) {
  animation-delay: -100ms;
}

.loading > div:nth-child(3) {
  animation-delay: 0ms;
}

.loading > div {
  width: 4px;
  height: 4px;
  margin: 2px;
  border-radius: 100%;
  animation: ball-pulse 1s ease infinite;
}

.loading.la-sm {
  width: 26px;
  height: 8px;
}

.loading.la-sm > div {
  width: 4px;
  height: 4px;
  margin: 2px;
}

.loading.la-2x {
  width: 108px;
  height: 36px;
}

.loading.la-2x > div {
  width: 20px;
  height: 20px;
  margin: 8px;
}

.loading.la-3x {
  width: 162px;
  height: 54px;
}

.loading.la-3x > div {
  width: 30px;
  height: 30px;
  margin: 12px;
}

@keyframes ball-pulse {
  0%,
  60%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  30% {
    opacity: 0.1;
    transform: scale(0.01);
  }
}

</style>
