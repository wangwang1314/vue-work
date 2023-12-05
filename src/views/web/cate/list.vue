<template>
  <div class="cate-inner-wrap">
    <div class="top-nav-tit">
      <div class="m-left">分类管理</div>
      <div class="m-right">
        <a-button type="primary" size="large" @click="addCate">
          <template #icon><icon-plus /></template>
          添加分类
        </a-button>
      </div>
    </div>
    <div class="table-wrap">
      <div class="table-page">
        <a-form label-align="right" ref="formRef" auto-label-width :model="searchForm" class="form" direction="inline">
          <a-row :gutter="16" wrap style="margin-top: 14px">
            <a-col :span="8">
              <a-space style="padding-top: 4px">
                <!-- <a-button size="small" type="primary" @click="addCate">
                  <template #default><icon-plus /></template>
                </a-button> -->
                <!-- <a-button type="primary" @click="addCate" size="small" status="success">
                  <template #default>新增</template>
                </a-button> -->
                <!-- <a-button size="small" @click="exportFn">
                  <template #default>导入</template>
                </a-button>
                <a-button size="small" @click="goAllPage">
                  <template #default>查看全部优化方案</template>
                </a-button> -->
                <a-button size="small" status="danger" type="text" @click="showPopFn">
                  <template #default>删除</template>
                </a-button>
              </a-space>
            </a-col>
            <a-col :span="6" :offset="10">
              <a-form-item field="search_name">
                <a-input-search
                  @search="searchFn"
                  placeholder="请输入分类名称"
                  v-model="searchForm.search_name"
                  search-button
                >
                </a-input-search>
              </a-form-item>
            </a-col>
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
              :pagination="false"
              v-model:expandedKeys="expandedKeys"
              :row-selection="rowSelection"
              :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
              :loading="loading"
              @page-change="changeCurrent"
              v-model:selected-keys="selectObj.keys"
              @page-size-change="changePageSize"
            >
              <template #columns>
                <a-table-column :cellClass="'cell-cous'" title="分类名称" data-index="address" :width="300" align="left">
                  <template #cell="{ record }">
                    <div :class="'cell-cous-lever-' + record.level">{{ record.name }}</div>
                  </template>
                </a-table-column>
                <a-table-column title="产品数量" data-index="name" :width="200" align="right">
                  <template #cell="{ record }">{{ record.productcount }}</template>
                </a-table-column>
                <a-table-column title="更新时间" data-index="time" :width="150" align="left">
                  <template #cell="{ record }">{{ record.uptime }}</template>
                </a-table-column>
                <a-table-column title="操作" :width="300" align="center">
                  <template #cell="{ record }">
                    <a-space :size="4">
                      <a-button size="mini" type="text" @click="addSubCate(record)">
                        <!-- <template #icon><icon-plus :size="13" :stroke-width="3" /></template> -->
                        <template #default>添加子分类</template>
                      </a-button>
                      <a-button type="text" size="mini" @click="editFn(record)" status="warning">
                        <template #icon><icon-edit :size="13" :stroke-width="3" /></template>
                        <template #default>编辑</template>
                      </a-button>
                      <!-- <a-button size="mini" type="text" status="success">
                        <template #icon><icon-copy :size="13" :stroke-width="3" /></template>
                        <template #default>复制</template>
                      </a-button> -->
                      <!-- <a-button size="mini" type="text" @click="addkeyword(record)" status="success">
                        <template #default>添加关键字</template>
                      </a-button> -->
                      <a-button size="mini" type="text" status="danger" @click="singeDel(record)">
                        <template #icon><icon-delete :size="13" :stroke-width="3" /></template>
                      </a-button>
                    </a-space>
                  </template>
                </a-table-column>
                <!-- <a-table-column title="优质资料实例" :width="280" align="center" fixed="right">
                  <template #cell="{ record }">
                    <a-space :size="4">
                      <a-button type="text" size="mini" @click="goCase(record)">
                        <template #default>优化方案</template>
                      </a-button>
                      <span class="text-val">{{ record.optimize_count }}</span>
                      <a-button size="mini" type="text" @click="editData(record)">
                        <template #default>编辑</template>
                      </a-button>
                      <a-button size="mini" type="text" @click="showSeo(record)">
                        <template #default>编辑SEO要素</template>
                      </a-button>
                    </a-space>
                  </template>
                </a-table-column> -->
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
            确定删除吗？多级分类下的子级分类也将一并删除
          </div>
          <template #footer>
            <a-button @click="singePopup = false" :disabled="btnloading">取消</a-button>
            <a-button type="primary" @click="singeBatchDel" :loading="btnloading">确定</a-button>
          </template>
        </a-modal>
        <!-- 单个删除提示 -->
        <a-modal v-model:visible="singePopupTip" :width="286">
          <template #title>提示</template>
          <div>
            <icon-exclamation-circle-fill size="16" style="color: rgb(var(--orangered-5))" />
            此分类下包含产品，请在产品管理里调整分类后，再删除分类。
          </div>
          <template #footer>
            <a-button type="primary" @click="singePopupTip = false">确定</a-button>
          </template>
        </a-modal>
        <!-- 添加分类弹框 -->
        <a-modal v-model:visible="addPopup" :width="286">
          <template #title>{{ cateObj.id ? '编辑分类' : '添加分类' }}</template>
          <div>
            <div class="add-tit">{{ cateObj.id ? '编辑分类' : '新增分类' }}</div>
            <div class="add-sub-tit" v-show="cateObj.pid">父级分类：{{ cateObj.pname }}</div>
            <div :class="cateErr ? 'arco-form-item-status-error' : ''">
              <a-input v-model="cateObj.name" @blur="cateTitChange"></a-input>
              <div v-if="cateErr" role="alert" class="arco-form-item-message">请输入分类名称</div>
            </div>
          </div>
          <template #footer>
            <a-button @click="addPopup = false" :disabled="btnloading">取消</a-button>
            <a-button type="primary" @click="addCateFn()" :loading="btnloading">确定</a-button>
          </template>
        </a-modal>
        <!-- seo弹框 -->
        <a-modal v-model:visible="seovisi" :width="800">
          <template #title>编辑seo要素</template>
          <div v-loading="btnloading" gi-loading-type="circle">
            <a-form ref="formRef" :model="form" class="init-form">
              <a-form-item field="name" label="分类" :content-flex="false">
                <a-row class="nor-row">
                  <a-col :span="12">
                    <div class="cate-n">{{ form.name }}</div>
                  </a-col>
                  <a-col :span="12">
                    <div style="text-align: right">
                      <a-link target="_blank" :href="form.url">制作环境</a-link>
                    </div>
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item field="title" label="网页Title">
                <a-input v-model="form.title" placeholder="" />
              </a-form-item>
              <a-form-item field="keyword" label="网页Keyword">
                <a-input v-model="form.keyword" placeholder="" />
                <template #extra>
                  <div>提示：建议不要超过4个网页Keyword</div>
                </template>
              </a-form-item>
              <a-form-item field="description" label="网页Description">
                <a-textarea type="textarea" v-model="form.description" placeholder="" />
              </a-form-item>
            </a-form>
          </div>
          <template #footer>
            <a-button @click="resetseo" :disabled="btnloading">恢复默认设置</a-button>
            <a-button type="primary" @click="seoconfirm" :disabled="btnloading">确定</a-button>
          </template>
        </a-modal>
        <!-- 关键字 -->
        <a-modal v-model:visible="keyDialog" :width="400">
          <template #title>分类关键词</template>
          <div>
            <div class="key-tit">请输入分类关键词（最多5个）</div>
            <a-form label-align="left" :model="keyForm">
              <a-form-item
                :label="'关键字' + (index + 1)"
                v-for="(item, index) in keyForm.keyContent"
                :key="'keyword' + index"
              >
                <a-input v-model.trim="keyForm.keyContent[index]"></a-input>
              </a-form-item>
            </a-form>
          </div>
          <template #footer>
            <a-button @click="keyDialog = false" :disabled="btnloading">取消</a-button>
            <a-button type="primary" @click="addKeyFn()" :loading="btnloading">确定</a-button>
          </template>
        </a-modal>
      </div>
      <GiFooter></GiFooter>
      <case-list ref="caseListRef" :list="calist" :summary="summary"></case-list>
    </div>
  </div>
</template>
<script setup lang="ts" name="catelist">
import { reactive, ref, h } from 'vue'
import { usePagination } from '@/hooks'
import {
  getCategoryList,
  addCategory,
  delCategory,
  editCateName,
  addCateKeyword,
  resetSeo,
  setSeo,
  getSeo
} from '@/apis'
import { Notification, Message } from '@arco-design/web-vue'
import { useRoute, useRouter } from 'vue-router'
import { getTreeDate } from '@/utils/common'
import type { ItemList, CateItem } from './type'
import caseList from './mod/caseList.vue'
const router = useRouter()
const goEdit = (row: CateItem) => {
  router.push({ path: '/web/webcate/edit', query: { id: row.id } })
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
  const { code, data } = await getCategoryList({
    search_name: searchForm.search_name
  }).finally(() => {
    loading.value = false
  })
  if (code === 0) {
    tableData.value = getTreeDate(data.list)
    isEdit.value = data.full_edit
    soid.value = data.soid
    setTotal(data.total_record)
    calist.value = data.prod_plan || []
    summary.value = data.summary || {}
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
    return Message.warning('请选择分类')
  }
  popup.value = true
}
const selectObj = reactive<webSelectObj>({
  keys: []
})
const batchDel = async () => {
  btnloading.value = true
  const res = await delCategory({
    category_ids: selectObj.keys
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
const singePopupTip = ref(false)
const currentRow = ref<CateItem>({})
const singeDel = (row: CateItem) => {
  currentRow.value = row
  if (Number(row.productcount) > 0) {
    singePopupTip.value = true
  } else {
    singePopup.value = true
  }
}
const singeBatchDel = async () => {
  btnloading.value = true
  const res = await delCategory({
    category_ids: [currentRow.value.id]
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code === 0) {
    singePopup.value = false
    Message.success(res.message || '操作成功')
    getTableData()
  }
}
// 优化方案
const goCase = (row: CateItem) => {
  window.open(`https://www.maoyt.com/index.php?r=cate/optimizecate&cateid=${row.id}&keyword=Cartridges`, '_blank')
}
const editData = (row: CateItem) => {
  window.open(`https://www.maoyt.com/index.php?r=product/qualitydata&cateid=${row.id}&type=edit`, '_blank')
}
const goAllPage = () => {
  window.open(`https://www.maoyt.com/index.php?r=cate/allOptimize&soid=${soid.value}`, '_blank')
}
// 新增分类
const addPopup = ref(false)
const cateObj = reactive({ id: '', name: '', pid: '', pname: '' })
const addCate = () => {
  cateObj.name = ''
  cateObj.pid = ''
  addPopup.value = true
}
const cateTitChange = () => {
  if (!cateObj.name) {
    cateErr.value = true
  } else {
    cateErr.value = false
  }
}
const addCateFn = async () => {
  if (!cateObj.name) {
    return
  }
  btnloading.value = true
  // 编辑或者新增
  if (cateObj.id) {
    const res = await editCateName({
      name: cateObj.name,
      category_id: cateObj.id
    }).finally(() => {
      btnloading.value = false
    })
    if (res.code === 0) {
      addPopup.value = false
      Message.success(res.message || '操作成功')
      getTableData()
    }
  } else {
    const res = await addCategory({
      name: cateObj.name,
      parent_id: cateObj.pid || '0'
    }).finally(() => {
      btnloading.value = false
    })
    if (res.code === 0) {
      addPopup.value = false
      Message.success(res.message || '操作成功')
      getTableData()
    }
  }
}
const cateErr = ref(false)
// 编辑分类
const editFn = (row: CateItem) => {
  cateObj.name = row.name
  cateObj.id = row.id
  cateObj.pid = ''
  cateObj.pname = ''
  addPopup.value = true
}
// 新增子分类
const addSubCate = (row: CateItem) => {
  cateObj.name = ''
  cateObj.id = ''
  cateObj.pid = row.id
  cateObj.pname = row.name
  addPopup.value = true
}
// seo相关
const form = reactive({
  name: '',
  title: '',
  description: '',
  keyword: '',
  url: '',
  id: '',
  page: 1
})
const seovisi = ref(false)
const showSeo = (row: CateItem) => {
  seovisi.value = true
  form.id = row.id
  form.url = row.prod_env_url
  form.name = row.name
  getCateseo()
}
const seoconfirm = async () => {
  btnloading.value = true
  const { title, description, keyword, url, id, page } = form
  const res = await setSeo({
    title: title,
    desc: description,
    keyword: keyword,
    sid: id,
    page
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code === 0) {
    seovisi.value = false
    Message.success(res.message || '操作成功')
  }
}
const resetseo = async () => {
  btnloading.value = true
  const { id, page } = form
  const res = await resetSeo({
    seo_sid: id,
    seo_page: page
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code === 0) {
    seovisi.value = false
    Message.success(res.message || '操作成功')
  }
}

const getCateseo = async () => {
  btnloading.value = true
  const { id, page } = form
  const res = await getSeo({
    sid: id,
    page: page
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code === 0) {
    let { keyword, description, title } = res.data
    form.title = title
    form.description = description
    form.keyword = keyword
  }
}
// 添加关键字
const keyForm = reactive({
  keyContent: ['', '', '', '', ''],
  category_id: ''
})
const keyDialog = ref(false)
const addkeyword = (row: CateItem) => {
  console.log(row)
  keyForm.keyContent = ['', '', '', '', '']
  row.keyword?.forEach((item, index) => {
    keyForm.keyContent[index] = item
  })
  keyForm.category_id = row.id
  keyDialog.value = true
}
const addKeyFn = async () => {
  console.log(keyForm.keyContent)
  const newArr = keyForm.keyContent.filter((item) => {
    return item
  })
  console.log(newArr)
  btnloading.value = true
  const res = await addCateKeyword({
    keyword: newArr,
    category_id: keyForm.category_id
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code === 0) {
    keyDialog.value = false
    Message.success(res.message || '操作成功')
    getTableData()
  }
}

// 导入制作方案
const caseListRef = ref()
const exportFn = () => {
  caseListRef.value.showDialog()
}
</script>
<style lang="scss" scoped>
@import './mod/list.scss';
</style>
