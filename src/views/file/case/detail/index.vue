<template>
  <div class="cate-edit-out">
    <div class="top-nav-tit">
      <div class="m-left">案例编辑</div>
      <div class="m-right"></div>
    </div>
    <div class="cate-edit detail">
      <a-form ref="formRef" size="medium" :model="form" layout="vertical" :auto-label-width="true">
        <a-row :gutter="16">
          <a-col :span="16">
            <a-card title="案例详细信息编辑" :bordered="false">
              <a-form-item
                field="name"
                label="案例标题"
                :content-flex="false"
                :rules="[{ required: true, message: '请填写案例标题', type: 'string' }]"
              >
                <a-input placeholder="请输入" v-model.trim="form.name" show-word-limit allow-clear :max-length="{ length: 120 }" />
              </a-form-item>
              <pic-dialog ref="picDialogRef" @change="picChange"></pic-dialog>
              <a-form-item label="案例内容" :content-flex="false" class="no-bot">
                <a-row class="full-width">
                  <a-col :span="22">
                    <uedit v-model="form.remark"></uedit>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-card>
            <a-card title="案例图片" :bordered="false">
              <a-form-item field="cate" label="案例图片" :content-flex="false" :hide-label="true" class="no-bot">
                <!-- <a-button type="primary" size="mini" style="margin: 8px 0 8px 0" @click="showPicCenter(2)"
              >图片中心选择</a-button
            > -->
                <a-upload
                  :on-before-remove="(data) => picRemove(data, '6')"
                  list-type="picture-card"
                  :action="picUploadUrl"
                  :data="{ type: uploadType }"
                  :file-list="fileList2"
                  image-preview
                  :limit="1"
                  @success="successUpload"
                  @change="
                    (res) => {
                      picUploadChange(res, 2)
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
                  <template #extra-button>
                    <span class="rco-upload-icon" @click="editImg">
                      <IconEdit></IconEdit>
                    </span>
                  </template>
                </a-upload>
                <template #extra>
                  <!-- <div style="line-height: 18px">分类图片建议上传尺寸288px*288px，JPEG、JPG格式，并小于100K</div> -->
                </template>
              </a-form-item>
            </a-card>
          </a-col>
          <a-col :span="8">
            <div ref="step1div">
              <a-card title="发布时间" :bordered="false" class="item" id="step1">
                <a-form-item
                  field="pubtime"
                  label="发布时间"
                  :content-flex="false"
                  :hide-label="true"
                  class="no-bot"
                  :rules="[{ required: true, message: '请选择时间', type: 'string' }]"
                >
                  <a-date-picker
                    style="width: 100%"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    v-model="form.pubtime"
                  />
                </a-form-item>
              </a-card>
              <a-card title="SEO" :bordered="false" class="item">
                <a-form-item label="SEO标题" field="seo.title">
                  <a-textarea
                    v-model="form.seo.title"
                    :auto-size="{ minRows: 4 }"
                    placeholder="建议在60 - 120个字符之间。"
                    :min-length="{ length: 60, errorOnly: true }"
                    :max-length="{ length: 120, errorOnly: true }"
                    allow-clear
                  />
                </a-form-item>
                <a-form-item label="SEO关键词" field="seo.keyword">
                  <a-textarea
                    v-model="form.seo.keyword"
                    :auto-size="{ minRows: 5 }"
                    placeholder="建议设置3-5个单词，以英文逗号“,”分隔。"
                    allow-clear
                  />
                </a-form-item>
                <a-form-item label="SEO描述" class="no-bot" field="seo.description">
                  <a-textarea
                  v-model="form.seo.description" 
                  :auto-size="{ minRows: 6 }" placeholder="建议在140 - 160个字符之间。" allow-clear />
                </a-form-item>
              </a-card>
            </div>
          </a-col>
        </a-row>
      </a-form>
      <!-- 分类介绍弹框 -->
      <a-modal v-model:visible="catevisi" :width="800">
        <template #title>上传图片</template>
        <a-row class="full-width">
          <a-col :span="22">
            <div v-loading="btnloading" gi-loading-type="circle">
              <a-form ref="dialogFormRef" :model="dialogForm" class="init-form">
                <a-form-item field="title" label="图片名称">
                  <a-input v-model="dialogForm.title" placeholder="" />
                  <!-- <template #extra>建议 2-5 个单词之间</template> -->
                </a-form-item>
                <a-form-item field="remark" label="图片描述">
                  <a-textarea type="textarea" v-model="dialogForm.picturedesc" placeholder="" />
                  <!-- <template #extra> 分类描述，建议 300-350 个字符</template> -->
                </a-form-item>
                <a-form-item field="link" label="图片">
                  <a-input name="link" style="display: none" v-model="dialogForm.link" placeholder="" />
                  <a-upload
                    list-type="picture-card"
                    :on-before-remove="(data) => picRemove(data, '6')"
                    :action="picUploadUrl"
                    :data="{ type: uploadType, title: dialogForm.title, picturedesc: dialogForm.picturedesc }"
                    :file-list="fileList3"
                    :auto-upload="false"
                    image-preview
                    :limit="1"
                    :show-retry-button="false"
                    @success="successUploadfile"
                    ref="uploadref"
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
                  <!-- <template #extra>
                  <a-button type="primary" size="mini" @click="showPicCenter(3)">图片中心选择</a-button>
                  <div style="margin-top: 10px">分类图片建议上传尺寸422px*238px，JPEG、JPG格式，并小于100K。</div>
                </template> -->
                </a-form-item>
              </a-form>
            </div>
          </a-col>
        </a-row>
        <template #footer>
          <a-button type="primary" @click="cateconfirm" :disabled="btnloading">确定</a-button>
        </template>
      </a-modal>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, h, watch, nextTick } from 'vue'
import picDialog from '@/components/commonDialog/picDialog.vue'
import fileDialog from '@/components/commonDialog/fileDialog.vue'
import IconUpload from '@arco-design/web-vue/es/icon/icon-upload'
import IconFileAudio from '@arco-design/web-vue/es/icon/icon-file-audio'
import IconClose from '@arco-design/web-vue/es/icon/icon-close'
import IconFaceFrownFill from '@arco-design/web-vue/es/icon/icon-face-frown-fill'
import uedit from '@/components/editor/uedit.vue'
import ueditorTemp from '@/components/editor/ueditor-temp.vue'
import { Notification, Message } from '@arco-design/web-vue'
import { useRoute, useRouter } from 'vue-router'
import { dateFt } from '@/utils/common'
import { fileCaseAdd, fileCaseEdit, fileCaseInit, pictureDdel } from '@/apis'
import { useFileStore } from '@/store'
const fileStore = useFileStore()
const route = useRoute()
const router = useRouter()
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
const uploadType = ref('19')
const form = reactive({
  type: 0,
  pubtime: '',
  remark: '',
  id: route.query.id || '',
  name: '',
  seo: {
    title: '',
    keyword: '',
    description: ''
  }
})
if (!route.query.id) {
  form.pubtime = dateFt('yyyy-MM-dd hh:mm:ss', new Date())
}
const delPicAjax = async (id, type) => {
  if (!route.query.id) {
    return
  }
  const res = await pictureDdel({
    id,
    sid: route.query.id,
    type
  })
}
const picRemove = (data, type) => {
  delPicAjax(data.id, type)
  return data
}

const fileList = ref([])
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url
  } else {
    res.status = 'error'
  }
}
const fileList2 = ref([])
// 获取分类详情
const getDetail = async () => {
  if (!form.id) {
    return
  }
  const { code, data } = await fileCaseInit({ id: form.id, type: form.type })
  if (code === 0) {
    const caseobj = data.case
    form.name = caseobj.name
    form.pubtime = caseobj.pubtime
    form.remark = caseobj.remark
    if (caseobj.seo) {
      form.seo = {
        title: caseobj.seo.title,
        keyword: caseobj.seo.keyword,
        description: caseobj.seo.description
      }
    }
    if (caseobj.picture_info && caseobj.picture_info.id) {
      caseobj.picture_info.url = caseobj.picture_info.picture_url_d
      fileList2.value = [caseobj.picture_info]
    } else {
      fileList2.value = []
    }
  }
}
getDetail()
// 图片中心
const picDialogRef = ref()
const picType = ref(1)
const showPicCenter = (type: number) => {
  picType.value = type
  picDialogRef.value?.showDialog()
}
const picChange = (arr) => {
  let pic = arr.slice(0, 1)
  pic.forEach((item) => {
    item.id = item.picid
    item.url = item.picture_url_l
    item.uid = item.id + Math.random()
  })
  if (picType.value == 1) {
    fileList.value = pic
  } else if (picType.value == 2) {
    fileList2.value = pic
  } else if (picType.value == 3) {
    fileList3.value = pic
  }
}
const picUploadChange = (arr, type) => {
  if (type == 1) {
    fileList.value = arr
  } else if (type == 2) {
    fileList2.value = arr
  } else if (type == 3) {
    fileList3.value = arr
  }
}

// 富文本相关
const ueditorTempRef = ref()
const showUeditor = () => {
  ueditorTempRef.value?.showDialog(form.remark)
}
// 提交
const formRef = ref()
const loading = ref(false)
const saveFn = () => {
  formRef.value.validate(async (err) => {
    if (!err) {
      fileStore.setloading(true)
      const { id, pubtime, remark, name, type, seo } = form
      const picture_info = fileList2.value.map((item) => {
        return item.id
      })
      let res
      if (!id) {
        res = await fileCaseAdd({
          pubtime,
          name,
          remark,
          picture_info: {
            id: picture_info.length ? picture_info[0] : ''
          },
          type,
          seo
        }).finally(() => {
          fileStore.setloading(false)
        })
      } else {
        res = await fileCaseAdd({
          id,
          pubtime,
          name,
          remark,
          picture_info: {
            id: picture_info.length ? picture_info[0] : ''
          },
          type,
          seo
        }).finally(() => {
          fileStore.setloading(false)
        })
      }
      if (res.code === 0) {
        Message.success(res.message || '提交成功')
        router.push({ path: '/file/case' })
      }
    }
  })
}
const cancelFn = () => {
  const id = form.id
  if (!id) {
    formRef.value.resetFields()
    fileList2.value = []
  } else {
    getDetail()
  }
}
// 添加分类描述
const uploadref = ref()
const dialogForm = reactive({
  title: '',
  picturedesc: '',
  link: ''
})
const dialogFormRef = ref()
const couArr = ref([])
const catevisi = ref(false)
const btnloading = ref(false)
const cateconfirm = () => {
  // catevisi.value = false
  if (fileList3.value.length <= 0) {
    return Message.warning('请选择图片')
  }
  uploadref.value?.submit()
  // dialogFormRef.value.validate(async (err: string) => {

  // })
}
const successUploadfile = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url
    catevisi.value = false
    fileList2.value[0].id = res.id
    fileList2.value[0].url = res.url
    fileList2.value[0].title = res.response.data?.title
    fileList2.value[0].picturedesc = res.response.data?.picturedesc
  } else {
    res.status = 'error'
  }
}

const fileList3 = ref([])
watch(
  fileList3,
  (newValue) => {
    if (newValue.length > 0) {
      dialogForm.link = newValue[0].url
    } else {
      dialogForm.link = ''
    }
  },
  { deep: true, immediate: true }
)

const editImg = () => {
  catevisi.value = true
  if (fileList2.value.length) {
    fileList3.value = [
      {
        ...fileList2.value[0],
        status: 'init'
      }
    ]
    dialogForm.title = fileList2.value[0].title
    dialogForm.picturedesc = fileList2.value[0].picturedesc
  }
}

fileStore.$onAction(({name}) => {
  if (name === 'cancel') {
    cancelFn()
  } else if (name === 'save') {
    saveFn()
  }
})
</script>
<style lang="scss" scoped>
@import '../mod/add.scss';
</style>
