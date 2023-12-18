<template>
  <div class="detail-out">
    <div class="top-nav-tit">
      <div class="m-left">设置产品信息</div>
      <div class="m-right"></div>
    </div>
    <div class="com-detail detail">
      <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
        <a-card :bordered="false">
          <div class="label-class">
            <span>产品图片</span>
            <a-button type="primary" size="mini" @click="showPicCenter">图片中心选择</a-button>
          </div>
          <a-form-item label="上传图片" :hide-label="true">
            <a-row class="full-width">
              <a-col :span="24">
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
              <pic-dialog ref="picDialogRef" @change="picChange"></pic-dialog>
            </template>
          </a-form-item>
        </a-card>
        <a-card :bordered="false">
          <a-tabs type="card" size="small" v-model:active-key="activeKey" @change="changeTab" hide-content>
            <a-tab-pane :key="1" title="Production Line"> </a-tab-pane>
            <a-tab-pane :key="2" title="OEM/ODM"> </a-tab-pane>
            <a-tab-pane :key="3" title="R & D"> </a-tab-pane>
          </a-tabs>
          <a-form-item label="详细介绍" :hide-label="true" style="margin-top: 16px">
            <a-row class="full-width">
              <a-col :span="24">
                <uedit v-model="form.remark"></uedit>
              </a-col>
            </a-row>
          </a-form-item>
        </a-card>
      </a-form>
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
import { useUserStore, useFileStore } from '@/store'
const fileStore = useFileStore()
const PaneMap: any = reactive({
  1: 'plineinfo',
  2: 'oeminfo',
  3: 'rdinfo'
})

const titArray = reactive({ count1: 0, count2: 0, count3: 0 })
const activeKey = ref(1)
const updateFn = (data) => {
  titArray.count1 = data.status_normal_nums
  titArray.count2 = data.status_deleted_nums
  titArray.count3 = data.hot_count
}
const changeTab = (val: number) => {
  activeKey.value = val
  type.value = PaneMap[activeKey.value]
  getData()
}
const userStore = useUserStore()
// const companyid = userStore.userInfo.homeInfo.company.id
// plineinfo，oeminfo，rdinfo
const type = ref('plineinfo')
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
const delPicAjax = async (id) => {
  const res = await pictureDdel({
    id,
    sid: userStore.userInfo.homeInfo.company.id,
    type: picType
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
    type: type.value
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
  fileStore.setloading(true)
  fileList.value.forEach((item, index) => {
    item.sort = index
  })
  const res = await saveCompanyFactory({
    type: type.value,
    remark: form.remark,
    picture_info: fileList.value
  }).finally(() => {
    fileStore.setloading(false)
  })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
  }
}

fileStore.$onAction(({name}) => {
  if (name === 'cancel') {
    getData()
  } else if (name === 'save') {
    saveFn()
  }
})
</script>

<style lang="scss" scoped>
:deep(.arco-card) {
  .arco-card-header {
    border-bottom-style: dashed;
    margin: 0 16px;
    padding-left: 0;
    padding-right: 0;
  }
}
.manage {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-bg-1);
  .tab {
    .tit {
      color: var(--color-text-1);
      .s-span {
        font-size: 12px;
        color: var(--color-text-3);
      }
    }
    :deep(.arco-tabs-nav-tab) {
      justify-content: flex-start;
    }
    .arco-tabs-tab-active {
      .tit {
        color: rbg(var(--primary-6));
        font-size: 14px;
        .s-span {
          color: rbg(var(--primary-6));
        }
      }
    }
    padding: 12px 0 0 24px;
  }
}

:deep(.data-pane) {
  flex: 1;
  padding: $margin;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  .pane-left {
    width: 260px;
  }
  .pane-right {
    flex: 5;
    margin-left: $margin;
    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .table-box {
        flex: 1;
        overflow: hidden;
      }
    }
  }
}
.detail-out {
  overflow: auto;
}
.detail {
  padding: 20px 15px 0 20px;
}
.label-class {
  margin-bottom: 10px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 16px;
    color: var(--color-text-1);
    font-weight: bold;
  }
}
</style>
