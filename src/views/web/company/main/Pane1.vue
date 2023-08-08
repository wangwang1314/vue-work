<template>
  <div class="com-detail">
    <a-form
      class="com-form"
      ref="formRef"
      size="medium"
      :model="form"
      layout="horizontal"
      :auto-label-width="true"
      label-align="left"
    >
      <a-form-item field="name" label="公司名称" :label-col-style="{ flex: '0 0 70px' }">
        <a-row class="full-width">
          <a-col :span="15">{{ form.name }}</a-col>
        </a-row>
      </a-form-item>
      <a-form-item field="cate" label="公司logo" :content-flex="false" :label-col-style="{ flex: '0 0 70px' }">
        <a-upload
          list-type="picture-card"
          :action="logourl"
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
      <a-form-item label="公司图片" :label-col-style="{ flex: '0 0 70px' }">
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
          <a-button type="primary" size="mini" style="margin: 8px 0 8px 0" @click="showPicCenter"
            >图片中心选择</a-button
          >
          <pic-dialog ref="picDialogRef" @change="picChange"></pic-dialog>
        </template>
      </a-form-item>
      <a-form-item label="产品视频" :label-col-style="{ flex: '0 0 70px' }">
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
      <a-form-item
        label="公司资料"
        class="input-group-box"
        :content-flex="false"
        :label-col-style="{ flex: '0 0 70px' }"
      >
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Business Type">
              <a-select
                placeholder="请选择"
                multiple
                allow-clear
                v-model="form.info.business_type"
                :options="form.business_type"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Main Market">
              <a-select
                placeholder="请选择"
                v-model="form.info.market_name"
                multiple
                allow-clear
                :options="form.market"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Brands">
              <a-input placeholder="" v-model="form.info.brands" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="No. of Employees" :content-flex="false">
              <a-row>
                <a-col :span="11">
                  <a-input v-model="form.info.employee_number[0]" />
                </a-col>
                <a-col :span="2" style="text-align: center; line-height: 30px"> - </a-col>
                <a-col :span="11">
                  <a-input v-model="form.info.employee_number[1]" />
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
                  <a-input v-model="form.info.annual_sales[0]"><template #append>USD</template></a-input>
                </a-col>
                <a-col :span="2" style="text-align: center; line-height: 30px"> - </a-col>
                <a-col :span="11">
                  <a-input v-model="form.info.annual_sales[1]"><template #append>USD</template></a-input>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Year Established">
              <a-input placeholder="" v-model="form.info.year_established" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Export p.c">
              <a-select placeholder="请选择" v-model="form.info.export_ratio" allow-clear>
                <a-option value="< 10%">&lt; 10%</a-option>
                <a-option value="10% - 20%">10% - 20%</a-option>
                <a-option value="20% - 30%">20% - 30%</a-option>
                <a-option value="30% - 40%">30% - 40%</a-option>
                <a-option value="40% - 50%">40% - 50%</a-option>
                <a-option value="50% - 60%">50% - 60%</a-option>
                <a-option value="60% - 70%">60% - 70%</a-option>
                <a-option value="70% - 80%">70% - 80%</a-option>
                <a-option value="80% - 90%">80% - 90%</a-option>
                <a-option value="90% - 100%">90% - 100%</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="15">
            <a-form-item label="Customers Served">
              <a-input v-model="form.info.customers_served" placeholder="" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="full-width" v-for="(item, index) in attrArr" :key="'attr' + index">
          <a-col :span="15">
            <a-form-item label="Customers Served">
              <template #label>
                <a-input placeholder="" v-model="item.name" allow-clear />
              </template>
              <a-input placeholder="" v-model="item.value" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <icon-delete class="del-icon" @click="delCous(index)"></icon-delete>
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
                <a-button type="primary" @click="saveFn" :loading="loading">保存</a-button>
                <a-button @click="cancelFn" :disabled="loading">取消</a-button>
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
import { companyInfo, companySave, pictureDdel } from '@/apis'
import type {} from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import { getTreeDate } from '@/utils/common'
import picDialog from '@/components/commonDialog/picDialog.vue'
import videoDialog from '@/components/commonDialog/videoDialog.vue'
import lodash from 'lodash'
import draggable from 'vuedraggable'
const emit = defineEmits(['update', 'changeTab'])
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
const logourl = baseURL + '?r=picture/upload-logo'
const domain = 'https://www.maoyt.com'
const router = useRouter()
const route = useRoute()
import { useUserStore } from '@/store'
const userStore = useUserStore()
const picType = '0'
const form = reactive({
  name: '',
  logopath: '',
  videoid: '',
  info: {
    brands: '',
    market_name: [],
    business_type: [],
    year_established: '',
    export_ratio: '',
    customers_served: '',
    employee_number: [],
    annual_sales: []
  },
  picture_info: [],
  detail: [],
  business_type: [],
  market: []
})
const loading = ref(false)
const getTableData = async () => {
  const { code, data } = await companyInfo()
  if (code == 0) {
    const { name, market, business_type, picture_info, logopath, videoid, video_info, info, detail } = data.company
    form.name = name
    form.market = market
    form.business_type = business_type
    picture_info.forEach((item, index) => {
      item.uid = item.id
      item.url = item.picture_url
    })
    fileList.value = picture_info
    fileLogo.value = [
      {
        url: domain + logopath + '?' + new Date().getTime(),
        picture_path: logopath
      }
    ]
    // 视频相关
    if (videoid) {
      videoChosed.value = [
        {
          img_path: video_info.img_path,
          title: video_info.title,
          id: videoid
        }
      ]
    }
    // 公司资料部分
    form.info = info
    if (detail && detail.length > 0) {
      attrArr.value = detail
    } else {
      attrArr.value = [
        {
          name: '',
          value: ''
        }
      ]
    }
  }
}
getTableData()
const formRef = ref()
const fileList = ref([])
const fileLogo = ref([])
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url + '?' + new Date().getTime()
    res.picture_path = res.response.data?.picture_path
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
    type: picType 
  })
}
const picRemove = (data) => {
  delPicAjax(data.id)
  return data
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
    name: '',
    value: ''
  }
])
const addAttr = () => {
  attrArr.value.push({
    name: '',
    value: ''
  })
}
const delCous = (index: number) => {
  attrArr.value.splice(index, 1)
}

// 保存
const saveFn = async () => {
  loading.value = true
  const { name, info } = form
  fileList.value.forEach((item, index) => {
    item.sort = index
  })
  const { code, data, message } = await companySave({
    name,
    info,
    logopath: fileLogo.value.length ? fileLogo.value[0].picture_path : '',
    detail: attrArr.value,
    videoid: videoChosed.value.length ? videoChosed.value[0].id : '',
    picture_info: fileList.value
  }).finally(() => {
    loading.value = false
  })
  if (code == 0) {
    Message.success(message || '操作成功')
  }
}
const cancelFn = () => {
  getTableData()
}
</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
