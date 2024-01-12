<template>
  <div class="intmod">
    <div class="top-nav-tit">
      <div class="m-left">积分账单</div>
      <div class="m-right"></div>
    </div>
    <div class="intmod-inner detail">
      <a-card :bordered="false">
        <div class="int-total">
          <a-space :size="20">
            <div>积分统计：</div>
            <div>充值：<span class="red">+1000</span></div>
            <div>消费：<span class="blue">-2000</span></div>
            <div>调整：<span class="yellow">+500</span></div>
            <div>总计：<span class="green">-500</span></div>
          </a-space>
        </div>
        <a-form label-align="left" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
          <a-row :gutter="20" wrap>
            <a-col :span="5">
              <a-form-item field="search_name" label="类型">
                <a-select placeholder="请选择">
                  <a-option value="">全部</a-option>
                  <a-option value="1">充值</a-option>
                  <a-option value="2">消费</a-option>
                  <a-option value="3">调整</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="search_name" label="时间">
                <a-date-picker style="width: 200px" />
                <span style="padding: 0 10px">~</span>
                <a-date-picker style="width: 200px" />
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item field="search_name" label="备注">
                <a-input placeholder="请输入关键词"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <div class="s-btn-wrap">
                <a-space>
                  <a-button type="primary">查询</a-button>
                  <a-button>重置</a-button>
                </a-space>
              </div>
            </a-col>
          </a-row>
        </a-form>
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
              <a-table-column title="类型" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="变动积分" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="时间" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="备注" data-index="id" :width="120" align="left">
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

<script setup lang="ts" name="intmod">
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
@import './mod/index.scss';
</style>
