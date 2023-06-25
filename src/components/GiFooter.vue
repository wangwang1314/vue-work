<template>
  <div class="gi-footer" :style="{'backgroundColor': props.bgcolor}">
    @{{currentyears}} 北京宜选科技股份公司 京公网安备110105010289号 | 京ICP备09074326号-6
  </div>
</template>

<script lang="ts">
export default {
  name: 'GiFooter'
}
</script>

<style lang="scss" scoped>
.gi-footer {
  padding: 6px 0 16px 0;
  font-size: 12px;
  line-height: 18px;
  color: var(--text-color-gray);
  // border-top: 1px dashed var(--color-neutral-3);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: transparent;
}
</style>
<script setup lang="ts">
import {ref} from 'vue'
const years = new Date().getFullYear();
const currentyears = ref(years)
const props = defineProps({
  bgcolor: String
})
</script>
