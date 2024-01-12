<template>
  <a-layout class="layout">
    <Asider></Asider>
    <a-layout>
      <!-- <NavTab></NavTab> -->
      <Header v-if="!routeNameArr.includes(route.name) && !inquiryRouteNameArr.includes(route.name)"></Header>
      <productHeader v-if="routeNameArr.includes(route.name)"></productHeader>
      <inquiryHeader v-if="inquiryRouteNameArr.includes(route.name)"></inquiryHeader>
      <Main></Main>
    </a-layout>
    <!-- <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider theme="dark">Sider</a-layout-sider>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer> -->
    <allicon></allicon>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Asider from './components/Asider.vue'
import Header from './components/Header.vue'
import productHeader from './components/productHeader.vue'
import inquiryHeader from './components/inquiryHeader.vue'
import Main from './components/Main.vue'
import NavTab from './components/NavTab.vue'
import allicon from './components/all-icon.vue'
const route = useRoute()
const routeNameArr = [
  'productadd',
  'NewsDetail',
  'CaseDetail',
  'webcompanyintro',
  'webcompanymessage',
  'webcompanyfactory',
  'webcompanypolicy',
  'webcompanylanguage',
  'webcompanystatisticedit',
  'webcompanyquality',
  'webcompanycontact',
  'integrallist'
]
const inquiryRouteNameArr = ['inquiryDetail', 'inquiryReply']
watch(
  () => route.query,
  () => {},
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
