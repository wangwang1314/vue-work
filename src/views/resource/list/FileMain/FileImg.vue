<template>
  <div>
    <img class="img" :src="props.data.picture_url_d || ''" />
    <img class="img-icon" v-if="props.data.isused>0" src="@/assets/images/right-icon2.png" alt="">
  </div>
 
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { fileExtendNameIconMap, imageTypeList } from '@/libs/file/file-map'
import type { FileItem } from '@/apis'

interface Props {
  data?: FileItem
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    id: '',
    type: '',
    name: '',
    extendName: '',
    src: '',
    updateTime: '',
    isDir: false,
    filePath: ''
  }) // 文件数据
})

// 是否是图片类型文件
const isImg = computed<boolean>(() => {
  return true
})

// 获取文件图标，如果是图片这显示图片
// const getFileImg = computed<string>(() => {
//   if (props.data.isDir) {
//     return fileExtendNameIconMap['dir'] || ''
//   } else if (imageTypeList.includes(props.data.extendName.toLowerCase())) {
//     return props.data.src || ''
//   } else if (!Object.keys(fileExtendNameIconMap).includes(props.data.extendName.toLowerCase())) {
//     return fileExtendNameIconMap['other'] || ''
//   } else {
//     return fileExtendNameIconMap[props.data.extendName.toLowerCase()] || ''
//   }
// })
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
