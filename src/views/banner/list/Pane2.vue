<template>
  <div class="banner-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <a-form-item label="视频中心" :content-flex="false">
        <a-row class="full-width">
          <div class="dra-wrap-b inner-banner">
              <a-col :span="16" class="pic-item" v-for="(element, index) in fileList" :key="index">
                <span class="arco-upload-list-picture">
                  <img :src="element.url" :alt="element.name" />
                  <div class="arco-upload-list-picture-mask">
                    <div class="arco-upload-list-picture-operation">
                      <span class="arco-upload-icon arco-upload-icon-remove">
                        <icon-delete :size="20" @click="picListDel(element, 1, 28)" />
                      </span>
                    </div>
                  </div>
                </span>
              </a-col>
              <a-col :span="16" v-show="fileList.length<1">
                <a-upload
                  multiple
                  :with-credentials="true"
                  @change="(res)=>{ picUploadChange(res, 1) }"
                  :file-list="fileList"
                  :show-file-list="false"
                  ref="uploadRef"
                  :data="{ type: '28' }"
                  @success="(res)=>{ successUpload(res, 1, 28) }"
                  draggable
                  :action="picUrl"
                />
              </a-col>
            </div>
        </a-row>
        <template #extra>
          <div style="line-height: 18px; max-width: 630px">
            提示：建议使用<span class="warning-color">1680*160</span
            >尺寸，JPEG、JPG格式，100K以下图片。
          </div>
        </template>
      </a-form-item>
      <a-form-item label="Products页" :content-flex="false">
        <a-row class="full-width">
          <div class="dra-wrap-b">
              <a-col :span="16" class="pic-item" v-for="(element, index) in fileList2" :key="index">
                <span class="arco-upload-list-picture">
                  <img :src="element.url" :alt="element.name" />
                  <div class="arco-upload-list-picture-mask">
                    <div class="arco-upload-list-picture-operation">
                      <span class="arco-upload-icon arco-upload-icon-remove">
                        <icon-delete :size="20" @click="picListDel(element, 2, 15)" />
                      </span>
                    </div>
                  </div>
                </span>
              </a-col>
              <a-col :span="16" v-show="fileList2.length<1">
                <a-upload
                  multiple
                  :with-credentials="true"
                  @change="(res)=>{ picUploadChange(res, 2) }"
                  :file-list="fileList"
                  :show-file-list="false"
                  ref="uploadRef"
                  :data="{ type: '15' }"
                  @success="(res)=>{ successUpload(res, 2, 15) }"
                  draggable
                  :action="picUrl"
                />
              </a-col>
            </div>
        </a-row>
        <template #extra>
          <div style="line-height: 18px; max-width: 630px">
            提示：建议使用<span class="warning-color">1920*400</span
            >尺寸，JPEG、JPG格式，100K以下图片。
          </div>
        </template>
      </a-form-item>
      <a-form-item label="About Us页" :content-flex="false">
        <a-row class="full-width">
          <div class="dra-wrap-b">
              <a-col :span="16" class="pic-item" v-for="(element, index) in fileList3" :key="index">
                <span class="arco-upload-list-picture">
                  <img :src="element.url" :alt="element.name" />
                  <div class="arco-upload-list-picture-mask">
                    <div class="arco-upload-list-picture-operation">
                      <span class="arco-upload-icon arco-upload-icon-remove">
                        <icon-delete :size="20" @click="picListDel(element, 3, 17)" />
                      </span>
                    </div>
                  </div>
                </span>
              </a-col>
              <a-col :span="16" v-show="fileList3.length<1">
                <a-upload
                  multiple
                  :with-credentials="true"
                  @change="(res)=>{ picUploadChange(res, 3) }"
                  :file-list="fileList"
                  :show-file-list="false"
                  ref="uploadRef"
                  :data="{ type: '17' }"
                  @success="(res)=>{ successUpload(res, 3, 17) }"
                  draggable
                  :action="picUrl"
                />
              </a-col>
            </div>
        </a-row>
        <template #extra>
          <div style="line-height: 18px; max-width: 630px">
            提示：建议使用<span class="warning-color">1920*400</span
            >尺寸，JPEG、JPG格式，100K以下图片。
          </div>
        </template>
      </a-form-item>
      <a-form-item label="Contact Us页" :content-flex="false">
        <a-row class="full-width">
          <div class="dra-wrap-b">
              <a-col :span="16" class="pic-item" v-for="(element, index) in fileList4" :key="index">
                <span class="arco-upload-list-picture">
                  <img :src="element.url" :alt="element.name" />
                  <div class="arco-upload-list-picture-mask">
                    <div class="arco-upload-list-picture-operation">
                      <span class="arco-upload-icon arco-upload-icon-remove">
                        <icon-delete :size="20" @click="picListDel(element, 4, 18)" />
                      </span>
                    </div>
                  </div>
                </span>
              </a-col>
              <a-col :span="16" v-show="fileList4.length<1">
                <a-upload
                  multiple
                  :with-credentials="true"
                  @change="(res)=>{ picUploadChange(res, 4) }"
                  :file-list="fileList"
                  :show-file-list="false"
                  ref="uploadRef"
                  :data="{ type: '18' }"
                  @success="(res)=>{ successUpload(res, 4, 18) }"
                  draggable
                  :action="picUrl"
                />
              </a-col>
            </div>
        </a-row>
        <template #extra>
          <div style="line-height: 18px; max-width: 630px">
            提示：建议使用<span class="warning-color">1920*400</span
            >尺寸，JPEG、JPG格式，100K以下图片。
          </div>
        </template>
      </a-form-item>
      <a-form-item label="新闻页" :content-flex="false">
        <a-row class="full-width">
          <div class="dra-wrap-b">
              <a-col :span="16" class="pic-item" v-for="(element, index) in fileList5" :key="index">
                <span class="arco-upload-list-picture">
                  <img :src="element.url" :alt="element.name" />
                  <div class="arco-upload-list-picture-mask">
                    <div class="arco-upload-list-picture-operation">
                      <span class="arco-upload-icon arco-upload-icon-remove">
                        <icon-delete :size="20" @click="picListDel(element, 5, 16)" />
                      </span>
                    </div>
                  </div>
                </span>
              </a-col>
              <a-col :span="16" v-show="fileList5.length<1">
                <a-upload
                  multiple
                  :with-credentials="true"
                  @change="(res)=>{ picUploadChange(res, 5) }"
                  :file-list="fileList"
                  :show-file-list="false"
                  ref="uploadRef"
                  :data="{ type: '16' }"
                  @success="(res)=>{ successUpload(res, 5, 16) }"
                  draggable
                  :action="picUrl"
                />
              </a-col>
            </div>
        </a-row>
        <template #extra>
          <div style="line-height: 18px; max-width: 630px">
            提示：建议使用<span class="warning-color">1920*400</span
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
import { getInnerBanner, saveInnerBanner, pictureDdel } from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import lodash from 'lodash'
import draggable from 'vuedraggable'
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
const successUpload = (res, num, type) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url
    res.type = type
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
const saveFn = async() => {
  loading.value = true
  const res = await saveInnerBanner({
    video_info: fileList.value.length?fileList.value[0]:[],
    product_banner: fileList2.value.length?fileList2.value[0]:[],
    about_banner: fileList3.value.length?fileList3.value[0]:[],
    contact_banner: fileList4.value.length?fileList4.value[0]:[],
    news_banner: fileList5.value.length?fileList5.value[0]:[]
  }).finally(() => {
    loading.value = false
  })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
  }
}
const picListDel = (file, num, type) => {
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
    delPicAjax(item.value[index]?.id, type)
    item.value.splice(index, 1)
  }
}

const delPicAjax = async (id, type) => {
  const res = await pictureDdel({
    id,
    sid: userStore.userInfo.homeInfo.company.id,
    type
  })
}

const getDetail = async () => {
  const res = await getInnerBanner()
  if (res.code === 0) {
    fileList.value = resetDetail(res.data.video_info)
    fileList2.value = resetDetail(res.data.product_banner)
    fileList3.value = resetDetail(res.data.about_banner)
    fileList4.value = resetDetail(res.data.contact_banner)
    fileList5.value = resetDetail(res.data.news_banner)
  }
}
const resetDetail = (item) => {
  if (item) {
    item.url = item.picture_url
    return [item]
  }
  return []
}
getDetail()

</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
