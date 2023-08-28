<template>
  <div class="cate-edit detail">
    <a-form ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <div class="card-wrap">
        <a-card title="新闻详细信息编辑" :bordered="false">
          <a-form-item
            field="pubtime"
            label="发布时间"
            :content-flex="false"
            :rules="[{required: true, message: '请选择时间', type: 'string'}]"
          >
            <a-row class="full-width">
              <a-col :span="15">
                <a-date-picker
                  show-time
                  format="YYYY-MM-DD hh:mm:ss"
                  value-format="YYYY-MM-DD hh:mm:ss"
                  v-model="form.pubtime"
                />
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item
            field="name"
            label="新闻标题"
            :content-flex="false"
            :rules="[{required: true, message: '请填写新闻标题', type: 'string'}]"
          >
            <a-row class="full-width">
              <a-col :span="15">
                <a-input placeholder="请输入" v-model.trim="form.name" allow-clear />
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item field="cate" label="新闻图片" :content-flex="false">
            <!-- <a-button type="primary" size="mini" style="margin: 8px 0 8px 0" @click="showPicCenter(2)"
              >图片中心选择</a-button
            > -->
            <a-upload
              :on-before-remove="(data)=> picRemove(data, '6')"
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
                    <IconEdit ></IconEdit>
                  </span>
              </template>
            </a-upload>
            <template #extra>
              <!-- <div style="line-height: 18px">分类图片建议上传尺寸288px*288px，JPEG、JPG格式，并小于100K</div> -->
            </template>
          </a-form-item>
          <pic-dialog ref="picDialogRef" @change="picChange"></pic-dialog>
          <a-form-item label="新闻内容" :content-flex="false">
            <a-row class="full-width">
              <a-col :span="22">
                <uedit v-model="form.remark"></uedit>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item>
            <div class="btn-wrap">
              <a-button type="primary" @click="saveFn" :loading="loading">保存</a-button>
              <a-button style="margin-left: 10px" @click="cancelFn" :disabled="loading">取消</a-button>
            </div>
          </a-form-item>
        </a-card>
      </div>
      
    </a-form>
    <!-- 分类介绍弹框 -->
    <a-modal v-model:visible="catevisi" :width="800">
      <template #title>上传图片</template>
      <a-row class="full-width">
        <a-col :span="22">
          <div v-loading="btnloading" gi-loading-type="circle">
            <a-form ref="dialogFormRef" :model="dialogForm" class="init-form">
              <a-form-item field="title" label="图片名称" >
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
                  :on-before-remove="(data)=> picRemove(data, '6')"
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
import { fileNewsAdd, fileNewsEdit, fileNewsInit, pictureDdel } from '@/apis'
const route = useRoute()
const router = useRouter()
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
const uploadType = ref('6')
const form = reactive({
  type: 0,
  pubtime: '',
  remark: '',
  id: route.query.id || '',
  name: ''
})
if (!route.query.id) {
  form.pubtime = dateFt('yyyy-MM-dd hh:mm:ss', new Date())
}
const delPicAjax = async(id, type) => {
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
  const {code, data} = await fileNewsInit({ id: form.id })
  if (code === 0) {
    form.name = data.news.name
    form.pubtime = data.news.pubtime
    form.remark = data.news.remark
    if (data.news.picture_info && data.news.picture_info.id) {
      data.news.picture_info.url = data.news.picture_info.picture_url_d
      fileList2.value = [data.news.picture_info]
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
      loading.value = true
      const { id, pubtime, remark, name, type } = form
      const picture_info = fileList2.value.map((item) => { return item.id })
      let res
      if (!id) {
        res = await fileNewsAdd({
          pubtime,
          name,
          remark,
          picture_info: {
            id: picture_info.length?picture_info[0]:''
          },
          type
        }).finally(() => {
          loading.value = false
        })
      } else {
        res = await fileNewsEdit({
          id,
          pubtime,
          name,
          remark,
          picture_info: {
            id: picture_info.length?picture_info[0]:''
          },
          type
        }).finally(() => {
          loading.value = false
        })
      }
      if (res.code === 0) {
        Message.success(res.message || '提交成功')
        router.push({path: '/file/news'})
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
  if (fileList3.value.length <= 0 ) {
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
    fileList3.value = [{
      ...fileList2.value[0],
      status: 'init'
    }]
    dialogForm.title = fileList2.value[0].title
    dialogForm.picturedesc = fileList2.value[0].picturedesc
  }
}
</script>
<style lang="scss" scoped>
@import '../mod/add.scss';
</style>
