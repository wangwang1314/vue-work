<template>
  <a-layout-header>
    <section class="system-logo">
      <div class="goback-class" @click="goback" v-if="nogobackarr.indexOf(route.name) == -1">
        <icon-arrow-left /><span>返回</span>
      </div>
    </section>
    <a-space class="system-head" v-if="route.name === 'productadd'">
      <a-button @click="cancel" :disabled="fileStore.loading">取消</a-button>
      <div class="g-box" v-if="userStore.getAiService > 0 && !queryid">
        <div class="c-line"></div>
        <a-checkbox-group v-model="fileStore.checkdata" style="margin: 0 0 0 24px">
          <a-checkbox :value="1"
            >AI优化发布
            <a-tooltip title="Title">
              <icon-exclamation-circle size="16" />
              <template #title><span></span></template>
              <template #content>
                <p class="tootip-p">
                  勾选后，点击产品发布时会对产品标题及描述内容进行Al优化，优化完成后发布。<span @click="goai"
                    >了解更多>></span
                  >
                </p>
              </template>
            </a-tooltip>
          </a-checkbox>
          <a-checkbox :value="2"
            >AI产品扩展
            <a-tooltip title="Title">
              <icon-exclamation-circle size="16" />
              <template #title><span></span></template>
              <template #content>
                <p class="tootip-p">
                  勾选后，点击产品发布时会对产品标题及描述内容进行Al扩展，扩展完成后发布。<span @click="goai"
                    >了解更多>></span
                  >
                </p>
              </template>
            </a-tooltip>
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-button type="primary" @click="confirm" :loading="fileStore.loading">
        发布
        <template #icon><icon-send /></template>
      </a-button>
    </a-space>
    <a-space :size="16" v-else-if="emptybtn.indexOf(route.name) != -1">

    </a-space>
    <a-space :size="16" v-else>
      <a-button type="primary" @click="save" :loading="fileStore.loading">保存</a-button>
      <a-button @click="cancel" :disabled="fileStore.loading">取消</a-button>
    </a-space>
  </a-layout-header>
</template>

<script setup lang="ts" name="productHeader">
import { ref, onMounted } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore, useAppStore, useFileStore } from '@/store'
import { useFullScreen } from '@/hooks'
import SettingDrawer from './SettingDrawer.vue'
import Message from './Message.vue'
import qrcode from '@/assets/images/an_qr_code.png'
import { useI18n } from 'vue-i18n'
import $t from '@/i18n/use'

const router = useRouter()
const route = useRoute()
const queryid = route.query.id
const userStore = useUserStore()
const fileStore = useFileStore()
const { isFullScreen, onToggleFullScreen } = useFullScreen()
const SettingDrawerRef = ref<InstanceType<typeof SettingDrawer>>()
const appStore = useAppStore()
const checkdata = ref([])
const changeColl = () => {
  appStore.setMenuCollapse(!appStore.menuCollapse)
}
const savecancel = ref([])
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

const save = () => {
  fileStore.save()
}
onMounted(() => {
  fileStore.setloading(false)
})
const checkbox = ref(1)
const nogobackarr = ref([
  'webcompanymessage',
  'webcompanyintro',
  'webcompanyfactory',
  'webcompanypolicy',
  'webcompanylanguage',
  'webcompanyquality',
  'webcompanycontact'
])
const emptybtn = ref(['integrallist'])
const goai = () => {
  window.open(window.location.origin + '/website/seo/ai', '_blank')
  // router.push({ path: '/seo/ai' })
}
</script>

<style lang="scss" scoped>
.g-box {
  margin-left: 24px;
  position: relative;
  .c-line {
    border-left: 1px solid rgb(229, 230, 235);
    height: 16px;
    position: absolute;
    top: 3px;
  }
}
.tootip-p {
  --primary-6: 22, 93, 255 !important;
  span {
    color: rgb(var(--primary-6));
    cursor: pointer;
  }
}
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
      color: var(--color-text-8);
      text-decoration: none;
      &:hover {
        background: none;
      }
    }
    .link-addr {
      color: var(--color-text-8);
      margin-left: 10px;
      text-decoration: none;
      &:hover {
        // text-decoration: underline;
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
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px 0px rgba(78, 89, 105, 0.06);
  z-index: 10;
  // border-bottom: 1px solid var(--color-neutral-3);
  .system-logo {
    font-size: 20px;
    line-height: 1;
    color: var(--color-text-8);
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
.goback-class {
  color: var(--color-text-4);
  cursor: pointer;
  font-size: 16px;
  span {
    margin-left: 6px;
  }
}
</style>
