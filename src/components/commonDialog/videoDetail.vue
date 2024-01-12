<template>
  <div class="dialog-pic-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="750" title="视频详情">
      <template #footer>
        <a-button type="primary" @click="handleBeforeOk" :disabled="loading">确定</a-button>
      </template>
      <template #title>
        <div class="cus-tit">
          <div class="tit">视频详情</div>
        </div>
      </template>
      <div class="detail-content" v-loading="loading">
        <a-row>
          <a-col :span="6">
            <div class="video-box">
              <a @click="goPlay" target="_blank">
                <img :src="videoDetail.video.img_path" alt="" />
                <icon-play-circle-fill size="50" class="play-icon" />
              </a>
            </div>
            <a-space :size="3" style="margin-top: 16px">
              <a-button type="primary" size="small" @click="goPlay">预览视频</a-button>
              <a-button type="primary" size="small" @click="isEdit = true">编辑详情</a-button>
            </a-space>
            <!-- <div class="switch-box">
              <a-switch
                checked-value="1"
                unchecked-value="0"
                @change="setYouTube"
                v-model="videoDetail.video.ad_switch"
              ></a-switch>
              <span>YouTube广告投放</span>
            </div>
            <div class="switch-box">
              <a-switch
                checked-value="1"
                unchecked-value="0"
                @change="setTictok"
                v-model="videoDetail.video.ad_tiktok"
              ></a-switch
              ><span>Tiktok广告投放</span>
            </div>
            <div class="down-box">
              <a-button type="primary" size="large" @click="publish" style="width: 180px">发布至YouTube频道</a-button>
            </div>
            <div class="down-box">
              <a class="nor-a" :href="videoDetail.video.youtube_url_local" target="_blank" ref="nofollow"
                ><a-button type="primary" size="large" @click="download">下载视频文件</a-button></a
              >
            </div> -->
          </a-col>
          <a-col :span="17" :offset="1">
            <div class="pro-name" v-show="!isEdit">{{ videoDetail.video.title }}</div>
            <a-form
              label-align="left"
              :model="form"
              :class="{ 'edit-form': isEdit }"
              ref="formRef"
              direction="vertical"
              auto-label-width
              layout="horizontal"
            >
              <a-row v-show="isEdit">
                <a-col :span="24">
                  <a-form-item v-if="videoDetail.tpl && videoDetail.tpl.length" :label-col-style="{ flex: '0 0 56px' }" field="tpl" label="使用自动描述">
                    <span
                      @click="changeTpl(index)"
                      v-for="(item, index) in videoDetail.tpl"
                      :key="index"
                      :class="{ 'arco-tag-checked': form.tpl === index }"
                      class="nor-span-tag arco-tag arco-tag-size-medium arco-tag-arcoblue arco-tag-checkable"
                      >{{ '模板' + (index + 1) }}</span
                    >
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row v-show="isEdit">
                <a-col :span="24">
                  <a-form-item
                    :rules="[{ required: true, message: '请输入' }]"
                    :label-col-style="{ flex: '0 0 56px' }"
                    field="title"
                    label="视频标题"
                  >
                    <a-input placeholder="请输入" v-model="form.title"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row v-show="!isEdit">
                <a-col :span="24">
                  <a-form-item :label-col-style="{ flex: '0 0 56px' }" field="value1" label="视频分组">
                    {{ getName(videoDetail.video.vcid) }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row v-show="isEdit">
                <a-col :span="24">
                  <a-form-item :label-col-style="{ flex: '0 0 56px' }" field="value1" label="视频分组">
                    <a-select :style="{ width: '320px' }" placeholder="请选择" v-model="form.group_id">
                      <a-option value="0">未分组</a-option>
                      <a-option v-for="(item, index) in videoDetail.group" :key="item.id" :value="item.id">{{
                        item.name
                      }}</a-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="10">
                  <a-form-item :label-col-style="{ flex: '0 0 56px' }" field="value1" label="视频时长">
                    {{ videoDetail.video.duration }}
                  </a-form-item>
                </a-col>
                <a-col :span="13">
                  <a-form-item :label-col-style="{ flex: '0 0 56px' }" field="value1" label="上传日期">
                    {{ videoDetail.video.add_time }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row v-show="!isEdit">
                <a-col :span="24">
                  <a-form-item :label-col-style="{ flex: '0 0 56px' }" field="value1" label="视频标签">
                    <a-tag style="margin-right: 4px" v-for="(item, index) in videoDetail.video.tags" :key="index">{{
                      item
                    }}</a-tag>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row v-show="isEdit">
                <a-col :span="24">
                  <a-form-item :label-col-style="{ flex: '0 0 56px' }" field="tags" label="视频标签">
                    <a-input-tag v-model="form.tags" placeholder="请输入" allow-clear />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row v-show="!isEdit">
                <a-col :span="24">
                  <a-form-item :label-col-style="{ flex: '0 0 56px' }" field="value1" label="视频描述">
                    <div style="max-height: 120px; overflow: auto">{{ videoDetail.video.desc }}</div>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row v-show="isEdit">
                <a-col :span="24">
                  <a-form-item :label-col-style="{ flex: '0 0 56px' }" field="desc" label="视频描述">
                    <a-textarea placeholder="请输入" v-model="form.desc" allow-clear />
                  </a-form-item>
                </a-col>
              </a-row>
              <!-- <a-row>
                <a-col :span="8">
                  <a-form-item :label-col-style="{ flex: '0 0 100px' }" field="value1" label="点播观看次数">
                    {{ videoDetail.video.ecer_view }}
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :label-col-style="{ flex: '0 0 100px' }" field="value1" label="YouTube观看次数">
                    {{ videoDetail.video.youtube_view }}
                  </a-form-item>
                </a-col>
              </a-row> -->
              <a-row>
                <!-- <a-col :span="8">
                  <a-form-item :label-col-style="{ flex: '0 0 80px' }" field="value1" label="正在被引用">
                    {{ videoDetail.video.used > 0 ? '是' : '否' }}
                  </a-form-item>
                </a-col> -->
                <a-col :span="16">
                  <a-form-item :label-col-style="{ flex: '0 0 70px' }" field="value1" label="引用次数">
                    {{ videoDetail.video.used }}
                    <!-- <a-link @click="goList">查看引用产品（{{ videoDetail.video.video_p_count }}）</a-link>
                    <a-link @click="showProduct">设定产品>></a-link> -->
                  </a-form-item>
                </a-col>
              </a-row>
              <!-- <a-row>
                <a-col :span="24">
                  <a-form-item :label-col-style="{ flex: '0 0 80px' }" field="value1" label="YouTube视频页地址">
                    <a-link target="_blank" :href="videoDetail.video.youtube_url">{{
                      videoDetail.video.youtube_url
                    }}</a-link>
                  </a-form-item>
                </a-col>
              </a-row> -->
              <!-- <a-row v-show="!isEdit">
                <a-col :span="24">
                  <a-form-item :label-col-style="{ flex: '0 0 80px' }" field="value1" label="关键词">
                    {{ videoDetail.video.words_value?.toString() }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row v-show="isEdit">
                <a-col :span="24">
                  <a-form-item :label-col-style="{ flex: '0 0 80px' }" field="words" label="关键词">
                    <a-input-tag v-model="form.words" placeholder="请输入" allow-clear />
                  </a-form-item>
                </a-col>
              </a-row> -->
              <!-- <a-row v-show="!isEdit">
                <a-col :span="24">
                  <a-form-item :label-col-style="{ flex: '0 0 80px' }" field="value1" label="卖点">
                    {{ videoDetail.video.selling_point_value?.toString() }}
                  </a-form-item>
                </a-col>
              </a-row> -->
              <!-- <a-row v-show="isEdit">
                <a-col :span="24">
                  <a-form-item :label-col-style="{ flex: '0 0 80px' }" field="selling_point" label="卖点">
                    <a-input-tag v-model="form.selling_point" placeholder="请输入" allow-clear />
                  </a-form-item>
                </a-col>
              </a-row> -->
            </a-form>
          </a-col>
        </a-row>
      </div>
    </a-modal>
    <set-product ref="setProductRef"></set-product>
  </div>
</template>
<script setup lang="ts" name="videoDetail">
import setProduct from '@/components/commonDialog/setProduct.vue'
import { ref, reactive } from 'vue'
import { getVideoDetail, setVideoSwitch, pubYoutube, setVideoEdit } from '@/apis'
import lodash from 'lodash'
import { Message } from '@arco-design/web-vue'
const baseRoute = import.meta.env.VITE_ROURE_BASE_URL
const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}
const showDialog = (info) => {
  isEdit.value = false
  videoId.value = info.id
  getDetail(info.id)
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
  window.open(baseRoute + '/web/webproduct/list?video_id=' + videoId.value, '_blank')
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
      title,
      desc,
      tags,
      group_id: vcid,
      words: words_value,
      selling_point: selling_point_value
    }
  }
}
const goPlay = () => {
  localStorage.setItem('videoSrc', videoDetail.value.video?.ecer_play_url)
  if (videoDetail.value.video.ecer_status == 0 || videoDetail.value.video.ecer_status == 1) {
    window.open(
      baseRoute + '/ecerplay',
      'newwindow',
      'height=500, width=900, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no'
    )
  }
}
const download = () => {}
const emit = defineEmits(['change', 'delete', 'update'])
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
    const { desc, tags, title } = videoDetail.value.video
    form.value.title = title
    form.value.desc = desc
    form.value.tags = tags
  } else {
    form.value.tpl = index
    const { desc, tags, title } = videoDetail.value.tpl[index]
    form.value.title = title
    form.value.desc = desc
    form.value.tags = tags
  }
}
const formRef = ref()
const handleBeforeOk = () => {
  if (isEdit.value) {
    formRef.value.validate(async (val) => {
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
        emit('update')
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
  height: 143px;
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
</style>
