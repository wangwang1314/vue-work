<template>
  <div class="detail-out">
    <div class="top-nav-tit">
      <div class="m-left">联系信息</div>
      <div class="m-right"></div>
    </div>
    <div class="com-detail detail">
      <a-form
        class="com-form"
        ref="formRef"
        label-align="left"
        size="medium"
        :model="form"
        layout="vertical"
        :auto-label-width="true"
      >
        <a-card :bordered="false" title="详细信息">
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item label="公司地址" required>
                <a-input v-model="form.info.addr"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="工厂地址" required>
                <a-input v-model="form.info.factoryaddr"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item label="公司电话" :content-flex="false" required>
                <a-row :gutter="16">
                  <a-col :span="5"><a-input v-model.trim="tellinput[0]"></a-input></a-col>
                  <a-col :span="5"><a-input v-model.trim="tellinput[1]"></a-input></a-col>
                  <a-col :span="5"><a-input v-model.trim="tellinput[2]"></a-input></a-col>
                  <a-col :span="9"><a-input v-model.trim="tellinput[3]"></a-input></a-col>
                </a-row>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="公司传真" :content-flex="false">
                <a-row :gutter="16">
                  <a-col :span="5"><a-input v-model.trim="faxinput[0]"></a-input></a-col>
                  <a-col :span="5"><a-input v-model.trim="faxinput[1]"></a-input></a-col>
                  <a-col :span="5"><a-input v-model.trim="faxinput[2]"></a-input></a-col>
                  <a-col :span="9"><a-input v-model.trim="faxinput[3]"></a-input></a-col>
                </a-row>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false" title="联系人">
          <a-tabs
            type="card-gutter"
            :hide-content="true"
            :editable="true"
            :closable="false"
            @add="handleAdd"
            @delete="handleDelete"
            show-add-button
            auto-switch
            class="cus-tabs"
            v-model:active-key="tabKey"
          >
            <a-tab-pane v-for="(item, index) of form.contact_persons" :key="index" :title="item.title">
              <template #title>
                <div class="title-con">
                  <div v-if="!item.isactive">
                    {{ item.contperson }}
                  </div>
                  <div v-else>
                    <modinput
                      :item="item"
                      @change="
                        (data) => {
                          changeInput(data, item, index)
                        }
                      "
                    ></modinput>
                  </div>
                </div>
              </template>
            </a-tab-pane>
          </a-tabs>
          <div
            class="contact-inner"
            v-show="tabKey == index"
            v-for="(item, index) of form.contact_persons"
            :key="'c' + index"
          >
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item label="姓名" :content-flex="false" required>
                  <a-row :gutter="16">
                    <a-col :span="24" style="display: flex">
                      <a-radio-group style="margin-top: 6px" v-model="item.gender">
                        <a-radio :value="0">Mr</a-radio>
                        <a-radio :value="1">Mrs</a-radio>
                        <a-radio :value="2">Miss</a-radio>
                        <a-radio :value="3">Ms</a-radio>
                      </a-radio-group>
                      <a-input style="flex: 1;margin-left: 10px;" v-model="item.contperson"></a-input>
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="职位" :content-flex="false">
                  <a-input v-model="item.job"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item label="邮件" :content-flex="false" required>
                  <a-input v-model.trim="item.email"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="电话" :content-flex="false" required>
                  <a-input v-model="item.tel"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item label="Skype" :content-flex="false">
                  <a-input v-model="item.skype"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="Whatsapp" :content-flex="false" class="no-bot">
                  <a-input v-model="item.whatapp" @blur="jugeFn(index)"></a-input>
                </a-form-item>
              </a-col>
            </a-row>

            <div class="check-label">
              <a-space>
                <template v-if="item.id && item.isDefault != 1">
                  <a-button @click="setFn(item, index)" type="primary">设为默认</a-button>
                </template>
                <a-button v-if="item.isDefault != 1" @click="delFn(item, index)">删除联系人</a-button>
                <a-button
                  v-if="item.id && item.isDefault == 1"
                  type="text"
                  style="color: var(--color-text-4); cursor: default"
                  disabled
                  >默认联系人</a-button
                >
              </a-space>
            </div>
          </div>
        </a-card>
        <a-card :bordered="false" title="Follow Us">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item :hide-label="true" :content-flex="false">
                <a-row :gutter="1">
                  <a-col :span="24" style="display: flex">
                    <i class="icon icon-1"></i>
                    <a-input v-model="form.info.facebook"></a-input>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :hide-label="true" :content-flex="false">
                <a-row :gutter="1">
                  <a-col :span="24" style="display: flex">
                    <i class="icon icon-2"></i>
                    <a-input v-model="form.info.twitter"></a-input>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :hide-label="true" :content-flex="false">
                <a-row :gutter="1">
                  <a-col :span="24" style="display: flex">
                    <i class="icon icon-3"></i>
                    <a-input v-model="form.info.linkedin"></a-input>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :hide-label="true" :content-flex="false">
                <a-row :gutter="1">
                  <a-col :span="24" style="display: flex">
                    <i class="icon icon-4"></i>
                    <a-input v-model="form.info.youtube"></a-input>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :hide-label="true" :content-flex="false" class="no-bot">
                <a-row :gutter="1">
                  <a-col :span="24" style="display: flex">
                    <i class="icon icon-5"></i>
                    <a-input v-model="form.info.tiktok"></a-input>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :hide-label="true" :content-flex="false" class="no-bot">
                <a-row :gutter="1">
                  <a-col :span="24" style="display: flex">
                    <i class="icon icon-6"></i>
                    <a-input v-model="form.info.instagram"></a-input>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="qualitycom">
import { reactive, ref, h, nextTick } from 'vue'
import { companycontactinfo, companysavecontactinfo, companysetdefaultcontact, companydelcontact } from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message, Modal } from '@arco-design/web-vue'
import { getTreeDate } from '@/utils/common'
import lodash from 'lodash'
import { useUserStore, useFileStore } from '@/store'
import IconUpload from '@arco-design/web-vue/es/icon/icon-upload'
import IconFileAudio from '@arco-design/web-vue/es/icon/icon-file-audio'
import modinput from './mod/mod-input.vue'
import IconClose from '@arco-design/web-vue/es/icon/icon-close'
import IconFaceFrownFill from '@arco-design/web-vue/es/icon/icon-face-frown-fill'
const fileStore = useFileStore()
const uploadtype = ref('5')
const titArray = reactive({ count1: 0, count2: 0, count3: 0 })
const activeKey = ref(1)

const changeTab = (val: number) => {
  activeKey.value = val
  type.value = PaneMap[activeKey.value]
}
const userStore = useUserStore()
// const companyid = userStore.userInfo.homeInfo.company.id
// plineinfo，oeminfo，rdinfo
const type = ref('plineinfo')
const picType = 1
const emit = defineEmits(['update', 'changeTab'])
const router = useRouter()
const route = useRoute()
const form = ref({
  info: {
    facebook: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    tiktok: '',
    addr: '',
    factoryaddr: ''
  },
  contact_persons: []
})
const emptyPerson = {
  id: '',
  contperson: '',
  gender: '',
  email: '',
  job: '',
  tel: '',
  skype: '',
  whatapp: '',
  isDefault: '-1' // 1默认 0不是默认 -1新增
}
const loading = ref(false)
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'

const formRef = ref()
const tabKey = ref(0)

const handleAdd = () => {
  form.value.contact_persons = form.value.contact_persons.concat(
    Object.assign(
      {
        id: '',
        title: '',
        contperson: '',
        isactive: true
      },
      emptyPerson
    )
  )
}
const handleDelete = (key) => {
  Modal.confirm({
    title: '提示',
    content: `确认删除`,
    onOk: async () => {
      console.log(key)
      form.value.contact_persons.splice(key, 1)
    },
    onCancel: () => {}
  })
}
const getData = async () => {
  const res = await companycontactinfo()
  if (res.code == 0) {
    Object.assign(form.value.info, res.data.info)
    if (res.data.contact_persons && res.data.contact_persons.length) {
      res.data.contact_persons[0].isDefault = 1
    }
    Object.assign(form.value.contact_persons, res.data.contact_persons || [])
    if (res.data.info && res.data.info.tel) {
      const arr = res.data.info.tel.split('-')
      Object.assign(tellinput.value, arr)
      if (!tellinput.value[0]) {
        tellinput.value[0] = '86'
      }
    }
    if (res.data.info && res.data.info.fax) {
      const arr = res.data.info.fax.split('-')
      Object.assign(faxinput.value, arr)
      if (!faxinput.value[0]) {
        faxinput.value[0] = '86'
      }
    }
  }
}
getData()

const changeInput = (dataitem, item, index) => {
  const { contperson, isactive, id } = dataitem
  item.contperson = contperson
  item.isactive = isactive
  if (!id && !contperson) {
    form.value.contact_persons.splice(index, 1)
    tabKey.value = form.value.contact_persons.length - 1
  } else {
    if (id) {
    } else {
    }
  }
}
const saveFn = async () => {
  if (!checkvaliFn()) {
    return
  }
  const res = await companysavecontactinfo({
    info: {
      ...form.value.info,
      tel: tellinput.value.join('-'),
      fax: faxinput.value.join('-')
    },
    contact_persons: form.value.contact_persons
  })
  if (res.code == 0) {
    Message.success(res.message || '操作成功')
    getData()
  }
}
const delFn = (item, index) => {
  Modal.confirm({
    title: '提示',
    content: `确认删除`,
    onOk: async () => {
      if (!item.id) {
        form.value.contact_persons.splice(index, 1)
        tabKey.value = form.value.contact_persons.length - 1
      } else {
        const res = await companydelcontact({
          id: item.id
        })
        if (res.code == 0) {
          form.value.contact_persons.splice(index, 1)
          tabKey.value = form.value.contact_persons.length - 1
        }
      }
    },
    onCancel: () => {}
  })
}
const setFn = (item, index) => {
  Modal.confirm({
    title: '提示',
    content: `确认设为默认联系人？`,
    onOk: async () => {
      const res = await companysetdefaultcontact({
        id: item.id
      })
      if (res.code == 0) {
        Message.success(res.message || '操作成功')
        form.value.contact_persons.forEach((item) => {
          if (item.id) {
            item.isDefault = 0
          }
        })
        form.value.contact_persons[index].isDefault = 1
      }
    },
    onCancel: () => {}
  })
}
const checkvaliFn = () => {
  if (!form.value.info.addr) {
    Message.warning('请填写公司地址')
    return false
  }
  if (!form.value.info.factoryaddr) {
    Message.warning('请填写工厂司地址')
    return false
  }
  if (!tellinput.value[1] && !tellinput.value[2] && !tellinput.value[3]) {
    Message.warning('请填写公司电话')
    return false
  }
  // if (faxinput.value.join('-') === '---') {
  //   Message.warning('请填写公司传真')
  //   return false
  // }
  for (let i = 0; i < form.value.contact_persons.length; i++) {
    let item = form.value.contact_persons[i]
    if (item.gender === '' || item.contperson === '') {
      Message.warning('请填写联系人姓名相关信息')
      return false
    }
    if (!item.email) {
      Message.warning('请填写联系人邮件')
      return false
    }
    if (!item.tel) {
      Message.warning('请填写联系人电话')
      return false
    }
    const area_code = ['86', '852', '886', '98', '92', '855', '65', '56', '60', '33', '44', '48', '52', '55']
    let prompt_flag = false
    for (let k in area_code) {
      let re = new RegExp('^\\+' + area_code[k] + '\\d+$')
      if (item.whatapp && re.test(item.whatapp)) {
        prompt_flag = true
      }
    }
    if (!prompt_flag) {
      Message.warning(
        '您输入的WhatsApp号码格式可能不正确，请进行核实。\n标准格式为 +区号号码，如+8613488888888、+85299999999等。'
      )
      return false
    }
  }
  return true
}
const jugeFn = (index) => {
  const area_code = ['86', '852', '886', '98', '92', '855', '65', '56', '60', '33', '44', '48', '52', '55']
  var str = form.value.contact_persons[index].whatapp
  let prompt_flag = false
  for (let k in area_code) {
    let re = new RegExp('^\\+' + area_code[k] + '\\d+$')
    if (str && re.test(str)) {
      prompt_flag = true
    }
  }
  if (!prompt_flag) {
    Message.warning(
      '您输入的WhatsApp号码格式可能不正确，请进行核实。\n标准格式为 +区号号码，如+8613488888888、+85299999999等。'
    )
    return false
  }
}
const tellinput = ref(['86', '', '', ''])
const faxinput = ref(['86', '', '', ''])
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
.icon {
  background: url('@/assets/images/so/i-1.png') no-repeat;
  background-size: cover;
  min-width: 32px;
  width: 32px;
  height: 32px;
  float: right;
  margin-right: 16px;
}
.icon-2 {
  background: url('@/assets/images/so/i-2.png') no-repeat;
  background-size: cover;
}
.icon-3 {
  background: url('@/assets/images/so/i-3.png') no-repeat;
  background-size: cover;
}
.icon-4 {
  background: url('@/assets/images/so/i-4.png') no-repeat;
  background-size: cover;
}
.icon-5 {
  background: url('@/assets/images/so/i-5.png') no-repeat;
  background-size: cover;
}
.icon-6 {
  background: url('@/assets/images/so/i-6.png') no-repeat;
  background-size: cover;
}
.contact-inner {
  margin-top: 16px;
}
.check-label {
  margin-top: 16px;
}
:deep(.cus-tabs) {
  .arco-tabs-tab-close-btn {
    display: none;
  }
}
</style>
