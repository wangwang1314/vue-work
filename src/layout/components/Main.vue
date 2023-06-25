<template>
  <a-layout class="main">
    <router-view>
      <template #default="{ Component, route }">
        <transition :name="appStore.transitionName" mode="out-in" appear>
          <keep-alive :include="navtabStore.cacheList">
            <component :is="Component" :key="route.path" v-if="userStore.userInfo.showMain" />
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </a-layout>
</template>

<script setup lang="ts" name="Main">
import { useNavTabStore, useAppStore, useUserStore } from '@/store'
const navtabStore = useNavTabStore()
const appStore = useAppStore()
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
</style>
