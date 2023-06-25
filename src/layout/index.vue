<template>
  <a-layout class="layout">
    <Header></Header>
    <a-layout class="sub-layout">
      <Asider></Asider>
      <a-layout>
        <NavTab></NavTab>
        <Main></Main>
      </a-layout>
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
import Asider from './components/Asider.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import NavTab from './components/NavTab.vue'
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
