<template>
  <div class="intmod">
    <div class="intmod-inner detail">
      <section class="tab">
        <a-tabs hide-content size="large" type="capsule" v-model:active-key="activeKey">
          <a-tab-pane :key="1">
            <template #title>
              <div class="tit">应用市场</div>
            </template>
          </a-tab-pane>
          <a-tab-pane :key="2">
            <template #title>
              <div class="tit">我的应用<span class="s-span">(2)</span></div>
            </template>
          </a-tab-pane>
        </a-tabs>
        <div class="tab-right">
          <div class="gift">
            <icon-gift></icon-gift>
            积分余额：880
          </div>
          <a-button type="primary">
            去充值&nbsp;
            <icon-arrow-right />
          </a-button>
        </div>
      </section>
     <tab1 v-if="activeKey==1"></tab1>
     <tab2 v-else></tab2>
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
import tab1 from './mod/tab1.vue'
import tab2 from './mod/tab2.vue'
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
const activeKey = ref(1)
</script>

<style lang="scss" scoped>
@import './mod/index.scss';
</style>
