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
          <a-radio class="mar-radio" value="1"
            ><span class="label-box"><i></i><span>Alibaba 展厅获取</span></span></a-radio
          >
          <div class="input-wrap" v-show="choseType == '1'">
            <a-input-search @search="searchFn" v-if="status[choseType] == '2'" class="nor-input" placeholder="填写展厅地址 例：xxxx.en.made-in-china.com" search-button>
              <template #button-default>
                <span >开始获取</span>
              </template>
              <template #icon>
                <span></span>
              </template>
            </a-input-search>
            <a-input v-else class="nor-input" placeholder="填写展厅地址 例：xxxx.en.made-in-china.com">
            </a-input>
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

          <a-radio class="mar-radio" value="2"
            ><span class="label-box"><i></i><span>Made-in-China 展厅获取</span></span></a-radio
          >
          <div class="input-wrap" v-show="choseType == '2'">
            <a-input-search @search="searchFn" v-if="status[choseType] == '2'" class="nor-input" placeholder="填写展厅地址 例：xxxx.en.made-in-china.com" search-button>
              <template #button-default>
                <span >开始获取</span>
              </template>
              <template #icon>
                <span ></span>
              </template>
            </a-input-search>
            <a-input v-else class="nor-input" placeholder="填写展厅地址 例：xxxx.en.made-in-china.com">
            </a-input>
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
          <a-radio class="mar-radio" value="3"><span class="label-box">自主创建</span></a-radio>
        </a-radio-group>
        <div class="e-btn fix-b" @click="goNext" v-show="choseType!='3' && isstartcheck"><span>下一步</span><icon-arrow-right /></div>
        <div class="e-btn fix-b" v-show="choseType == '3'"><span>立即前往</span><icon-arrow-right /></div>
        <div class="count-box" v-if="isstartcheck">
          <a-space :size="40" v-if="!fetchloading">
            <div class="cate-label">分类数量
              <span>0</span>
            </div>
            <div class="cate-label">产品数量
              <span>0</span>
            </div>
            <div class="cate-label">公司介绍未录入
            </div>
          </a-space>
          <a-space :size="40" v-else>
            <div class="cate-label">分类数量
              <span><icon-loading /></span>
            </div>
            <div class="cate-label">产品数量
              <span><icon-loading /></span>
            </div>
            <div class="cate-label">公司介绍
              <span><icon-loading /></span>
            </div>
          </a-space>
        </div> 
      </div>
      <div class="s-box" v-if="tabCurrent == 3">
        <div class="s-tit">选择要让网站使用的域名：</div>
        <div class="tabs-wrap">
          <a-tabs hide-content size="large" type="capsule" v-model:active-key="activeKey">
            <a-tab-pane :key="1">
              <template #title>
                <div class="tit">宜选建站赠送</div>
              </template>
            </a-tab-pane>
            <a-tab-pane :key="2">
              <template #title>
                <div class="tit">您已经拥有的域名</div>
              </template>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="web-box" v-if="activeKey == 1">
          <a-radio-group v-model="checkedValue" style="width: 664px;margin-top: 10px;">
            <a-grid :cols="3" :colGap="24" :rowGap="12">
              <a-grid-item>
                <a-radio value="1">xxxxxxxxx.com</a-radio>
              </a-grid-item>
              <a-grid-item>
                <a-radio value="2">xxxxxxxxx.com</a-radio>
              </a-grid-item>
              <a-grid-item>
                <a-radio value="3">xxxxxxxxx.com</a-radio>
              </a-grid-item>
              <a-grid-item>
                <a-radio value="4">xxxxxxxxx.com</a-radio>
              </a-grid-item>
              <a-grid-item>
                <a-radio value="5">xxxxxxxxx.com</a-radio>
              </a-grid-item>
              <a-grid-item>
                <a-radio value="6">xxxxxxxxx.com</a-radio>
              </a-grid-item>
              <a-grid-item>
                <a-radio value="7">xxxxxxxxx.com</a-radio>
              </a-grid-item>
              <a-grid-item>
                <a-radio value="8">xxxxxxxxx.com</a-radio>
              </a-grid-item>
              <a-grid-item>
                <a-radio value="9">xxxxxxxxx.com</a-radio>
              </a-grid-item>
            </a-grid>
          </a-radio-group>
          <div class="e-btn fix-b" style="margin-top: 20px;"><icon-upload /><span style="margin: 0px 0px 0 8px;">申请上线</span></div>
        </div>
        <div class="self-web-box" v-else>
          <div class="input-wrap">
            <a-input class="nor-input" placeholder="输入您的域名 例：mydomain.com">
            </a-input>
            <div class="status-box-wrap">
              <div class="status-box" v-if="domainCheck == '1'">
                <div class="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>校验中</span>
              </div>
              <div class="status-box success" v-else-if="domainCheck == '2'">
                <icon-check-circle-fill /><span>校验通过</span>
              </div>
              <div class="status-box error" v-else-if="domainCheck == '3'">
                <icon-exclamation-circle-fill /><span>校验异常</span>
              </div>
            </div>
          </div>
          <div class="self-tips">请确保您拥有域名管理权限，上线时将需要您进行域名解析记录的添加。</div> 
          <div class="e-btn fix-b" style="margin-top: 20px;"><icon-upload /><span style="margin: 0px 0px 0 8px;">申请上线</span></div>
        </div>
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
  '1': '2',
  '2': '2',
  '3': '0'
})
const fetchloading = ref(true)
const isstartcheck = ref(false)
const searchFn = () => {
  isstartcheck.value = true
}
const goNext = () => {
  tabCurrent.value = 3
}
const activeKey = ref(1)
       
const checkedValue = ref('1')
const domainCheck = ref('2')
</script>
<style lang="scss" scoped>
@import './common.scss';
.start-wrap {
  padding: 32px 20px;
  display: flex;
  --primary-6: 8, 90, 255 !important;
  --color-neutral-3: rgba(229, 230, 235, 0.4);
  --primary-5: 167, 86, 255;
  .s-right {
    flex: 1;
    color: rgb(255, 255, 255);
    position: relative;
    height: 229px;
    :deep(.mar-radio) {
      margin-top: 10px;
    }
    :deep(.arco-radio) {
      .arco-icon-hover {
        width: 16px;
        height: 16px;
      }
      &.arco-radio-checked {
        .arco-radio-icon {
          width: 18px;
          height: 18px;
          &::after {
            top: 0px;
            left: 0px;
          }
        }
      }
    }
    .fix-b {
      position: absolute;
      bottom: 0;
    }
    .self-web-box {
      margin-top: 16px;
      .self-tips {
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        margin-top: 16px;
      }
      :deep(.nor-input) { 
        margin: 0;
      }
    }
    .web-box {
      margin-top: 10px;
      :deep(.arco-radio-label) {
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: 400;
      }
    }
    .tabs-wrap {
      height: 36px;
      margin-top: 8px;
      :deep(.arco-tabs) {
        float: left;
      }
    }
    .count-box {
      position: absolute;
      right: 0;
      bottom: 3px;
      .cate-label {
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }
    }
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
      ::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.64);
        font-size: 14px;
      }
      .arco-input-wrapper {
        // border: 1px solid rgb(255, 255, 255);
        // border-radius: 2px;
        background: rgba(255, 255, 255, 0.4);
      }
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
        // margin-top: 10px;
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
