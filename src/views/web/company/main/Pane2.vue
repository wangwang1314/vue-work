<template>
  <div class="com-intro com-detail">
    <a-form class="com-form" ref="formRef" size="medium" :model="form" layout="horizontal" :auto-label-width="true">
      <a-row class="full-width">
        <a-col :span="22">
          <a-form-item field="name" label="产品名称" :hide-label="true">
            <a-textarea
              :auto-size="{
                minRows: 5
              }"
              :max-length="150"
              show-word-limit
            ></a-textarea>
            <template #extra> 公司介绍概要，建议<span class="warning-color">100-120</span>个字符 </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="full-width">
        <a-col :span="22">
          <uedit v-model="form.html"></uedit>
        </a-col>
      </a-row>
      <a-row class="full-width">
        <a-col :span="22">
          <div class="com-btn-box">
            <a-space :size="12">
              <a-button type="primary">保存</a-button>
              <a-button>取消</a-button>
            </a-space>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, h, nextTick } from 'vue'
import uedit from '@/components/editor/uedit.vue'
const form = reactive({ html: '' })
</script>
<style lang="scss" scoped>
@import './mod/list.scss';
</style>
