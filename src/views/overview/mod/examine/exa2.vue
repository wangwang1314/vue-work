<template>
  <div class="inner-wrap">
    <img src="@/assets/images/sad-face.png" alt="" />
    <div class="tit">非常遗憾，上线审核未通过…</div>
    <div class="sub-tit"><div>原因：</div><div v-html="reson"></div></div>
    <div class="e-btn" @click="reset"><icon-refresh /><span>重新申请</span></div>
  </div>
</template>
<script setup lang="ts" name="exa2">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import { guidereapply, guiderefusereason, guidegetdatastate } from '@/apis'
const router = useRouter()
const userStore = useUserStore()
const reset = async () => {
  const res = await guidereapply()
  if (res.code == 0) {
    userStore.getHomeinfo(() => {
      userStore.setcheckstate(-1)
    })
  }
}
const reson = ref('')
const getreson = async () => {
  const res = await guiderefusereason()
  if (res.code === 0) {
    if (res.data) {
      const str = res.data.replaceAll('\n', '<br>')
      reson.value = str || ''
    }
  }
}
const timer = ref()
const getstate = async () => {
  const res = await guidegetdatastate()
  if (res.code == 0) {
    // -1未开始获取 1完成 0获取中
    userStore.setdatastate(res.data)
    if (res.data == 0) {
      clearTimeout(timer.value)
      timer.value = setTimeout(() => {
        getstate()
      }, 10000)
    }
  }
}
getstate()
onMounted(() => {
  getreson()
})
</script>
<style lang="scss" scoped>
@import './common.scss';
.inner-wrap {
  padding: 46px 0 0 80px;
  img {
    width: 64px;
    height: 64px;
    object-fit: cover;
  }
  .tit {
    margin-top: 16px;
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
  }
  .sub-tit {
    margin-top: 8px;
    color: rgba(255, 255, 255, 0.64);
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    display: flex;
    &>div:last-child {
      flex: 1;
      max-width: 800px;
    }
  }
  .e-btn {
    margin-top: 24px;
  }
}
</style>
