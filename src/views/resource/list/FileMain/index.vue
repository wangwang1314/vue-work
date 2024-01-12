<template>
  <div class="file-main">
    <!-- 面包屑导航 -->
    <!-- <FileNavPath :fileName="fileName"></FileNavPath> -->

    <a-row justify="space-between" class="row-operate" v-show="fileId == 0 || fileId == 1">
      <!-- 左侧区域 -->
      <a-space>
        <a-button type="primary" shape="round" size="small" v-if="fileId == 0" @click="showPicupload">
          <template #icon><icon-upload /></template>
          <template #default>上传</template>
        </a-button>
        <a-button type="primary" shape="round" size="small" @click="showVideoDialog" v-else>
          <template #icon><icon-upload /></template>
          <template #default>上传</template>
        </a-button>
        <a-input-group size="small">
          <a-select size="small" v-model="picForm.status" :style="{ width: '160px' }" placeholder="请选择">
            <a-option value="-1" class="cus-select">全部 </a-option>
            <a-option value="1" class="cus-select">已引用</a-option>
            <a-option value="0" class="cus-select">未引用</a-option>
          </a-select>

          <a-input
            v-model="picForm.picture_name"
            :placeholder="fileId == 0 ? '请输入图片名称' : '请输入视频名称'"
            allow-clear
            size="small"
          >
          </a-input>
          <a-button type="primary" size="small" @click="getTableData">
            <template #icon><icon-search /></template>
            <template #default>搜索</template>
          </a-button>
        </a-input-group>
      </a-space>

      <!-- 右侧区域 -->
      <a-space>
        <a-button type="primary" v-if="isBatchMode" status="warning" size="small" @click="changeGroupFn">
          <template #icon>
            <icon-copy />
          </template>
        </a-button>
        <a-button type="primary" status="success" size="small" v-if="isBatchMode" @click="downloadFn">
          <template #icon>
            <icon-download />
          </template>
        </a-button>
        <a-button size="small" v-if="isBatchMode" type="primary" status="danger" @click="handleMulDelete"
          ><template #icon><icon-delete /></template
        ></a-button>
        <a-button type="primary" @click="isBatchMode = !isBatchMode" size="small">
          <template #icon><icon-select-all /></template>
          <template #default>{{ isBatchMode ? '取消批量' : '批量操作' }}</template>
        </a-button>
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
          @success="filesuccess"
        >
          <template #upload-button>
            <a-button type="primary" shape="round" size="small">
              <template #icon><icon-upload /></template>
              <template #default>上传</template>
            </a-button>
          </template>
        </a-upload>
        <a-button type="primary" status="success" size="small" @click="downloadFn">
          <template #icon>
            <icon-download />
          </template>
        </a-button>
        <a-button size="small" type="primary" status="danger" @click="banchDocument"
          ><template #icon><icon-delete /></template
        ></a-button>
        <span>From:</span>
        <a-date-picker style="width: 140px" format="YYYY-MM-DD" v-model="documentform.begin_time" />
        <span>To:</span>
        <a-date-picker style="width: 140px" format="YYYY-MM-DD" v-model="documentform.end_time" />
      </a-space>
      <!-- 右侧区域 -->
      <a-space>
        <a-input-group size="small">
          <a-input placeholder="请输入关键词..." allow-clear size="small" v-model="documentform.document_name">
          </a-input>
          <a-button type="primary" size="small" @click="getTableData">
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
    <a-modal
      v-model:visible="visible"
      :mask-closable="false"
      :width="600"
      :title="'调整' + (fileType == 1 ? '视频' : '图片') + '分组'"
    >
      <template #footer>
        <a-button @click="visible = false">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确认</a-button>
      </template>
      <div class="g-box">
        <a-radio-group direction="vertical" v-model="groupkey">
          <a-radio v-for="(item, index) in grouplist" :key="index" :value="item.id">{{ item.name }}</a-radio>
        </a-radio-group>
      </div>
    </a-modal>

   
    <!-- 图片上传组件 -->
    <uploadimg ref="uploadimgref" @change="uploadimgsuccess"></uploadimg>
    <!-- 视频上传组件 -->
    <uploadvideo ref="uploadvideoref" :grouplist="grouplist" @change="uploadvidesuccess"></uploadvideo>
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
import uploadimg from '../mod/uploadimg.vue'
import uploadvideo from '../mod/uploadvideo.vue'
import {
  proPicList,
  proMultiDel,
  provideList,
  profileList,
  proVideoDel,
  proDocumentDel,
  proPicArchive,
  proPicDownload,
  provideoarchive,
  prodocumentarchive,
  proAdjustGroup,
  provideoadjustgroup
} from '@/apis'
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
const documentform = reactive({
  category_id: '',
  begin_time: '',
  end_time: '',
  document_name: ''
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
watch(
  () => route.query.fileType,
  () => {
    isBatchMode.value = false
  }
)
const grouplist = ref([])
const groupkey = ref('')
const getTableData = async () => {
  loading.value = true
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
      grouplist.value = JSON.parse(JSON.stringify(res.data.group_list))
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
      group_id: groupId.value != 0 ? groupId.value : '-1',
      video_title: picForm.picture_name,
      status: picForm.status,
      order: picForm.order2
    }).finally(() => {
      loading.value = false
    })
    if (res.code == 0) {
      fileList.value = res.data.list || []
      total.value = res.data && res.data.total_records
      grouplist.value = JSON.parse(JSON.stringify(res.data.group))
      const arrlist = res.data.group || []
      arrlist.unshift({
        id: '0',
        name: '未分组'
      })
      fileStore.setGrouplist(fileType.value, arrlist)
    }
  } else if (fileType.value == 2) {
    const res = await profileList({
      page_no: current.value,
      page_size: pageSize.value,
      begin_time: documentform.begin_time?documentform.begin_time+' 00:00:00':documentform.begin_time,
      end_time: documentform.end_time?documentform.end_time+' 23:59:59':documentform.end_time,
      document_name: documentform.document_name
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

// 批量删除
const handleMulDelete = () => {
  if (fileId.value == 0) {
    if (!fileStore.selectedFileIdList.length) {
      return Message.warning('请选择要删除的图片！')
    }
    Modal.warning({
      title: '提示',
      content: '您确定要删除所选的图片吗？',
      hideCancel: false,
      onOk: async () => {
        loading.value = true
        const res = await proMultiDel({ ids: fileStore.selectedFileIdList }).finally(() => {
          loading.value = false
        })
        if (res.code == 0) {
          fileStore.clearFileItem()
          getTableData()
        }
      }
    })
  } else if (fileId.value == 1) {
    if (!fileStore.selectedFileIdList.length) {
      return Message.warning('请选择要删除的视频！')
    }
    Modal.warning({
      title: '提示',
      content: '请选择要删除的视频！',
      hideCancel: false,
      onOk: async () => {
        loading.value = true
        const res = await proVideoDel({ ids: fileStore.selectedFileIdList }).finally(() => {
          loading.value = false
        })
        if (res.code == 0) {
          getTableData()
        }
      }
    })
  }
}
const selectchange = (list) => {
  fileStore.clearFileItem()
  const newlist = list.map((item) => ({ id: item }))
  fileStore.addSelectedFilelist(newlist)
}
// 批量删除文档
const banchDocument = () => {
  if (!fileStore.selectedFileIdList.length) {
    return Message.warning('请选择要删除的文档')
  }
  Modal.warning({
    title: '提示',
    content: '删除文档后，插入文档超链接处不能再选择此文档，确认删除吗？',
    hideCancel: false,
    onOk: async () => {
      const res = await proDocumentDel({ ids: fileStore.selectedFileIdList })
      if (res.code == 0) {
        getTableData()
      }
    }
  })
}

const changeGroupFn = () => {
  if (fileId.value == 0) {
    if (!fileStore.selectedFileIdList.length) {
      return Message.warning('请选择图片后再调整图片分组！！')
    }
  } else if (fileId.value == 1) {
    if (!fileStore.selectedFileIdList.length) {
      return Message.warning('请选择视频后再调整视频分组！！')
    }
  }
  visible.value = true
  groupkey.value = ''
}
const visible = ref(false)
const handleBeforeOk = async () => {
  if (!groupkey.value) {
    return Message.warning('请选择分类')
  }
  if (fileId.value == 0) {
    const res = await proAdjustGroup({
      group_id: groupkey.value,
      ids: fileStore.selectedFileIdList
    })
    if (res.code == 0) {
      fileStore.clearFileItem()
      getTableData()
      visible.value = false
    }
  } else if (fileId.value == 1) {
    const res = await provideoadjustgroup({
      group_id: groupkey.value,
      ids: fileStore.selectedFileIdList
    })
    if (res.code == 0) {
      fileStore.clearFileItem()
      getTableData()
      visible.value = false
    }
  }
}

const uploadimgref = ref()
const showPicupload = () => {
  uploadimgref.value?.showDialog()
}
const uploadimgsuccess = () => {
  getTableData()
}
const downloadFn = async () => {
  if (fileId.value == 0) {
    if (!fileStore.selectedFileIdList.length) {
      return Message.warning('请选择要下载的图片！')
    }
    const result = await proPicArchive({
      ids: fileStore.selectedFileIdList,
      all: 0
    })
    if (result.code == 0) {
      location.href = `${baseURL}?r=picture/download`
    }
  } else if (fileId.value == 1) {
    if (!fileStore.selectedFileIdList.length) {
      return Message.warning('请选择要下载的视频！')
    }
    const result = await provideoarchive({
      ids: fileStore.selectedFileIdList,
      all: 0
    })
    if (result.code == 0) {
      location.href = `${baseURL}?r=video/download`
    }
  } else if (fileId.value == 2) {
    if (!fileStore.selectedFileIdList.length) {
      return Message.warning('请选择要下载的文档！')
    }
    const result = await prodocumentarchive({
      ids: fileStore.selectedFileIdList,
      all: 0
    })
    if (result.code == 0) {
      location.href = `${baseURL}?r=document/download`
    }
  }
}

const uploadvideoref = ref()
const showVideoDialog = () => {
  uploadvideoref.value?.showDialog()
}
const uploadvidesuccess = () => {
  getTableData()
}
const filesuccess = (res) => {
  if (res.response.code != 0) {
    Message.warning(res.response.message)
    return
  }
  getTableData()
}
defineExpose({
  getTableData
})
</script>

<style lang="scss" scoped>
@import '../mod/index.scss';
</style>
