<template>
  <div class="cate-edit detail">
    <a-form ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <div class="card-wrap">
        <a-card title="案例详细信息编辑" :bordered="false">
          <a-form-item
            field="name"
            label="发布时间"
            :content-flex="false"
          >
            <a-row class="full-width">
              <a-col :span="15">
                <a-date-picker
                  show-time
                  format="YYYY-MM-DD hh:mm:ss"
                />
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item
            field="name"
            label="案例标题"
            :content-flex="false"
          >
            <a-row class="full-width">
              <a-col :span="15">
                <a-input placeholder="请输入" v-model.trim="form.name" allow-clear />
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item field="cate" label="案例图片" :content-flex="false">
            <!-- <a-button type="primary" size="mini" style="margin: 8px 0 8px 0" @click="showPicCenter(2)"
              >图片中心选择</a-button
            > -->
            <a-upload
              :on-before-remove="(data)=> picRemove(data, '23')"
              list-type="picture-card"
              :action="picUploadUrl"
              :data="{ type: '23' }"
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
          <a-form-item label="案例内容" :content-flex="false">
            <a-row class="full-width">
              <a-col :span="22">
                <uedit v-model="form.remark"></uedit>
              </a-col>
            </a-row>
          </a-form-item>
        </a-card>
      </div>
      <div class="btn-wrap">
        <a-button type="primary" @click="saveFn" :loading="loading">保存</a-button>
        <a-button style="margin-left: 10px" :disabled="loading">取消</a-button>
      </div>
    </a-form>
    <!-- 分类介绍弹框 -->
    <a-modal v-model:visible="catevisi" :width="800">
      <template #title>上传图片</template>
      <a-row class="full-width">
        <a-col :span="22">
          <div v-loading="btnloading" gi-loading-type="circle">
            <a-form ref="dialogFormRef" :model="dialogForm" class="init-form">
              <a-form-item field="title" label="图片名称" :rules="[{ required: true, message: '请输入名称' }]">
                <a-input v-model="dialogForm.title" placeholder="" />
                <!-- <template #extra>建议 2-5 个单词之间</template> -->
              </a-form-item>
              <a-form-item field="remark" label="图片描述" :rules="[{ required: true, message: '请输入描述' }]">
                <a-textarea type="textarea" v-model="dialogForm.remark" placeholder="" />
                <!-- <template #extra> 分类描述，建议 300-350 个字符</template> -->
              </a-form-item>
              <a-form-item field="pic_id" label="图片" :rules="[{ required: true, message: '请选择图片' }]">
                <a-upload
                  list-type="picture-card"
                  :action="picUploadUrl"
                  :data="{ type: '4' }"
                  :file-list="fileList3"
                  image-preview
                  :limit="1"
                  @success="successUpload"
                  @change="
                    (res) => {
                      picUploadChange(res, 3)
                    }
                  "
                >
                  <a-input style="display: none" v-model="dialogForm.pic_id"></a-input>
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
    <!-- 确认对话框 -->
    <a-modal v-model:visible="tplvise">
      <template #title> 提示 </template>
      <div>编辑框内已有内容，是否确定使用模板内容覆盖？</div>
      <template #footer>
        <a-button @click="tplhandleCancel">取消</a-button>
        <a-button type="primary" @click="tplhandleBeforeOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, h, watch } from 'vue'
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
import { progetTplContent, getCateDetail, saveCateIntro, delCateIntro, getCateTntro, editCateContent, pictureDdel } from '@/apis'
const route = useRoute()
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
const form = reactive({
  remark: '',
  id: route.query.id || '',
  name: '',
  descp: '',
  parentid: ''
})
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
  // const res = await getCateDetail({ category_id: form.id })
  // if (res.code === 0) {
  //   const { name, parentid, remark, descp, cate_pic_id, cate_pic_url_d, top_pic_id, top_pic_url_d, doc, intro } =
  //     res.data.category
  //   form.name = name
  //   form.parentid = parentid
  //   form.remark = remark
  //   form.descp = descp
  //   selectMod.value = res.data.remark_template
  //   if (cate_pic_id) {
  //     fileList.value = [
  //       {
  //         uid: cate_pic_id + Math.random().toString(),
  //         id: cate_pic_id,
  //         url: cate_pic_url_d
  //       }
  //     ]
  //   }
  //   if (top_pic_id) {
  //     fileList2.value = [
  //       {
  //         uid: top_pic_id + Math.random().toString(),
  //         id: top_pic_id,
  //         url: top_pic_url_d
  //       }
  //     ]
  //   }
  //   if (doc && doc.length) {
  //     doc.forEach((item) => {
  //       item.name = item.docname
  //       item.uid = item.id + Math.random().toString()
  //     })
  //     defaultfilelist.value = doc
  //   }
  // }
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
// 文件默认列表
const defaultfilelist = ref([])
const getCustomIcon = () => {
  return {
    retryIcon: () => h(IconUpload),
    cancelIcon: () => h(IconClose),
    fileIcon: () => h(IconFileAudio),
    removeIcon: () => h(IconClose),
    errorIcon: () => h(IconFaceFrownFill),
    fileName: (file) => {
      return `文件名： ${file.name}`
    }
  }
}
// 文件中心
const showFileDialog = () => {
  filedialogRef.value?.showDialog()
}
const filedialogRef = ref()
const fileChange = (arr) => {
  arr.forEach((item) => {
    item.name = item.docname
    item.uid = item.cid + Math.random()
    defaultfilelist.value.push(item)
  })
}
const fileUploadChange = (arr) => {
  defaultfilelist.value = arr
}
const fileSuccess = (res) => {
  if (res.response?.code == 0) {
    res.id = res.response?.data.document.id
    res.uid = res.response?.data.document.cid
    defaultfilelist.value.push(res)
  } else {
    res.status = 'error'
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
      console.log(form, defaultfilelist)
      const { id, parentid, remark, name, descp } = form
      const docIds = defaultfilelist.value.map((item) => { return item.id })
      const res = await editCateContent({
        category_id: id,
        name,
        descp,
        remark,
        cate_pic_id: fileList.value[0]?fileList.value[0].id:'',
        top_pic_id: fileList2.value[0]?fileList2.value[0].id:'',
        doc_ids: docIds,
        parent_id: parentid
      }).finally(() => {
        loading.value = false
      })
      if (res.code === 0) {
        Message.success(res.message || '提交成功')
      }
    }
  })
}

// 添加分类描述
const dialogForm = reactive({
  title: '',
  remark: '',
  id: '',
  pic_id: '',
  category_id: route.query.id || ''
})
const dialogFormRef = ref()
const couArr = ref([])
const catevisi = ref(false)
const btnloading = ref(false)
const cateconfirm = () => {
  catevisi.value = false
  // dialogFormRef.value.validate(async (err: string) => {

  // })
}
const showCate = () => {
  dialogFormRef.value.resetFields()
  dialogForm.id = ''
  dialogForm.pic_id = ''
  fileList3.value = []
  catevisi.value = true
}
const editCous = (row) => {
  row.pic_id = row.picture_id
  const { title, remark, id, pic_id } = row
  Object.assign(dialogForm, row)
  fileList3.value = [
    {
      id: row.pic_id,
      url: row.picture_url,
      uid: row.id + Math.random()
    }
  ]
  catevisi.value = true
}
const fileList3 = ref([])
watch(
  fileList3,
  (newValue) => {
    if (newValue[0]) {
      dialogForm.pic_id = newValue[0].id
    } else {
      dialogForm.pic_id = ''
    }
  },
  { deep: true }
)
const introDel = async (row, done) => {
  const res = await delCateIntro({
    id: row.id
  }).finally(() => { done() })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
    getCateTntroList()
  }
}
// 获取模板
const selectMod = ref([])
const tplId = ref('')
const tplPrevId = ref('')
const tplvise = ref(false)
const tplChange = (value) => {
  if (value) {
    if (form.remark) {
      tplvise.value = true
    } else {
      getTplStr()
    }
  }
}
const tplhandleCancel = () => {
  tplId.value = tplPrevId.value
  tplvise.value = false
}
const tplhandleBeforeOk = () => {
  tplvise.value = false
  getTplStr()
}
watch(tplId, (newValue, oldValue) => {
  tplPrevId.value = oldValue || ''
})
const getTplStr = async () => {
  const res = await progetTplContent({
    id: tplId.value,
    type: 2
  })
  if (res.code == 0) {
    form.remark = res.data.content
  }
}

const editImg = () => {
  catevisi.value = true
}
</script>
<style lang="scss" scoped>
@import '../mod/add.scss';
</style>
