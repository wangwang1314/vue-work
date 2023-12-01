<template>
  <a-layout-header>
    <section class="system-logo">
      <a-button @click="goback">返回</a-button>
    </section>
    <a-space class="system-head" size="medium">
      <a-checkbox-group v-model="checkdata">
        <a-checkbox value="1">AI优化发布
          <a-popover title="Title">
            <icon-exclamation-circle-fill size="16" />
            <template #title><span></span></template>  
            <template #content>
              <p>勾选后，点击产品发布时会对产品标题及描述内容进行Al优化，优化完成后发布。<a>了解更多>></a></p>
            </template>
          </a-popover>
        </a-checkbox>
        <a-checkbox value="2">AI产品扩展
          <a-popover title="Title">
            <icon-exclamation-circle-fill size="16" />
            <template #title><span></span></template>  
            <template #content>
              <p>勾选后，点击产品发布时会对产品标题及描述内容进行Al优化，优化完成后发布。<a>了解更多>></a></p>
            </template>
          </a-popover>
        </a-checkbox>
      </a-checkbox-group>
      <a-button type="primary" @click="confirm">发布</a-button>
      <a-button @click="cancel">取消</a-button>
    </a-space>
  </a-layout-header>
</template>

<script setup lang="ts" name="productHeader">
import { ref } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useUserStore, useAppStore, useFileStore } from '@/store'
import { useFullScreen } from '@/hooks'
import SettingDrawer from './SettingDrawer.vue'
import Message from './Message.vue'
import qrcode from '@/assets/images/an_qr_code.png'
import { useI18n } from 'vue-i18n'
import $t from '@/i18n/use'

const router = useRouter()
const userStore = useUserStore()
const fileStore = useFileStore()
const { isFullScreen, onToggleFullScreen } = useFullScreen()
const SettingDrawerRef = ref<InstanceType<typeof SettingDrawer>>()
const appStore = useAppStore()
const checkdata = ref([])
const changeColl = () => {
  appStore.setMenuCollapse(!appStore.menuCollapse)
}
const goback = () => {
  router.go(-1)
}
const confirm = () => {
  fileStore.confirm()
}
const cancel = () => {
  fileStore.cancel()
}
// 跳转首页
const toHome = () => {
  router.push('/')
}

// 跳转个人中心
const toUser = () => {
  router.push('/system/user-center')
}


</script>

<style lang="scss" scoped>
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
.text-wrap {
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 14px;
  justify-content: space-between;
  .left {
    white-space: nowrap;
    .addr-span {
      margin-left: 12px;
      color: var(--color-white);
      text-decoration: none;
      &:hover {
        background: none;
      }
    }
    .link-addr {
      color: var(--color-white);
      margin-left: 10px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        background: none;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    .cost {
      color: rgb(17, 17, 17);
      display: flex;
      height: 28px;
      line-height: 28px;
      margin-right: 16px;
      .count {
        background-color: #fff;

        padding: 0px 8px 0px 16px;
        border-radius: 13px 0px 0px 13px;
        font-size: 12px;
        span {
          color: var(--red-color-2);
          font-size: 12px;
        }
      }
      .text-btn {
        padding: 0 16px 0 12px;
        background-color: var(--red-color-2);
        border-radius: 0px 13px 13px 0px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .inter {
      .count {
        span {
          color: var(--orange-init);
        }
      }
      .text-btn {
        background-color: var(--orange-init);
      }
    }
    white-space: nowrap;
  }
}
.doption-icon {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #fff;
  border-radius: 4px;
}

.arco-layout-header {
  padding: 0 $padding;
  height: 64px;
  background: var(--header-black);
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border-bottom: 1px solid var(--color-neutral-3);
  .system-logo {
    font-size: 20px;
    line-height: 1;
    color: var(--color-text-1);
    display: flex;
    align-items: center;
    user-select: none;
    flex: 1;
    & > img {
      width: 56px;
      cursor: pointer;
    }
    .system-name {
      padding-left: 10px;
      white-space: nowrap;
      transition: color 0.3s;
      &:hover {
        color: $color-theme !important;
        cursor: pointer;
      }
    }
  }
  .system-head {
    display: flex;
    align-items: center;
  }
  .user {
    color: #fff;
    cursor: pointer;
    .username {
      margin-left: 10px;
    }
    .arco-icon-down {
      transition: all 0.3s;
      margin-left: 2px;
    }
  }
}
.cursor {
  cursor: pointer;
}
.img-wrap {
  width: 170px;
  padding: 10px;
  img {
    width: 100%;
  }
  p {
    font-size: 14px;
    text-align: center;
  }
}
.coustom-trigger {
  :deep(.arco-image-footer-caption-title) {
    text-align: center;
    font-size: 14px;
  }
}
.cou-width {
  width: 60px;
  text-align: center;
}
.change-menu {
  color: #fff;
  margin-right: 16px;
  cursor: pointer;
  display: none;
}
.avatar-cous {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgb(201, 205, 212);
}
</style>
