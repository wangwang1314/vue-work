<template>
  <div class="guide guide-2">
    <div class="guide-box">
      <div class="guide-box-top">
        <img src="@/assets/images/ecer-logo.png" alt="" />
        <div>宜选网建站平台</div>
      </div>
      <div class="guide-inner-box">
        <div class="guide-inner-top">
          <div>请选择网站的产品资料信息录入方式</div>
        </div>
        <div class="guide-inner-list">
          <div class="item" :class="{ active: type == '1' }" @click="changeType('1')">
            <div class="tit"><i></i>Alibaba.com 展厅获取</div>
            <div class="cont">
              适合您已经在 alibaba.com 上传了您的公司信息及产品信息，将通过展厅内的信息为您生成相关内容
            </div>
          </div>
          <div class="item" :class="{ active: type == '2' }" @click="changeType('2')">
            <div class="tit"><i></i>Made-in-China 展厅获取</div>
            <div class="cont">
              适合您已经在Made-in-China 上传了您的公司信息及产品信息，将通过展厅内的信息为您生成相关内容
            </div>
          </div>
          <div class="item" :class="{ active: type == '3' }" @click="changeType('3')">
            <div class="tit">自主创建</div>
            <div class="cont">适合您从零开始创建公司站点，需要手动录入一些相关信息，将通过录入的信息为您生成内容</div>
          </div>
        </div>
        <div class="guide-input-wrap">
          <a-form :model="form" layout="vertical" ref="formref">
            <a-form-item field="name1" label="请提供 Alibaba.com 展厅地址：" v-show="type == '1'">
              <a-input v-model.trim="form.ali" :class="{'arco-input-error': status['1'] == '3' }"/>
            </a-form-item>
            <a-form-item field="name1" label="请提供 Made-in-China 展厅地址：" v-show="type == '2'">
              <a-input v-model.trim="form.made" :class="{'arco-input-error': status['2'] == '3' }"/>
            </a-form-item>
            <div class="status-box-wrap">
              <div class="status-box" v-if="status[type] == '1'">
                <div class="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>校验中</span>
              </div>
              <div class="status-box success" v-else-if="status[type] == '2'"><icon-check-circle-fill /><span>校验通过，该地址可用</span></div>
              <div class="status-box error" v-else-if="status[type] == '3'"><icon-exclamation-circle-fill /><span>校验失败，该地址不可用</span></div>
            </div>
          </a-form>
        </div>
        <div
          class="l-btn"
          v-loading="disabled"
          :class="{ disabled: disabled || status[type] != '2', grash: status[type] != '2' }"
          @click="submit"
          gi-loading-type="circle"
        >
          <span>下一步</span><icon-arrow-right />
        </div>
      </div>
      <div class="go-link"><span>稍后选择</span></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Guide2">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import { useLoading } from '@/hooks'
import { Message, Form } from '@arco-design/web-vue'
import type { LoginParams } from '@/apis'
const router = useRouter()
const userStore = useUserStore()
const navTabStore = useNavTabStore()
const form = ref({
  ali: '',
  made: ''
})
// 0 无状态 1 校验中 2 成功 3 失败
const status = reactive({
  '1': '1',
  '2': '2',
  '3': '0'
})
const type = ref('1')
const disabled = ref(false)
const submit = () => {}
const changeType = (val) => {
  type.value = val
}
</script>

<style lang="scss" scoped>
@import './mod/index.scss';
</style>
