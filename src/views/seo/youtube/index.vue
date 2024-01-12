<template>
  <div class="navlink">
    <div class="table-wrap">
      <div class="table-page">
        <div class="table-tit">
          <div class="table-tit-inner">
            <div class="icon-box">
              <img src="@/assets/images/ai/youtube-i.png" alt="" />
            </div>
            <div class="inner-text">
              <div class="tit" v-if="reportObj.diamond">
                当前YouTube视频搜索前十排名量：{{ reportObj.total_records }}
              </div>
              <div class="tit" v-else>当前YouTube视频搜索首页排名量：{{ reportObj.total_records }}</div>
              <div class="sub-tit">
                <span v-if="reportObj.diamond">前三排名量: {{ reportObj.total_three }}</span>
                <span>已发布YouTube视频量: {{ reportObj.video_total }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="table-inner">
          <a-row>
            <a-col :span="12">
              <div class="col-tit">YouTube排名</div>
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
            :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
            @page-change="changeCurrent"
            @page-size-change="changePageSize"
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
              <a-table-column title="排名" data-index="id" :width="50" align="left">
                <template #cell="{ record }">
                  <div class="pro-id">{{ record.pos }}</div>
                </template>
              </a-table-column>
              <a-table-column title="搜索链接" data-index="id" :width="120" align="left">
                <template #cell="{ record }">
                  <a-tooltip :content="record.link">
                    <a-link :href="record.link" class="link-over" target="_blank">{{ record.link }}</a-link>
                  </a-tooltip>
                </template>
              </a-table-column>
              <a-table-column title="视频" data-index="id" :width="120" align="left">
                <template #cell="{ record }">
                  <div class="video-box">
                    <div class="v-img-box">
                      <img :src="record.video_img" />
                    </div>
                    <a-tooltip :content="record.video_tit">
                      <a-link :href="record.video_url" class="link-over" target="_blank">{{ record.video_tit }}</a-link>
                    </a-tooltip>
                  </div>
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
              <li>1、以youtube.com英文版北美地域排名为检测标准，定期提供关键词报告。</li>
              <li>
                2、因个人账号偏好、浏览历史以及浏览器缓存因素的影响，实际搜索结果可能较报告有一定出入，属于正常情况。
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
import { seorankvideo } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const cid = route.query.cid
const VITE_API_PREFIX = import.meta.env.VITE_API_PREFIX
const textstr = import.meta.env.VITE_API_GOOGLE
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const loading = ref(false)
const tableData = ref([])
const reportObj = ref({})
const ptype = ref('1')

const getTableData = async () => {
  loading.value = true
  const res = await seorankvideo({
    type: ptype.value,
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
    '/download-video-report&report_time=' +
    reportObj.value.report_time +
    '&type=' +
    ptype.value +
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
  background: url('@/assets/images/ai/youtube.png') center right no-repeat;
  .table-tit-inner {
    display: flex;
    align-items: center;
    .icon-box {
      margin-right: 16px;
    }
    .tit {
      color: #fff;
      font-size: 28px;
      font-weight: 400;
      line-height: 39px;
    }
    .sub-tit {
      color: rgb(201, 205, 212);
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
