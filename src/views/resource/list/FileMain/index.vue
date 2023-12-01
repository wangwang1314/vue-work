<template>
  <div class="file-main">
    <!-- 面包屑导航 -->
    <FileNavPath :fileName="fileName"></FileNavPath>

    <a-row justify="space-between" class="row-operate" v-show="fileId == 0 || fileId == 1">
      <!-- 左侧区域 -->
      <a-space>
        <a-upload
          :show-retry-button="false"
          list-type="picture-card"
          :action="baseURL + '?r=picture/upload'"
          multiple
          :with-credentials="true"
          :show-file-list="false"
          ref="uploadRef1"
          :data="{ type: '4' }"
          @success="getTableData"
          v-if="fileId == 0"
        >
          <template #upload-button>
            <a-button type="primary" shape="round" size="small">
              <template #icon><icon-upload /></template>
              <template #default>上传</template>
            </a-button>
          </template>
        </a-upload>
        <a-button type="primary" shape="round" size="small" @click="showVideoDialog" v-else>
          <template #icon><icon-upload /></template>
          <template #default>上传</template>
        </a-button>
        <a-input-group size="small">
          <a-input v-model="picForm.picture_name" placeholder="请输入关键词..." allow-clear size="small"> </a-input>
          <a-button type="primary" size="small" @click="getTableData">
            <template #icon><icon-search /></template>
            <template #default>搜索</template>
          </a-button>
        </a-input-group>
        <p v-if="fileId == 0">图片数量：{{ total }}</p>
        <p v-else>视频数量：{{ total }}</p>
      </a-space>

      <!-- 右侧区域 -->
      <a-space>
        <a-button type="primary" status="warning" size="small" @click="changeGroupFn">
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
          <a-dropdown @select="handleSelect" v-if="fileId == 0">
            <a-button  size="small">
              <template #icon>
                <icon-swap style="transform: rotate(90deg);"/>
              </template>
            </a-button>
            <template #content>
              <a-doption value="addtime asc" class="cus-select" :class="{'select': picForm.order == 'addtime asc'}">按照时间顺序 <icon-check /></a-doption>
              <a-doption value="addtime desc" class="cus-select" :class="{'select': picForm.order == 'addtime desc'}">按照时间倒序 <icon-check /></a-doption>
              <a-doption value="picname asc" class="cus-select" :class="{'select': picForm.order == 'picname asc'}">按照字母顺序 <icon-check /></a-doption>
            </template>
          </a-dropdown>
          <a-dropdown @select="handleSelect3" v-else>
            <a-button  size="small">
              <template #icon>
                <icon-swap style="transform: rotate(90deg);"/>
              </template>
            </a-button>
            <template #content>
              <a-doption value="add_time asc" class="cus-select" :class="{'select': picForm.order2 == 'add_time asc'}">按照时间顺序 <icon-check /></a-doption>
              <a-doption value="add_time desc" class="cus-select" :class="{'select': picForm.order2 == 'add_time desc'}">按照时间倒序 <icon-check /></a-doption>
              <a-doption value="title asc" class="cus-select" :class="{'select': picForm.order2 == 'title asc'}">按照字母顺序 <icon-check /></a-doption>
            </template>
          </a-dropdown>
          <a-dropdown @select="handleSelect2">
            <a-button  size="small">
              <template #icon>
                <icon-filter />
              </template>
            </a-button>
            <template #content>
              <a-doption value="-1" class="cus-select" :class="{'select': picForm.status == '-1'}">全部 <icon-check /></a-doption>
              <a-doption value="1" class="cus-select" :class="{'select': picForm.status == '1'}">已引用 <icon-check /></a-doption>
              <a-doption value="0" class="cus-select" :class="{'select': picForm.status == '0'}">未引用 <icon-check /></a-doption>
            </template>
          </a-dropdown>
        </a-button-group>
      </a-space>
    </a-row>
    <a-row justify="space-between" class="row-operate" v-show="fileId == 2">
      <!-- 左侧区域 -->
      <a-space>
        <a-upload
          :show-retry-button="false"
          list-type="picture-card"
          :action="baseURL + '?r=document/upload'"
          accept="*"
          multiple
          :with-credentials="true"
          :show-file-list="false"
          ref="uploadRef1"
          :data="{ type: '4' }"
          @success="getTableData"
        >
          <template #upload-button>
            <a-button type="primary" size="small" status="success">新增</a-button>
          </template>
        </a-upload>
        
        <a-button type="text" status="danger" size="small" @click="banchDocument">删除</a-button>
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
        v-if="fileList.length && fileId == 0"
        :data="fileList"
        :isBatchMode="isBatchMode"
        :selectedFileIdList="fileStore.selectedFileIdList"
        @click="handleClickFile"
        @check="handleCheckFile"
        @update="getTableData"
      ></FileGrid>

      <!-- 视频模式 -->
      <FileVideo
        v-if="fileList.length && fileId == 1"
        :data="fileList"
        :isBatchMode="isBatchMode"
        :selectedFileIdList="fileStore.selectedFileIdList"
        @click="handleClickFile"
        @check="handleCheckFile"
        @update="getTableData"
      ></FileVideo>

      <!-- 文件模式 -->
      <FileList
        v-if="fileList.length && fileId == 2"
        :data="fileList"
        :isBatchMode="isBatchMode"
        @click="handleClickFile"
        @update="getTableData"
        @selectchange="selectchange"
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

    <!-- 分组弹框 -->
    <a-modal v-model:visible="visible" :mask-closable="false" :width="600" title="调整图片分组">
      <template #footer>
        <a-button @click="visible=false">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确认</a-button>
      </template>
      <div class="g-box">
        <a-radio-group direction="vertical">
          <a-radio value="A">Brine Tank/Brine Valve/Chemical Tank</a-radio>
          <a-radio value="B">Distributors/Manual Heads</a-radio>
          <a-radio value="C">Water Softener</a-radio>
          <a-radio value="D">RO Membranes for Industrial and Residential</a-radio>
        </a-radio-group>
      </div>
    </a-modal>

    <!-- 视频上传弹框 -->
    <a-modal v-model:visible="videoDialog" :mask-closable="false" :width="600" title="上传视频">
      <template #footer>
        <span></span>
      </template>
      <a-upload draggable
      :action="baseURL + '?r=video/upload'" 
      @success="videosuccess"
      :show-retry-button="false"
      accept="*"
      multiple
      :with-credentials="true"
      :show-file-list="false"
      >
        <template #upload-button>
          <div class="arco-upload-drag">
            <div><Icon-plus></Icon-plus></div>
            <div class="arco-upload-drag-text" style="margin-top: -10px">
              点击或拖拽文件到此处上传
            </div>
            <div
              class="arco-upload-drag-text"
              style="padding: 0 16px; margin-top: 6px; color: var(--color-text-6); font-size: 12px"
            >
            请上传时长不超过15分钟的视频文件，大小不超过500M

            视频推荐格式.mp4，支持格式.mov .mpeg4 .wmv .mpegps

            视频尺寸建议为16:9，例如640x360像素、853x480像素、1138x640像素、1280x720像素

            用于公司介绍、实力介绍、新闻案例和产品详细描述的视频建议时长在3分钟以内

            用于产品头图位置的产品简介视频建议时长在30秒以内

            不能上传与YouTube视频重复的视频，否则YouTube账号会被终止，不可恢复

            您当前为独立授权客户，每24小时内有上传视频的额度限制（一般为4个）
            </div>
          </div>
        </template>
      </a-upload>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from 'vue'
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
import { proPicList, proMultiDel, provideList, profileList, proVideoDel, proDocumentDel } from '@/apis'
import type { FileItem } from '@/apis'
import { usePagination } from '@/hooks'
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const route = useRoute()
const router = useRouter()

const { width: windowWidth } = useWindowSize()
const fileStore = useFileStore()
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const loading = ref(false)
const picForm = reactive({
  picture_name: '',
  status: '-1', // 0未引用，1已用，-1全部状态
  order: 'addtime desc',
  // addtime asc 按时间顺序
  // addtime desc 按时间倒序
  // picname asc 按字母顺序
  // picname desc 按字母倒序
  order2: 'add_time desc'
// add_time asc 按时间顺序
// add_time desc 按时间倒序
// title asc 按字母顺序
// title desc按字母顺序
})
// 文件列表数据
const fileList = ref<FileItem[]>([])
const firstType = fileTypeList[0]?.value
const fileType = ref(firstType)
fileType.value = route.query.fileType || firstType
const groupId = ref(route.query.groupId || '0')
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

watch(
  () => route.query,
  () => {
    if (route.query.fileType) {
      fileType.value = route.query.fileType
      groupId.value = route.query.groupId || '0'
      fileStore.clearFileItem()
      current.value = 1
      total.value = 0
      picForm.picture_name = ''
      getTableData()
    }
  }
)
const getTableData = async () => {
  loading.value = true
  isBatchMode.value = false
  if (fileType.value == 0) {
    const res = await proPicList({
      page_no: current.value,
      page_size: pageSize.value,
      group_id: groupId.value,
      ...picForm
    }).finally(() => {
      loading.value = false
    })
    if (res.code == 0) {
      fileList.value = res.data.list || []
      total.value = res.data && res.data.total_records
      const arrlist = res.data.group_list || []
      arrlist.unshift({
        id: '0',
        name: '未分组'
      })
      fileStore.setGrouplist(fileType.value, arrlist)
    }
  } else if (fileType.value == 1) {
    const res = await provideList({
      page_no: current.value,
      page_size: pageSize.value,
      group_id: (groupId.value!=0)?groupId.value:'-1',
      video_title: picForm.picture_name,
      status: picForm.status,
      order: picForm.order2
    }).finally(() => {
      loading.value = false
    })
    if (res.code == 0) {
      fileList.value = res.data.list || []
      total.value = res.data && res.data.total_records
      const arrlist = res.data.group || []
      arrlist.unshift({
        id: '0',
        name: '未分组'
      })
      fileStore.setGrouplist(fileType.value, arrlist)
    }
  }else if (fileType.value == 2) {
    const res = await profileList({
      page_no: current.value,
      page_size: pageSize.value,
      group_id: (groupId.value!=0)?groupId.value:'-1',
      video_title: picForm.picture_name,
      status: picForm.status,
      order: picForm.order2
    }).finally(() => {
      loading.value = false
    })
    if (res.code == 0) {
      fileList.value = res.data.list || []
      total.value = res.data && res.data.total_records
    }
  }
}
onMounted(() => {
  getTableData()
})

// onBeforeRouteUpdate((to) => {
//   if (!to.query.fileType) return
//   fileType.value = to.query.fileType?.toString()
//   getTableData()
// })

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
  if (fileId.value == 0) {
    if (!fileStore.selectedFileIdList.length) {
      return Message.success('请选择要删除的图片！')
    }
    Modal.warning({
      title: '提示',
      content: '您确定要删除所选的图片吗？',
      hideCancel: false,
      onOk: async() => {
        const res = await proMultiDel({ids: fileStore.selectedFileIdList})
        if (res.code == 0) {
          getTableData()
        }
      }
    })
  } else if (fileId.value == 1) {
    if (!fileStore.selectedFileIdList.length) {
      return Message.success('请选择要删除的视频！')
    }
    Modal.warning({
      title: '提示',
      content: '请选择要删除的视频！',
      hideCancel: false,
      onOk: async() => {
        const res = await proVideoDel({ids: fileStore.selectedFileIdList})
        if (res.code == 0) {
          getTableData()
        }
      }
    })
  }
 
}
const selectfile = ref([])
const selectchange = (list) => {
  selectfile.value = list
}
// 批量删除文档
const banchDocument = () => {
  if (!selectfile.value.length) {
    return Message.success('请选择要删除的文档')
  }
  Modal.warning({
    title: '提示',
    content: '删除文档后，插入文档超链接处不能再选择此文档，确认删除吗？',
    hideCancel: false,
    onOk: async() => {
      const res = await proDocumentDel({ids: selectfile.value})
      if (res.code == 0) {
        getTableData()
      }
    }
  })
}
// 选择
const handleSelect = (val: string) => {
  picForm.order = val
  getTableData()
}
const handleSelect3 = (val: string) => {
  picForm.order2 = val
  getTableData()
}
const sortTag = ref('0')
const allTag = ref('0')
const handleSelect2 = (val: string) => {
  picForm.status = val
  getTableData()
}
const changeGroupFn = () => {
  visible.value = true
}
const visible = ref(false)
const handleBeforeOk = () => {

}
const videoDialog = ref(false)
const showVideoDialog = () => {
  videoDialog.value = true
}
const videosuccess = () => {
  videoDialog.value = false
  getTableData()
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
.g-box {
  max-height: 320px;
  overflow-y: auto;
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
