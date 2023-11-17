<template>
  <div class="nav-tab" v-if="appStore.tab">
    <a-tabs
      editable
      hide-content
      size="medium"
      :type="appStore.tabMode"
      :active-key="route.path"
      @tab-click="onClick"
      @delete="navtabStore.closeCurrent"
    >
      <a-tab-pane
        v-for="item of navtabStore.tagList"
        :key="item.path"
        :title="item.name"
        :closable="item.path !== '/home'"
      ></a-tab-pane>
      <!-- 右侧按钮 -->
      <template #extra>
        <a-space class="system-head" size="medium">
          <div class="lang">
            <span class="text">当前编辑的是</span>
            <a-dropdown trigger="hover" class="coustom" :popup-max-height="500">
              <div class="btn capt">{{ $t(appStore.language) }}</div>
              <template #content>
                <a-doption v-for="(item, index) in userStore.userInfo.homeInfo?.languages" @click="selecLang(item)">
                  <template #default
                    ><div class="cou-width capt">{{ $t(item.cname) }}</div></template
                  >
                </a-doption>
              </template>
            </a-dropdown>
            <span class="text">语种</span>
          </div>

          <!-- 贸易通APP -->
          <a-trigger position="bottom" auto-fit-position :unmount-on-close="false">
            <a-row align="center">
              <icon-mobile :size="18" />
              <!-- <GiSvgIcon :size="24" name="mobile1" color="var(--fill-1)"></GiSvgIcon> -->
            </a-row>
            <template #content>
              <div class="img-wrap arco-dropdown coustom-trigger cursor">
                <!-- <img :src="qrcode" alt="" />
            <p>扫一扫下载贸易通APP</p> -->
                <a-image
                  width="150px"
                  :src="qrcode"
                  title="扫一扫下载贸易通APP"
                  footerPosition="outer"
                  style="vertical-align: top"
                />
              </div>
            </template>
          </a-trigger>

          <a-dropdown trigger="click" class="coustom">
            <icon-language :size="18" class="cursor color-fill-1" />
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
          </a-dropdown>

          <!-- 全屏切换组件 -->
          <a-tooltip content="全屏切换" position="bottom">
            <a-button size="mini" class="gi_hover_btn" @click="onToggleFullScreen">
              <template #icon>
                <icon-fullscreen :size="18" v-if="!isFullScreen" class="color-fill-1" />
                <icon-fullscreen-exit :size="18" v-else class="color-fill-1" />
              </template>
            </a-button>
          </a-tooltip>

          <!-- 暗黑模式切换 -->
          <a-tooltip content="主题切换" position="bottom">
            <GiThemeBtn class="color-fill-1"></GiThemeBtn>
          </a-tooltip>

          <a-dropdown trigger="hover">
            <!-- <GiMoreIcon class="mr"></GiMoreIcon> -->
            <icon-close class="mr close-class color-fill-1" />
            <template #content>
              <a-doption @click="navtabStore.closeCurrent(route.path)">
                <template #icon><icon-close /></template>
                <template #default>关闭当前</template>
              </a-doption>
              <a-doption @click="navtabStore.closeOther(route.path)">
                <template #icon><icon-eraser /></template>
                <template #default>关闭其他</template>
              </a-doption>
              <a-doption @click="navtabStore.closeAll">
                <template #icon><icon-minus /></template>
                <template #default>关闭全部</template>
              </a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts" name="NavTab">
import { watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavTabStore, useAppStore, useUserStore } from '@/store'
import qrcode from '@/assets/images/an_qr_code.png'
import { useFullScreen } from '@/hooks'
import { useI18n } from 'vue-i18n'
import $t from '@/i18n/use'
import { apiChangeLang } from '@/apis'
import qs from 'qs'
const { isFullScreen, onToggleFullScreen } = useFullScreen()
const route = useRoute()
const router = useRouter()
const navtabStore = useNavTabStore()
const appStore = useAppStore()
const userStore = useUserStore()
// 切换语言
const { t, locale } = useI18n()
const changeLang = (type: string) => {
  locale.value = type
  window.localStorage.setItem('lang', locale.value)
}
onMounted(() => {
  handleNavTab()
})

// 监听路由变化
watch(
  () => route.query,
  () => {
    handleNavTab()
  }
)

const handleNavTab = () => {
  // console.log('路由对象', route)
  navtabStore.addTagItem({
    name: route.meta.title || '未命名',
    path: route.path,
    componentName: route.name,
    query: qs.stringify(route.query)
  } as NavTabItem)
  if (route.meta.keepAlive) {
    navtabStore.addCacheItem(String(route.name))
  }
}
const delCatch = (route) => {
  navtabStore.tagList.forEach((item, index) => {
    if (route.name == item.componentName && item.query != qs.stringify(route.query)) {
      navtabStore.removeCacheItem(route.name)
    }
  })
}
router.beforeEach((to, from, next) => {
  delCatch(to)
  next()
})
// 点击页签
const onClick = (key: string | number) => {
  const index = navtabStore.tagList.findIndex((item) => item.path === String(key))
  console.log(navtabStore.tagList, 'navtabStore.tagList')
  router.push({ path: String(key), query: qs.parse(navtabStore.tagList[index].query) })
}
// 切换语言
const selecLang = async (item) => {
  appStore.setLanguage(item.cname)
  const res = await apiChangeLang({ lang: item.enLang })
  if (res.code === 0) {
    // router.go(0)
    userStore.setShowMain(false)
    nextTick(() => {
      userStore.setShowMain(true)
    })
  }
}
</script>

<style lang="scss" scoped>
:deep(.arco-tabs-tab) {
  // border-bottom-color: transparent !important;
  svg {
    width: 0;
    transition: width 0.15s;
  }
  &:hover {
    svg {
      width: 1em;
    }
  }
}

:deep(.arco-tabs-tab-active) {
  background-color: rgba(var(--primary-6), $alpha: 0.05);
  &:hover {
    background-color: rgba(var(--primary-6), $alpha: 0.05);
  }
  .arco-tabs-tab-close-btn {
    &:hover {
      &::before {
        background-color: rgba(var(--primary-6), $alpha: 0.1) !important;
      }
    }
  }
}

:deep(.arco-dropdown-option-icon) {
  color: var(--color-text-3);
}

.mr {
  margin-right: $margin;
}

.cou-width {
  min-width: 60px;
  text-align: center;
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
.system-head {
  color: var(--text-color-gray);
}
.gi_hover_btn {
  color: var(--text-color-gray);
}
.close-class {
  font-size: 18px;
}
.lang {
  font-size: 12px;
  color: var(--color-text-2);
  padding-right: 20px;
  position: relative;
  &::after {
    content: '';
    display: block;
    height: 20px;
    border-right: 1px solid var(--border-color-2);
    position: absolute;
    right: 0;
    top: 6px;
  }
  .btn {
    border-radius: 14px;
    display: inline-block;
    padding: 2px 16px 2px 16px;
    background: var(--color-bg-1);
    color: rgb(var(--primary-6));
    line-height: 18px;
    margin: 0 4px;
  }
}
.capt {
  text-transform: capitalize;
}
</style>
<style lang="scss">
.nav-tab {
  line-height: 44px;
  background: var(--bg-1);
  .arco-tabs-nav-type-card-gutter {
    .arco-tabs-tab:first-child {
      margin-left: 16px;
    }
    .arco-tabs-tab {
      background-color: var(--color-bg-1);
      padding: 7px 12px;
      line-height: 1;
      color: var(--color-text-4)
    }
    .arco-tabs-tab-active {
      background: var(--color-bg-1);
      color: var(--color-text-7);
      padding: 10px 24px;
      // border: 1px solid var(--border-color-1);
      border-bottom-color: var(--tab-bg-1);
      border-radius: 2px 2px 0px 0px;
      font-weight: bold;
      font-size: 16px;
      line-height: 1;
      font-weight: 400;
      &:hover {
        background: var(--color-bg-1);
        border-bottom-color: transparent;
        color: var(--color-text-7);
      }
    }
  }
  .arco-tabs-nav-tab {
    position: relative;
    top: 3px;
  }
  .arco-tabs-nav {
    &::before {
      display: none;
    }
  }
  .arco-tabs-tab {
    transition: none;
    border: transparent;
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    .arco-tabs-tab-close-btn {
      margin-left: 4px;
    }
    &:hover {
      background-color: var(--color-bg-1);
      .arco-tabs-tab-close-btn {
        margin-left: 8px;
      }
    }
  }
}
</style>
