<template>
  <div class="com-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <a-form-item label="上传图片">
        <a-row class="full-width">
          <a-col :span="22">
            <div class="arco-upload-wrapper arco-upload-wrapper-type-picture-card">
              <draggable v-model="fileList">
                <template #item="{ element }">
                  <span
                    v-if="element.status == 'error'"
                    class="arco-upload-list-picture arco-upload-list-picture-status-error"
                    ><img :src="element.url" :alt="element.name" />
                    <div class="arco-upload-list-picture-mask">
                      <div class="arco-upload-list-picture-error-tip">
                        <span class="arco-upload-icon arco-upload-icon-error"><icon-image-close /></span>
                      </div>
                      <div class="arco-upload-list-picture-operation">
                        <span class="arco-upload-icon arco-upload-icon-remove"
                          ><icon-delete @click="picListDel(element)" />
                        </span>
                      </div>
                    </div>
                  </span>
                  <span class="arco-upload-list-picture" v-else-if="element.status == 'uploading'">
                    <a-progress size="mini" :percent="element.percent"> </a-progress>
                  </span>
                  <span class="arco-upload-list-picture" v-else>
                    <img :src="element.url" :alt="element.name" />
                    <div class="arco-upload-list-picture-mask">
                      <div class="arco-upload-list-picture-operation">
                        <!-- <span class="arco-upload-icon arco-upload-icon-preview">
                          <icon-edit @click="picCropper(element)" />
                        </span> -->
                        <span class="arco-upload-icon arco-upload-icon-preview">
                          <icon-eye @click="picListShow(element)" />
                        </span>
                        <span class="arco-upload-icon arco-upload-icon-remove">
                          <icon-delete @click="picListDel(element)" />
                        </span>
                      </div>
                    </div>
                  </span>
                </template>
                <template #footer>
                  <a-upload
                    :show-retry-button="false"
                    list-type="picture-card"
                    :action="picUploadUrl"
                    multiple
                    :with-credentials="true"
                    @change="
                      (res) => {
                        picUploadChange(res, 2)
                      }
                    "
                    :file-list="fileList"
                    :show-file-list="false"
                    ref="uploadRef"
                    :data="{ type: '4' }"
                    @success="successUpload"
                  >
                    <template #upload-button>
                      <div class="arco-upload-picture-card">
                        <div class="arco-upload-picture-card-text">
                          <IconPlus />
                          <div style="margin-top: 10px; color: var(--color-text-4); font-size: 14px">上传</div>
                        </div>
                      </div>
                    </template>
                  </a-upload>
                  <a-image-preview :src="picPreviewSrc" v-model:visible="picPrewiewVisible" />
                </template>
              </draggable>
            </div>
          </a-col>
        </a-row>
        <template #extra>
          <div style="line-height: 18px">拖拽可调整顺序</div>
          <a-button type="primary" size="mini" style="margin: 8px 0 8px 0" @click="showPicCenter"
            >图片中心选择</a-button
          >
          <pic-dialog ref="picDialogRef" @change="picChange"></pic-dialog>
        </template>
      </a-form-item>
      <a-form-item label="详细介绍">
        <a-row class="full-width">
          <a-col :span="22">
            <uedit v-model="form.html"></uedit>
          </a-col>
        </a-row>
      </a-form-item>
      <a-row class="full-width">
        <a-col :span="22">
          <div class="com-btn-box">
            <a-form-item label="">
              <a-space :size="12">
                <a-button type="primary">保存</a-button>
                <a-button>取消</a-button>
              </a-space>
            </a-form-item>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts" name="companyTable">
import { reactive, ref, h, nextTick } from 'vue'
import { getProductList } from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import { getTreeDate } from '@/utils/common'
import picDialog from '@/components/commonDialog/picDialog.vue'
import lodash from 'lodash'
import draggable from 'vuedraggable'
import uedit from '@/components/editor/uedit.vue'
const emit = defineEmits(['update', 'changeTab'])
const router = useRouter()
const route = useRoute()
const form = reactive({
  html: ''
})
const loading = ref(false)
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'

const getTableData = async () => {
  loading.value = true
  const {} = form
  const { code, data } = await getProductList({})
  if (code == 0) {
  }
  loading.value = false
}
getTableData()
const formRef = ref()
const fileList = ref([])
const fileLogo = ref([])
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url_l
  } else {
    res.status = 'error'
  }
}
const picUploadChange = (arr, type) => {
  if (type == 1) {
    fileLogo.value = arr
  } else if (type == 2) {
    fileList.value = arr
  } else if (type == 3) {
    fileDia.value = arr
  }
}

// 图片中心
const picDialogRef = ref()
const showPicCenter = () => {
  picDialogRef.value?.showDialog({
    group_name: ''
  })
}

const picListDel = (file) => {
  let index = lodash.findIndex(fileList.value, function (o) {
    return o.uid == file.uid
  })
  fileList.value.splice(index, 1)
}
const picPreviewSrc = ref<string>('')
const picPrewiewVisible = ref<boolean>(false)
const picListShow = (file) => {
  picPreviewSrc.value = file.url
  picPrewiewVisible.value = true
}
const cropperRef = ref()
const picCropper = (item) => {
  fileDia.value = []
  fileDia.value.push(item)
  nextTick(() => {
    picvise.value = true
  })
}
const picChange = (imgArr) => {
  imgArr.forEach((item) => {
    item.id = item.picid
    item.url = item.picture_url_l
    item.uid = item.id + Math.random()
  })
  fileList.value = fileList.value.concat(imgArr)
}
const diaform = reactive({})
const picvise = ref(false)
const fileDia = ref([])
const handleCancel = () => {
  picvise.value = false
}
const handleBeforeOk = () => {
  picvise.value = false
}
</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
