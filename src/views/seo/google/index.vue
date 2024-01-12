<template>
  <div class="navlink">
    <div class="table-wrap">
      <div class="table-page">
        <div class="table-tit">
          <div class="table-tit-inner">
            <div class="icon-box">
              <img src="@/assets/images/ai/google-i.png" alt="" />
            </div>
            <div class="inner-text">
              <div class="tit">当前Google搜索首页排名量：{{ reportObj.first_page_total }}</div>
              <div class="sub-tit">
                <span>有广告关键词排名数：{{ reportObj.ad_keyword_total }}</span>
                <span>已发布产品数：{{ reportObj.product_total }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="table-inner">
          <a-row>
            <a-col :span="12">
              <div class="col-tit">Google搜索排名</div>
            </a-col>
            <a-col :span="12">
              <div class="col-right">
                <span>报告生成日期：{{ reportObj.report_time }}</span>
                <a-button type="text" @click="downloadFn">下载报告</a-button>
              </div>
            </a-col>
          </a-row>
          <a-table
            row-key="id"
            size="small"
            page-position="br"
            :bordered="{ cell: true }"
            :loading="loading"
            :data="tableData"
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
            :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
            class="coustom-table"
          >
            <template #columns>
              <a-table-column title="序号" data-index="id" :width="50" align="left">
                <template #cell="{ record, rowIndex }">
                  <div class="pro-id">{{ rowIndex + 1 + (current - 1) * pageSize }}</div>
                </template>
              </a-table-column>
              <a-table-column title="关键词" data-index="id" :width="120" align="left">
                <template #cell="{ record }">
                  <div class="pro-id">{{ record.keyword }}</div>
                </template>
              </a-table-column>
              <a-table-column title="排名" data-index="id" :width="65" align="left">
                <template #cell="{ record }">
                  <div class="pro-id">第{{ record.page }}页，第{{ record.pos }}名 </div>
                </template>
              </a-table-column>
              <a-table-column title="谷歌索引量" data-index="id" :width="65" align="left">
                <template #cell="{ record }">
                  <div class="pro-id">{{ record.index_num }}</div>
                </template>
              </a-table-column>
              <a-table-column title="谷歌广告数" data-index="id" :width="65" align="left">
                <template #cell="{ record }">
                  <div class="pro-id">{{ record.ad_num }}</div>
                </template>
              </a-table-column>
              <a-table-column title="着陆链接" data-index="id" :width="150" align="left">
                <template #cell="{ record }">
                  <a-tooltip :content="record.link_url">
                    <a-link :href="record.link_url" class="link-over" target="_blank">{{ record.link_url }}</a-link>
                  </a-tooltip>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
        <div class="alert-box">
          <a-alert type="warning">
            <template #title>
              <span></span>
            </template>
            <ul class="alert-content">
              <li>1、以google.com排名为检测标准，每天提供关键词排名报告。</li>
              <li>2、排名关键词以被推广网站的英文版站内信息为准，包括PC版网站和移动设备版网站。</li>
              <li>
                3、谷歌广告数为Google.com上该词搜索结果前三页中的广告数量，数量越多，代表该关键词越热门，排名竞争越激烈。
              </li>
            </ul>
          </a-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="googleserver">
import { onMounted, ref } from 'vue'
import { usePagination } from '@/hooks'
import { seorankgoogle } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const cid = route.query.cid
const VITE_API_PREFIX = import.meta.env.VITE_API_PREFIX
const textstr = import.meta.env.VITE_API_GOOGLE
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const loading = ref(false)
const tableData = ref([])
const reportObj = ref({})
const getTableData = async () => {
  loading.value = true
  const res = await seorankgoogle({
    cid,
    page_no: current.value,
    page_size: pageSize.value
  }).finally(() => {
    loading.value = false
  })
  if (res.code == 0) {
    reportObj.value = res.data || {}
    tableData.value = res.data?.list || []
    setTotal(res.data?.total_records)
  }
}
const downloadFn = () => {
  window.location.href =
    window.location.origin +
    VITE_API_PREFIX +
    '/index.php?r=' +
    textstr +
    '/download-google-report&report_time=' +
    reportObj.value.report_time +
    (cid ? '&cid=' + cid : '')
}
onMounted(() => {
  getTableData()
})
</script>
<style lang="scss" scoped>
@import './mod/index.scss';
.table-tit {
  height: 160px;
  border-radius: 8px 8px 0 0;
  padding: 36px 40px;
  box-sizing: border-box;
  background: url('@/assets/images/ai/google.png') center right no-repeat;
  .table-tit-inner {
    display: flex;
    align-items: center;
    .icon-box {
      margin-right: 16px;
    }
    .tit {
      color: rgb(29, 33, 41);
      font-size: 28px;
      font-weight: 400;
      line-height: 39px;
    }
    .sub-tit {
      color: rgb(134, 144, 156);
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      margin-top: 10px;
      span {
        margin-right: 32px;
      }
      span:last-child {
        margin-right: 0;
      }
    }
  }
}
.col-tit {
  font-size: 16px;
  line-height: 32px;
  color: var(--color-text-1);
}
.col-right {
  text-align: right;
  margin-bottom: 10px;
  span {
    margin-right: 8px;
  }
}
.alert-box {
  padding: 0px 20px 16px 20px;
  .alert-content {
    font-size: 12px;
    color: var(--color-text-4);
  }
}
</style>
