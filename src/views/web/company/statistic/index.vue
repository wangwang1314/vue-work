<template>
  <div class="table-wrap">
    <div class="top-nav-tit">
      <div class="m-left">自定义代码-流量统计</div>
      <div class="m-right"></div>
    </div>
    <div class="table-page">
      <section class="table-box">
        <!-- <div class="tit-class">流量统计</div> -->
        <div class="table-inner">
            <a-table
              row-key="id"
              size="small"
              page-position="br"
              :bordered="{ cell: true }"
              :data="tableData"
              :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
              :pagination="false"
              class="coustom-table"
            >
              <template #columns>
                <a-table-column title="触发页面" data-index="id" :width="200" align="center">
                  <template #cell="{ record }">
                    <div class="pro-id">{{ record.name }}</div>
                  </template>
                </a-table-column>
                <a-table-column title="代码位置" data-index="id" :width="200" align="center">
                  <template #cell="{ record }">
                    <div class="pro-id">{{ record.content || '--' }}</div>
                  </template>
                </a-table-column>
                <a-table-column title="操作" :width="200" align="center">
                  <template #cell="{ record }">
                    <a-space :size="4">
                      <a-button type="text" @click="goedit(record)">
                        <template #icon>
                          <icon-edit :size="16" :stroke-width="3" />
                        </template>
                        编辑
                      </a-button>
                     
                    </a-space>
                  </template>
                </a-table-column>
              </template>
            </a-table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts" name="MainTable">
import { reactive, ref, h } from 'vue'
import { usePagination } from '@/hooks'
import {
  companygetstatistic
} from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'

import { getTreeDate } from '@/utils/common'
const emit = defineEmits(['update', 'changeTab'])
const router = useRouter()
const route = useRoute()

const tableData = ref<productListItem[]>([])
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
  },
})
const collapsed = ref(false)

const getTableData = async () => {
  const res = await companygetstatistic()
  if (res.code == 0) {
    const mainitem = res.data.statistic || {}
    for (let item in mainitem) {
      if(keyDate[item]) {
        keyDate[item].mainkey = item
        tableData.value.push(keyDate[item])
      }
    }
  }
}

getTableData()

const goedit = (item) => {
  router.push({
    path: '/web/company/statisticedit',
    query: {
      mainkey: item.mainkey
    }
  })
}
</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
