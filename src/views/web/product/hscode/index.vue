<template>
  <div class="table-wrap">
    <div class="table-page">
      <a-form label-align="right" ref="formRef" auto-label-width :model="searchForm" class="form" direction="inline">
        <a-alert type="warning"
          ><template #icon><icon-notification /></template>提示：为分类和产品设定相应的8位海关编码，让系统推广更具针对性</a-alert
        >
      </a-form>
      <div class="table-box">
        <div class="table-inner">
          <a-table
            class="coustom-table"
            row-key="id"
            :data="tableData"
            size="small"
            ref="rtable"
            :bordered="{ cell: true }"
            :pagination="false"
            :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
            :loading="loading"
            @page-change="changeCurrent"
            @page-size-change="changePageSize"
          >
            <template #columns>
              <a-table-column :cellClass="'cell-cous'" title="分类名称" data-index="address" :width="120" align="left">
                <template #cell="{ record }">
                  <div :class="'cell-cous-lever-' + record.level">{{record.name}}</div> 
                </template>
              </a-table-column>
              <a-table-column title="产品数" data-index="name" :width="60" align="right">
                <template #cell="{ record }">{{ record.productcount }}</template>
              </a-table-column>
              <a-table-column title="单独设置产品" data-index="time" :width="80" align="right">
                <template #cell="{ record }">
                  <a-link v-if="record.specify_product_num > 0" @click="goLink(record)">{{ record.specify_product_num }}</a-link>
                  <span style="padding: 1px 4px;" v-else>{{ record.specify_product_num }}</span>
                </template>
              </a-table-column>
              <a-table-column title="海关编码" data-index="time" :width="120" align="center">
                <template #cell="{ record }">{{record.hs_code?.toString()}}</template>
              </a-table-column>
              <a-table-column title="操作" data-index="time" :width="120" align="center">
                <template #cell="{ record }">
                  <a-button type="text" size="mini" @click="setFn(record)">设置</a-button>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <GiFooter></GiFooter>
    <customs-code ref="customsRef" @update="getTableData"></customs-code>
  </div>
</template>
<script setup lang="ts" name="catelist">
import { reactive, ref, h } from 'vue'
import { usePagination } from '@/hooks'
import { getCategoryList, setCateHscode, allHscode } from '@/apis'
import { Notification, Message } from '@arco-design/web-vue'
import { useRoute, useRouter } from 'vue-router'
import { getTreeDate } from '@/utils/common'
import type { ItemList, CateItem } from './type'
import customsCode from './mod/customs-code.vue'
const router = useRouter()
const expandedKeys = ref([])
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  checkStrictly: true
})
const expandable = reactive({
  defaultExpandAllRows: true
})
const searchForm = reactive({
  search_name: ''
})
const isEdit = ref(false)
const tableData = ref<Array<ItemList>>([])
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const loading = ref(false)
const rtable = ref()
const getTableData = async () => {
  loading.value = true
  const { code, data } = await allHscode({
  }).finally(() => {
    loading.value = false
  })
  if (code === 0) {
    tableData.value = getTreeDate(data.categories)
    // setTotal(data.total_record)
  }
}
getTableData()
const customsRef = ref()
const setFn = (row: ItemList) => {
  customsRef.value?.showDialog(row)
}
const goLink = (row: ItemList) => {
  router.push({
    path: '/web/webproduct/list',
    query: {
      hs_code: 2,
      category_id: row.id
    }
  })
}
</script>
<style lang="scss" scoped>
@import './mod/list.scss';
</style>
