<template>
  <div class="file-main">
    <!-- 面包屑导航 -->
    <FileNavPath :fileName="fileName"></FileNavPath>

    <a-row justify="space-between" class="row-operate" v-show="fileId == '1'">
      <!-- 左侧区域 -->
      <a-space>
        <a-button type="primary" shape="round" size="small">
          <template #icon><icon-upload /></template>
          <template #default>上传</template>
        </a-button>

        <a-input-group size="small">
          <a-input placeholder="请输入关键词..." allow-clear size="small"> </a-input>
          <a-button type="primary" size="small">
            <template #icon><icon-search /></template>
            <template #default>搜索</template>
          </a-button>
        </a-input-group>
        <p>图片数量：2121</p>
      </a-space>

      <!-- 右侧区域 -->
      <a-space>
        <a-button type="primary" status="warning" size="small">
          <template #icon>
            <icon-copy />
          </template>
        </a-button>
        <a-button type="primary" status="success" size="small">
          <template #icon>
            <icon-download />
          </template>
        </a-button>
        <a-button
          size="small"
          v-if="isBatchMode"
          :disabled="!fileStore.selectedFileIdList.length"
          type="primary"
          status="danger"
          @click="handleMulDelete"
          ><template #icon><icon-delete /></template
        ></a-button>
        <a-button type="primary" @click="isBatchMode = !isBatchMode"  size="small">
          <template #icon><icon-select-all /></template>
          <template #default>{{ isBatchMode ? '取消批量' : '批量操作' }}</template>
        </a-button>
        <a-button-group>
          <a-dropdown @select="handleSelect">
            <a-button  size="small">
              <template #icon>
                <icon-swap style="transform: rotate(90deg);"/>
              </template>
            </a-button>
            <template #content>
              <a-doption value="0" class="cus-select" :class="{'select': sortTag == '0'}">按照时间顺序 <icon-check /></a-doption>
              <a-doption value="1" class="cus-select" :class="{'select': sortTag == '1'}">按照时间倒序 <icon-check /></a-doption>
              <a-doption value="2" class="cus-select" :class="{'select': sortTag == '2'}">按照字母顺序 <icon-check /></a-doption>
            </template>
          </a-dropdown>
          <a-dropdown @select="handleSelect2">
            <a-button  size="small">
              <template #icon>
                <icon-filter />
              </template>
            </a-button>
            <template #content>
              <a-doption value="0" class="cus-select" :class="{'select': allTag == '0'}">全部 <icon-check /></a-doption>
              <a-doption value="1" class="cus-select" :class="{'select': allTag == '1'}">已引用 <icon-check /></a-doption>
              <a-doption value="2" class="cus-select" :class="{'select': allTag == '2'}">未引用 <icon-check /></a-doption>
            </template>
          </a-dropdown>
        </a-button-group>
      </a-space>
    </a-row>
    <a-row justify="space-between" class="row-operate" v-show="fileId == '2'">
      <!-- 左侧区域 -->
      <a-space>
        <a-button type="primary" shape="round" size="small">
          <template #icon><icon-upload /></template>
          <template #default>上传</template>
        </a-button>

        <a-input-group size="small">
          <a-input placeholder="请输入关键词..." allow-clear size="small"> </a-input>
          <a-button type="primary" size="small">
            <template #icon><icon-search /></template>
            <template #default>搜索</template>
          </a-button>
        </a-input-group>
        <p>视频数量：2121</p>
      </a-space>

      <!-- 右侧区域 -->
      <a-space>
        <a-button type="primary" status="warning" size="small">
          <template #icon>
            <icon-copy />
          </template>
        </a-button>
        <a-button type="primary" status="success" size="small">
          <template #icon>
            <icon-download />
          </template>
        </a-button>
        <a-button
          size="small"
          v-if="isBatchMode"
          :disabled="!fileStore.selectedFileIdList.length"
          type="primary"
          status="danger"
          @click="handleMulDelete"
          ><template #icon><icon-delete /></template
        ></a-button>
        <a-button type="primary" @click="isBatchMode = !isBatchMode"  size="small">
          <template #icon><icon-select-all /></template>
          <template #default>{{ isBatchMode ? '取消批量' : '批量操作' }}</template>
        </a-button>
        <a-button-group>
          <a-dropdown @select="handleSelect">
            <a-button  size="small">
              <template #icon>
                <icon-swap style="transform: rotate(90deg);"/>
              </template>
            </a-button>
            <template #content>
              <a-doption value="0" class="cus-select" :class="{'select': sortTag == '0'}">按照时间顺序 <icon-check /></a-doption>
              <a-doption value="1" class="cus-select" :class="{'select': sortTag == '1'}">按照时间倒序 <icon-check /></a-doption>
              <a-doption value="2" class="cus-select" :class="{'select': sortTag == '2'}">按照字母顺序 <icon-check /></a-doption>
            </template>
          </a-dropdown>
          <a-dropdown @select="handleSelect2">
            <a-button size="small">
              <template #icon>
                <icon-filter />
              </template>
            </a-button>
            <template #content>
              <a-doption value="0" class="cus-select" :class="{'select': allTag == '0'}">全部 <icon-check /></a-doption>
              <a-doption value="1" class="cus-select" :class="{'select': allTag == '1'}">已引用 <icon-check /></a-doption>
              <a-doption value="2" class="cus-select" :class="{'select': allTag == '2'}">未引用 <icon-check /></a-doption>
            </template>
          </a-dropdown>
        </a-button-group>
      </a-space>
    </a-row>
    <a-row justify="space-between" class="row-operate" v-show="fileId == '3'">
      <!-- 左侧区域 -->
      <a-space>
        <a-button type="primary" size="small" status="success">新增</a-button>
        <a-button type="text" status="danger" size="small">删除</a-button>
        <span>From:</span>
        <a-date-picker
          style="width: 140px"
          format="YYYY-MM-DD"
          @change="onChange"
          @select="onSelect"
          @ok="onOk"
        />
        <span>To:</span>
        <a-date-picker
          style="width: 140px"
          format="YYYY-MM-DD"
          @change="onChange"
          @select="onSelect"
          @ok="onOk"
        />
        </a-space>
      <!-- 右侧区域 -->
      <a-space>
        <a-input-group size="small">
          <a-input placeholder="请输入关键词..." allow-clear size="small"> </a-input>
          <a-button type="primary" size="small">
            <template #icon><icon-search /></template>
            <template #default>搜索</template>
          </a-button>
        </a-input-group>
      </a-space>
    </a-row>  
    <!-- 图片模式 -->
    <section class="file-wrap" v-loading="loading">
      <FileGrid
        v-show="fileList.length && fileId == '1'"
        :data="fileList"
        :isBatchMode="isBatchMode"
        :selectedFileIdList="fileStore.selectedFileIdList"
        @click="handleClickFile"
        @check="handleCheckFile"
      ></FileGrid>

      <!-- 视频模式 -->
      <FileVideo
        v-show="fileList.length && fileId == '2'"
        :data="fileList"
        :isBatchMode="isBatchMode"
        :selectedFileIdList="fileStore.selectedFileIdList"
        @click="handleClickFile"
        @check="handleCheckFile"
      ></FileVideo>

      <!-- 文件模式 -->
      <FileList
        v-show="fileList.length && fileId == '3'"
        :data="fileList"
        :isBatchMode="isBatchMode"
        @click="handleClickFile"
      ></FileList>

      <a-empty v-show="!fileList.length"></a-empty>
      <div class="page-box">
        <a-pagination
          @change="changeCurrent"
          @page-size-change="changePageSize"
          show-page-size
          :current="current"
          :total="total"
          :pageSize="pageSize"
          :showTotal="true"
          show-jumper
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { Message, Modal } from '@arco-design/web-vue'
import { fileTypeList, imageTypeList } from '@/libs/file/file-map'
import { useFileStore } from '@/store'
import { useWindowSize } from '@vueuse/core'
import { api as viewerApi } from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import FileNavPath from './FileNavPath.vue'
import FileGrid from './FileGrid.vue'
import FileList from './FileList.vue'
import FileVideo from './FileVideo.vue'
import ThePreviewVideo from '@/views/components/ThePreviewVideo/index'
import ThePreviewAudio from '@/views/components/ThePreviewAudio/index'
import TheFileRename from '@/views/components/TheFileRename/index'
import TheFileMove from '@/views/components/TheFileMove/index'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { getCateDetail } from '@/apis'
import type { FileItem } from '@/apis'
import { usePagination } from '@/hooks'
const route = useRoute()
const router = useRouter()

const { width: windowWidth } = useWindowSize()
const fileStore = useFileStore()
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const loading = ref(false)
// 文件列表数据
const fileinit = [
  {id: 1, name: 'test', src:'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360'},
  {id: 2, name: 'test3', src:'https://img2.baidu.com/it/u=304294273,3088990845&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'},
  {id: 3, name: 'test4', src:'https://img0.baidu.com/it/u=3745738950,3664021749&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'},
]
const fileList = ref<FileItem[]>(fileinit)
const firstType = fileTypeList[0]?.value
const fileType = ref(firstType)
fileType.value = route.query.fileType?.toString() || firstType
const fileName = computed(() => {
  const citem = fileTypeList.filter((item) => {
    return item.value == fileType.value
  })
  return citem[0]?.name
})
const fileId = computed(() => {
  const citem = fileTypeList.filter((item) => {
    return item.value == fileType.value
  })
  return citem[0]?.value
})
watch(fileType, () => {
  fileStore.clearFileItem()
})
const getListData = async () => {
  try {
    loading.value = true
    isBatchMode.value = false
    const res = await getFileList({ fileType: fileType.value })
    fileList.value = res.data.list
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getListData()
})

onBeforeRouteUpdate((to) => {
  if (!to.query.fileType) return
  fileType.value = to.query.fileType?.toString()
  getListData()
})

// 批量操作
const isBatchMode = ref(false)

// 点击文件
const handleClickFile = (item: FileItem) => {
  // Message.success(`点击了文件-${item.name}`)
  if (imageTypeList.includes(item.extendName)) {
    if (item.src) {
      const imgList: string[] = fileList.value
        .filter((i) => imageTypeList.includes(i.extendName))
        .map((a) => a.src || '')
      const index = imgList.findIndex((i) => i === item.src)
      if (imgList.length) {
        viewerApi({
          options: {
            initialViewIndex: index
          },
          images: imgList
        })
      }
    }
  }
  if (item.extendName === 'mp4') {
    ThePreviewVideo(item)
  }
  if (item.extendName === 'mp3') {
    ThePreviewAudio(item)
  }
}

// 勾选文件
const handleCheckFile = (item: FileItem) => {
  fileStore.addSelectedFileItem(item)
}
// 鼠标右键
const handleRightMenuClick = (mode: string, fileInfo: FileItem) => {
  Message.success('点击了' + mode)
  if (mode === 'delete') {
    Modal.warning({
      title: '提示',
      content: '是否删除该文件？',
      hideCancel: false
    })
  }
  if (mode === 'rename') {
    TheFileRename(fileInfo)
  }
  if (mode === 'move') {
    TheFileMove(fileInfo)
  }
  if (mode === 'detail') {
    router.push({ path: '/file/detail' })
  }
}

// 批量删除
const handleMulDelete = () => {
  Modal.warning({
    title: '提示',
    content: '是否确认删除？',
    hideCancel: false
  })
}
// 选择
const handleSelect = (val: string) => {
  sortTag.value = val
}
const sortTag = ref('0')
const allTag = ref('0')
const handleSelect2 = (val: string) => {
  allTag.value = val
}
</script>

<style lang="scss" scoped>
.file-main {
  flex: 1;
  background: var(--color-bg-1);
  margin: $margin;
  border-radius: $radius-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .row-operate {
    border-bottom: 1px dashed var(--color-border-3);
    margin: 0 $padding;
    padding-bottom: 12px;
    > * {
      margin-top: 12px;
    }
  }
  .file-wrap {
    flex: 1;
    padding: 0 $padding $padding;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .page-box {
    display: flex;
    justify-content: end;
    margin-top: 15px;
  }
}

</style>
<style lang="scss">
.cus-select.arco-dropdown-option.select {
  color: rgb(var(--primary-6));
  svg {
    opacity: 1;
  }
}
.cus-select.arco-dropdown-option {
  svg {
    opacity: 0;
  }
}
</style>
