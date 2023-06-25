<template>
  <div class="dialog-pic-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="900" title="将视频设置为产品头图视频">
      <template #footer>
        <a-button @click="handleCancel" :disabled="btnloading">取消</a-button>
        <a-button @click="handleBeforeOk" type="primary" :loading="btnloading">确定</a-button>
      </template>
      <a-form label-align="right" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
        <a-row :gutter="16" wrap>
          <a-col :span="6">
            <a-form-item field="search_name" label="设定产品">
              <a-input v-model="form.search_name" placeholder="请输入产品名称" />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item field="value1" label="分组">
              <a-select placeholder="请选择" v-model="form.category_id">
                <a-option value="">所有分组</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-button type="primary" @click="searchFn">搜索</a-button>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        :data="fileObj.list"
        row-key="id"
        :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: false }"
        v-model:selectedKeys="selectedKeys"
        :scroll="{ y: 390 }"
        style="margin-top: 6px"
        :loading="listloading"
        :pagination="{
          showPageSize: true,
          showJumper: true,
          total: total,
          current: current,
          pageSize: pageSize,
          showTotal: true
        }"
        @page-change="changeCurrent"
        @selection-change="selectChange"
        @page-size-change="changePageSize"
      >
        <template #columns>
          <a-table-column title="产品图片" data-index="name" :width="100">
            <template #cell="{ record }">
              <div class="img-item">
                <img :src="record.picture_path" alt="" />
              </div>
            </template>
          </a-table-column>
          <a-table-column title="产品名称" data-index="name" :width="250"></a-table-column>
          <a-table-column title="发布时间" data-index="addtime" :width="150"></a-table-column>
          <a-table-column title="更新时间" data-index="uptime" :width="150"></a-table-column>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="setProduct">
import { ref, reactive } from 'vue'
import { Notification, Message } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'
import { getProductList, setProVideo } from '@/apis'
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const form = reactive({
  search_name: '',
  category_id: ''
})
const getTableData = async () => {
  listloading.value = true
  const { search_name, category_id } = form
  const { code, data } = await getProductList({
    page_no: current.value,
    page_size: pageSize.value,
    search_name,
    category_id
  }).finally(() => {
    listloading.value = false
  })
  if (code == 0) {
    fileObj.list = data.list
    setTotal(Number(data.total_records))
  }
}
const selectChange = (data: (number | string)[]) => {
  selectedKeys.value = data
}
const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}
const btnloading = ref(false)
const handleBeforeOk = async() => {
  btnloading.value = true
  const res = await setProVideo({
    id: videoId.value,
    product_ids: selectedKeys.value
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code == 0) {
    Message.success('请求成功')
    visible.value = false
  }
}
const videoId = ref('')
const showDialog = (id) => {
  videoId.value = id
  selectedKeys.value = []
  getTableData()
  visible.value = true
}
const fileObj = reactive({ list: [] })
const selectedKeys = ref([])
const listloading = ref(false)
const searchFn = () => {
  getTableData()
}
defineExpose({
  showDialog,
  handleCancel,
  handleBeforeOk
})
</script>
<style lang="scss" scoped>
.img-box {
  display: flex;
  max-height: 350px;
  flex-wrap: wrap;
  overflow-y: auto;
  .item {
    width: 130px;
    height: 120px;
    margin: 0 12px 12px 0;
    position: relative;
    cursor: pointer;
    .check-wrap {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 4px;
    }
  }
}
.page-box {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.img-item {
  width: 60px;
  height: 60px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
