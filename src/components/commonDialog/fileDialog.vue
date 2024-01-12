<template>
  <div class="dialog-pic-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="800" title="文档中心">
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确定</a-button>
      </template>
      <div v-loading="loading" class="cont-box">
        <a-form label-align="left" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
          <a-row :gutter="16" wrap style="width: 100%;">
            <a-col :span="8">
              <a-form-item field="begin_time" label="From" :label-col-flex="28">
                <a-date-picker format="YYYY-MM-DD" v-model="form.begin_time" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="end_time" label="to" :label-col-flex="28">
                <a-date-picker format="YYYY-MM-DD" v-model="form.end_time" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="document_name" label="文档名称">
                <a-input v-model="form.document_name" placeholder="" />
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-button type="primary" @click="searchFn">搜索</a-button>
            </a-col>
          </a-row>
        </a-form>
        <div class="tab-box">
          <a-table
            :data="fileObj"
            row-key="id"
            :pagination="{
              showPageSize: true,
              showJumper: true,
              total: total,
              current: current,
              pageSize: pageSize,
              showTotal: true
            }"
            :height="400"
            :scroll="{ x: '100%', y: '100%' }"
            @page-change="changeCurrent"
            @selection-change="selectChange"
            @page-size-change="changePageSize"
            :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: false }"
            v-model:selectedKeys="selectedKeys"
            style="margin-top: 30px"
          >
            <template #columns>
              <a-table-column title="文档名称" data-index="docname" :width="240"></a-table-column>
              <a-table-column title="文档大小" data-index="docsize" :width="150"></a-table-column>
              <a-table-column title="上传时间" data-index="addtime" :width="200"></a-table-column>
              <a-table-column title="引用量" data-index="usedcnt" :width="100"></a-table-column>
            </template>
          </a-table>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="fileDialog">
import { ref, reactive } from 'vue'
import { profileList } from '@/apis'
import { usePagination } from '@/hooks'
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const form = reactive({
  document_name: '',
  begin_time: '',
  end_time: '',
  category_id: ''
})
const loading = ref(false)
const getTableData = async () => {
  loading.value = true
  const res = await profileList({ page_no: current.value, page_size: pageSize.value, 
    ...form,
    begin_time: form.begin_time?form.begin_time+' 00:00:00':form.begin_time,
    end_time: form.end_time?form.end_time+'  23:59:59':form.end_time
   }).finally(() => {
    loading.value = false
  })
  if (res.code == 0) {
    fileObj.value = res.data.list
    res.data.group_id ? (form.group_id = String(res.data.group_id)) : ''
    setTotal(Number(res.data.total_records))
  }
}
const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}
const searchFn = () => {
  getTableData()
}
const handleBeforeOk = () => {
  const filterArr = fileObj.value.filter((item) => {
    return selectedKeys.value.indexOf(item.id) != -1
  })
  visible.value = false
  emit('change', filterArr)
}
const formRef = ref()
const reset = () => {
  selectedKeys.value = []
  formRef.value?.resetFields()
}
const showDialog = (data) => {
  reset()
  visible.value = true
  form.category_id = data?.category_id
  getTableData()
}
const fileObj = ref([])
const selectedKeys = ref([])
const selectChange = (data: (number | string)[]) => {
  selectedKeys.value = data
}
const emit = defineEmits(['change', 'delete'])
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
.cont-box {
  // min-height: 300px;
  // max-height: 500px;
}
.tab-box {
  height: 400px;
}
</style>
