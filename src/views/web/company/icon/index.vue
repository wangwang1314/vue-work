<template>
  <div class="msg-detail-out">
    <div class="top-nav-tit">
      <div class="m-left">网站小图标</div>
      <div class="m-right"></div>
    </div>
    <div class="msg-detail detail">
      <a-form ref="formRef" size="medium" :model="form" layout="vertical" :auto-label-width="true" label-align="left">
        <a-card :bordered="false">
          <a-form-item
            field="cate"
            label="公司logo"
            :hide-label="true"
            :content-flex="false"
            :label-col-style="{ flex: '0 0 70px' }"
          >
            <a-upload
              list-type="picture-card"
              :action="logourl"
              :file-list="fileLogo"
              :image-preview="false"
              :show-preview-button="false"
              :on-before-remove="() => removeFn()"
              :limit="1"
              @success="successUploadlogo"
              @change="
                (res) => {
                  picUploadChange(res, 1)
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
                提示：仅支持16*16、32*32（推荐）、48*48尺寸的*.ico文件。成功上传后，正式环境将在24小时后生效。
              </div>
            </template>
          </a-form-item>
          <a-form-item
            field="cate"
            label="小图标展示位置示意："
            :content-flex="false"
            :label-col-style="{ flex: '0 0 70px' }"
          >
            <div class="img-box-l">
              <img src="@/assets/images/web_p.png" alt="" />
            </div>
          </a-form-item>
        </a-card>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts" name="adv">
import { reactive, ref, h, nextTick } from 'vue'
import { companywebseticon, companywebsetdelicon } from '@/apis'
import { Message } from '@arco-design/web-vue'
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
import { useUserStore, useFileStore } from '@/store'
const logourl = baseURL + '?r=picture/upload-icon'
const fileStore = useFileStore()
const fileLogo = ref([])
const form = ref({})
const successUploadlogo = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.icon_path + '?' + new Date().getTime()
    res.picture_path = res.response.data?.icon_path
  } else {
    Message.warning(res.response.message || '操作失败')
    res.status = 'error'
  }
}
const picUploadChange = (arr, type) => {
  if (type == 1) {
    fileLogo.value = arr
  }
}
const getData = async () => {
  const res = await companywebseticon()
  if (res.code == 0) {
    if (res.data.icon_path) {
      fileLogo.value = [
        {
          id: res.data.icon_path,
          url: res.data.icon_path + '?' + new Date().getTime(),
          picture_pat: res.data.icon_path
        }
      ]
    }
  }
}
getData()
const removeFn = async () => {
  const res = await companywebsetdelicon()
  if (res.code == 0) {
    fileLogo.value = []
    Message.success(res.message || '操作成功')
  }
}
</script>
<style lang="scss" scoped>
@import './mod/index.scss';
</style>
