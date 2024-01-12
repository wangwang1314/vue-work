<template>
  <div class="all-icon" @click="golink" v-if="link">
    <a-badge :count="count" v-if="count>0" class="c-num" :dotStyle="{ boxShadow: 'none'}" />
  </div>
</template>

<script setup lang="ts" name="Header">
import { ref, onMounted } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useUserStore, useAppStore } from '@/store'
import { useFullScreen } from '@/hooks'
import { useI18n } from 'vue-i18n'
import { companywebimconfig } from '@/apis'
import { loadscript } from '@/utils/common'

const link = ref('')
const count = ref(0)
const getData = async () => {
  const res = await companywebimconfig()
  if (res.code == 0) {
    link.value = res.data?.chat_url || ''
    if (res.data?.config) {
      const imconfig = res.data.config
      loadscript('https://litechat.ecer.com/v2/IM.min.js', () => {
        loadscript('https://litechat.ecer.com/v2/imPendant-sdk.js', () => {
            window.IMDATA.init({
              appid: imconfig.appid,
              loginname: imconfig.loginname,
              loginid: imconfig.loginid,
              onUnreadNum: (num) => {
                console.log(num)
                count.value = num
              }
            })
        })
      })
    }
  }
}
const golink = () => {
  window.open(link.value, '_blank')
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.all-icon {
  cursor: pointer;
  width: 80px;
  height: 101px;
  background: url('@/assets/images/floatimage_chat.gif') no-repeat;
  background-size: cover;
  position: fixed;
  bottom: 60px;
  right: 30px;
  z-index: 999;
}
.c-num {
  position: absolute;
  right: 0;
}
</style>
