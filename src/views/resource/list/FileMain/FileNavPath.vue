<template>
  <div class="file-nav-path">
    <section class="path">
      <a-breadcrumb>
        <a-breadcrumb-item><span class="path-item">资源管理</span></a-breadcrumb-item>
        <a-breadcrumb-item><span class="path-item">文件</span></a-breadcrumb-item>
        <a-breadcrumb-item><span class="path-item">{{ prop.fileName }}</span></a-breadcrumb-item>
      </a-breadcrumb>
      <div class="nav-tips" v-if="prop.fileName=='文档'">建议上传PDF格式文档，每份文档不超过10M，您已上传了10个文档,使用了16%的100M空间</div>
      <div class="nav-tips" v-if="prop.fileName=='视频'">剩余上传视频数量：19</div>
      <div class="nav-tips" v-else>建议根据模板使用1:1或7:5 比例，600像素以上，JPEG、JPG格式，200K以下图片。</div>
      
    </section>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
const prop = defineProps(['fileName'])
const showInput = ref(false)
const InputRef = ref<HTMLInputElement | null>(null)

const onNavBar = () => {
  showInput.value = true
  nextTick(() => {
    InputRef.value?.focus()
  })
}

const onBlur = () => {
  showInput.value = false
}
</script>

<style lang="scss" scoped>
.file-nav-path {
  height: 44px;
  padding: 0 $padding;
  display: flex;
  align-items: center;
  // border-bottom: 1px dashed var(--color-border-3);
  :deep(.arco-input) {
    width: 100%;
  }
  .path {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius-small);
    cursor: pointer;
    justify-content: space-between;
    flex-wrap: wrap;
    // &:hover {
    //   background: var(--color-secondary-hover);
    // }
    .nav-tips {
      max-width: 70%;
      white-space: nowrap;
    }
    .path-item {
      transition: all 0.15s ease-in;
      &:hover {
        color: rgba(var(--primary-6));
        font-size: 1.1em;
        font-weight: bold;
      }
    }
  }
}
</style>
