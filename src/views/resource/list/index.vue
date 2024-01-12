<template>
  <div class="file-manage">
    <FileAside @change="changeFn"></FileAside>
    <FileMain ref="filemain"></FileMain>
  </div>
</template>

<script setup lang="ts" name="Resource">
import FileAside from './FileAside.vue'
import FileMain from './FileMain/index.vue'
import { ref, onMounted, computed, watch, reactive } from 'vue'
const filemain = ref()
const changeFn = () => {
  filemain.value?.getTableData()
}
</script>

<style lang="scss" scoped>
.file-manage {
  flex: 1;
  overflow: hidden;
  display: flex;
}
</style>
