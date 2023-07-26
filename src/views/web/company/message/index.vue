<template>
  <div class="msg-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <a-row class="msg-box" v-for="(item, index) in form.list" :key="'msg' + index">
        <a-col :span="18">
          <a-card>
            <a-form-item label="客户名称">
              <a-input :max-length="{ length: 30, errorOnly: true }" allow-clear show-word-limit></a-input>
            </a-form-item>
            <a-form-item field="cate" label="客户LOGO" :content-flex="false">
              <a-upload
                list-type="picture-card"
                :action="picUploadUrl"
                :data="{ type: '22' }"
                :file-list="fileLogo"
                image-preview
                :limit="1"
                @success="successUpload"
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
                  建议上传<span class="warning-color">70px*70px</span>尺寸，JPEG、JPG、GIF、PNG格式，最大<span class="warning-color">50K</span>图片，图片类型建议为公司LOGO或买家头像。
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
              <a-button type="primary">保存</a-button>
              <a-button>取消</a-button>
            </a-space>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts" name="adv">
import { reactive, ref, h, nextTick } from 'vue'
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
const fileLogo = ref([])
const formRef = ref()
const form = reactive({
  list: [{}, {}]
})
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url_l
  } else {
    res.status = 'error'
  }
}
const picUploadChange = (arr, type) => {
  if (type == 1) {
    fileLogo.value = arr
  }
}
const addList = () => {
  form.list.push({})
}
</script>
<style lang="scss" scoped>
@import './mod/list.scss';
</style>
