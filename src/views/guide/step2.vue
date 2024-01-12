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
          <div class="item" :class="{ active: type == '1' || type == '2' }" @click="changeType('1')">
            <div class="tit"><i></i>—键导入</div>
            <div class="cont">
              若在其它外贸B2B平台上 (如alibaba.com、made-in-china.com等) 已经有您的展厅，可通过AI进行数据收集，导入到您的新网站来。
            </div>
          </div>
          <!-- <div class="item" :class="{ active: type == '2' }" @click="changeType('2')">
            <div class="tit"><i></i>Made-in-China 展厅获取</div>
            <div class="cont">
              适合您已经在Made-in-China 上传了您的公司信息及产品信息，将通过展厅内的信息为您生成相关内容
            </div>
          </div> -->
          <div class="item" :class="{ active: type == '3' }" @click="changeType('3')">
            <div class="tit">自主创建</div>
            <div class="cont">此方式适合您从零开始创建公司站点,需要手动录入公司、产品等一些相关信息,将通过录入的信息为您生成网站内容。</div>
          </div>
        </div>
        <div class="guide-input-wrap">
          <a-form :model="form" layout="vertical" ref="formref">
            <a-form-item field="name1" label="请提供展厅地址：" v-show="type == '1' || type == '2'">
              <a-input v-model.trim="form.ali" @blur="checkFn" placeholder="例如&nbsp;xxxx.en.alibaba.com&nbsp;&nbsp;xxxx.en.made-in-china.com" :class="{ 'arco-input-error': status[type] == '3' }" />
            </a-form-item>
            <!-- <a-form-item field="name1" label="请提供 Made-in-China 展厅地址：" v-show="type == '2'">
              <a-input v-model.trim="form.made" @blur="checkFn" :class="{ 'arco-input-error': status['2'] == '3' }" />
            </a-form-item> -->
            <div class="status-box-wrap">
              <div class="status-box" v-if="status[type] == '1'">
                <div class="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>校验中</span>
              </div>
              <div class="status-box success" v-else-if="status[type] == '2'">
                <icon-check-circle-fill /><span>校验通过，该地址可用</span>
              </div>
              <div class="status-box error" v-else-if="status[type] == '3'">
                <icon-exclamation-circle-fill /><span>校验失败，该地址不可用</span>
              </div>
            </div>
          </a-form>
        </div>
        <div
          class="l-btn"
          v-loading="loadinged"
          :class="{ disabled: disabled, grash: status[type] != '2' && type != '3' }"
          @click="submit"
          gi-loading-type="circle"
        >
          <span>下一步</span><icon-arrow-right />
        </div>
      </div>
      <div class="go-link"><span @click="nextFn">稍后选择</span></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Guide2">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import { useLoading } from '@/hooks'
import { Message, Form } from '@arco-design/web-vue'
import { guideDataurlcheck, guideDatafrom, guidejump, guidegetpredomains } from '@/apis'
const router = useRouter()
const userStore = useUserStore()
const navTabStore = useNavTabStore()
const form = ref({
  ali: '',
  made: ''
})
// 0 无状态 1 校验中 2 成功 3 失败
const status = reactive({
  '1': '0',
  '2': '0',
  '3': '0'
})
const type = ref('1')
const disabled = ref(false)
const loadinged = ref(false)
const submit = async () => {
  let dataurl = ''
  if (type.value == '1' || type.value == '2') {
    dataurl = form.value.ali
  }
  loadinged.value = true
  const res = await guideDatafrom({
    datafrom: type.value,
    dataurl
  }).finally(() => {
    loadinged.value = false
  })
  if (res.code == 0) {
    // Message.success(res.message || '操作成功')
    goOver()
  }
}
const changeType = (val) => {
  type.value = val
}
const checkFn = async () => {
  status[type.value] = '0'
  if (~form.value.ali.indexOf('?')) {
    form.value.ali = form.value.ali.split('?')[0]
  }
  let url = form.value.ali
  if (!url) {
    status[type.value] = '0'
    return
  }
  if (~url.indexOf('alibaba.com')) {
    type.value = '1'
  } else if (~url.indexOf('made-in-china.com')) {
    type.value = '2'
  } else {
    status[type.value] = '3'
    return
  }
  status[type.value] = '1'
  const res = await guideDataurlcheck({
    url,
    datafrom: type.value
  })
  if (res.code == 0) {
    if (res.data == 200) {
      status[type.value] = '2'
    } else if (res.data == 400) {
      status[type.value] = '3'
    }
  } else {
    status[type.value] = '3'
  }
}
const goOver = () => {
  userStore.getHomeinfo(() => {
    router.push({ path: '/overview' })
  })
}

const nextFn = async() => {
  const res = await guidejump()
  if (res.code == 0) {
    goOver()
  }
}
</script>

<style lang="scss" scoped>
@import './mod/index.scss';
</style>
