<template>
  <div class="banner-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <a-form-item label="上传图片" :content-flex="false">
        <a-row class="full-width">
          <draggable v-model="fileList" class="dra-wrap-b">
            <template #item="{ element, index }">
              <a-col :span="11" class="pic-item">
                <span class="arco-upload-list-picture">
                  <img :src="element.url" :alt="element.name" />
                  <div class="arco-upload-list-picture-mask">
                    <div class="arco-upload-list-picture-operation">
                      <span class="arco-upload-icon arco-upload-icon-preview" v-show="element.picid">
                        <icon-link :size="20" @click="picCropper(element, index)" />
                      </span>
                      <span class="arco-upload-icon arco-upload-icon-preview">
                        <icon-edit :size="20" @click="picListShow(element, index)" />
                      </span>
                      <span class="arco-upload-icon arco-upload-icon-remove">
                        <icon-delete :size="20" @click="picListDel(element)" />
                      </span>
                    </div>
                  </div>
                </span>
              </a-col>
            </template>
            <template #footer>
              <a-col :span="11">
                <a-upload
                  multiple
                  :with-credentials="true"
                  @change="picUploadChange"
                  :file-list="fileList"
                  :show-file-list="false"
                  ref="uploadRef"
                  :data="{ type: '10' }"
                  @success="successUpload"
                  draggable
                  :action="picUrl"
                />
              </a-col>
            </template>
          </draggable>
        </a-row>
        <template #extra>
          <div style="line-height: 18px; max-width: 630px">
            拖拽可调整顺序。提示：建议使用<span class="warning-color">1920*500（主内容宽度在1200px以内）</span
            >尺寸，JPEG、JPG格式，200K以下图片，建议上传多张图片，按住图片拖拽可以调整默认图片和图片顺序;
            点击链接设定可自定义设置点击该图片所指向的链接。
          </div>
        </template>
      </a-form-item>
      <a-form-item label="">
        <div style="margin-top: 20px">
          <a-button type="primary" @click="saveFn" :loading="loading" :disabled="loading">完成</a-button>
        </div>
      </a-form-item>
    </a-form>

    <!-- 描述编辑 -->
    <a-modal v-model:visible="catevisi" :width="800">
      <template #title>设置图片描述</template>
      <a-row class="full-width">
        <a-col :span="22">
          <a-form ref="dialogFormRef" :model="dialogForm" class="init-form">
            <a-form-item field="title" label="标题" :label-col-style="{ 'flex-basis': '76px' }">
              <a-input
                v-model="dialogForm.title"
                placeholder=""
                :max-length="{ length: 20, errorOnly: true }"
                :show-word-limit="true"
              />
              <template #extra>建议填写<span class="warning-color">10-20</span>个字符</template>
            </a-form-item>
            <a-form-item field="remark" label="描述" :label-col-style="{ 'flex-basis': '76px' }">
              <a-textarea
                type="textarea"
                :auto-size="{
                  minRows: 4
                }"
                v-model="dialogForm.picturedesc"
                placeholder=""
                :max-length="{ length: 150, errorOnly: true }"
                :show-word-limit="true"
              />
              <template #extra>建议填写<span class="warning-color">30-150</span>个字符</template>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
      <template #footer>
        <a-button type="primary" @click="cateconfirm">确定</a-button>
        <a-button @click="catevisi = false">取消</a-button>
      </template>
    </a-modal>
    <linkdialog ref="linkRef"></linkdialog>
  </div>
</template>

<script setup lang="ts" name="companyTable">
import { reactive, ref, h, nextTick } from 'vue'
import { getHomeBanner, pictureDdel, saveHomeBanner } from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import lodash from 'lodash'
import draggable from 'vuedraggable'
import linkdialog from './mod/linkdialog.vue'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const picUrl = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX + '?r=picture/upload'
const form = reactive({})
// 图片上传
const fileList = ref([])
const picUploadChange = (file) => {
  fileList.value = file
  // console.log(file, file[2].status, file[2].percent)
  // fileList.value.push(file[file.length - 1])
}
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url
  } else {
    res.status = 'error'
  }
}
const loading = ref(false)
const saveFn = async () => {
  loading.value = true
  const params = fileList.value.map((item, index) => {
    const { id, title, picturedesc } = item
    return {
      id,
      title,
      picturedesc,
      sort: index
    }
  })
  const res = await saveHomeBanner({
    home_banner: params
  }).finally(() => {
    loading.value = false
  })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
  }
}
const picListDel = (file) => {
  const index = lodash.findIndex(fileList.value, function (o) {
    return o.uid == file.uid
  })
  delPicAjax(fileList.value[index].id)
  fileList.value.splice(index, 1)
}

const delPicAjax = async (id) => {
  const res = await pictureDdel({
    id,
    sid: userStore.userInfo.homeInfo.company.id,
    type: '10'
  })
}

const catevisi = ref(false)
const dialogForm = reactive({
  title: '',
  picturedesc: ''
})
const cateconfirm = () => {
  fileList.value[currentIndex.value].title = dialogForm.title
  fileList.value[currentIndex.value].picturedesc = dialogForm.picturedesc
  catevisi.value = false
}
const currentIndex = ref(0)
const picListShow = (item, index) => {
  currentIndex.value = index
  const { title, picturedesc } = item
  dialogForm.title = title
  dialogForm.picturedesc = picturedesc
  catevisi.value = true
}
const linkRef = ref()
const picCropper = (item, index) => {
  currentIndex.value = index
  linkRef.value?.showDialog(item.id)
}
const getDate = async () => {
  const res = await getHomeBanner()
  if (res.code == 0) {
    res.data.banner.forEach((item) => {
      item.uid = item.id
      item.url = item.picture_url
    })
    fileList.value = res.data.banner
  }
}
getDate()
</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
