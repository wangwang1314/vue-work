<template>
  <div class="dialog-pic-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="900" title="图片中心">
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确定</a-button>
      </template>
      <div v-loading="loading" class="cont-box">
        <a-form label-align="right" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
          <a-row :gutter="16" wrap>
            <a-col :span="9">
              <a-form-item field="group_id" label="图片分组">
                <a-select placeholder="请选择" v-model="form.group_id">
                  <a-option value="-1">所有分组</a-option>
                  <a-option value="0">未分组</a-option>
                  <a-option :value="item.id" v-for="(item, index) in groupList" :key="item.id">{{
                    item.name
                  }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="status" label="是否引用">
                <a-select placeholder="请选择" v-model="form.status">
                  <a-option value="-1">全部引用状态</a-option>
                  <a-option value="1">已引用</a-option>
                  <a-option value="0">未引用</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="picture_name" label="图片名称">
                <a-input v-model="form.picture_name" placeholder="图片名称" />
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-button type="primary" @click="searchFn">搜索</a-button>
            </a-col>
          </a-row>
        </a-form>
        <div class="img-box">
          <div class="item" v-for="(item, index) in imgArr" :key="index" @click="choseItem(index)">
            <a-checkbox v-model="item.checked" @click.stop class="check-wrap"></a-checkbox>
            <img :src="item.picture_url_d" alt="" />
          </div>
        </div>
        <div class="page-box">
          <a-pagination
            @change="changeCurrent"
            @page-size-change="changePageSize"
            show-page-size
            :current="current"
            :total="total"
            :pageSize="pageSize"
            :showTotal="true"
            show-jumper
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="picDialog">
import { ref, reactive } from 'vue'
import { proPicList } from '@/apis'
import { usePagination } from '@/hooks'
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const form = reactive({
  group_name: '',
  picture_name: '',
  status: '-1',
  group_id: ''
})
const loading = ref(false)
const getTableData = async () => {
  loading.value = true
  const res = await proPicList({ page_no: current.value, page_size: pageSize.value, ...form }).finally(() => {
    loading.value = false
  })
  if (res.code == 0) {
    groupList.value = res.data.group_list
    imgArr.value = res.data.list
    res.data.group_id ? (form.group_id = String(res.data.group_id)) : ''
    setTotal(Number(res.data.total_records))
  }
}
const searchFn = () => {
  getTableData()
}
const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}
const handleBeforeOk = () => {
  const choseArr = imgArr.value.filter((item) => item.checked)
  emit('change', choseArr)
  visible.value = false
}
const showDialog = (data) => {
  reset()
  visible.value = true
  form.group_name = data?.group_name
  getTableData()
}

const imgArr = ref([])
const checkItem = ref([])
const choseItem = (index) => {
  imgArr.value[index].checked = !imgArr.value[index].checked
}
const formRef = ref()
const reset = () => {
  formRef.value?.resetFields()
}
const groupList = ref([])

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
  min-height: 300px;
}
</style>
