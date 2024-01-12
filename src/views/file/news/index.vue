<template>
  <div class="manage">
    <div class="top-nav-tit">
      <div class="m-left">新闻管理</div>
      <div class="m-right">
        <a-button type="primary" size="large" @click="addContent">
          <template #icon><icon-plus /></template>
          新建新闻
        </a-button>
      </div>
    </div>
    <div class="table-wrap">
      <div class="table-page">
        <a-form label-align="right" ref="formRef" auto-label-width :model="searchForm" class="form" direction="inline">
          <a-row :gutter="16" wrap>
            <a-col :span="12">
              <a-form-item field="search_name" :hide-label="true">
                <a-space style="padding-top: 4px" :size="8">
                  <a-input-search
                    style="width: 400px"
                    @search="searchFn"
                    placeholder="请输入新闻名称"
                    v-model="searchForm.search_name"
                    search-button
                  >
                  </a-input-search>
                  <a-button size="small" status="danger" type="text" @click="showPopFn">
                    <template #default>批量删除</template>
                  </a-button>
                </a-space>
              </a-form-item>

              <!-- <a-button type="primary" @click="addContent" size="small" status="success">
                  <template #default>新增</template>
                </a-button> -->
            </a-col>
            <a-col :span="6" :offset="10"> </a-col>
          </a-row>
        </a-form>
        <div class="table-box">
          <div class="table-inner">
            <a-table
              class="coustom-table"
              row-key="id"
              :data="tableData"
              size="small"
              :bordered="{ cell: true }"
              :pagination="{
                showPageSize: true,
                showJumper: true,
                total: total,
                current: current,
                pageSize: pageSize,
                showTotal: true
              }"
              v-model:expandedKeys="expandedKeys"
              :row-selection="rowSelection"
              :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
              :loading="loading"
              @page-change="changeCurrent"
              v-model:selected-keys="selectObj.keys"
              @page-size-change="changePageSize"
            >
              <template #columns>
                <a-table-column
                  :cellClass="'cell-cous'"
                  title="新闻名称"
                  data-index="address"
                  :width="280"
                  align="left"
                >
                  <template #cell="{ record }">
                    <a-link class="link-class" @click="goEdit(record)">{{ record.name }}</a-link>
                  </template>
                </a-table-column>
                <a-table-column title="发布时间" data-index="time" :width="160" align="left">
                  <template #cell="{ record }">{{ record.pubtime }}</template>
                </a-table-column>
                <a-table-column title="更新时间" data-index="time" :width="160" align="left">
                  <template #cell="{ record }">{{ record.uptime }}</template>
                </a-table-column>
                <a-table-column title="操作" :width="320" align="center">
                  <template #cell="{ record, rowIndex }">
                    <a-space :size="10">
                      <a-button type="text" status="warning" size="mini" @click="goEdit(record)">
                        <template #icon><icon-edit :size="13" :stroke-width="3" /></template>
                        <template #default>编辑</template>
                      </a-button>
                      <span class="up-icon" @click="sortFn(0, record)" :class="{ disabled: rowIndex == 0 }">
                        <icon-arrow-rise size="16" :strokeWidth="7" class="up-icon" />
                        <span>上移</span>
                      </span>
                      <span
                        @click="sortFn(1, record)"
                        class="up-icon down-icon"
                        :class="{ disabled: tableData.length - 1 == rowIndex }"
                      >
                        <icon-arrow-fall size="16" :strokeWidth="7" class="up-icon" />
                        <span>下移</span>
                      </span>
                      <a-button size="mini" type="text" status="danger" @click="singeDel(record)">
                        <template #icon><icon-delete :size="13" :stroke-width="3" /></template>
                      </a-button>
                    </a-space>
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </div>
        </div>
        <!-- 批量删除弹框 -->
        <a-modal v-model:visible="popup" :width="286">
          <template #title>提示</template>
          <div><icon-exclamation-circle-fill size="16" style="color: rgb(var(--orangered-5))" /> 您确定要删除吗？</div>
          <template #footer>
            <a-button @click="popup = false" :disabled="btnloading">取消</a-button>
            <a-button type="primary" @click="batchDel" :loading="btnloading">确定</a-button>
          </template>
        </a-modal>
        <!-- 单个删除弹框 -->
        <a-modal v-model:visible="singePopup" :width="286">
          <template #title>提示</template>
          <div>
            <icon-exclamation-circle-fill size="16" style="color: rgb(var(--orangered-5))" />
            确定删除吗？
          </div>
          <template #footer>
            <a-button @click="singePopup = false" :disabled="btnloading">取消</a-button>
            <a-button type="primary" @click="singeBatchDel" :loading="btnloading">确定</a-button>
          </template>
        </a-modal>
      </div>
      <GiFooter></GiFooter>
    </div>
  </div>
</template>
<script setup lang="ts" name="catelist">
import { reactive, ref, h } from 'vue'
import { usePagination } from '@/hooks'
import { fileNewsList, fileNewsDel, fileNewsUp, fileNewsDown } from '@/apis'
import { Notification, Message } from '@arco-design/web-vue'
import { useRoute, useRouter } from 'vue-router'
import { getTreeDate } from '@/utils/common'
import type { ItemList, CateItem } from './type'
const router = useRouter()
const newsType = ref('-1')
const goEdit = (row: CateItem) => {
  router.push({ path: '/file/newsdetail', query: { id: row.id } })
}
const expandedKeys = ref([])
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  checkStrictly: true
})
const searchForm = reactive({
  search_name: ''
})
const isEdit = ref(false)
const tableData = ref<Array<ItemList>>([])
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const loading = ref(false)
const soid = ref('')
const calist = ref([])
const summary = ref({})
const getTableData = async () => {
  loading.value = true
  const { code, data } = await fileNewsList({
    search_name: searchForm.search_name,
    page_no: current.value,
    page_size: pageSize.value
  }).finally(() => {
    loading.value = false
  })
  if (code === 0) {
    tableData.value = data.list
    isEdit.value = data.full_edit
    soid.value = data.soid
    setTotal(data.total_records)
    calist.value = data.prod_plan
    summary.value = data.summary
  }
}
getTableData()

// 搜索
const searchFn = () => {
  getTableData()
}
// 批量删除
const popup = ref(false)
const showPopFn = () => {
  if (!selectObj.keys.length) {
    return Message.warning('请先勾选')
  }
  popup.value = true
}
const selectObj = reactive<webSelectObj>({
  keys: []
})
const batchDel = async () => {
  btnloading.value = true
  const res = await fileNewsDel({
    ids: selectObj.keys,
    type: newsType.value
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code === 0) {
    popup.value = false
    Message.success(res.message || '操作成功')
    getTableData()
  }
}
const btnloading = ref(false)
// 单个删除
const singePopup = ref(false)
const currentRow = ref<CateItem>({})
const singeDel = (row: CateItem) => {
  currentRow.value = row
  singePopup.value = true
}
const singeBatchDel = async () => {
  btnloading.value = true
  const res = await fileNewsDel({
    ids: [currentRow.value.id],
    type: newsType.value
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code === 0) {
    singePopup.value = false
    Message.success(res.message || '操作成功')
    getTableData()
  }
}

/*  排序 */
const sortFn = async (sort: number, row) => {
  let res
  if (sort) {
    res = await fileNewsDown({
      id: row.id
    })
  } else {
    res = await fileNewsUp({
      id: row.id
    })
  }
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
    getTableData()
  }
}
const addContent = () => {
  router.push({
    path: '/file/newsdetail'
  })
}
</script>
<style lang="scss" scoped>
@import './mod/list.scss';
</style>
