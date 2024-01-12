<template>
  <div class="msg-detail-out">
    <div class="top-nav-tit">
      <div class="m-left">回复买家</div>
      <div class="m-right"></div>
    </div>
    <div class="msg-detail detail">
      <a-card :bordered="false">
        <uedit v-model="message.message" ></uedit>
        <div class="translate" v-if="translateMessage">
          {{ translateMessage }}
        </div>
        <a-row :gutter="16" class="actionwrap">
          <a-col :span="12">
            <a-upload
              :show-retry-button="false"
              :action="picUploadUrl"
              multiple
              :with-credentials="true"
              @change="
                (res) => {
                  picUploadChange(res, 2)
                }
              "
              @success="successUpload"
              :file-list="fileList"
              ref="uploadRef"
            >
              <template #upload-button>
                <a-button type="secondary" size="small">
                  <template #icon><icon-attachment /></template>
                  <template #default>添加附件</template>
                </a-button>
              </template>
            </a-upload>
          </a-col>
          <a-col :span="12">
            <a-space :size="8" class="action">
              <a-button type="primary" size="small" @click="getMailsignAction()">
                <template #default>编辑邮件签名</template>
              </a-button>
              <a-button type="primary" v-show="!visible" size="small" class="aibtn" @click="handleClick()">
                <template #icon>
                  <AIIconWhite></AIIconWhite>
                </template>
                <template #default>AI智能翻译</template>
              </a-button>
              <a-button type="primary" v-show="visible" class="ai_translate">
                <span class="ai_ball"></span>
                <span class="ai_ball"></span>
                <span class="ai_ball"></span>
                <span class="ai_ball"></span>
                <span class="ai_ball"></span>
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-card>
    </div>
    <a-modal v-model:visible="popup" :width="286">
      <template #title>提示</template>
      <div>
        <icon-exclamation-circle-fill size="16" style="color: rgb(var(--orangered-5))" /> 确定向负责人发送此询盘邮件?
      </div>
      <template #footer>
        <a-button @click="popup = false" :disabled="btnloading">取消</a-button>
        <a-button type="primary" @click="saveFn" :loading="btnloading">确定</a-button>
      </template>
    </a-modal>
    <a-modal v-model:visible="mailsignvisible">
      <template #title>编辑邮件签名</template>
      <div>
        <uedit v-model="mailsignText"></uedit>
      </div>
      <a-radio v-model="is_sys">使用系统生成</a-radio>
      <template #footer>
        <a-button @click="close()" :disabled="btnloading">取消</a-button>
        <a-button type="primary" @click="setMailsignAction()" :loading="btnloading">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="adv">
import { reactive, ref, toRaw } from 'vue'
import { detailInquiry, translateInquiry, inquiry, getMailsign, setMailsign } from '@/apis'
import { useRouter, useRoute } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import uedit from '@/components/editor/uedit.vue'
import { useFileStore } from '@/store'
import AIIconWhite from '../detail/AIIconWhite.vue'
const popup = ref(false)
const btnloading = ref(false)
const is_sys = ref()

const fileStore = useFileStore()

const router = useRouter()
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=inquiry/add-attachment'
const visible = ref(false)
const mailsignvisible = ref(false)
const mailsignText = ref()

const fileList = ref([])

const fileLogo = ref([])
fileStore.setloading(false)
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.file_name = res.response.data?.file_name
    res.file_type = res.response.data?.file_type
    res.file_size = res.response.data?.file_size
    res.file_path = res.response.data?.file_path
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

const fileDia = ref([])

const translateMessage = ref()
const route = useRoute()

let form = reactive({
  iid: route.query.iid || '',
  topic: '',
  can_reply: '',
  replyData: {
    message: '',
    topic: ''
  },
  attachment: []
})
const message = reactive({
  message: ''
})
const gettranslate = async (text: string) => {
  const { code, data } = await translateInquiry({
    iid: route.query.iid,
    type: 2,
    lang: 'English',
    message: text
  })
  if (code == 0) {
    message.message = data.message.text
    visible.value = false
  }
}
const getMailsignAction = async () => {
  const { code, data } = await getMailsign({})
  if (code == 0) {
    mailsignText.value = data
    mailsignvisible.value = true
  }
}
const close = async () => {
  mailsignvisible.value = false
  is_sys.value = false
}

const setMailsignAction = async () => {
  const { code } = await setMailsign({
    is_sys: is_sys.value ? '1' : '',
    signature: mailsignText.value
  })
  if (code == 0) {
    Message.success('设置成功')
    mailsignvisible.value = false
  }
}
const handleClick = () => {
  gettranslate(message.message)
  visible.value = true
}
const saveFn = async () => {
  fileStore.setloading(true)
  btnloading.value = true
  const attachment = fileList.value.map((item: any) => {
    return {
      file_name: item.file_name,
      file_type: item.file_type,
      file_size: item.file_size,
      file_path: item.file_path
    }
  })
  const res = await inquiry({
    iid: form.iid,
    subject: form.replyData.topic,
    message: message.message,
    attachment
  }).finally(() => {
    fileStore.setloading(false)
  })
  btnloading.value = false
  popup.value = false
  if (res.code == 0) {
    // Message.success(res.message || '发送成功')
    router.push({ path: '/web/inquiry/detail', query: { iq_source: 1, iid: form.iid } })
  }
}
const getData = async () => {
  const res = await detailInquiry({
    iq_source: 1,
    iid: form.iid
  })
  if (res.code == 0) {
    form = res.data || ''
    message.message = res.data.replyData.message || ''
  }
}
getData()

fileStore.$onAction(({ name }) => {
  if (form.can_reply == '1') {
    if (name === 'cancel') {
      router.go(-1)
    } else if (name === 'save') {
      saveFn()
      // popup.value = true
    }
  }
})
</script>
<style lang="scss" scoped>
@import './mod/index.scss';
</style>
