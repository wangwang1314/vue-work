<template>
  <a-layout-header>
    <section class="system-logo">
      <span @click="changeColl" class="change-menu">
        <icon-menu-fold size="24" style="margin-left: 4px" v-if="!appStore.menuCollapse" />
        <icon-menu-unfold size="24" style="margin-left: -2px" v-else />
      </span>
      <img @click="toHome" src="@/assets/images/logo.png" />
      <div class="text-wrap">
        <div class="left">
          <a-link class="addr-span" target="_blank" :href="'http://' + (userStore.userInfo.homeInfo?.company_uncheck.domain || '')">
            <template #icon><icon-link :size="18" /></template>
            {{ 'http://' + ((userStore.userInfo.homeInfo?.company_uncheck.domain) || '') }}
          </a-link>
          <!-- <span class="addr-span"><a href="http://www.ryderelectronics.com" target="_blank">http://www.ryderelectronics.com</a></span> -->
          <!-- <a class="link-addr" target="_blank" href="http://mao.ecer.com/test/ryderelectronics.com/">制作环境</a> -->
          <a-link class="link-addr" target="_blank" :href="userStore.userInfo.homeInfo?.prod_env_url">
            <template #icon>
              <icon-camera :size="18" />
            </template>
            {{ $t('制作环境') }}
          </a-link>
        </div>
        <div class="right">
          <div class="cost">
            <div class="count">{{ $t('佣金') }}：<span>¥{{ userStore.userInfo.homeInfo?.total_commission }}</span></div>
            <div class="text-btn"><span>{{ $t('充值') }}</span></div>
          </div>
          <div class="cost inter">
            <div class="count">{{ $t('积分') }}：<span>{{ userStore.userInfo.homeInfo?.ops_company_info.points }}</span></div>
            <div class="text-btn"><span>{{ $t('充值') }}</span></div>
          </div>
        </div>
      </div>
    </section>
    <a-space class="system-head" size="medium">
      <!-- <a-dropdown trigger="click" class="coustom">
        <icon-language :size="18" class="cursor" />
        <template #content>
          <a-doption @click="changeLang('zh_CN')">
            <template #default
              ><div class="cou-width">{{ $t('中文') }}</div></template
            >
          </a-doption>
          <a-doption @click="changeLang('en')">
            <template #default
              ><div class="cou-width">{{ $t('英文') }}</div></template
            >
          </a-doption>
        </template>
      </a-dropdown> -->

      <!-- 贸易通APP -->
      <!-- <a-trigger position="top" auto-fit-position :unmount-on-close="false">
        <a-row align="center">
          <GiSvgIcon :size="24" name="mobile1" color="var(--w-e-textarea-color)"></GiSvgIcon>
        </a-row>
        <template #content>
          <div class="img-wrap arco-dropdown coustom-trigger cursor">
            <a-image
              width="150px"
              :src="qrcode"
              title="扫一扫下载贸易通APP"
              footerPosition="outer"
              style="vertical-align: top"
            />
          </div>
        </template>
      </a-trigger> -->
      <!-- 全屏切换组件 -->
      <!-- <a-tooltip content="全屏切换" position="bottom">
        <a-button size="mini" class="gi_hover_btn" @click="onToggleFullScreen">
          <template #icon>
            <icon-fullscreen :size="18" v-if="!isFullScreen" />
            <icon-fullscreen-exit :size="18" v-else />
          </template>
        </a-button>
      </a-tooltip> -->

      <!-- 暗黑模式切换 -->
      <!-- <a-tooltip content="主题切换" position="bottom">
        <GiThemeBtn></GiThemeBtn>
      </a-tooltip> -->

      <!-- 管理员账户 -->
      <a-dropdown trigger="hover" class="coustom">
        <a-row align="center" class="user">
          <!-- 管理员头像 -->
          <a-avatar :size="32" class="avatar-cous">
            <icon-user :size="16"/>
          </a-avatar>
          <span class="username">{{ userStore.userInfo.homeInfo?.user.name }}</span>
          <icon-down />
        </a-row>
        <template #content>
          <a-doption>
            <template #icon>
              <span class="doption-icon" style="background: rgba(var(--primary-6))"><icon-user /></span>
            </template>
            <template #default>{{ $t('修改密码') }}</template>
          </a-doption>
          <!-- <a-divider style="margin: 0" /> -->
          <a-doption @click="logout">
            <template #icon>
              <span class="doption-icon" style="background: rgba(var(--warning-6))"><icon-export /></span>
            </template>
            <template #default>{{ $t('退出登录') }}</template>
          </a-doption>
          <!-- <a-divider style="margin: 0" /> -->
          <a-doption>
            <template #icon
              ><span class="doption-icon" style="background: rgba(var(--success-6))"><icon-image /></span
            ></template>
            <template #default>{{ $t('同步图片') }}</template>
          </a-doption>
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
      .count {
        background-color: #fff;
        
        padding: 0px 8px 0px 16px;
        border-radius:13px 0px 0px 13px;
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
      margin:0 16px 0 16px;
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
