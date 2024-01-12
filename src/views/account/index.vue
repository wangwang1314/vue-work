<template>
  <div class="detail-out">
    <div class="top-nav-tit">
      <div class="m-left">账户管理</div>
      <div class="m-right"></div>
    </div>
    <div class="com-detail detail">
      <a-form
        class="com-form"
        ref="formRef"
        label-align="left"
        size="medium"
        :model="form"
        :auto-label-width="true"
      >
        <a-card :bordered="false" title="基本资料">
          <a-form-item label="公司名称" v-if="form.company_name">
            {{ form.company_name || '--' }}
          </a-form-item>
          <a-form-item label="账户名" v-if="form.info.username">
            {{ form.info.username || '--' }}
          </a-form-item>
          <a-form-item label="用户姓名" v-if="form.info.name">
            {{ form.info.name || '--' }}
          </a-form-item>
          <a-form-item label="联系邮箱" v-if="form.info.email">
            {{ form.info.email || '--' }}
          </a-form-item>
          <a-form-item label="联系电话" v-if="form.info.tel">
            {{ form.info.tel || '--' }}
          </a-form-item>
          <a-form-item label="" class="no-bot" :hide-label="true">
            <a-button type="primary" size="large" @click="golink">账户管理</a-button>
          </a-form-item>
        </a-card>
        <a-card :bordered="false" title="相关协议">
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
              <a-table-column title="协议名称" data-index="id" :width="100" align="left">
                <template #cell="{ record }">
                  <div class="pro-id">宜选建站服务协议</div>
                </template>
              </a-table-column>
              <a-table-column title="签署时间" data-index="name" :width="100" align="center">
                <template #cell="{ record, rowIndex }">
                  <div class="pro-id">{{ record.provetime }}</div>
                </template>
              </a-table-column>
              <a-table-column title="操作" data-index="name" :width="100" align="center">
                <template #cell="{ record, rowIndex }">
                  <a-button type="text" @click="look">查看</a-button>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </a-card>
      </a-form>
      <a-modal width="1000px" v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
        <template #title>
          <span></span>
        </template>
        <div>
          <div class="tit">
            <span>{{ form.policy.name }}</span>在<span>{{ form.policy.provetime }}</span>操作同意协议内容
          </div>
          <agreement></agreement>
        </div>
        <template #footer>
          <span></span>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts" name="qualitycom">
import { reactive, ref, h, nextTick } from 'vue'
import { companyaccountinfo } from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message, Modal } from '@arco-design/web-vue'
import { getTreeDate } from '@/utils/common'
import lodash from 'lodash'
import agreement from './mod/agreement.vue'
import { useUserStore, useFileStore } from '@/store'
const fileStore = useFileStore()
const uploadtype = ref('5')

const userStore = useUserStore()
const visible = ref(false)
const look = () => {
  visible.value = true
}
const form = reactive({
  info: {
    name: '',
    username: '',
    email: '',
    tel: ''
  },
  company_name: '',
  policy: {
    provetime: '',
    name: ''
  }
})
const tableData = ref([])
const golink = () => {
  window.open('https://uc.ecer.com/home/account#contact', '_blank')
}
const getData = async () => {
  const res = await companyaccountinfo()
  if (res.code == 0) {
    Object.assign(form, res.data)
    if (res.data.policy && res.data.policy.provetime) {
      tableData.value.push(res.data.policy)
    }
  }
}
getData()
fileStore.$onAction(({ name }) => {
  if (name === 'cancel') {
    getData()
  } else if (name === 'save') {
    saveFn()
  }
})
</script>

<style lang="scss" scoped>
@import './mod/index.scss';
@import './mod/list.scss';
.tit {
  width: 900px;
  margin: 0 auto;
  --primary-6: 8, 90, 255 !important;
  color: rgb(var(--primary-6));
  span {
    margin:0 4px;
    
  }
}
</style>
