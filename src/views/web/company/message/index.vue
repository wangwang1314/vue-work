<template>
  <div class="msg-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <a-row class="msg-box" v-for="(item, index) in form.list" :key="'msg' + index">
        <a-col :span="18">
          <a-card>
            <a-popconfirm type="warning" content="您确定要删除该项吗?" @ok="onDelete(item, index)">
              <icon-delete class="del-i-icon" />
            </a-popconfirm>
            <a-form-item label="客户名称">
              <a-input
                v-model="item.name"
                :max-length="{ length: 30, errorOnly: true }"
                allow-clear
                show-word-limit
              ></a-input>
            </a-form-item>
            <a-form-item field="cate" label="客户LOGO" :content-flex="false">
              <a-upload
                list-type="picture-card"
                :action="picUploadUrl"
                :data="{ type: '9' }"
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
                <div style="line-height: 18px">
                  建议上传<span class="warning-color">70px*70px</span>尺寸，JPEG、JPG、GIF、PNG格式，最大<span
                    class="warning-color"
                    >50K</span
                  >图片，图片类型建议为公司LOGO或买家头像。
                </div>
              </template>
            </a-form-item>
            <a-form-item label="赠言内容">
              <a-textarea
                :auto-size="{
                  minRows: 2
                }"
                :max-length="{ length: 350, errorOnly: true }"
                allow-clear
                show-word-limit
                v-model="item.content"
              ></a-textarea>
              <template #extra>客户赠言内容，建议<span class="warning-color">200-300</span>个字符 </template>
            </a-form-item>
          </a-card>
        </a-col>
      </a-row>
      <a-row class="full-width">
        <a-col :span="18">
          <a-button type="primary" size="mini" style="margin: 8px 0 8px 0" @click="addList">添加</a-button>
        </a-col>
      </a-row>
      <a-row class="full-width">
        <a-col :span="18">
          <div class="com-btn-box">
            <a-space :size="16">
              <a-button type="primary" :loading="loading" @click="saveFn">保存</a-button>
              <a-button :disabled="loading" @click="getData">取消</a-button>
            </a-space>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts" name="adv">
import { reactive, ref, h, nextTick } from 'vue'
import { getCompanyLeaveWord, saveCompanyLeaveWord } from '@/apis'
import { Message } from '@arco-design/web-vue'
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
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
    form.list = res.data.leave_word
  }
}
getData()
const onDelete = (item, index) => {
  form.list.splice(index, 1)
}
const saveFn = async () => {
  loading.value = true
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
  const res = await saveCompanyLeaveWord({
    leave_word: arr
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
