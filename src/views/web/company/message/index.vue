<template>
  <div class="msg-detail-out">
    <div class="top-nav-tit">
      <div class="m-left">客户赠言</div>
      <div class="m-right"></div>
    </div>
    <div class="msg-detail detail">
      <a-form ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
        <a-row class="msg-box" v-for="(item, index) in form.list" :key="'msg' + index">
          <a-col :span="24">
            <a-card :bordered="false">
              <a-popconfirm type="warning" content="您确定要删除该项吗?" @ok="onDelete(item, index)">
                <icon-delete class="del-i-icon" />
              </a-popconfirm>
              <a-form-item
                label="客户名称"
                :field="'list.' + index + '.name'"
                :rules="[{ required: true, message: '请输入客户名称' }]"
              >
                <a-input v-model="item.name" :max-length="{ length: 30 }" allow-clear show-word-limit></a-input>
              </a-form-item>
              <a-form-item
                label="赠言内容"
                :field="'list.' + index + '.content'"
                :rules="[{ required: true, message: '请输入赠言内容' }]"
              >
                <a-textarea
                  :auto-size="{
                    minRows: 2
                  }"
                  :max-length="{ length: 350 }"
                  allow-clear
                  show-word-limit
                  v-model="item.content"
                ></a-textarea>
              </a-form-item>
              <a-form-item field="cate" label="客户LOGO" :content-flex="false">
                <a-upload
                  :on-before-remove="picRemove"
                  list-type="picture-card"
                  :action="picUploadUrl"
                  :data="{ type: picType }"
                  :file-list="item.imgList"
                  image-preview
                  :limit="1"
                  @success="successUpload"
                  @change="
                    (res) => {
                      picUploadChange(res, 1, index)
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
                <template #extra>
                  <div style="line-height: 18px">建议上传70px*70px尺寸，最大50K图片。</div>
                </template>
              </a-form-item>
            </a-card>
          </a-col>
        </a-row>
        <a-row class="full-width">
          <a-col :span="18">
            <a-button type="primary" style="margin: 8px 0 8px 0" @click="addList">添加</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts" name="adv">
import { reactive, ref, h, nextTick } from 'vue'
import { getCompanyLeaveWord, saveCompanyLeaveWord, pictureDdel } from '@/apis'
import { Message } from '@arco-design/web-vue'
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
import { useUserStore, useFileStore } from '@/store'
const userStore = useUserStore()
const fileStore = useFileStore()
const picType = '9'
const fileLogo = ref([])
const formRef = ref()
const loading = ref(false)
const form = reactive({
  list: [
    {
      name: '',
      content: '',
      imgList: []
    }
  ]
})
const delPicAjax = async (data) => {
  if (!data.sid) {
    return
  }
  const res = await pictureDdel({
    id: data.id,
    sid: data.sid,
    type: picType
  })
}
const picRemove = (data) => {
  delPicAjax(data)
  return data
}
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url
  } else {
    res.status = 'error'
  }
}
const picUploadChange = (arr, type, index) => {
  if (type == 1) {
    form.list[index].imgList = arr
  }
}
const addList = () => {
  form.list.push({
    name: '',
    content: '',
    imgList: []
  })
}
const getData = async () => {
  const res = await getCompanyLeaveWord()
  if (res.code === 0) {
    res.data.leave_word?.forEach((item) => {
      if (item.picture_info) {
        item.picture_info.url = item.picture_info.picture_url
        item.imgList = [item.picture_info]
      } else {
        item.imgList = []
      }
    })
    Object.assign(form.list, res.data.leave_word)
    console.log(form.list)
  }
}
getData()
const onDelete = (item, index) => {
  form.list.splice(index, 1)
}
const saveFn = async () => {
  formRef.value.validate(async(vali) => {
    if (vali) {
      return
    }
    let arr = []
    form.list.forEach((item, index) => {
      let { id, name, content, sort, imgList } = item
      let picture_info = {
        id: imgList.length ? imgList[0].id : ''
      }
      arr.push({
        id,
        name,
        content,
        sort,
        picture_info
      })
    })
    fileStore.setloading(true)
    const res = await saveCompanyLeaveWord({
      leave_word: arr
    }).finally(() => {
      fileStore.setloading(false)
    })
    if (res.code === 0) {
      Message.success(res.message || '操作成功')
    }
  })
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
@import './mod/list.scss';
</style>
