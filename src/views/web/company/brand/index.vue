<template>
  <div class="brand-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <a-row>
        <a-col :span="18">
          <a-form-item label="介绍说明">
            <a-textarea
              :auto-size="{
                minRows: 2
              }"
              :max-length="{ length: 150, errorOnly: true }"
              allow-clear
              show-word-limit
              v-model="form.partnersinfo"
            ></a-textarea>
            <template #extra> 合作品牌说明，建议<span class="warning-color">100-120</span>个字符 </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="18">
          <a-form-item label="品牌Logo">
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
            <template #extra>
              <div style="line-height: 18px">拖拽可调整顺序</div>
              <a-button type="primary" size="mini" style="margin: 8px 0 8px 0" @click="showPicCenter"
                >图片中心选择</a-button
              >
              <pic-dialog ref="picDialogRef" @change="picChange"></pic-dialog>
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="full-width">
        <a-col :span="18">
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
  </div>
</template>
<script setup lang="ts" name="brandname">
import { reactive, ref, h, nextTick } from 'vue'
import { getCompanyPartner, saveCompanyPartner, pictureDdel } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import { getTreeDate } from '@/utils/common'
import picDialog from '@/components/commonDialog/picDialog.vue'
import lodash from 'lodash'
import draggable from 'vuedraggable'
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const picType = '21'
const formRef = ref()
const form = reactive({
  partnersinfo: ''
})
const loading = ref(false)
// 图片中心
const fileList = ref([])
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
const picPreviewSrc = ref<string>('')
const picPrewiewVisible = ref<boolean>(false)
const picListShow = (file) => {
  picPreviewSrc.value = file.url
  picPrewiewVisible.value = true
}
const picChange = (imgArr) => {
  imgArr.forEach((item) => {
    item.id = item.picid
    item.url = item.picture_url_l
    item.uid = item.id + Math.random()
  })
  fileList.value = fileList.value.concat(imgArr)
}
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
  fileList.value = arr
}
const getData = async () => {
  const res = await getCompanyPartner()
  if (res.code == 0) {
    form.partnersinfo = res.data.partnersinfo
    res.data.picture_info.forEach((item, index) => {
      item.uid = item.id
      item.url = item.picture_url
    })
    fileList.value = res.data.picture_info
  }
}
getData()
const saveFn = async () => {
  loading.value = true
  const picArr = fileList.value.map((item, index) => ({ id: item.id, sort: index }))
  const res = await saveCompanyPartner({
    partnersinfo: form.partnersinfo,
    picture_info: picArr
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
