<template>
  <div class="banner-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <a-form-item label="首页视频背景" :content-flex="false">
        <a-row class="full-width">
          <div class="dra-wrap-b">
              <a-col :span="11" class="pic-item" v-for="(element, index) in fileList" :key="index">
                <span class="arco-upload-list-picture">
                  <img :src="element.url" :alt="element.name" />
                  <div class="arco-upload-list-picture-mask">
                    <div class="arco-upload-list-picture-operation">
                      <span class="arco-upload-icon arco-upload-icon-remove">
                        <icon-delete :size="20" @click="picListDel(element, 1)" />
                      </span>
                    </div>
                  </div>
                </span>
              </a-col>
              <a-col :span="11" v-show="fileList.length<1">
                <a-upload
                  multiple
                  :with-credentials="true"
                  @change="(res)=>{ picUploadChange(res, 1) }"
                  :file-list="fileList"
                  :show-file-list="false"
                  ref="uploadRef"
                  :data="{ type: '4' }"
                  @success="(res)=>{ successUpload(res, 1) }"
                  draggable
                  :action="picUrl"
                />
              </a-col>
            </div>
        </a-row>
        <template #extra>
          <div style="line-height: 18px; max-width: 630px">
            提示：建议使用<span class="warning-color">1920*560</span
            >尺寸，JPEG、JPG格式，100K以下图片。
          </div>
        </template>
      </a-form-item>
      <a-form-item label="">
        <div style="margin-top: 20px">
          <a-button type="primary" @click="saveFn" :loading="loading" :disabled="loading">完成</a-button>
        </div>
      </a-form-item>
    </a-form>

  </div>
</template>

<script setup lang="ts" name="companyTable">
import { reactive, ref, h, nextTick } from 'vue'
import { getCompanyFactory, saveCompanyFactory, pictureDdel } from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import lodash from 'lodash'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const picUrl = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX + '?r=picture/upload'
const form = reactive({})
// 图片上传
const fileList = ref([])
const fileList2 = ref([])
const fileList3 = ref([])
const fileList4 = ref([])
const fileList5 = ref([])
const picUploadChange = (file, num) => {
  // let item
  // switch (num) {
  //   case 1:
  //     item = fileList
  //     break
  //   case 2:
  //     item = fileList2
  //     break
  // }
  // item.value = file
  // console.log(file, file[2].status, file[2].percent)
  // fileList.value.push(file[file.length - 1])
}
const successUpload = (res, num) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url
  } else {
    res.status = 'error'
  }
  let item
  switch (num) {
    case 1:
      item = fileList
      break
    case 2:
      item = fileList2
      break
    case 3:
      item = fileList3
      break
    case 4:
      item = fileList4
      break
    case 5:
      item = fileList5
      break
  }
  item.value.push(res)
}
const loading = ref(false)
const saveFn = () => {}
const picListDel = (file, num) => {
  let item
  switch (num) {
    case 1:
      item = fileList
      break
    case 2:
      item = fileList2
      break
    case 3:
      item = fileList3
      break
    case 4:
      item = fileList4
      break
    case 5:
      item = fileList5
      break
  }
  const index = lodash.findIndex(item.value, function (o) {
    return o.uid == file.uid
  })
  if (index != -1) {
    delPicAjax(item.value[index]?.id)
    item.value.splice(index, 1)
  }
}

const delPicAjax = async (id) => {
  const res = await pictureDdel({
    id,
    sid: route.query.id,
    type: '4'
  })
}


</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
