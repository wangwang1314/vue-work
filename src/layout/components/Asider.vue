<template>
  <a-layout-sider :collapsed="appStore.menuCollapse" breakpoint="xl" :width="232" class="asider">
   
    <a-menu
      :selected-keys="[activeKey]"
      :default-open-keys="['Workplace']"
      :auto-open-selected="true"
      :style="{ width: '100%', height: '100%' }"
    >
      <div class="logo-box">
        <img @click="toHome" src="@/assets/images/logo.png" />
        <span>ECWEB</span>
      </div>
      <LoopMenuItem
        v-for="item in menuStore.menuTree"
        :key="item.name"
        :data="item"
        @click="handleClickItem"
      ></LoopMenuItem>
    </a-menu>
    <!-- <div class="copyright" style="text-align:center;font-size: 12px;margin-top:-42px;position:relative">@2023 北京宜选科技股份公司<br>京公网安备110105010289号 <br>京ICP备09074326号-6</div> -->
  </a-layout-sider>
</template>

<script setup lang="ts" name="Asider">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoopMenuItem from './MenuItem.vue'
import { useMenuStore, useAppStore } from '@/store'
const route = useRoute()
const router = useRouter()

const menuStore = useMenuStore()
const appStore = useAppStore()
const getMenuKeys = (params: MenuItem[]) => {
  const data: string[] = []
  function forTree(arr: MenuItem[]) {
    arr.forEach((item: MenuItem) => {
      if (item.path) {
        data.push(item.path)
      }
      if (item.children?.length) {
        forTree(item.children)
      }
    })
  }
  forTree(params)
  return data
}

const activeKey = ref('Workplace')
const menuKeyList = getMenuKeys(menuStore.menuTree)

watch(
  () => route.path,
  () => {
    if (menuKeyList.includes(route.path)) {
      activeKey.value = route.path
    }
  },
  { immediate: true }
)

const handleClickItem = (item: MenuItem) => {
  if (!item.path) return
  if (item.link) {
    window.open(item.link, '_blank')
    return
  }
  if (item.path === '/file') {
    router.push({ path: item.path, query: { fileType: 0 } })
  } else {
    router.push({ path: item.path })
  }
  if (menuKeyList.includes(item.path)) {
    activeKey.value = item.path
  }
}
</script>

<style lang="scss" scoped>
:deep(.arco-menu-pop ~ .copyright) {
  display: none;
}
:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
  // Menu菜单组件修改
  .arco-menu-icon {
    margin-right: 0;
    padding: 10px 0;
  }
  .arco-menu-has-icon {
    padding: 0;
    justify-content: center;
  }
  .arco-menu-title {
    display: none;
  }
}

.asider {
  z-index: 1000;
  :deep(.arco-menu-title) {
    text-transform: capitalize;
  }
  :deep(.arco-menu-light) {
    background: var(--slider-left);
  }
  :deep(.arco-menu-inner::-webkit-scrollbar-thumb) {
    background:rgba(255,255,255,0.16);
  }
  .logo-box {
    display: flex;
    padding: 20px 0 20px 30px;
    align-items: center;
    img {
      height: 40px;
      width: 40px;
      border-radius: 4px;
      object-fit: contain;
      margin-right: 10px;
    }
  }
}
</style>
