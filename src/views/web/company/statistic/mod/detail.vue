<template>
  <div class="table-wrap detail">
    <div class="top-nav-tit">
      <div class="m-left">{{ keyDate[mainkey].name }}</div>
      <div class="m-right"></div>
    </div>
    <div class="table-wrap-inner">
      <a-card :bordered="false" title="插入代码">
        <a-tabs
          type="card"
          size="small"
          v-model:active-key="activeKey"
          hide-content
          v-if="keyDate[mainkey].child.length > 1"
        >
          <a-tab-pane :key="index" :title="keylist[index].name" v-for="(item, index) in keyDate[mainkey].child">
          </a-tab-pane>
        </a-tabs>
        <div class="area-box">
          <a-textarea
            v-show="activeKey == index"
            v-model="keylist[index].content"
            :key="'are'+index"
            v-for="(item, index) in keyDate[mainkey].child"
            :auto-size="{
              minRows: 15
            }"
          />
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts" name="MainTable">
import { reactive, ref, h } from 'vue'
import { usePagination } from '@/hooks'
import { companygetstatistic, companysetstatistic } from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import { useFileStore } from '@/store'
const fileStore = useFileStore()
const emit = defineEmits(['update', 'changeTab'])
const router = useRouter()
const route = useRoute()
const keyDate = reactive({
  staticcode: {
    name: 'Web端网站所有页面',
    content: 'Body头, Body尾, Head内',
    child: ['staticcode_body', 'staticcode', 'staticcode_head']
  },
  staticcode_mobile: {
    name: '移动网站所有页面',
    content: 'Body头, Body尾, Head内',
    child: ['staticcode_mobile_body', 'staticcode_mobile', 'staticcode_mobile_head']
  },
  staticcode_inquiry: {
    name: 'Web端询盘发送成功页面',
    content: 'Body头, Body尾, Head内',
    child: ['staticcode_inquiry_body', 'staticcode_inquiry', 'staticcode_inquiry_head']
  },
  staticcode_contactus: {
    name: '联系我们（Contact Us）页面',
    content: 'Body头, Body尾, Head内',
    child: ['staticcode_contactus_body', 'staticcode_contactus', 'staticcode_contactus_head']
  },
  staticcode_clickmail: {
    name: '网站中所有邮箱图标按钮',
    content: '',
    child: ['staticcode_clickmail']
  },
  staticcode_inquirypopup: {
    name: 'Web端询盘发送按钮',
    content: '',
    child: ['staticcode_inquirypopup']
  },
  staticcode_mobileinquiry: {
    name: '移动端询盘发送成功页面',
    content: 'Body头, Body尾, Head内',
    child: ['staticcode_mobileinquiry_body', 'staticcode_mobileinquiry', 'staticcode_mobileinquiry_head']
  },
  staticcode_mobileinquirypopup: {
    name: '移动端询盘发送按钮',
    content: '',
    child: ['staticcode_mobileinquirypopup']
  }
})
const mainkey = ref(route.query.mainkey)
const maincontent = keyDate[mainkey.value]
const keylist = ref([
  {
    name: 'Body头',
    content: ''
  },
  {
    name: 'Body尾',
    content: ''
  },
  {
    name: 'Head内',
    content: ''
  }
])
const activeKey = ref(0)

const getTableData = async () => {
  const res = await companygetstatistic()
  if (res.code == 0) {
    const mainitem = res.data.statistic || {}
    maincontent && maincontent.child.forEach((key, index) => {
      keylist.value[index].content = mainitem[key]
    })
  }
}

getTableData()
const saveFn = async() => {
  const params = {}
  maincontent.child.forEach((item, index) => {
    params[item] = keylist.value[index].content
  })
  fileStore.setloading(true)
  const res = await companysetstatistic({
    statistic: params
  }).finally(() => {
    fileStore.setloading(false)
  })
  if (res.code == 0) {
    Message.success(res.message || '操作成功')
  }
}

fileStore.$onAction(({name}) => {
  if (name === 'cancel') {
    getTableData()
  } else if (name === 'save') {
    saveFn()
  }
})
</script>

<style lang="scss" scoped>
.table-wrap-inner {
  padding: 20px 15px 24px 20px;
  flex: 1;
  display: flex;
  :deep(.arco-card) {
    flex: 1;
    margin-bottom: 0;
  }
}
.table-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.area-box {
  margin-top: 16px;
}
</style>
