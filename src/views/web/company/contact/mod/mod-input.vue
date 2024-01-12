<template>
  <a-input ref="ainput" style="width: 80px" size="mini" v-model="contperson" @blur="changeFn"></a-input>
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
const contperson = ref(prop.item.contperson)
onMounted(() => {
  checkActive()
})
watch(prop.item.isactive, (val) => {
  checkActive()
})
watch(prop.item.contperson, (val) => {
  contperson.value = val
})
const emit = defineEmits(['change'])
const changeFn = () => {
  let item = { ...prop.item, contperson: contperson.value, isactive: false}
  emit('change', item)
}
</script>