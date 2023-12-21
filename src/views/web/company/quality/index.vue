<template>
  <div class="detail-out">
    <div class="top-nav-tit">
      <div class="m-left">质量认证</div>
      <div class="m-right"></div>
    </div>
    <div class="com-detail detail">
      <a-form
        class="com-form"
        ref="formRef"
        label-align="left"
        size="medium"
        :model="form"
        layout="horizontal"
        :auto-label-width="true"
      >
        <a-card :bordered="false">
          <a-form-item label="详细介绍" :hide-label="true" style="margin-top: 16px">
            <a-row class="full-width">
              <a-col :span="24">
                <uedit v-model="form.qcinfo"></uedit>
              </a-col>
            </a-row>
          </a-form-item>
        </a-card>
        <a-card :bordered="false" title="公司证书">
          <a-row :gutter="30">
            <a-col :span="6">
              <a-upload
                v-show="!defaultfilelist.length"
                :show-file-list="false"
                :action="picUploadUrl"
                size="mini"
                class="drag-upload"
                draggable
                :data="{ type: uploadtype }"
                :file-list="defaultfilelist"
                :custom-icon="getCustomIcon()"
                @success="fileSuccess"
                @change="fileUploadChange"
              >
                <template #upload-button>
                  <div class="arco-upload-drag">
                    <div class="d-tit"><Icon-plus></Icon-plus></div>
                    <div class="arco-upload-drag-text">Drop files to upload</div>
                  </div>
                </template>
              </a-upload>
              <div class="arco-upload-drag img-drag" v-if="defaultfilelist.length">
                <icon-close-circle @click="imgdel" class="close-class" :size="18" />
                <img :src="defaultfilelist[0] && defaultfilelist[0].picture_url" class="d-img" alt="" />
              </div>
            </a-col>
            <a-col :span="14">
              <a-form-item label="证书类型（Standard）">
                <a-input v-model="currentData.standard"></a-input>
              </a-form-item>
              <a-form-item label="证书编号（Number）">
                <a-input v-model="currentData.number"></a-input>
              </a-form-item>
              <a-form-item label="颁发日期（Issue Date）">
                <a-date-picker style="width: 100%" v-model="currentData.issuedate"/>
              </a-form-item>
              <a-form-item label="失效日期（Expiry Date）">
                <a-date-picker style="width: 100%" v-model="currentData.expiredate"/>
              </a-form-item>
              <a-form-item label="适用范围（Scope/Range）">
                <a-input v-model="currentData.scope"></a-input>
              </a-form-item>
              <a-form-item label="颁发单位（Issued By）">
                <a-input v-model="currentData.issuedby"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <div class="list-box">
            <a-row :gutter="30">
              <a-col :span="12" class="list-item" v-for="(item, index) in form.certificates" :key="index">
                <a-row :gutter="16">
                  <a-col :span="8">
                    <div class="img-pic-box">
                      <img
                        v-if="item.picture_info && item.picture_info.picture_url"
                        :src="item.picture_info && item.picture_info.picture_url"
                        alt=""
                      />
                      <img v-else src="@/assets/images/nophoto_small.gif" />
                    </div>
                    <div class="btn-wrap">
                      <a-button type="text" @click="edit(item)">编辑</a-button>
                      <a-button type="text" @click="del(item)">删除</a-button>
                    </div>
                  </a-col>
                  <a-col :span="16">
                    <a-form-item label="证书类型（Standard）:">
                      {{ item.standard }}
                    </a-form-item>
                    <a-form-item label="证书编号（Number）:">
                      {{ item.number }}
                    </a-form-item>
                    <a-form-item label="颁发日期（Issue Date）:">
                      {{ item.issuedate }}
                    </a-form-item>
                    <a-form-item label="失效日期（Expiry Date）:">
                      {{ item.expiredate }}
                    </a-form-item>
                    <a-form-item label="适用范围（Scope/Range）:">
                      {{ item.scope }}
                    </a-form-item>
                    <a-form-item label="颁发单位（Issued By）:">
                      {{ item.issuedby }}
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="qualitycom">
import { reactive, ref, h, nextTick } from 'vue'
import { companyqc, companysaveqc, companydelqc, pictureDdel } from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message, Modal } from '@arco-design/web-vue'
import { getTreeDate } from '@/utils/common'
import picDialog from '@/components/commonDialog/picDialog.vue'
import lodash from 'lodash'
import draggable from 'vuedraggable'
import uedit from '@/components/editor/uedit.vue'
import { useUserStore, useFileStore } from '@/store'
import IconUpload from '@arco-design/web-vue/es/icon/icon-upload'
import IconFileAudio from '@arco-design/web-vue/es/icon/icon-file-audio'
import IconClose from '@arco-design/web-vue/es/icon/icon-close'
import IconFaceFrownFill from '@arco-design/web-vue/es/icon/icon-face-frown-fill'
const fileStore = useFileStore()
const uploadtype = ref('5')
const titArray = reactive({ count1: 0, count2: 0, count3: 0 })
const activeKey = ref(1)
const updateFn = (data) => {
  titArray.count1 = data.status_normal_nums
  titArray.count2 = data.status_deleted_nums
  titArray.count3 = data.hot_count
}
const changeTab = (val: number) => {
  activeKey.value = val
  type.value = PaneMap[activeKey.value]
  getData()
}
const userStore = useUserStore()
// const companyid = userStore.userInfo.homeInfo.company.id
// plineinfo，oeminfo，rdinfo
const type = ref('plineinfo')
const picType = 1
const emit = defineEmits(['update', 'changeTab'])
const router = useRouter()
const route = useRoute()
const form = reactive({
  qcinfo: '',
  certificates: []
})
const loading = ref(false)
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'

const formRef = ref()

const currentData = ref({
  id: '',
  standard: '',
  number: '',
  issuedate: '',
  expiredate: '',
  scope: '',
  issuedby: ''
})
const getData = async () => {
  const res = await companyqc({})
  if (res.code === 0) {
    const { qcinfo, certificates } = res.data
    form.qcinfo = qcinfo
    form.certificates = certificates || []
    currentData.value = {
      id: '',
      standard: '',
      number: '',
      issuedate: '',
      expiredate: '',
      scope: '',
      issuedby: ''
    }
    defaultfilelist.value = []
  }
}
getData()
const saveFn = async () => {
  fileStore.setloading(true)
  const cur = {}
  console.log(currentData.value, '5555')
  if (!checkEmpty(currentData.value)) {
    Object.assign(cur, currentData.value)
    if (defaultfilelist.value.length) {
      cur.picture_info = {
        id: defaultfilelist.value[0].id
      }
    } else {
      cur.picture_info = {}
    }
  }
  const res = await companysaveqc({
    qcinfo: form.qcinfo,
    certificate: cur
  }).finally(() => {
    fileStore.setloading(false)
  })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
    getData()
  }
}
const checkEmpty = (obj) => {
  for (let key in obj) {
    if (obj[key]) {
      return false
    }
  }
  return true
}
const del = (item) => {
  Modal.warning({
    title: '提示',
    content: '是否确认删除？',
    hideCancel: false,
    onOk: async () => {
      const res = await companydelqc({
        id: item.id
      })
      if (res.code == 0) {
        Message.success(res.message || '操作成功')
        getData()
      }
    }
  })
}
const edit = (item) => {
  Object.assign(currentData.value, item)
  if (item.picture_info) {
    defaultfilelist.value = []
    defaultfilelist.value.push(item.picture_info)
  }
}
// 文件上传
const getCustomIcon = () => {
  return {
    cancelIcon: () => h(''),
    fileIcon: () => h(IconFileAudio),
    errorIcon: () => h(IconFaceFrownFill)
  }
}
// 文件默认列表
const defaultfilelist = ref([])
const fileSuccess = (res) => {
  if (res.response?.code == 0) {
    res.id = res.response?.data.id
    res.uid = res.response?.data.id
    res.picture_url = res.response?.data.picture_url
    defaultfilelist.value = []
    defaultfilelist.value.push(res)
  } else {
    res.status = 'error'
  }
}
const fileUploadChange = (arr) => {
  // defaultfilelist.value = arr
}
const imgdel = () => {
  Modal.warning({
    title: '提示',
    content: '是否确认删除？',
    hideCancel: false,
    onOk: async () => {
      delPicAjax()
    }
  })
}

const delPicAjax = async () => {
  if (!currentData.value.id) {
    return
  }
  const res = await pictureDdel({
    id: defaultfilelist.value[0] && defaultfilelist.value[0].id,
    sid: currentData.value.id,
    type: uploadtype.value
  })
  if (res.code == 0) {
    defaultfilelist.value = []
  }
}

fileStore.$onAction(({ name }) => {
  if (name === 'cancel') {
    getData()
  } else if (name === 'save') {
    saveFn()
  }
})
</script>

<style lang="scss" scoped>
:deep(.arco-card) {
  .arco-card-header {
    margin: 0 16px;
    padding-left: 0;
    padding-right: 0;
  }
}
.manage {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-bg-1);
  .tab {
    .tit {
      color: var(--color-text-1);
      .s-span {
        font-size: 12px;
        color: var(--color-text-3);
      }
    }
    :deep(.arco-tabs-nav-tab) {
      justify-content: flex-start;
    }
    .arco-tabs-tab-active {
      .tit {
        color: rbg(var(--primary-6));
        font-size: 14px;
        .s-span {
          color: rbg(var(--primary-6));
        }
      }
    }
    padding: 12px 0 0 24px;
  }
}

:deep(.data-pane) {
  flex: 1;
  padding: $margin;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  .pane-left {
    width: 260px;
  }
  .pane-right {
    flex: 5;
    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .table-box {
        flex: 1;
        overflow: hidden;
      }
    }
  }
}
.detail-out {
  overflow: auto;
}
.detail {
  padding: 20px 15px 0 20px;
}
.label-class {
  margin-bottom: 10px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 16px;
    color: var(--color-text-1);
    font-weight: bold;
  }
}
.arco-upload-drag {
  height: 167px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .d-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .d-tit {
    margin-top: 46px;
  }
}
.img-drag {
  padding: 0;
  height: 269px;
  position: relative;
  :deep(.close-class) {
    position: absolute;
    top: 6px;
    right: 6px;
    cursor: pointer;
    color: var(--color-text-4);
  }
}
.img-pic-box {
  height: 250px;
  background-color: var(--color-fill-1);
  border-radius: var(--border-radius-small);
  img {
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
}
.btn-wrap {
  display: flex;
  margin-top: 4px;
  justify-content: space-around;
}
.list-box {
  margin-top: 30px;
}
:deep(.list-item) {
  margin-bottom: 16px;
}
</style>
