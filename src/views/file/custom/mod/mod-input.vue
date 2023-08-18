<template>
  <a-input ref="ainput" style="width: 80px" v-model="title" @blur="changeFn"></a-input>
</template>
<script lang="ts" setup name="modinput">
import { reactive, ref, h, onMounted, watch } from 'vue'
const prop = defineProps(['item'])
const ainput = ref()
const checkActive = () => {
  if (prop.item.isactive) {
    ainput.value?.focus()
  }
}
const title = ref(prop.item.title)
onMounted(() => {
  checkActive()
})
watch(prop.item.isactive, (val) => {
  checkActive()
})
watch(prop.item.title, (val) => {
  title.value = val
})
const emit = defineEmits(['change'])
const changeFn = () => {
  let item = { ...prop.item, title: title.value, isactive: false}
  emit('change', item)
}
</script>