<template>
  <div class="croper-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="700" title="图片编辑">
      <div class="cropper-wrap">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
        ></vueCropper>
      </div>
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="cropper">
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { ref, reactive } from 'vue'
const visible = ref(false)
const option = reactive({
  img: '',
  size: 1,
  outputType: 'jpeg',
  name: ''
})
const handleCancel = () => {
  visible.value = false
}
const finish = () => {
  cropper.value?.getCropBlob((data) => {
    let img = URL.createObjectURL(data)
    let file = new File([data], option.name, { type: data.type });
    emit('change', { url: img, uid: uid.value, file })
  })
}
const handleBeforeOk = () => {
  visible.value = false
  finish()
}
const cropper = ref()
const uid = ref('')
const showDialog = (data) => {
  option.name = data.name
  option.img = data.url
  uid.value = data.uid
  // setAvatarBase64(url, (base64) => {
  //   option.img = base64
  // })
  visible.value = true
  cropper.value?.startCrop()
}
// const transBase64FromImage = (image) => {
//   let canvas = document.createElement('canvas')
//   canvas.width = image.width
//   canvas.height = image.height
//   let ctx = canvas.getContext('2d')
//   ctx.drawImage(image, 0, 0, image.width, image.height)
//   // 可选其他值 image/jpeg
//   return canvas.toDataURL('image/jpeg')
// }
// const setAvatarBase64 = (src, callback) => {
//   let image = new Image()
//   // 处理缓存
//   image.src = src + '?v=' + Math.random()
//   // 支持跨域图片
//   image.crossOrigin = '*'
//   image.onload = function () {
//     let base64 = transBase64FromImage(image)
//     callback && callback(base64)
//   }
// }

const emit = defineEmits(['change'])

defineExpose({
  showDialog,
  handleCancel
})
</script>
<style lang="scss" scoped>
.cropper-wrap {
  height: 500px;
}
</style>
