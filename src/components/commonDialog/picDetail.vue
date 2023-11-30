<template>
  <div class="dialog-pic-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="900" title="视频详情">
      <template #footer>
        <a-button @click="handleBeforeOk">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">更换</a-button>
        
      </template>
      <template #title>
        <div class="cus-tit">
          <div class="tit">图片详情</div>
        </div>
      </template>
      <div class="detail-content" v-loading="loading">
        <a-row>
          <a-col :span="11">
            <div class="video-box">
              <img src="https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360" alt="" />
            </div>
          </a-col>
          <a-col :span="12" :offset="1">
            
            <a-form label-align="left" :model="form" :class="{'edit-form': isEdit}" ref="formRef" direction="vertical" auto-label-width layout="vertical">
              <a-row>
                <a-col :span="24">
                  <div class="pic-name">our-6.png</div>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <a-form-item field="tpl" label="图片分组：">
                    <div class="item-content">未分组</div>
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item field="tpl" label="上传日期：">
                    <div class="item-content">2023-09-25 17:40:49</div>
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item field="tpl" label="正在被引用：">
                    <div class="item-content"><img class="icon-img" :src="icon" alt="icon">是
                      <div>共有 <span class="wraning-class">0</span> 个产品图片引用了该图片</div>
                      <div class="alert-box">
                        <a-alert type="warning">标注<img class="icon-img" :src="icon" alt="icon">的图片正在被产品详细描述所引用。如果删除这些图片，产品详细描述将无法正常显示。</a-alert>
                      </div>
                    </div>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </a-modal>
    <set-product ref="setProductRef"></set-product>
  </div>
</template>
<script setup lang="ts" name="picDetail">
import setProduct from '@/components/commonDialog/setProduct.vue'
import { ref, reactive } from 'vue'
import { getVideoDetail, setVideoSwitch, pubYoutube, setVideoEdit } from '@/apis'
import lodash from 'lodash'
import { Message } from '@arco-design/web-vue'
import icon from '@/assets/images/right-icon2.png'
const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}
const showDialog = (info) => {
  isEdit.value = false
  videoId.value = info.id
  // getDetail(info.id)
  visible.value = true
}
const publish = async () => {
  const res = await pubYoutube({
    id: videoId.value
  })
  if (res.code == 0) {
    Message.success(res.message || '操作成功')
  }
}
const setYouTube = async (val) => {
  const res = await setVideoSwitch({
    id: videoId.value,
    platform: 'youtube',
    status: val
  })
}
const setTictok = async (val) => {
  const res = await setVideoSwitch({
    id: videoId.value,
    platform: 'tiktok',
    status: val
  })
}
const isEdit = ref(false)
const goList = () => {
  window.open('/newmyt/web/webproduct/list?video_id=' + videoId.value, '_blank')
}
const getName = (id) => {
  if (!id) {
    return '未分组'
  } else {
    const index = lodash.findIndex(videoDetail.value.group, { id })
    return index != -1 ? videoDetail.value.group[index].name : '未分组'
  }
}
const toArr = (str) => {
  if (!str) {
    return []
  } else {
    return str.split(',')
  }
}
const videoId = ref('')
const videoDetail = ref({ video: { ad_tiktok: '0', ad_switch: '0' }, group: [], tpl: [] })
const loading = ref(false)
const getDetail = async (id) => {
  loading.value = true
  const res = await getVideoDetail({
    id
  }).finally(() => {
    loading.value = false
  })
  if (res.code == 0) {
    videoDetail.value = res.data
    const { title, desc, tags, vcid, words_value, selling_point_value } = res.data.video
    form.value = {
      title, desc, tags, group_id: vcid, words: words_value, selling_point: selling_point_value
    }
  }
}
const goPlay = () => {
  localStorage.setItem('videoSrc', videoDetail.value.video?.ecer_play_url)
  window.open(
    '//www.maoyt.com/video/ecerplay.html',
    'newwindow',
    'height=500, width=900, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no'
  )
}
const download = () => {}
const emit = defineEmits(['change', 'delete'])
const form = ref({
  tpl: '',
  title: '',
  desc: '',
  tags: [],
  group_id: '',
  words: [],
  selling_point: []
})

const setProductRef = ref()
const showProduct = () => {
  setProductRef.value.showDialog(videoId.value)
}
const changeTpl = (index) => {
  if (form.value.tpl === index) {
    form.value.tpl = ''
    const {desc, tags, title} = videoDetail.value.video
    form.value.title = title
    form.value.desc = desc
    form.value.tags = tags
  } else {
    form.value.tpl = index
    const {desc, tags, title} = videoDetail.value.tpl[index]
    form.value.title = title
    form.value.desc = desc
    form.value.tags = tags
  }
}
const formRef = ref()
const handleBeforeOk = () => {
  if (isEdit.value) {
    console.log(66)
    formRef.value.validate(async(val) => {
      console.log(val, '3333')
      if (val) {
        return
      }
      loading.value = true
      const res = await setVideoEdit({
        id: videoId.value,
        ...form.value
      }).finally(() => {
        loading.value = false
      })
      if (res.code == 0) {
        Message.success('请求成功')
        visible.value = false
      }
    })
  } else {
    emit('change')
    visible.value = false
  }
}
defineExpose({
  showDialog,
  handleCancel,
  handleBeforeOk
})
</script>
<style lang="scss" scoped>
.img-box {
  display: flex;
  max-height: 350px;
  flex-wrap: wrap;
  overflow-y: auto;
  .item {
    width: 130px;
    height: 120px;
    margin: 0 12px 12px 0;
    position: relative;
    cursor: pointer;
    .check-wrap {
      position: absolute;
      top: 10px;
      left: 10px;
      pointer-events: none;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 4px;
    }
  }
}
.page-box {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.cus-tit {
  display: flex;
  justify-content: space-between;
  width: 95%;
  .info {
    font-size: 12px;
    a {
      color: rgb(var(--primary-6));
      text-decoration: none;
      line-height: 25px;
    }
  }
}
.video-box {
  width: 100%;
  height: 400px;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .play-icon {
    color: #eaeaea;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.switch-box {
  margin-top: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  span {
    margin-left: 14px;
  }
}
.down-box {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  :deep(.arco-btn-size-large) {
    padding: 0 47px;
  }
}
.pro-name {
  font-size: 18px;
  font-weight: bold;
  color: var(--color-text-1);
  margin-bottom: 10px;
}
.detail-content :deep(.arco-form-item) {
  margin-bottom: 8px;
}
.nor-a {
  text-decoration: none;
}
:deep(.arco-tag-checkable) {
  background-color: var(--color-fill-2);
}
.nor-span-tag {
  margin-left: 6px;
}
.edit-form :deep(.arco-form-item-label-col > .arco-form-item-label) {
  min-width: 100px;
}
.pic-name {
  font-size: 18px;
  margin-bottom: 15px;
}
.item-content {
  // margin-top: -10px;
}
.icon-img {
  vertical-align: middle;
  margin-right: 4px;
  position: relative;
  top: -1px;
}
.alert-box {
  margin-top: 8px;
  .icon-img {
    margin-left: 4px;
  }
}
</style>
