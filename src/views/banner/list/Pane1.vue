<template>
  <div class="banner-detail">
  
  </div>
</template>

<script setup lang="ts" name="companyTable">
import { reactive, ref, h, nextTick } from 'vue'
import { getCompanyFactory, saveCompanyFactory, pictureDdel } from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import lodash from 'lodash'
import draggable from 'vuedraggable'


</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
