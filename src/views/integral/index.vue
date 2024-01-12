<template>
  <div class="intmod">
    <div class="top-nav-tit">
      <div class="m-left">账户积分</div>
      <div class="m-right">
        <a-button type="primary" @click="golist">积分账单</a-button>
      </div>
    </div>
    <div class="intmod-inner detail">
      <a-card :bordered="false">
        <div>您当前的积分余额为<span>1000</span>积分。</div>
        <div class="arco-card-header-title mar-t-30">积分充值</div>
        <div class="int-g-box">
          <a-radio-group v-model="pointType">
            <a-radio :value="item.value" v-for="item in defaultarr" :key="item.value">
              <template #radio="{ checked }">
                <a-space align="start" class="custom-radio-card" :class="{ 'custom-radio-card-checked': checked }">
                  <div className="custom-radio-card-mask">
                    <div className="custom-radio-card-mask-dot" />
                  </div>
                  <div>
                    <div className="custom-radio-card-title">{{ item.point }} 积分</div>
                    <a-typography-text type="secondary">￥{{ item.price }}</a-typography-text>
                  </div>
                </a-space>
              </template>
            </a-radio>
            <div class="radio-wrap">
              <a-space>
                <a-radio :value="4">
                  <template #radio="{ checked }">
                    <div>
                      <span class="radio-tit">自定义</span>
                      <a-space align="start">
                        <a-input
                          v-model="coustomPoint.point"
                          :style="{ width: '180px' }"
                          placeholder="200 - 1000000"
                          size="large"
                          @change="pointChange"
                          @click="pointType = 4"
                        >
                          <template #append> 积分 </template>
                        </a-input>
                      </a-space>
                    </div>
                  </template>
                </a-radio>
                <span class="p-price" v-if="pointType == 4 && coustomPoint.price"
                  >需支付￥{{ coustomPoint.price }}</span
                >
              </a-space>
            </div>
          </a-radio-group>
        </div>
        <div class="arco-card-header-title mar-t-30">支付方式</div>
        <div class="pay-g-box">
          <a-radio-group v-model="payType">
            <a-radio :value="item.type" v-for="item in payArr" :key="item.type">
              <template #radio="{ checked }">
                <a-space align="start" class="custom-radio-card" :class="{ 'custom-radio-card-checked': checked }">
                  <div className="custom-radio-icon">
                    <icon-alipay-circle v-if="item.type === 'alipay'" />
                    <icon-wechatpay v-else-if="item.type === 'wechat'" />
                    <icon-export v-else-if="item.type === 'offline_transfer'" />
                  </div>
                  <div className="custom-radio-card-title">{{ item.name }}</div>
                </a-space>
              </template>
            </a-radio>
          </a-radio-group>
        </div>
        <div class="pay-tips">
          <div>说明：</div>
          <div>
            <p>1.每次最少充值200元；</p>
            <p>2.一元人民币等额一个积分；</p>
            <p>3.积分有效期2年。</p>
          </div>
        </div>
        <a-button type="primary" size="large" style="width: 200px">去支付</a-button>
      </a-card>
      <a-card :bordered="false" title="积分充值记录">
        <a-form label-align="left" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
          <a-row :gutter="20" wrap>
            <a-col :span="5">
              <a-form-item field="search_name" label="状态">
                <a-select placeholder="请选择">
                  <a-option value="">全部</a-option>
                  <a-option value="1">支付成功</a-option>
                  <a-option value="2">未支付</a-option>
                  <a-option value="3">已取消</a-option>
                  <a-option value="4">确认成功</a-option>
                  <a-option value="5">驳回</a-option>
                  <a-option value="6">待确认</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item field="search_name" label="支付方式">
                <a-select placeholder="请选择">
                  <a-option value="">全部</a-option>
                  <a-option value="1">支付宝支付</a-option>
                  <a-option value="2">微信支付</a-option>
                  <a-option value="3">线下转账</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="search_name" label="提交时间">
                <a-date-picker style="width: 200px" />
                <span style="padding: 0 10px">~</span>
                <a-date-picker style="width: 200px" />
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
              <a-table-column title="充值积分" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="支付金额" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="提交时间" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="支付方式" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="状态" data-index="id" :width="120" align="left">
                <template #cell="{ record, rowIndex }">
                  {{ rowIndex + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="到账确认时间" data-index="id" :width="120" align="left">
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
const golist = () => {
  router.push({path: '/integral/list'})
}
</script>

<style lang="scss" scoped>
@import './mod/index.scss';
</style>
