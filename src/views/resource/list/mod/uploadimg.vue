<template>
  <div class="dialog-pic-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="600" title="视频详情">
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确定</a-button>
      </template>
      <template #title>
        <div class="cus-tit">
          <div class="tit">上传图片</div>
        </div>
      </template>
      <div class="detail-content" v-loading="loading">
        <a-form label-align="left" :model="form" ref="formRef" auto-label-width layout="horizontal">
          <a-row>
            <a-col :span="24">
              <a-form-item field="picname" label="图片名称">
                <a-input v-model="form.picname" placeholder="请输入图片名称"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item field="tpl" label="浏览图片">
                <a-upload
                  v-show="!fileLogo.length"
                  list-type="picture-card"
                  :action="logourl"
                  :file-list="fileLogo"
                  :data="{
                    type: form.type,
                    picname: form.picname
                  }"
                  :auto-upload="false"
                  ref="uploadref"
                  :show-preview-button="false"
                  :show-retry-button="false"
                  :limit="1"
                  @success="successUploadlogo"
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
                <div v-show="fileLogo.length" class="arco-upload-wrapper arco-upload-wrapper-type-picture-card">
                  <div v-for="(element, index) in fileLogo" :key="'up' + index">
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
                            ><icon-delete @click="logodel(element)" />
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
                          <!-- <span class="arco-upload-icon arco-upload-icon-preview">
                            <icon-eye @click="picListShow(element)" />
                          </span> -->
                          <span class="arco-upload-icon arco-upload-icon-remove">
                            <icon-delete @click="logodel(element)" />
                          </span>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="picupload">
import { ref, reactive } from 'vue'
import { getVideoDetail, setVideoSwitch, pubYoutube, setVideoEdit } from '@/apis'
import lodash from 'lodash'
import { Message } from '@arco-design/web-vue'
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const logourl = baseURL + '?r=picture/upload'
const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}

const showDialog = () => {
  form.value.picname = ''
  fileLogo.value = []
  visible.value = true
}

const emit = defineEmits(['change', 'delete'])
const form = ref({
  picname: '',
  desc: '',
  type: '4'
})

const formRef = ref()
const uploadref = ref()
const handleBeforeOk = () => {
  if (!fileLogo.value.length) {
    return Message.warning('请选择图片')
  }
  uploadref.value?.submit()
}
const picUploadChange = (arr, type) => {
  fileLogo.value = arr
}
const logodel = (item) => {
  fileLogo.value = []
}
const fileLogo = ref([])
const successUploadlogo = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url + '?' + new Date().getTime()
    res.picture_path = res.response.data?.picture_path
    emit('change')
    visible.value = false
  } else {
    Message.warning(res.response.message || '上传失败')
    res.status = 'error'
  }
}
defineExpose({
  showDialog,
  handleCancel,
  handleBeforeOk
})
</script>
<style lang="scss" scoped></style>
