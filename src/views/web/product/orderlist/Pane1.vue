<template>
  <div class="table-wrap">
    <div class="table-page">
      <a-alert type="warning" class="top-alert"
        >提示：首页置顶，设置在首页切换特效的产品。您已经设置了{{ flagTotal }} 条产品信息，最多可以设置
        {{ flagMax }} 条。</a-alert
      >
      <a-form label-align="right" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
        <a-row :gutter="16" wrap>
          <a-col :span="7">
            <a-form-item field="search_name" label="产品名称">
              <a-input v-model="form.search_name" placeholder="请输入产品名称" :allow-clear="true" />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item field="category_id" label="分类名称">
              <!-- <a-select placeholder="所有分类" v-model="form.category_id" :allow-create="true">
                <a-option value="" label="所有分类"></a-option>
                <a-option v-for="item in cateArr" :key="item.id" :value="item.id" :label="item.name"></a-option>
              </a-select> -->
              <a-cascader
                id="cate"
                :options="cateArr"
                v-model="form.category_id"
                :field-names="{ value: 'id', label: 'name' }"
                default-value=""
                expand-trigger="hover"
                placeholder="请选择"
                check-strictly
                value-key="id"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :hide-label="true">
              <a-space>
                <a-button type="primary" @click="searchFn">
                  <template #default>查询</template>
                </a-button>
                <a-button @click="resetFn">
                  <template #default>重置</template>
                </a-button>
              </a-space>
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-form-item :hide-label="true" class="end-class">
              <a-button type="primary" @click="goAdd" status="success" style="float: right">
                <template #default>设定</template>
              </a-button>
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
              <!-- <a-table-column title="产品关键字" :width="160">
                <template #cell="{ record }">
                  <ul class="normal-ul">
                    <template v-for="(item, index) in record.keyword">
                      <li v-if="item.name" :key="index">
                        <a-link class="link-class" @click="searchName(item.name)">{{ item.name }}</a-link>
                      </li>
                    </template>
                  </ul>
                </template>
              </a-table-column> -->
              <!-- <a-table-column title="发布时间" data-index="addtime" :width="105" align="center">
                <template #title>
                  <div @click="sortFn('uptime')">
                    {{ '发布时间' }}
                    <template v-if="form.order_by == 'uptime'">
                      <icon-arrow-down v-if="form.order == 'desc'" />
                      <icon-arrow-up v-else />
                    </template>
                  </div>
                </template>
              </a-table-column> -->
              <a-table-column title="更新时间" data-index="uptime" :width="140" align="left"> </a-table-column>
              <a-table-column title="操作" :width="150" align="center">
                <template #cell="{ record, rowIndex }">
                  <a-space :size="10">
                    <span class="up-icon"
                    @click="sortFn(0, record)" :class="{ disabled: rowIndex == 0 }">
                      <icon-arrow-rise
                        
                        
                        size="16"
                        :strokeWidth="7"
                        class="up-icon"
                      />
                      <span>上移</span>
                    </span>
                    <span
                    @click="sortFn(1, record)"
                     class="up-icon down-icon" :class="{ disabled: tableData.length - 1 == rowIndex }">
                      <icon-arrow-fall
                        
                        
                        size="16"
                        :strokeWidth="7"
                        class="up-icon"
                      />
                      <span>下移</span>
                    </span>
                    <a-popconfirm type="warning" content="您确定取消置顶吗?" @ok="cancelTag(record)">
                      <span class="close-icon">
                        <icon-close size="18" :strokeWidth="7"  />
                        <span>取消</span>
                      </span>
                    </a-popconfirm>
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </section>

      <productlist ref="listRef" :flagType="flag_type" @update="getTableData"></productlist>
    </div>
    <GiFooter></GiFooter>
  </div>
</template>

<script setup lang="ts" name="MainTable">
import { reactive, ref, h } from 'vue'
import { usePagination } from '@/hooks'
import { prTopFlagList, prFlagCancelTop, prFlagDown, prFlagUp } from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import productlist from '@/components/commonDialog/productlist.vue'
import { getTreeDate } from '@/utils/common'
const emit = defineEmits(['update'])
const router = useRouter()
const route = useRoute()
const form = reactive({
  search_name: '',
  category_id: '',
  p_uid: '',
  product_id: ''
})
const personArr = ref<proPersonItem[]>([])
const cateArr = ref<procateItem[]>([])
const loading = ref(false)
const tableData = ref<productListItem[]>([])
const flag_type = ref('1')
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
    cateArr.value = getTreeDate(data.categories)
    flagTotal.value = data.flags_count[flag_type.value]
    flagMax.value = data.flag_max
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
  getTableData()
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

const listRef = ref()
</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
