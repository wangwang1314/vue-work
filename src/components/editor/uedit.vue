<template>
  <div class="editor">
    <vue-ueditor-wrap v-model="content" @ready="ready" :config="config" @beforeInit="addCustomButtom" :destroy="true"></vue-ueditor-wrap>
    <pic-dialog ref="picDialogRef" @change="picChange"></pic-dialog>
    <video-dialog ref="videoDialogRef" @change="videoChange"></video-dialog>
  </div>
</template>

<script setup lang="ts" name="uedit">
import { ref, reactive, createApp, watch } from 'vue'
import picDialog from '@/components/commonDialog/picDialog.vue'
import videoDialog from '@/components/commonDialog/videoDialog.vue'
const baseURL = import.meta.env.VITE_API_BASE_AJAX
const api = import.meta.env.VITE_API_PREFIX
const baseRoute = import.meta.env.VITE_ROURE_BASE_URL
const props = defineProps({
  height: Number,
  modelValue: String
})
const content = ref(props.modelValue)
watch(props, (newValue) => {
  content.value = newValue.modelValue
})
const emit = defineEmits(['update:modelValue'])
watch(content, (newValue, oldValue) => {
  emit('update:modelValue', newValue)
})
const config = reactive({
  // 编辑器不自动被内容撑高
  autoHeightEnabled: false,
  // 初始容器高度
  initialFrameHeight: props.height || 400,
  // 初始容器宽度
  initialFrameWidth: '100%',
  // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
  serverUrl: `${api}${baseURL}?r=ueditor/universal`,
  // // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
  UEDITOR_HOME_URL: baseRoute + '/UEditor/'
})

const picDialogRef = ref()
const videoDialogRef = ref()
// 获取实例
const editorIns = ref()
const ready = (editorInstance) => {
  // console.log(editorInstance, 'editorInstance')
  // if (editorInstance) {
  //   editorIns.value = editorInstance
  // }
}
const addCustomButtom = () => {
  window.UE.registerUI(
    'cosvideo',
    function (editor, uiName) {
      // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
      // editor.registerCommand(uiName, {
      //   execCommand: function () {
      //     editor.execCommand('inserthtml', ``)
      //   }
      // })
      // 参考http://ueditor.baidu.com/doc/#COMMAND.LIST
      var btn = new window.UE.ui.Button({
        name: 'cosvideo',
        title: '视频中心',
        cssRules: `background-position: -782px -77px;`,
        onclick: function () {
          // 渲染dialog
          editorIns.value = editor
          videoDialogRef.value?.showDialog()
          editor.execCommand(uiName)
        }
      })

      return btn
    },
    100 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */
  )

  window.UE.registerUI(
    'cospic',
    function (editor, uiName) {
      // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
      // editor.registerCommand(uiName, {
      //   execCommand: function () {
      //     editor.execCommand('inserthtml', ``)
      //   }
      // })
      // 参考http://ueditor.baidu.com/doc/#COMMAND.LIST
      var btn = new window.UE.ui.Button({
        name: 'cospic',
        title: '图片中心',
        cssRules: `background-position: -754px -77px;`,
        onclick: function () {
          // 渲染dialog
          editorIns.value = editor
          picDialogRef.value?.showDialog()
          // that.dialogVisible = true
          editor.execCommand(uiName)
        }
      })
      return btn
    },
    100 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */
  )
}
const picChange = (data) => {
  let str = ''
  data && data.forEach((item) => {
    str += `<p><img style="max-width:640px" src="${item.remark_url}" /></p>`
  })
  editorIns.value.execCommand('inserthtml', str)
}
const videoChange = (data) => {
  const str = `<p><br/><video class="youtube-video-offline" poster="${data[0].img_path}" data-videoid="502" src="${data[0].youtube_url_local}" controls="controls" style="max-width:640px;"><span>''</span></video></p>`
  editorIns.value.execCommand('inserthtml', str)
}
</script>

<style lang="less" scoped>
.editor {
  // border: 1px solid var(--color-border-3);
  position: relative;
  z-index: 1;
  min-width: 350px;
  width: 100%;
  &.w-e-full-screen-container {
    z-index: 9999;
  }
}
:deep(.edui-default .edui-editor) {
  background: var(--color-bg-4);
  border: 1px solid var(--color-border-3);
}
:deep(.edui-default .edui-editor-toolbarboxinner) {
  background-color: var(--color-bg-3);
}
:deep(.edui-default .edui-toolbar .edui-combox .edui-combox-body) {
  background-color: var(--color-bg-4);
}
</style>
