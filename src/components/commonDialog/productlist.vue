<template>
  <div class="dialog-pic-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="900" title="产品列表">
      <template #footer>
        <a-button @click="handleCancel" :disabled="btnloading">取消</a-button>
        <a-button @click="handleBeforeOk" type="primary" :loading="btnloading">确定</a-button>
      </template>
      <a-form label-align="right" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
        <a-row :gutter="16" wrap>
          <a-col :span="6">
            <a-form-item field="search_name" label="产品名称">
              <a-input v-model="form.search_name" placeholder="请输入产品名称" />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item field="category_id" label="分类" v-if="props.flagType=='3' || props.flagType=='4' || props.flagType=='5'">
              {{ props.cateName }}
            </a-form-item>
            <a-form-item field="category_id" label="分类" v-else>
              <a-select placeholder="请选择" v-model="form.category_id">
                <a-option value="">所有分类</a-option>
                <a-option v-for="item in catelist" :key="item.id" :value="item.id">{{ item.name }}</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-space>
              <a-button type="primary" @click="searchFn">查询</a-button>
              <a-button @click="resetFn">重置</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        :data="fileArr"
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
<script setup lang="ts" name="productlist">
import { ref, reactive, watch } from 'vue'
import { Notification, Message } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'
import { prFlagList, prFlagSet } from '@/apis'
const emit = defineEmits(['update'])
const props = defineProps({
  flagType: {
    default: '1',
    type: String
  },
  cateName: {
    type: String
  }
})
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const form = reactive({
  search_name: '',
  category_id: ''
})
const formRef = ref()
const resetFn = () => {
  formRef.value?.resetFields()
  getTableData()
}
const catelist = ref([])
const max = ref(0)
const pageTotal = ref(50)
const pageCount = ref(0)
const getTableData = async () => {
  listloading.value = true
  // fileArr.value = []
  const { search_name, category_id } = form
  const { code, data } = await prFlagList({
    page_no: current.value,
    page_size: pageSize.value - pageCount.value,
    search_name,
    category_id,
    flag_type: props.flagType
  }).finally(() => {
    listloading.value = false
  })
  if (code == 0) {
    data.list.forEach((item) => {
      item.disabled = !item.has_photo
    })
    data.flag_list.forEach((item) => {
      if (!~selectedKeys.value.indexOf(item.id)) {
        selectedKeys.value.push(item.id)
      }
    })
    max.value = data.flag_max
    fileArr.value = data.flag_list.concat(data.list).slice(0, pageTotal.value)
    pageCount.value = data.flag_total
    catelist.value = data.categories
    setTotal(Number(data.total_records))
  }
}
const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}
const btnloading = ref(false)
const handleBeforeOk = async () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择产品')
  }
  btnloading.value = true
  const res = await prFlagSet({
    flag_type: props.flagType,
    product_ids: selectedKeys.value
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code === 0) {
    Message.success(res.message || '请求成功')
    visible.value = false
    emit('update')
  }
}
const videoId = ref('')
const showDialog = (id: string) => {
  videoId.value = id
  selectedKeys.value = []
  pageCount.value = 0
  getTableData()
  visible.value = true
}
const fileArr = ref([])
const selectedKeys = ref([])
const listloading = ref(false)
const searchFn = () => {
  getTableData()
}

// 监听最大选择长度
watch(
  selectedKeys,
  (newVal, oldVal) => {
    if (max.value && newVal.length > max.value) {
      Message.warning(`最多选${max.value}个`)
      selectedKeys.value = oldVal
    }
  },
  { deep: true }
)
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
