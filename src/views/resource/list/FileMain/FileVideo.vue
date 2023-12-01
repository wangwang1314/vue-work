<template>
  <ul class="file-grid">
    <a-trigger
      v-for="item in data"
      :key="item.id"
      trigger="contextMenu"
      align-point
      animation-name="slide-dynamic-origin"
      auto-fit-transform-origin
      position="bl"
      update-at-scroll
    >
      <li class="file-grid-item" @click.stop="handleCheckFile(item)">
        <div class="file-image">
          <GiSvgIcon size="100%" name="file-video"></GiSvgIcon>
        </div>
        <div class="file-name">{{ item.title }}</div>

        <!-- 勾选模式 -->
        <section
          class="check-mode"
          :class="{ checked: props.selectedFileIdList.includes(item.id) }"
        >
          <a-checkbox
            class="checkbox"
            :model-value="props.selectedFileIdList.includes(item.id)"
            @change="handleCheckFile(item)"
            @click.stop
          ></a-checkbox>
          <div class="single-mode">
            <a-space :size="6">
              <icon-delete @click.stop="deletefn(item)" :size="18" style="color:rgb(var(--danger-6));"/>
              <icon-info-circle @click.stop="showDetail(item)" :size="18"/>
            </a-space>
          </div>
        </section>
        <!-- 单个操作 -->
        
      </li>
      <template #content>
        <!-- <FileRightMenu :file-info="item" @click="handleRightMenuItemClick($event, item)"></FileRightMenu> -->
      </template>
    </a-trigger>
    <video-detail ref="videodetailref"></video-detail>
  </ul>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import FileRightMenu from './FileRightMenu.vue'
import type { FileItem } from '@/apis'
import { Message, Modal } from '@arco-design/web-vue'
import videoDetail from '@/components/commonDialog/videoDetail.vue'
import { proVideoDel } from '@/apis'
interface Props {
  data?: FileItem[]
  selectedFileIdList?: string[]
  isBatchMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [], // 文件数据
  selectedFileIdList: () => [], // 批量模式下选中的文件id数组
  isBatchMode: false // 是否是批量模式
})

const emit = defineEmits(['click', 'check', 'right-menu-click', 'update'])

// 文件名称带后缀
const getFileName = (item: FileItem) => {
  return `${item.name}`
}

// 点击事件
const handleClickFile = (item: FileItem) => {
  emit('click', item)
}

// 选中事件
const handleCheckFile = (item: FileItem) => {
  emit('check', item)
}

// 右键菜单点击事件
const handleRightMenuItemClick = (mode: string, item: FileItem) => {
  emit('right-menu-click', mode, item)
}

// 点击事件
const deletefn = (item: FileItem) => {
  let tips = '您确定要删除所选的视频吗？'
  if (item.isused > 0) {
    tips = '包含正在被使用的视频，删除后相关的引用都将被清除。确定要删除吗？'
  }
  Modal.warning({
    title: '提示',
    content: tips,
    hideCancel: false,
    onClose: function () {
      // console.log('关闭')
    },
    onOk: async () => {
      // console.log('确定')
      const res = await proVideoDel({ids: [item.id]})
      if (res.code == 0) {
        emit('update')
      }
    }
  })
}
const videodetailref = ref()
const showDetail = (item: FileItem) => {
  videodetailref.value.showDialog(item)
}
</script>

<style lang="scss" scoped>
.file-grid {
  flex: 1;
  margin-top: 12px;
  overflow: scroll;
  background: var(--color-bg-2);
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.file-grid-item {
  width: 120px;
  height: 120px;
  // background: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:hover {
    background: var(--color-primary-light-1);
    .check-mode {
      display: block;
    }
  }
  &:active {
    svg,
    img {
      transform: scale(0.9);
    }
  }
  .file-image {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin-top: 20px;
    .img {
      width: auto;
      max-width: 100%;
      height: 100%;
      transition: all 0.3s;
      object-fit: contain;
    }
    .svg-img {
      height: 100%;
      transition: all 0.3s;
    }
  }
  .file-name {
    height: 2em;
    font-size: 12px;
    margin-top: 6px;
    padding: 0 5px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    padding: 0 6px;
    box-sizing: border-box;
  }
  .check-mode {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 9;
    display: none;
    .single-mode {
      position: absolute;
      top: 5px;
      right: 5px;
      padding-left: 0;
    }
    &.checked {
     
      display: block;
    }
    .checkbox {
      position: absolute;
      top: 5px;
      left: 5px;
      padding-left: 0;
    }
  }
}

</style>
