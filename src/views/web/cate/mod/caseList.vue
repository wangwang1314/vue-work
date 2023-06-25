<template>
  <div class="dialog-pic-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="900" title="导入制作方案">
      <template #footer>
        <a-button @click="handleCancel" :disabled="btnloading">取消</a-button>
        <a-button @click="handleBeforeOk" type="primary" :loading="btnloading">导入选中项</a-button>
      </template>
      <div class="max-tab-box">
        <a-table :data="props.list" row-key="id" style="margin-top: 6px" :loading="listloading" :pagination="false">
          <template #columns>
            <a-table-column title="客户分类" data-index="custom_cate" :width="100"> </a-table-column>
            <a-table-column title="产品名称" data-index="recommend_cate" :width="150">
              <template #cell="{ record }">
                <a-checkbox v-model="record.checked">{{ record.recommend_cate }}</a-checkbox>
              </template>
            </a-table-column>
            <a-table-column title="搜索量" data-index="search_count" :width="150"></a-table-column>
            <a-table-column title="索引量" data-index="index_count" :width="150"></a-table-column>
            <a-table-column title="备注" data-index="comment" :width="150"></a-table-column>
            <a-table-column title="最后更新时间" data-index="uptime" :width="150"></a-table-column>
          </template>
        </a-table>
        <div class="btn-box">
          <a-space>
            <a-button type="primary" size="mini" @click="checkAll(1)">全选</a-button>
            <a-button size="mini" @click="checkAll(0)">取消</a-button>
          </a-space>
        </div>
        <div class="form-box">
          <a-row class="grid-demo" :gutter="24">
            <a-col :span="8">
              <div>
                <span>提交人: </span>
                {{props.summary.submitter}}
              </div>
            </a-col>
            <a-col :span="8">
              <div>
                <span>最后提交时间: </span>
                {{props.summary.uptime}}
              </div>
            </a-col>
          </a-row>
          <a-row class="grid-demo" :gutter="24">
            <a-col :span="8">
              <div>
                <span>审核人: </span>
                {{props.summary.auditor}}
              </div>
            </a-col>
            <a-col :span="8">
              <div>
                <span>最后审核时间: </span>
                {{props.summary.checktime}}
              </div>
            </a-col>
          </a-row>
          <a-row class="grid-demo" style="padding-bottom: 30px;" :gutter="24">
            <a-col :span="2">
              <div>
                <span>备注: </span>
              </div>
            </a-col>
            <a-col :span="14">
              <a-textarea :readonly="true" v-model="props.summary.notes"></a-textarea>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="caseList">
import { ref, reactive } from 'vue'
import { Notification, Message } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'
import { getProductList, setProVideo, categoryImport } from '@/apis'
const props = defineProps(['list', 'summary'])
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const form = reactive({
  search_name: '',
  category_id: ''
})
const formRef = ref()
const resetFn = () => {
  formRef.value?.resetFields()
}
const catelist = ref([])
const getTableData = async () => {
  listloading.value = true
  const { search_name, category_id } = form
  const { code, data } = await getProductList({
    page_no: current.value,
    page_size: 20,
    search_name,
    category_id
  }).finally(() => {
    listloading.value = false
  })
  if (code == 0) {
    fileObj.list = data.list
    catelist.value = data.categories
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
const handleBeforeOk = async () => {
  const choseArr = []
  props.list.forEach((item) => {
    if (item.checked) {
      choseArr.push(item.recommend_cate)
    }
  })
  if (!choseArr.length) {
    visible.value = false
    return
  }
  const res = await categoryImport({
    recommend_cates: choseArr
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code === 0) {
    Message.success(res.message || '请求成功')
    visible.value = false
  }
}
const videoId = ref('')
const showDialog = (id) => {
  videoId.value = id
  visible.value = true
}
const fileObj = reactive({ list: [] })
const selectedKeys = ref([])
const listloading = ref(false)
const searchFn = () => {
  getTableData()
}
const checkAll = (juge: number) => {
  const checked = Boolean(juge)
  fileObj.list.forEach((item) => {
    item.checked = checked
  })
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
.max-tab-box {
  max-height: 550px;
  overflow-y: auto;
}
.btn-box {
  margin-top: 16px;
}
.grid-demo {
  margin-top: 10px;
}
</style>
