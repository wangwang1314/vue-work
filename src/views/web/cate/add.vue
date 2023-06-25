<template>
  <div class="cate-edit detail">
    <a-form ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <div class="card-wrap">
        <a-card title="基本信息" :bordered="false">
          <a-form-item
            field="name"
            label="分类名称"
            :content-flex="false"
            :rules="[{ required: true, message: '请输入分类名称' }]"
          >
            <a-row class="full-width">
              <a-col :span="15">
                <a-input placeholder="请输入" v-model.trim="form.name" allow-clear />
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item field="cate" label="分类图片" :content-flex="false">
            <a-button type="primary" size="mini" style="margin: 8px 0 8px 0" @click="showPicCenter(1)"
              >图片中心选择</a-button
            >
            <a-upload
              list-type="picture-card"
              :action="picUploadUrl"
              :data="{ type: '22' }"
              :file-list="fileList"
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
              <div style="line-height: 18px">分类图片建议上传尺寸288px*288px，JPEG、JPG格式，并小于100K</div>
            </template>
          </a-form-item>
          <a-form-item field="cate" label="分类页面顶图" :content-flex="false">
            <a-button type="primary" size="mini" style="margin: 8px 0 8px 0" @click="showPicCenter(2)"
              >图片中心选择</a-button
            >
            <a-upload
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
            </a-upload>
            <template #extra>
              <div style="line-height: 18px">分类图片建议上传尺寸288px*288px，JPEG、JPG格式，并小于100K</div>
            </template>
          </a-form-item>
          <a-form-item field="cate" label="分类附件" :content-flex="false">
            <a-row class="full-width">
              <a-col :span="15">
                <a-button size="mini" class="chose-btn" type="primary" @click="showFileDialog">文件中心选择</a-button>
                <div style="margin-top: 6px; position: relative; width: 100%">
                  <a-upload
                    :action="baseURL + '?r=document/upload'"
                    size="mini"
                    class="drag-upload"
                    draggable
                    @change="fileUploadChange"
                    :file-list="defaultfilelist"
                    :custom-icon="getCustomIcon()"
                    @success="fileSuccess"
                  >
                    <template #upload-button>
                      <div class="arco-upload-drag">
                        <div><Icon-plus></Icon-plus></div>
                        <div class="arco-upload-drag-text" style="margin-top: -10px">点击或拖拽文件到此处上传</div>
                        <div
                          class="arco-upload-drag-text"
                          style="padding: 0 16px; margin-top: 6px; color: var(--color-text-6); font-size: 12px"
                        >
                          Only pdf, png, jpg can be uploaded, and the size does not exceed
                          100MB（不能上传含有中文名的文件）
                        </div>
                      </div>
                    </template>
                  </a-upload>

                  <file-dialog ref="filedialogRef" @change="fileChange"></file-dialog>
                </div>
              </a-col>
            </a-row>
          </a-form-item>
          <pic-dialog ref="picDialogRef" @change="picChange"></pic-dialog>
        </a-card>
      </div>
      <div class="card-wrap">
        <a-card title="分类介绍" :bordered="false">
          <a-form-item field="cate" label="分类简介" :content-flex="false">
            <a-row class="full-width">
              <a-col :span="16">
                <a-textarea placeholder="请输入" v-model="form.descp" allow-clear />
              </a-col>
            </a-row>
            <template #extra>
              <div>分类描述，建议 150-200 个字符。</div>
            </template>
          </a-form-item>
          <a-form-item field="cate" label="更多介绍" :content-flex="false">
            <a-row class="full-width">
              <a-col :span="16">
                <div style="margin-top: 6px">
                  <a-button type="primary" size="mini" @click="showCate">添加</a-button>
                </div>
                <div style="margin-top: 10px">
                  <a-table :data="couArr" :pagination="false">
                    <template #empty>
                      <div style="text-align: center; padding: 10px 0; color: #666">请添加介绍</div>
                    </template>
                    <template #columns>
                      <a-table-column title="标题" align="center">
                        <template #cell="{ record }">
                          {{ record.title }}
                        </template>
                      </a-table-column>
                      <a-table-column title="图片" align="center">
                        <template #cell="{ record }">
                          {{ record.picname }}
                        </template>
                      </a-table-column>
                      <a-table-column title="文字描述" align="center">
                        <template #cell="{ record }">
                          {{ record.remark }}
                        </template>
                      </a-table-column>
                      <a-table-column align="left" :width="120">
                        <template #title>
                          <div>操作</div>
                        </template>
                        <template #cell="{ record, rowIndex }">
                          <a-space>
                            <a-button size="mini" type="text" @click="showCate(rowIndex)">新增</a-button>
                            <a-button size="mini" type="text" @click="editCous(record)">编辑</a-button>
                            <a-popconfirm
                              content="是否确认删除?"
                              okText="确认"
                              cancelText="取消"
                              :on-before-ok="
                                (done) => {
                                  introDel(record, done)
                                }
                              "
                              type="warning"
                            >
                              <a-button size="mini" status="danger" type="text">删除</a-button>
                            </a-popconfirm>
                          </a-space>
                        </template>
                      </a-table-column>
                    </template>
                  </a-table>
                </div>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item label="详细介绍" :content-flex="false">
            <a-row class="full-width" style="margin-bottom: 10px">
              <a-col :span="16">
                <a-select v-model="tplId" placeholder="选择内容模板" allow-clear @change="tplChange">
                  <a-option v-for="(item, index) in selectMod" :key="item.id" :value="item.id">{{
                    item.name
                  }}</a-option>
                </a-select>
              </a-col>
              <a-col :span="16">
                <div class="w-tips">说明：选择你想要的【内容模板】覆盖到编辑框；变更模板会覆盖原编辑框的内容！</div>
              </a-col>
            </a-row>
            <a-row class="full-width">
              <a-col :span="22">
                <uedit v-model="form.remark"></uedit>
              </a-col>
            </a-row>
            <a-row class="full-width" style="margin-top: 10px">
              <a-col :span="6">
                <a-button type="primary" size="mini" @click="showUeditor">保存模板</a-button>
                <ueditor-temp ref="ueditorTempRef" type="2"></ueditor-temp>
              </a-col>
            </a-row>
          </a-form-item>
        </a-card>
      </div>
      <div class="btn-wrap">
        <a-button type="primary" @click="saveFn" :loading="loading">保存</a-button>
        <a-button type="outline" style="margin-left: 10px" :disabled="loading">取消</a-button>
      </div>
    </a-form>
    <!-- 分类介绍弹框 -->
    <a-modal v-model:visible="catevisi" :width="800">
      <template #title>分类介绍</template>
      <a-row class="full-width">
        <a-col :span="22">
          <div v-loading="btnloading" gi-loading-type="circle">
            <a-form ref="dialogFormRef" :model="dialogForm" class="init-form">
              <a-form-item field="title" label="图片名称" :rules="[{ required: true, message: '请输入名称' }]">
                <a-input v-model="dialogForm.title" placeholder="" />
                <template #extra>建议 2-5 个单词之间</template>
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
                <template #extra>
                  <a-button type="primary" size="mini" @click="showPicCenter(3)">图片中心选择</a-button>
                  <div style="margin-top: 10px">分类图片建议上传尺寸422px*238px，JPEG、JPG格式，并小于100K。</div>
                </template>
              </a-form-item>
              <a-form-item field="remark" label="图片描述" :rules="[{ required: true, message: '请输入描述' }]">
                <a-textarea type="textarea" v-model="dialogForm.remark" placeholder="" />
                <template #extra> 分类描述，建议 300-350 个字符</template>
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
import { progetTplContent, getCateDetail, saveCateIntro, delCateIntro, getCateTntro, editCateContent } from '@/apis'
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
const fileList = ref([])
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url_l
  } else {
    res.status = 'error'
  }
}
const fileList2 = ref([])
// 获取分类详情
const getDetail = async () => {
  const res = await getCateDetail({ category_id: form.id })
  if (res.code === 0) {
    const { name, parentid, remark, descp, cate_pic_id, cate_pic_url_d, top_pic_id, top_pic_url_d, doc, intro } =
      res.data.category
    form.name = name
    form.parentid = parentid
    form.remark = remark
    form.descp = descp
    selectMod.value = res.data.remark_template
    if (cate_pic_id) {
      fileList.value = [
        {
          uid: cate_pic_id + Math.random().toString(),
          id: cate_pic_id,
          url: cate_pic_url_d
        }
      ]
    }
    if (top_pic_id) {
      fileList2.value = [
        {
          uid: top_pic_id + Math.random().toString(),
          id: top_pic_id,
          url: top_pic_url_d
        }
      ]
    }
    if (doc && doc.length) {
      doc.forEach((item) => {
        item.name = item.docname
        item.uid = item.id + Math.random().toString()
      })
      defaultfilelist.value = doc
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
      })
      if (res.code === 0) {
        Message.success(res.message || '提交成功')
      }
    }
  })
}

// 获取介绍列表
const getCateTntroList = async () => {
  const res = await getCateTntro({
    category_id: form.id
  })
  if (res.code === 0) {
    couArr.value = res.data.list
  }
}
getCateTntroList()
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
  dialogFormRef.value.validate(async (err: string) => {
    if (err) {
      return
    }
    btnloading.value = true
    const { title, remark, id, pic_id, category_id } = dialogForm
    const res = await saveCateIntro({
      id,
      title,
      remark,
      pic_id,
      category_id
    }).finally(() => {
      btnloading.value = false
    })
    if (res.code === 0) {
      catevisi.value = false
      Message.success(res.message || '操作成功')
      getCateTntroList()
    }
  })
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
      url: row.picture_url_l,
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
</script>
<style lang="scss" scoped>
@import './mod/add.scss';
</style>
