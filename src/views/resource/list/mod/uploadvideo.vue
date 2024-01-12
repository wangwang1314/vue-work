<template>
  <div class="dialog-video-wrap">
    <!-- 视频上传弹框 -->
    <a-modal v-model:visible="videoDialog" :mask-closable="false" :width="600" title="上传视频">
      <template #footer>
        <span></span>
      </template>
      <div v-loading="loading" gi-loading-type="circle">
        <a-upload
          draggable
          :action="baseURL + '?r=video/upload'"
          @success="videosuccess"
          :show-retry-button="false"
          accept="video/*"
          multiple
          :on-before-upload="beforeUpdata"
          :with-credentials="true"
          :show-file-list="false"
        >
          <template #upload-button>
            <div class="arco-upload-drag">
              <div><Icon-plus></Icon-plus></div>
              <div class="arco-upload-drag-text" style="margin-top: -10px">点击或拖拽文件到此处上传</div>
              <div
                class="arco-upload-drag-text"
                style="padding: 0 16px; margin-top: 6px; color: var(--color-text-6); font-size: 12px"
              >
                请上传时长不超过15分钟的视频文件，大小不超过500M 视频推荐格式.mp4，支持格式.mov .mpeg4 .wmv .mpegps
                视频尺寸建议为16:9，例如640x360像素、853x480像素、1138x640像素、1280x720像素
                用于公司介绍、实力介绍、新闻案例和产品详细描述的视频建议时长在3分钟以内
                用于产品头图位置的产品简介视频建议时长在30秒以内
                不能上传与YouTube视频重复的视频，否则YouTube账号会被终止，不可恢复
                您当前为独立授权客户，每24小时内有上传视频的额度限制（一般为4个）
              </div>
            </div>
          </template>
        </a-upload>
      </div>
    </a-modal>
    <a-modal v-model:visible="videinfo" :mask-closable="false" :width="600" title="上传视频">
      <a-form label-align="left" :model="form" ref="formRef" direction="vertical" auto-label-width>
        <a-form-item label="视频标题" field="title" :rules="rules.title">
          <a-input
            v-model="form.title"
            placeholder="请使用英文标题，适度覆盖与视频相关的关键词，最多100个字符"
            show-word-limit
            max-length="100"
            allow-clear
          ></a-input>
        </a-form-item>
        <a-form-item label="视频分组" field="group_id">
          <a-select placeholder="请选择" v-model="form.group_id">
            <a-option value="0">未分组</a-option>
            <a-option v-for="(item, index) in grouplist" :value="item.id" :key="item.id">{{ item.name }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="视频标签" field="tags" :rules="rules.tags">
          <a-input-tag v-model="form.tags" placeholder="Add a tag" allow-clear />
        </a-form-item>
        <a-form-item label="视频描述" field="desc" :rules="rules.desc">
          <a-textarea
            v-model="form.desc"
            placeholder="请使用英文描述该视频，首行建议如下Good quality 您的主营类目 provider from China，Visit 您的域名 for more information."
            :auto-size="{
              minRows: 4,
              maxRows: 5
            }"
          />
        </a-form-item>
        <a-form-item label="视频封面" field="cover">
          <a-radio-group v-model="form.cover">
            <a-radio value="0">自动生成</a-radio>
            <a-radio value="1">上传封面</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item  v-show="form.cover == '1'">
          <a-upload
            list-type="picture-card"
            action="/"
            :auto-upload="false"
            :file-list="fileimg"
            :image-preview="false"
            :show-retry-button="false"
            :show-preview-button="false"
            :limit="1"
            @change="filechange"
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
            <div style="line-height: 18px">要求640*480px的JPG图片,最大不能超过2M</div>
          </template>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="videinfo = false">取消</a-button>
        <a-button type="primary" @click="confirm">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="picupload">
import { ref, reactive } from 'vue'
import { getVideoDetail, setVideoSwitch, pubYoutube, setVideoEditv2 } from '@/apis'
import lodash from 'lodash'
import { Message } from '@arco-design/web-vue'
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const logourl = baseURL + '?r=picture/upload'
const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}
const emit = defineEmits(['change'])
const loading = ref(false)
const showDialog = () => {
  videoDialog.value = true
}
const videoDialog = ref(false)
const videoId = ref('')
const videosuccess = (res) => {
  loading.value = false
  if (res.response.code == 0) {
    videoDialog.value = false
    videoId.value = res.response.data?.id
    initVideo()
    // emit('change')
  } else {
    Message.warning(res.response.message || '上传失败')
  }
}
const initVideo = () => {
  videinfo.value = true
  formRef.value?.resetFields()
  fileimg.value = []
  contentimg.value = []
}
const beforeUpdata = (res) => {
  loading.value = true
  return res
}
const videinfo = ref(false)
const form = reactive({
  title: '',
  desc: '',
  tags: [],
  group_id: '0',
  cover: '0'
})
const formRef = ref()
const prop = defineProps(['grouplist'])
const fileimg = ref([])
const contentimg = ref([])
const filechange = (res) => {
  if (res && res.length) {
    const file = res[0].file
    contentimg.value.push(file)
    const typeArr = ['image/jpeg', 'image/jpg']
    if (!~typeArr.indexOf(file.type)) {
      fileimg.value = []
      contentimg.value = []
      return Message.warning('图片文件类型错误，只允许上传jpg图片')
    }
    if (file.size > 2 * 1024 * 1024) {
      fileimg.value = []
      contentimg.value = []
      Message.warning('大小不能超过2M')
      return false
    }
    const max_width = 640
    const max_height = 480
    const reader = new FileReader()
    //读取图片文件
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      const image = new Image()
      //FileReader获得Base64字符串
      image.src = e.target.result
      image.onload = function () {
        if (Math.abs(this.width - max_width) > 100 || Math.abs(this.height - max_height) > 100) {
          fileimg.value = []
          contentimg.value = []
          Message.warning('上传视频封面长宽为640*480px')
        }
      }
    }
    return res
  }
}
const rules = ref({
  title: [
    { required: true, message: '请填写视频标题' },
    {
      validator: (value, cb) => {
        const b = new RegExp('[\\u4e00-\\u9fa5]', '')
        if (b.test(value)) {
          cb('视频标题不能含有中文')
        }
      }
    }
  ],
  tags: [
    { required: true, message: '请填写视频标签' },
  ],
  desc: [
    { required: true, message: '请填写视频描述' },
    {
      validator: (value, cb) => {
        const b = new RegExp('[\\u4e00-\\u9fa5]', '')
        if (b.test(value)) {
          cb('视频描述不能含有中文')
        }
      }
    }
  ],
})
const confirm = () => {
  formRef.value?.validate(async(vali) => {
    if (vali) {
      return
    }
    if (form.cover == '1' && !contentimg.value.length) {
      Message.warning('请选择上传封面图片')
      return
    }
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('desc', form.desc)
    form.tags.forEach((item) => {
      formData.append('tags[]', item)
    })
    formData.append('id', videoId.value)
    formData.append('group_id', form.group_id)
    formData.append('file', contentimg.value[0])
    const res = await setVideoEditv2(formData)
    if (res.code == 0) {
      videinfo.value = false
      emit('change')
    }
  })
}
defineExpose({
  showDialog
})
</script>
<style lang="scss" scoped></style>
