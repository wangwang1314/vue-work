<template>
  <a-layout-header>
    <section class="system-logo">
      <span>宜选建站平台</span>
    </section>
    <a-space class="system-head" size="medium">
      <div class="text-wrap">
        <div class="left">
          <a-link
            class="addr-span"
            target="_blank"
            :href="'http://' + (userStore.userInfo.homeInfo?.company?.domain || '')"
          >
            <template #icon><icon-link :size="18" /></template>
            {{ 'http://' + (userStore.userInfo.homeInfo?.company?.domain || '') }}
          </a-link>
          <!-- <span class="addr-span"><a href="http://www.ryderelectronics.com" target="_blank">http://www.ryderelectronics.com</a></span> -->
          <!-- <a class="link-addr" target="_blank" href="http://mao.ecer.com/test/ryderelectronics.com/">制作环境</a> -->
          <a-link class="link-addr" target="_blank" :href="userStore.userInfo.homeInfo?.prod_env_url">
            <template #icon>
              <icon-camera :size="18" />
            </template>
            预览
          </a-link>
          <span class="line-span"></span>
          <a-link
            class="addr-span service"
            target="_blank"
            href=""
          >
            <template #icon><icon-customer-service :size="18" /></template>
          </a-link>
        </div>
      </div>
      <!-- 管理员账户 -->
      <a-dropdown trigger="hover" class="coustom">
        <a-row align="center" class="user">
          <!-- 管理员头像 -->
          <a-avatar :size="32" class="avatar-cous">
            <icon-user :size="16" />
          </a-avatar>
          <!-- <span class="username">{{ userStore.userInfo.homeInfo?.user.name }}</span>
          <icon-down /> -->
        </a-row>
        <template #content>
          <a-doption>
            <template #icon>
              <span class="doption-icon" style="background: rgba(var(--primary-6))"><icon-user /></span>
            </template>
            <template #default>{{ '账号设置' }}</template>
          </a-doption>
          <!-- <a-divider style="margin: 0" /> -->
          <a-doption @click="logout">
            <template #icon>
              <span class="doption-icon" style="background: rgba(var(--warning-6))"><icon-export /></span>
            </template>
            <template #default>{{ $t('退出登录') }}</template>
          </a-doption>
          <!-- <a-divider style="margin: 0" /> -->
        </template>
      </a-dropdown>
    </a-space>
    <SettingDrawer ref="SettingDrawerRef"></SettingDrawer>
  </a-layout-header>
</template>

<script setup lang="ts" name="Header">
import { ref } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useUserStore, useAppStore } from '@/store'
import { useFullScreen } from '@/hooks'
import SettingDrawer from './SettingDrawer.vue'
import Message from './Message.vue'
import qrcode from '@/assets/images/an_qr_code.png'
import { useI18n } from 'vue-i18n'
import $t from '@/i18n/use'

const router = useRouter()
const userStore = useUserStore()
const { isFullScreen, onToggleFullScreen } = useFullScreen()
const SettingDrawerRef = ref<InstanceType<typeof SettingDrawer>>()
const appStore = useAppStore()
const changeColl = () => {
  appStore.setMenuCollapse(!appStore.menuCollapse)
}
// 切换语言
const { t, locale } = useI18n()
const changeLang = (type: string) => {
  locale.value = type
  window.localStorage.setItem('lang', locale.value)
}
// 跳转首页
const toHome = () => {
  router.push('/')
}

// 跳转个人中心
const toUser = () => {
  router.push('/system/user-center')
}

// 退出登录
const logout = () => {
  Modal.warning({
    title: '提示',
    content: '确认退出登录？',
    hideCancel: false,
    closable: true,
    onOk: () => {
      userStore.logout()
      router.replace('/login')
    }
  })
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
    display: flex;
    align-items: center;
    .addr-span {
     
      // margin-left: 12px;
      color: var(--color-text-8);
      text-decoration: none;
      &:hover {
        background: none;
      }
    }
    
    .link-addr {
      color: var(--color-text-8);
      margin-left: 22px;
      text-decoration: none;
      &:hover {
        // text-decoration: underline;
        background: none;
      }
    }
    .service {
      :deep(.arco-link-icon) {
        background: var(--fill-3);
        border-radius: 50%;
        padding: 0;
        height: 24px;
        width: 24px;
        justify-content: center;
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
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px 0px rgba(78, 89, 105, 0.06);
    z-index: 10;
  // border-bottom: 1px solid var(--color-neutral-3);
  .system-logo {
    font-size: 16px;
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
.line-span {
  display: inline-block;
  height: 16px;
  width: 1px;
  background: var(--line-2);
  vertical-align: middle;
  margin: 0 24px;
}
</style>
