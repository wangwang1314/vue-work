<template>
  <div class="table-wrap">
    <div class="table-page">
      <a-alert type="warning" class="top-alert"
        >提示：您可以选择 3 个主推分类放在在页脚的左侧、中部和右侧，每个分类最多可以选择 {{ flagMax }} 条产品。</a-alert
      >
      <a-form label-align="right" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
        <a-row :gutter="16" wrap>
          <a-col :xs="12" :md="12" :lg="8" :xl="7" :xxl="6">
            <a-form-item field="search_name" label="当前分类">
              <a-tooltip :content="cateName">
                <span class="cate-name">{{ cateName }}</span>
              </a-tooltip>
              <a-button style="margin-left: 10px;" @click="cateFn">选择分类</a-button>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="8" :xl="6" :xxl="6">
            <a-form-item field="p_uid" label="负责人">
              <a-select placeholder="所有负责人" v-model="form.p_uid">
                <a-option value="">所有负责人</a-option>
                <a-option v-for="item in personArr" :key="item.id" :value="item.id">{{ item.username }}</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="8" :md="8" :lg="6" :xl="6" :xxl="5">
            <a-form-item :hide-label="true">
              <a-space>
                <a-button type="primary" @click="searchFn">
                  <template #default>查询</template>
                </a-button>
                <a-button @click="resetFn">
                  <template #default>重置</template>
                </a-button>
                <a-button type="primary" @click="goAdd" status="success">
                  <template #default>设定</template>
                </a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <section class="table-box">
        <div class="table-inner">
          <a-table
            row-key="id"
            size="small"
            page-position="br"
            :bordered="{ cell: true }"
            :loading="loading"
            :data="tableData"
            :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
            :pagination="false"
            @page-change="changeCurrent"
            @page-size-change="changePageSize"
            class="coustom-table"
          >
            <template #columns>
              <a-table-column title="产品ID" data-index="id" :width="100" align="left"></a-table-column>
              <a-table-column title="产品图片" data-index="name" :width="100" align="center">
                <template #cell="{ record }">
                  <div class="img-cell-box">
                    <img :src="record.picture_path" alt="" />
                  </div>
                </template>
              </a-table-column>
              <a-table-column title="产品名称" :width="230">
                <template #cell="{ record }">
                  <a-link @click="goEdit(record.id)" class="link-class normal-link">{{ record.name }}</a-link>
                </template>
              </a-table-column>
              <a-table-column title="产品分类" :width="160">
                <template #cell="{ record }">
                  <a-link @click="searchCate(record.cateid)" class="link-class">
                    {{ record.category_name }}
                  </a-link>
                </template>
              </a-table-column>
              <a-table-column title="产品关键字" :width="160">
                <template #cell="{ record }">
                  <ul class="normal-ul">
                    <template v-for="(item, index) in record.keyword">
                      <li v-if="item.name" :key="index">
                        <a-link class="link-class" @click="searchName(item.name)">{{ item.name }}</a-link>
                      </li>
                    </template>
                  </ul>
                </template>
              </a-table-column>
              <a-table-column title="更新时间" data-index="uptime" :width="140" align="left"> </a-table-column>
              <a-table-column title="操作" :width="150" align="center">
                <template #cell="{ record, rowIndex }">
                  <a-space :size="4">
                    <icon-arrow-rise @click="sortFn(0, record)" :class="{ disabled: rowIndex == 0 }" size="18" :strokeWidth="7" class="up-icon" />
                    <icon-arrow-fall
                      @click="sortFn(1, record)"
                      :class="{ disabled: tableData.length - 1 == rowIndex }"
                      size="18"
                      :strokeWidth="7"
                      class="up-icon"
                    />
                    <a-popconfirm type="warning" content="您确定取消置顶吗?" @ok="cancelTag(record)">
                      <icon-close size="18" :strokeWidth="7" class="close-icon" />
                    </a-popconfirm>
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </section>

      <!-- 批量分类调整 -->
      <a-modal v-model:visible="cateTag" :width="700">
        <template #title>调整分类</template>
        <div class="tag-box">
          <a-radio-group v-model="cateKey">
            <a-grid :cols="2" :colGap="8" :rowGap="8">
              <a-grid-item v-for="item in treeData" :key="item.id">
                <a-radio :value="item.id">{{ item.name }}</a-radio>
              </a-grid-item>
              <a-grid-item>
                <a-radio value="0">清空</a-radio>
              </a-grid-item>
            </a-grid>
          </a-radio-group>
        </div>
        <template #footer>
          <a-button @click="cateHandleCancel" :disabled="btnloading">取消</a-button>
          <a-button type="primary" @click="cateHandleOk" :loading="btnloading">确定</a-button>
        </template>
      </a-modal>
      <productlist ref="listRef" :flagType="flag_type" @update="getTableData"></productlist>
    </div>
    <GiFooter></GiFooter>
  </div>
</template>

<script setup lang="ts" name="MainTable">
import { reactive, ref, h } from 'vue'
import { usePagination } from '@/hooks'
import {
  prTopFlagList,
  prFlagCancelTop,
  prFlagDown,
  prFlagUp,
  prCateSet
} from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import productlist from '@/components/commonDialog/productlist.vue'
const emit = defineEmits(['update'])
const router = useRouter()
const route = useRoute()
const cateName = ref('')
const cateId = ref('')
const form = reactive({
  search_name: '',
  category_id: '',
  p_uid: '',
  product_id: '',
})
const personArr = ref<proPersonItem[]>([])
const cateArr = ref<procateItem[]>([])
const loading = ref(false)
const tableData = ref<productListItem[]>([])
const flag_type = ref('5')
const flagTotal = ref(0)
const flagMax = ref(0)
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const getTableData = async () => {
  loading.value = true
  const { search_name, category_id, p_uid, product_id } = form
  const { code, data } = await prTopFlagList({
    page_no: current.value,
    page_size: pageSize.value,
    search_name,
    category_id,
    p_uid,
    product_id,
    flag_type: flag_type.value
  }).finally(() => {
    loading.value = false
  })
  if (code == 0) {
    tableData.value = data.list
    personArr.value = data.p_users
    treeData.value = getTreeDate(data.categories)
    flagTotal.value = data.flags_count[flag_type.value]
    flagMax.value = data.flag_max
    cateName.value = data.category_name
    emit('update', data)
    setTotal(Number(data.total_records))
  }
  loading.value = false
}
const searchFn = () => {
  getTableData()
}
const rowSelection: any = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false
})
getTableData()

const formRef = ref()
const resetFn = () => {
  formRef.value && formRef.value.resetFields()
}

const goAdd = () => {
  listRef.value?.showDialog()
}
const goEdit = (id: string) => {
  router.push({ path: '/web/webproduct/detail', query: { id } })
}
const selectObj = reactive<webSelectObj>({
  keys: []
})
const selectChange = (data: (number | string)[]) => {
  selectObj.keys = data
}

// 取消置顶
const cancelTag = async (row) => {
  const res = await prFlagCancelTop({ product_id: row.id, flag_type: flag_type.value })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
  }
  await getTableData()
}

/*  排序 */
const sortFn = async (sort: number, row) => {
  let res
  if (sort) {
    res = await prFlagDown({
      flag_type: flag_type.value,
      product_id: row.id
    })
  } else {
    res = await prFlagUp({
      flag_type: flag_type.value,
      product_id: row.id
    })
  }
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
    getTableData()
  }
}

// 搜索cate
const searchCate = (cateid: string) => {
  router.replace({
    path: '/web/webproduct/list',
    query: {
      category_id: cateid
    }
  })
  resetFn()
  form.category_id = cateid
  getTableData()
}
// 搜索关键字
const searchName = (name: string) => {
  router.replace({
    path: '/web/webproduct/list',
    query: {
      search_name: name
    }
  })
  resetFn()
  form.search_name = name
  getTableData()
}
// 分类option
const getTreeDate = (arrayData) => {
  function getChildren(data, result, pid) {
    for (const item of data) {
      if (item.parentid === pid) {
        if (!Array.isArray(result)) {
          if (!result.children) {
            result.children = []
          }
          result.children.push(item)
        } else {
          result.push(item)
        }
        getChildren(data, item, item.id)
      }
    }
  }

  function arrayToTree(data, pid) {
    let result = []
    getChildren(data, result, pid)
    return result
  }
  return arrayToTree(arrayData, '0')
}

const listRef = ref()

/* 分类调整 */
const cateFn = () => {
  cateTag.value = true
}
const cateTag = ref<boolean>(false)
const cateKey = ref('')
const cateHandleCancel = () => {
  cateTag.value = false
}
const btnloading = ref(false)
const cateHandleOk = async () => {
  btnloading.value = true
  const res = await prCateSet({
    flag_type: flag_type.value,
    category_id: cateKey.value
  }).finally(() => {
    btnloading.value = false
    cateTag.value = false
  })
  if (res.code == 0) {
    Message.success(res.message || '请求成功')
    selectObj.keys = []
    getTableData()
  }
}
const treeData = ref([])

</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
