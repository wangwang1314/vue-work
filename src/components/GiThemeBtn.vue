<template>
  <a-button size="mini" class="gi_hover_btn" @click="handleToggleTheme">
    <template #icon>
      <icon-sun-fill :size="18" v-if="appStore.theme === 'light'" class="color-fill-1"></icon-sun-fill>
      <icon-moon-fill :size="18" v-else class="color-fill-1"></icon-moon-fill>
    </template>
  </a-button>
</template>

<script setup lang="ts" name="GiThemeBtn">
import { useDark, useToggle } from '@vueuse/core'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    appStore.toggleTheme(dark)
  }
})

const toggleTheme = useToggle(isDark)

const handleToggleTheme = () => {
  toggleTheme()
}
</script>
<style lang="scss" scoped></style>
