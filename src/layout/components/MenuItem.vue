<template>
  <a-sub-menu class="mormal-menu" :class="'menu-level-' + data.level" :key="data.path"
    v-if="data.children && data.children.length && !data.hidden">
    <template #icon>
      <component :is="data.icon" :size="18"></component>
    </template>
    <template #title>{{ data.name }}</template>
    <MenuItem  v-for="item in data.children" :key="item.id" :data="item"
      @click="onClickMenuItem">
    </MenuItem>
    <template #expand-icon-down>
      <icon-down />
    </template>
  </a-sub-menu>

  <a-menu-item class="mormal-menu no-child" :class="'menu-level-' + data.level" v-else :key="data.path"
    @click="onClickMenuItem(data)">
    <template #icon>
      <!-- <GiSvgIcon v-if="data.icon" :size="24" :name="data.icon"></GiSvgIcon> -->
      <!-- <icon-unordered-list v-else :size="20" /> -->
      <!-- <div class="item-width" v-else></div> -->
      <component :is="data.icon" :size="18"></component>
    </template>
    {{ $t(data.name) }}
  </a-menu-item>
</template>

<script setup lang="ts" name="MenuItem">
import $t from '@/i18n/use'

export interface Props {
  data: MenuItem
}

withDefaults(defineProps<Props>(), {
  data: () => ({ id: '', name: '' })
})

const emit = defineEmits(['click'])

const onClickMenuItem = (item: MenuItem) => {
  emit('click', item)
}
</script>

<style lang="scss" scoped>
.item-width {
  width: 36px;
}
</style>
<style lang="scss">
.arco-trigger-popup-wrapper {
  .item-width {
    width: 16px;
  }
}
</style>
