<template>
  <div class="intmod">
    <div class="intmod-inner detail">
      <a-card :bordered="false">
        <div class="table-h-wrap">
          <a-table
            row-key="id"
            size="small"
            page-position="br"
            :bordered="{ cell: true }"
            :loading="loading"
            :data="tableData"
            :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
            :pagination="{
              showPageSize: true,
              showJumper: true,
              total: total,
              current: current,
              pageSize: pageSize,
              showTotal: true
            }"
            @page-change="changeCurrent"
            @page-size-change="changePageSize"
            class="coustom-table"
          >
            <template #columns>
              <a-table-column title="序号" data-index="id" :width="100" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="服务名称" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="服务内容" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="服务期" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="服务状态" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="操作" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts" name="appstab2">
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import { Message, Form } from '@arco-design/web-vue'
import { prWebsetNav, prWebsetSaveNav } from '@/apis'
import { usePagination } from '@/hooks'
const router = useRouter()
const userStore = useUserStore()
const navTabStore = useNavTabStore()
const tableData = ref([])
const defaultarr = ref([
  { value: 0, price: 2000, point: 2000 },
  { value: 1, price: 1000, point: 1000 },
  { value: 2, price: 500, point: 500 },
  { value: 3, price: 200, point: 200 }
])
const coustomPoint = ref({
  value: 4,
  price: '',
  point: ''
})
const pointType = ref(0)
const payType = ref('alipay')
const payArr = ref([
  { type: 'alipay', name: '支付宝支付' },
  {
    type: 'wechat',
    name: '微信支付'
  },
  {
    type: 'offline_transfer',
    name: '线下转账'
  }
])
const max = 1000000
const min = 200
const pointChange = (val) => {
  const pvalue = parseInt(val)
  if (pvalue) {
    console.log(pvalue, 8888)
    coustomPoint.value.point = pvalue
  } else {
    coustomPoint.value.point = 200
  }
  if (coustomPoint.value.point > max) {
    coustomPoint.value.point = max
  } else if (coustomPoint.value.point < min) {
    coustomPoint.value.point = min
  }
}
watch(
  coustomPoint,
  (newval) => {
    coustomPoint.value.price = newval.point
  },
  { deep: true }
)
const form = ref({})
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const loading = ref(false)
</script>

<style lang="scss" scoped>
.table-h-wrap {
  height: calc(100vh - 190px);
}
</style>
