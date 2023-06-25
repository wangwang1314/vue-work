<template>
  <div class="dialog-pic-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="900" title="保存模板">
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确定</a-button>
      </template>
      <a-form label-align="right" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
        <a-row :gutter="16" wrap>
          <a-col :span="14">
            <a-form-item field="name" label="标题" :rules="[{ required: true, message: '请输入' }]">
              <a-input v-model="form.name" placeholder="" />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="2">
            <a-button type="primary">搜索</a-button>
          </a-col> -->
        </a-row>
        <a-form-item label="" field="content">
          <a-row wrap>
            <a-col :span="22">
              <uedit :height="300" v-model="form.content"></uedit>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="picDialog">
import { ref, reactive } from 'vue'
import { proAddTpl } from '@/apis'
import uedit from './uedit.vue'
import { Message } from '@arco-design/web-vue'
const form = reactive({
  name: '',
  content: ''
})
const props = defineProps({
  type: String
})
const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}
const handleBeforeOk = () => {
  saveTpl()
}
const showDialog = (str) => {
  form.content = str
  visible.value = true
}
const formRef = ref()
const saveTpl = async () => {
  formRef.value.validate(async(vali) => {
    if (vali) {
      return
    }
    if (!form.content) {
      return Message.warning('请填写内容')
    }
    const res = await proAddTpl({
      ...form,
      type: props.type
    })
    if (res.code == 0) {
      Message.success(res.message || '请求成功')
      visible.value = false
    }
  })
 
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
</style>
