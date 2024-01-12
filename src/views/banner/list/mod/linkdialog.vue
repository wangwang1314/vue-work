<template>
  <div class="dialog-pic-wrap">
    <a-modal
      v-model:visible="visible"
      :mask-closable="false"
      :width="900"
      :body-style="{ minHeight: '500px' }"
      title="选择链接"
    >
      <template #footer>
        <a-button @click="handleBeforeOk" type="primary" :loading="btnloading">确定</a-button>
        <a-button @click="handleCancel" :disabled="btnloading">取消</a-button>
      </template>
      <a-form label-align="right" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
        <div class="radio-box">
          <div class="radio-item">
            <a-radio value="8" v-model="checkRadio">点击图片跳转到分类页</a-radio>
            <div v-show="checkRadio == '8'" class="select-w">
              <!-- <a-select
                placeholder="请选择"
                v-model="cateId"
              >
                <a-option v-for="item in catelist" :key="item.id" :value="item.id">{{ item.name }}</a-option>
              </a-select> -->
              <a-cascader
                id="cate"
                :options="catelist"
                v-model="cateId"
                :field-names="{ value: 'id', label: 'name' }"
                default-value=""
                expand-trigger="hover"
                placeholder="请选择"
                check-strictly
                value-key="id"
              />
            </div>
          </div>
          <div class="radio-item" v-if="isvr">
            <a-radio value="3" v-model="checkRadio">点击图片跳转到VR页</a-radio>
          </div>
          <div class="radio-item">
            <a-radio value="4" v-model="checkRadio">点击图片跳转到产品页</a-radio>
          </div>
        </div>
        <a-row :gutter="16" wrap v-show="checkRadio == '4'">
          <a-col :span="6">
            <a-form-item field="search_name" label="产品名称">
              <a-input v-model="form.search_name" placeholder="请输入产品名称" />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item field="category_id" label="分类">
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
        v-show="checkRadio == '4'"
        :data="fileArr"
        row-key="id"
        :row-selection="{ type: 'radio', showCheckedAll: true, onlyCurrent: false }"
        v-model:selectedKeys="selectedKeys"
        :scroll="{ y: 320 }"
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
import { prFlagList, prFlagSet, getLink, setLink } from '@/apis'
import { getTreeDate } from '@/utils/common'
const emit = defineEmits(['update'])
const props = defineProps({
  flagType: {
    default: '1',
    type: String
  },
  isvr: {
    default: false,
    type: Boolean
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
    // data.flag_list.forEach((item) => {
    //   if (!~selectedKeys.value.indexOf(item.id)) {
    //     selectedKeys.value.push(item.id)
    //   }
    // })
    max.value = data.flag_max
    fileArr.value = data.list
    pageCount.value = data.flag_total
    catelist.value = getTreeDate(data.categories)
    setTotal(Number(data.total_records))
  }
}
const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}
const btnloading = ref(false)
const handleBeforeOk = async () => {
  if (checkRadio.value) {
    let sid
    if (checkRadio.value == 3) {
      sid = 1
    } else if (checkRadio.value == 8) {
      if (!cateId.value) {
        return Message.warning('请选择分类')
      }
      sid = cateId.value
    } else {
      if (!selectedKeys.value[0]) {
        return Message.warning('请选择产品')
      }
      sid = selectedKeys.value[0]
    }
    btnloading.value = true
    const res = await setLink({
      type: checkRadio.value == 3 ? 4 : checkRadio.value,
      id: videoId.value,
      sid
    }).finally(() => {
      btnloading.value = false
      visible.value = false
    })
    if (res.code === 0) {
      Message.success(res.message || '操作成功')
    }
  } else {
    Message.warning('请选择链接方式')
  }
}
const videoId = ref('')
const showDialog = (id: string) => {
  videoId.value = id
  checkRadio.value = ''
  selectedKeys.value = []
  cateId.value = ''
  pageCount.value = 0
  btnloading.value = false
  getlinkFn()
  getTableData()
  visible.value = true
}
const cateId = ref('')
const getlinkFn = async () => {
  const res = await getLink({
    id: videoId.value
  })
  if (res.code == 0 && res.data) {
    checkRadio.value = String(res.data.type)
    if (res.data.type == 4 && res.data.sid == 1) {
      checkRadio.value = '3'
    } else if (res.data.type == 4) {
      selectedKeys.value = [String(res.data.sid)]
    } else if (res.data.type === 8) {
      cateId.value = String(res.data.sid)
    }
  }
}
const fileArr = ref([])
const selectedKeys = ref([])
const listloading = ref(false)
const searchFn = () => {
  getTableData()
}
const checkRadio = ref('')
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
.radio-box {
  .radio-item {
    line-height: 30px;
  }
  margin-bottom: 16px;
}
.select-w {
  width: 300px;
  display: inline-block;
  margin-left: 16px;
}
</style>
