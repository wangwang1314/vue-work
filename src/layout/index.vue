<template>
  <a-layout class="layout">
    <Asider></Asider>
    <a-layout>
      <!-- <NavTab></NavTab> -->
      <Header v-if="!routeNameArr.includes(route.name)"></Header>
      <productHeader v-if="route.name === 'productadd'"></productHeader>
      <Main></Main>
    </a-layout>
    <!-- <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider theme="dark">Sider</a-layout-sider>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer> -->
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Asider from './components/Asider.vue'
import Header from './components/Header.vue'
import productHeader from './components/productHeader.vue'
import Main from './components/Main.vue'
import NavTab from './components/NavTab.vue'
const route = useRoute()
const routeNameArr = ['productadd']
const routename = ref()
watch(
  () => route.query,
  () => {
    routename.value = route.name
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  // flex-direction: row;
}
.sub-layout {
  height: calc(100% - 64px);
}
</style>
