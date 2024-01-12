<template>
  <div class="dialog-pic-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="600" title="视频详情">
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确定</a-button>
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
              <img :src="infodata.picture_url_d" alt="" />
            </div>
          </a-col>
          <a-col :span="12" :offset="1">
            <a-form
              label-align="left"
              :model="form"
              ref="formRef"
              direction="vertical"
              auto-label-width
              layout="vertical"
            >
              <a-row :gutter="12">
                <template v-if="isEdit">
                  <a-col :span="18">
                    <a-input v-model="infodata.picname"></a-input>
                  </a-col>
                  <a-col :span="6">
                    <icon-check class="check-icon" @click="changenameFn" />
                  </a-col>
                </template>

                <a-col :span="24" v-else>
                  <div class="pic-name">
                    <span class="name-inner">{{ infodata.picname }}</span
                    ><icon-edit @click="goedit" />
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <a-form-item field="tpl" label="图片分组：">
                    <div class="item-content">{{ infodata.group_name ? infodata.group_name : '未分组' }}</div>
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item field="tpl" label="上传日期：">
                    <div class="item-content">{{ infodata.addtime }}</div>
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item field="tpl" label="引用次数：">
                    <div class="item-content">
                      <div>{{ infodata.picture_count }}</div>
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
import { getVideoDetail, setVideoSwitch, pubYoutube, setVideoEdit, propictureeditinfo } from '@/apis'
import lodash from 'lodash'
import { Message } from '@arco-design/web-vue'
import icon from '@/assets/images/right-icon2.png'
const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}
const infodata = ref({})
const showDialog = (info) => {
  isEdit.value = false
  infodata.value = info
  videoId.value = info.id
  // getDetail(info.id)
  visible.value = true
}
const isEdit = ref(false)
const videoId = ref('')
const videoDetail = ref({ video: { ad_tiktok: '0', ad_switch: '0' }, group: [], tpl: [] })
const loading = ref(false)
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
const formRef = ref()
const goedit = () => {
  isEdit.value = true
}
const handleBeforeOk = () => {
  visible.value = false
}
const changenameFn = async () => {
  if (!infodata.value.picname) {
    return Message.warning('请输入名称')
  }
  const { id, sid, title, picturedesc, picname } = infodata.value
  const res = await propictureeditinfo({
    id,
    type: 4,
    title,
    picturedesc,
    picname
  })
  if (res.code == 0) {
    isEdit.value = false
    emit('change')
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
  height: 256px;
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
  word-break: break-word;
  svg {
    color: rgb(var(--primary-6));
    cursor: pointer;
    position: relative;
    top: 1px;
  }
  .name-inner {
    margin-right: 4px;
  }
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
.check-icon {
  color: rgb(var(--primary-6));
  cursor: pointer;
  position: relative;
  top: 3px;
}
</style>
