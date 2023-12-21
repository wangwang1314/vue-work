<template>
  <div class="loading-box" v-loading="userStore.userInfo.loading">
    <a-config-provider update-at-scroll>
      <router-view></router-view>
      <template #loading>
        <img src="/static/images/loading.gif" style="width: 30px" />
      </template>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts" name="App">
import { useUserStore } from '@/store'
import { onMounted } from 'vue'
import router from './router/index'
import { uc_login_sdk } from '@/utils/common'
const userStore = useUserStore()
// 没有首页信息 & 不是登录页面的时候请求首页信息接口
// onMounted(() => {
//   setTimeout(() => {
//     if (
//       !userStore.userInfo.homeInfo &&
//       router.currentRoute.value.path != '/login' &&
//       router.currentRoute.value.path != '/overview'
//     ) {
//       userStore.getHomeinfo()
//     }
//   })
// })

if (uc_login_sdk.getCookie('app_ueid') == '') {
  uc_login_sdk.init()
}
userStore.$onAction(({ name }) => {
  if (name === 'hasinfo') {
    if (userStore.goRoute) {
      router.replace({ path: userStore.goRoute })
    }
  }
})
</script>
<style lang="scss" scoped>
.loading-box {
  height: 100%;
}
</style>
