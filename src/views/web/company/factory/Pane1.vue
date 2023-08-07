<template>
  <div class="com-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <a-form-item label="上传图片">
        <a-row class="full-width">
          <a-col :span="22">
            <div class="arco-upload-wrapper arco-upload-wrapper-type-picture-card">
              <draggable v-model="fileList">
                <template #item="{ element, index }">
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
                        <span class="arco-upload-icon arco-upload-icon-preview">
                          <icon-edit @click="picCropper(element, index)" />
                        </span>
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
                    :data="{ type: picType }"
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
            <uedit v-model="form.remark"></uedit>
          </a-col>
        </a-row>
      </a-form-item>
      <a-row class="full-width">
        <a-col :span="22">
          <div class="com-btn-box">
            <a-form-item label="">
              <a-space :size="12">
                <a-button type="primary" :loading="loading" @click="saveFn">保存</a-button>
                <a-button @click="getData" :disabled="loading">取消</a-button>
              </a-space>
            </a-form-item>
          </div>
        </a-col>
      </a-row>
    </a-form>
     <!-- 图片编辑 -->
     <a-modal v-model:visible="picvise">
      <template #title>上传图片</template>
      <a-form ref="diaformRef" size="medium" :model="diaform" layout="horizontal" :auto-label-width="true">
        <a-form-item label="图片名称">
          <a-input placeholder="图片名称" v-model="diaform.title"></a-input>
        </a-form-item>
        <a-form-item label="图片描述">
          <a-textarea
            placeholder="图片描述"
            :auto-size="{
              minRows: 3
            }"
            v-model="diaform.picturedesc"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="浏览图片">
          <a-upload
            :on-before-remove="picRemove"
            list-type="picture-card"
            :action="picUploadUrl"
            :data="{ type: picType }"
            :file-list="fileDia"
            image-preview
            :limit="1"
            @success="successUpload"
            @change="
              (res) => {
                picUploadChange(res, 3)
              }
            "
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
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts" name="companyTable">
import { reactive, ref, h, nextTick } from 'vue'
import { getCompanyFactory, saveCompanyFactory, pictureDdel } from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import { getTreeDate } from '@/utils/common'
import picDialog from '@/components/commonDialog/picDialog.vue'
import lodash from 'lodash'
import draggable from 'vuedraggable'
import uedit from '@/components/editor/uedit.vue'
import { useUserStore } from '@/store'
const userStore = useUserStore()
// const companyid = userStore.userInfo.homeInfo.company.id
// plineinfo，oeminfo，rdinfo
const type = 'plineinfo'
const picType = 1
const emit = defineEmits(['update', 'changeTab'])
const router = useRouter()
const route = useRoute()
const form = reactive({
  remark: ''
})
const loading = ref(false)
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'

const formRef = ref()
const fileList = ref([])
const fileLogo = ref([])
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url
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
  delPicAjax(fileList.value[index]?.id)
  fileList.value.splice(index, 1)
}
const delPicAjax = async(id) => {
  const res = await pictureDdel({
    id,
    sid: userStore.userInfo.homeInfo.company.id,
    type:picType 
  })
}
const picPreviewSrc = ref<string>('')
const picPrewiewVisible = ref<boolean>(false)
const picListShow = (file) => {
  picPreviewSrc.value = file.url
  picPrewiewVisible.value = true
}
const cropperRef = ref()
const picEditIndex = ref(0)
const picCropper = (item, index) => {
  picEditIndex.value = index
  fileDia.value = []
  fileDia.value.push(item)
  diaform.title = item.title
  diaform.picturedesc = item.picturedesc
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
const diaform = reactive({
  title: '',
  picturedesc: ''
})
const picvise = ref(false)
const fileDia = ref([])
const handleCancel = () => {
  picvise.value = false
}
const handleBeforeOk = () => {
  const { title, picturedesc } = diaform
  fileList.value[picEditIndex.value].title = title
  fileList.value[picEditIndex.value].picturedesc = picturedesc
  if (fileDia.value.length) {
    fileList.value[picEditIndex.value].id = fileDia.value[0].id
    fileList.value[picEditIndex.value].url = fileDia.value[0].url
  }
  picvise.value = false
}
const picRemove = (data) => {
  delPicAjax(data.id)
  return data
}
const getData = async () => {
  const res = await getCompanyFactory({
    type
  })
  if (res.code === 0) {
    form.remark = res.data.remark
    res.data.picture_info.forEach((item) => {
      item.uid = item.id
      item.url = item.picture_url
    })
    fileList.value = res.data.picture_info
  }
}
getData()
const saveFn = async () => {
  loading.value = true
  fileList.value.forEach((item, index) => {
    item.sort = index
  })
  const res = await saveCompanyFactory({
    type,
    remark: form.remark,
    picture_info: fileList.value
  }).finally(() => {
    loading.value = false
  })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
  }
}
</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
