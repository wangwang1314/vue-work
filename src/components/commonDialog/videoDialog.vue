<template>
  <div class="dialog-pic-wrap">
    <a-modal v-model:visible="visible" :mask-closable="false" :width="900" title="视频中心">
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确定</a-button>
      </template>
      <template #title>
        <div class="cus-tit">
          <div class="tit">视频中心</div>
          <div class="info">
            <span
              >无可用视频？<a id="upload_a" @click="govideo"
                >前往视频中心上传</a
              ></span
            >
          </div>
        </div>
      </template>
      <div v-loading="loading" class="cont-box">
        <a-form label-align="right" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
          <a-row :gutter="16" wrap>
            <a-col :span="9">
              <a-form-item field="group_id" label="视频分组">
                <a-select placeholder="请选择" v-model="form.group_id">
                  <a-option value="">所有分组</a-option>
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
              <a-form-item field="video_title" label="视频名称">
                <a-input v-model="form.video_title" placeholder="视频名称" />
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-button type="primary" @click="searchFn">搜索</a-button>
            </a-col>
          </a-row>
        </a-form>
        <div class="img-box">
          <div class="item" v-for="(item, index) in imgArr" :key="index" @click="choseItem(item)">
            <a-checkbox v-model="item.checked" @click.stop class="check-wrap"></a-checkbox>
            <img :src="item.img_path" alt="" />
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
import { provideList } from '@/apis'
import { usePagination } from '@/hooks'
const baselink = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_ROURE_BASE_URL

const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const form = reactive({
  group_name: '',
  video_title: '',
  status: '-1',
  group_id: ''
})
const loading = ref(false)
const getTableData = async () => {
  loading.value = true
  const res = await provideList({ page_no: current.value, page_size: pageSize.value, ...form }).finally(() => {
    loading.value = false
  })
  if (res.code == 0) {
    groupList.value = res.data.group
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
  emit('change', getChoseed())
  visible.value = false
}
const showDialog = (data) => {
  reset()
  visible.value = true
  form.group_name = data?.group_name
  getTableData()
}
const formRef = ref()
const reset = () => {
  formRef.value?.resetFields()
}
const groupList = ref([])
const imgArr = ref([])
const isSige = ref(true)
const getChoseed = () => {
  let arr = []
  imgArr.value.forEach((item, ind) => {
    if (item.checked) {
      arr.push(item)
    }
  })
  return arr
}
const choseItem = (item) => {
  if (isSige.value) {
    imgArr.value.forEach((item, ind) => {
      item.checked = false
    })
  }
  item.checked = !item.checked
}
const emit = defineEmits(['change', 'delete'])
const govideo = () => {
  window.open(baselink + '/resource/list?fileType=1', '_blank')
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
    background: var(--bg-1);
    .check-wrap {
      position: absolute;
      top: 10px;
      left: 10px;
      pointer-events: none;
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
.cus-tit {
  display: flex;
  justify-content: space-between;
  width: 95%;
  .info {
    font-size: 12px;
    a {
      color: rgb(var(--primary-6));
      text-decoration: none;
      line-height: 25px;
      cursor: pointer;
    }
  }
}
.cont-box {
  min-height: 300px;
}
</style>
