<template>
  <div class="com-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true" label-align="left">
      <a-form-item field="name" label="产品名称" :label-col-style="{'flex': '0 0 70px'}">
        <a-row class="full-width">
          <a-col :span="15"> Shenzhen TTI Fiber Communication Tech.co., Ltd. </a-col>
        </a-row>
      </a-form-item>
      <a-form-item field="cate" label="公司logo" :content-flex="false" :label-col-style="{'flex': '0 0 70px'}">
        <a-upload
          list-type="picture-card"
          :action="picUploadUrl"
          :data="{ type: '22' }"
          :file-list="fileLogo"
          image-preview
          :limit="1"
          @success="successUpload"
          @change="
            (res) => {
              picUploadChange(res, 1)
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
        <template #extra>
          <div style="line-height: 18px">建议上传透明底的图片格式，220*60尺寸，高度小于100并且图片质量小于100k</div>
        </template>
      </a-form-item>
      <a-form-item label="公司图片" :label-col-style="{'flex': '0 0 70px'}">
        <a-row class="full-width">
          <a-col :span="24">
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
                        <span class="arco-upload-icon arco-upload-icon-preview">
                          <icon-edit @click="picCropper(element)" />
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
      <a-form-item label="产品视频" :label-col-style="{'flex': '0 0 70px'}">
        <a-row class="full-width">
          <a-col :span="15">
            <a-button type="primary" size="mini" @click="showVideoCenter" style="margin-top: 4px"
              >视频中心选择</a-button
            >
            <video-dialog ref="videoDialogRef" @change="videoChange"></video-dialog>
            <div class="video-chose-list nor-v-list">
              <div class="item" v-for="(item, index) in videoChosed" :key="index">
                <div
                  class="arco-image arco-image-with-footer-inner nor-pri"
                  data-v-ea8150a6=""
                  style="width: 220px; height: 220px; margin-left: -14px; vertical-align: top"
                >
                  <img class="arco-image-img" :src="item.img_path" style="width: 220px; height: 220px" />
                  <span class="del-span" @click="delVideo(index)"><icon-close-circle /></span>
                  <div class="arco-image-footer" prefix-cls="arco-image">
                    <div class="arco-image-footer-caption">
                      <div class="arco-image-footer-caption-description">
                        {{ item.title }}
                      </div>
                    </div>
                    <div class="arco-image-footer-extra">
                      <div class="actions">
                        <span class="action" @click="showVideoDetail(item)"><icon-zoom-in size="18" /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="arco-form-item-extra" style="line-height: 18px">
                建议使用<span class="warning-color">30秒以内.mp4</span
                >格式的产品简介视频，视频尺寸建议为16:9，例如640x360像素、853x480像素、1138x640像素、1280x720像素。一个产品仅能设置一个头图视频。
              </div>
              <video-detail ref="videoDetailRef"></video-detail>
            </div>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="公司资料" class="input-group-box" :content-flex="false" :label-col-style="{'flex': '0 0 70px'}">
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Business Type">
              <a-select placeholder="请选择" multiple allow-clear>
                <a-option>Beijing</a-option>
                <a-option>Shanghai</a-option>
                <a-option>Guangzhou</a-option>
                <a-option>Shenzhen</a-option>
                <a-option>Chengdu</a-option>
                <a-option>Wuhan</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Main Market">
              <a-select placeholder="请选择" multiple allow-clear>
                <a-option>Beijing</a-option>
                <a-option>Shanghai</a-option>
                <a-option>Guangzhou</a-option>
                <a-option>Shenzhen</a-option>
                <a-option>Chengdu</a-option>
                <a-option>Wuhan</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Brands">
              <a-input placeholder="" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="No. of Employees" :content-flex="false">
              <a-row>
                <a-col :span="11">
                  <a-input />
                </a-col>
                <a-col :span="2" style="text-align: center; line-height: 30px"> - </a-col>
                <a-col :span="11">
                  <a-input />
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Annual Sales" :content-flex="false">
              <a-row>
                <a-col :span="11">
                  <a-input><template #append>USD</template></a-input>
                </a-col>
                <a-col :span="2" style="text-align: center; line-height: 30px"> - </a-col>
                <a-col :span="11">
                  <a-input><template #append>USD</template></a-input>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Year Established">
              <a-input placeholder="" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Export p.c">
              <a-input placeholder="" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Customers Served">
              <a-input placeholder="" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width" v-for="(item, index) in attrArr" :key="'attr' + index">
          <a-col :span="15">
            <a-form-item label="Customers Served">
              <template #label>
                <a-input placeholder="" allow-clear />
              </template>
              <a-input placeholder="" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-button type="primary" size="mini" @click="addAttr">添加</a-button>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <div class="com-btn-box">
              <a-space :size="12">
                <a-button type="primary">保存</a-button>
                <a-button>取消</a-button>
              </a-space>
            </div>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
    <!-- 图片编辑 -->
    <a-modal v-model:visible="picvise">
      <template #title>上传图片</template>
      <a-form ref="diaformRef" size="medium" :model="diaform" layout="horizontal" :auto-label-width="true">
        <a-form-item label="图片名称">
          <a-input placeholder="图片名称"></a-input>
        </a-form-item>
        <a-form-item label="图片描述">
          <a-textarea
            placeholder="图片描述"
            :auto-size="{
              minRows: 3
            }"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="浏览图片">
          <a-upload
            list-type="picture-card"
            :action="picUploadUrl"
            :data="{ type: '22' }"
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
import {
  getProductList
} from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import { getTreeDate } from '@/utils/common'
import picDialog from '@/components/commonDialog/picDialog.vue'
import videoDialog from '@/components/commonDialog/videoDialog.vue'
import lodash from 'lodash'
import draggable from 'vuedraggable'
const emit = defineEmits(['update', 'changeTab'])
const router = useRouter()
const route = useRoute()
const form = reactive({})
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
// 视频中心
const videoDialogRef = ref()
const showVideoCenter = () => {
  videoDialogRef.value?.showDialog({
    group_name: ''
  })
}
const videoChosed = ref([])
const videoChange = (data) => {
  videoChosed.value = data
}
const visiblePrew = ref(false)
const showVideoDetail = (item) => {
  videoDetailRef.value.showDialog(item)
}
const delVideo = (index) => {
  videoChosed.value.splice(index, 1)
}
const videoDetailRef = ref()

// 自定义属性
const attrArr = ref([
  {
    attr_key: '',
    attr_value: ''
  }
])
const addAttr = () => {
  attrArr.value.push({
    attr_key: '',
    attr_value: ''
  })
}
</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
