<template>
  <div class="table-wrap">
    <div class="table-page">
      <!-- <a-alert type="success"
        >三级路由【缓存路由、固定表格高度、并根据窗口大小自适应】的示例。详情页请点击操作列按钮，支持tab多开并高亮左侧菜单</a-alert
      > -->
      <a-form label-align="right" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
        <a-row :gutter="16" wrap>
          <a-col :xs="12" :md="12" :lg="8" :xl="5" :xxl="6">
            <a-form-item field="search_name" label="产品名称">
              <a-input v-model="form.search_name" placeholder="请输入产品名称" :allow-clear="true" />
            </a-form-item>
          </a-col>
          <a-col :xs="8" :md="8" :lg="7" :xl="5" :xxl="4">
            <a-form-item field="category_id" label="分类名称">
              <a-select placeholder="所有分类" v-model="form.category_id">
                <a-option value="" label="所有分类"></a-option>
                <a-option v-for="item in cateArr" :key="item.id" :value="item.id" :label="item.name"></a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :xs="12" :md="12" :lg="8" :xl="5" :xxl="6" v-show="collapsed">
            <a-form-item field="product_id" label="产品ID">
              <a-input v-model="form.product_id" placeholder="" :allow-clear="true" />
            </a-form-item>
          </a-col>
          <a-col :xs="8" :md="8" :lg="6" :xl="5" :xxl="5" v-show="collapsed">
            <a-form-item field="p_uid" label="负责人">
              <a-select placeholder="所有负责人" v-model="form.p_uid">
                <a-option value="">所有负责人</a-option>
                <a-option v-for="item in personArr" :key="item.id" :value="item.id">{{ item.username }}</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="8" :md="8" :lg="6" :xl="5" :xxl="5" v-show="collapsed">
            <a-form-item field="hs_code" label="海关编码">
              <a-select placeholder="所有海关编码" v-model="form.hs_code">
                <a-option value="">所有海关编码</a-option>
                <a-option value="1">跟随分类</a-option>
                <a-option value="2">单独指定</a-option>
              </a-select>
            </a-form-item>
          </a-col> -->
          <a-col :xs="8" :md="8" :lg="6" :xl="6" :xxl="5">
            <a-form-item :hide-label="true">
              <a-space>
                <a-button type="primary" @click="searchFn">
                  <template #default>查询</template>
                </a-button>
                <a-button @click="resetFn">
                  <template #default>重置</template>
                </a-button>
                <!-- <a-button type="text" class="collapsed-btn" @click="collapsed = !collapsed">
                  <template #default>{{ !collapsed ? '展开' : '收起' }}更多搜索</template>
                </a-button> -->
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <section class="table-box">
        <a-row :gutter="16" wrap style="margin-bottom: 12px">
          <a-col :span="12">
            <a-space>
              <!-- <a-button type="primary" @click="goAdd" size="small" status="success">
                <template #default>新增</template>
              </a-button> -->
              <a-button size="small" @click="cateFn">
                <template #default>分类调整</template>
              </a-button>
              <!-- <a-button size="small" @click="jugeUser">
                <template #default>负责人调整</template>
              </a-button>
              <a-button size="small" @click="showPro">
                <template #default>设为卖点产品</template>
              </a-button> -->
              <a-button size="small" status="danger" type="text" @click="showPopFn">
                <template #default>批量删除</template>
              </a-button>
            </a-space>
          </a-col>
        </a-row>
        <div class="table-inner">
          <a-table
            row-key="id"
            size="small"
            page-position="br"
            :bordered="{ cell: true }"
            :loading="loading"
            :data="tableData"
            :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
            :pagination="{
              showPageSize: true,
              showJumper: true,
              total: total,
              current: current,
              pageSize: pageSize,
              showTotal: true
            }"
            @page-change="changeCurrent"
            v-model:selected-keys="selectObj.keys"
            @page-size-change="changePageSize"
            :row-selection="rowSelection"
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
              </a-table-column>
              <a-table-column title="海关编码" :width="100">
                <template #cell="{ record }">
                  <a-link @click="showCode(record)" class="link-class">{{ record.hs_code }}</a-link>
                </template>
              </a-table-column>
              <a-table-column title="负责人" data-index="p_username" :width="100" align="left"></a-table-column> -->
              <a-table-column title="发布时间" data-index="addtime" :width="105" align="left">
                <template #title>
                  <div @click="sortFn('uptime')">
                    {{ '发布时间' }}
                    <template v-if="form.order_by == 'uptime'">
                      <icon-arrow-down v-if="form.order == 'desc'" />
                      <icon-arrow-up v-else />
                    </template>
                  </div>
                </template>
              </a-table-column>
              <a-table-column title="更新时间" data-index="uptime" :width="105" align="left">
                <template #title>
                  <div @click="sortFn('addtime')">
                    {{ '更新时间' }}
                    <template v-if="form.order_by == 'addtime'">
                      <icon-arrow-down v-if="form.order == 'desc'" />
                      <icon-arrow-up v-else />
                    </template>
                  </div>
                </template>
              </a-table-column>
              <!-- <a-table-column title="相似度" data-index="similarity_detected" :width="100" align="right">
                <template #cell="{ record }">
                  <div v-if="record.similarity_detect_status == 1">
                    <div @click="goReport(record.id)" class="cursor">
                      未检测
                      <icon-find-replace style="color: rgb(var(--primary-6));position: relative;top: 1px;" size="16" />
                    </div>
                  </div>
                  <div v-else-if="record.similarity_detect_status == 3">
                    <div @click="showReport(record)" class="cursor">查看检测 <icon-eye class="cursor" /></div>
                  </div>
                  <div v-else>检测中</div>
                </template>
              </a-table-column>
              <a-table-column title="标识" align="left" :width="130">
                <template #cell="{ record }">
                  <ul class="tag-ul">
                    <li
                      :class="{
                        color1: item === 'TOP Products' || item === 'TOP Product',
                        color2: item === '首页置顶产品' || item === '首页置顶',
                        color3: item === '页脚产品' || item === '页脚左侧' || item === '页脚中部' || item === '页脚右侧'
                      }"
                      v-for="(item, index) in record.product_flag"
                      :key="index"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </template>
              </a-table-column> -->
              <a-table-column title="操作" :width="200" align="center" fixed="right">
                <template #cell="{ record }">
                  <a-space :size="4">
                    <a-button size="mini" @click="previewFn(record.prod_env_url)" type="text">
                      <template #icon><icon-eye :size="13" :stroke-width="3" /></template>
                      <template #default>预览</template>
                    </a-button>
                    <a-button size="mini" @click="goEdit(record.id)" type="text" status="warning">
                      <template #icon><icon-edit :size="13" :stroke-width="3" /></template>
                      <template #default>编辑</template>
                    </a-button>
                    <a-button size="mini" @click="copyFn(record)" type="text" status="success">
                      <template #icon><icon-copy :size="13" :stroke-width="3" /></template>
                      <template #default>复制</template>
                    </a-button>
                    <a-popconfirm type="warning" content="您确定要删除该项吗?" @ok="delPro(record)">
                      <a-button size="mini" type="text" status="danger">
                        <template #icon><icon-delete :size="13" :stroke-width="3" /></template>
                        <!-- <template #default>删除</template> -->
                      </a-button>
                    </a-popconfirm>

                    <!-- <a-button size="mini">
                    <template #default>查看相似度</template>
                  </a-button> -->
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </section>

      <!-- 设为卖点产品弹框 -->
      <a-modal v-model:visible="proVisi" :width="286">
        <template #title>提示</template>
        <div>
          <icon-exclamation-circle-fill size="16" class="info-icon" />设置该产品为卖点产品后，将通过“卖点产品管理”
          维护已设置产品。
        </div>
        <template #footer>
          <a-button @click="proHandleCancel" :disabled="btnloading">取消</a-button>
          <a-button type="primary" @click="proHandleOk" :loading="btnloading">确定</a-button>
        </template>
      </a-modal>
      <!-- 批量删除弹框 -->
      <a-modal v-model:visible="popup" :width="286">
        <template #title>提示</template>
        <div><icon-exclamation-circle-fill size="16" style="color: rgb(var(--orangered-5))" /> 您确定要删除吗？</div>
        <template #footer>
          <a-button @click="popup = false" :disabled="btnloading">取消</a-button>
          <a-button type="primary" @click="batchDel" :loading="btnloading">确定</a-button>
        </template>
      </a-modal>
      <!-- 调整负责人弹框 -->
      <a-modal v-model:visible="userVisi" :width="300">
        <template #title>负责人调整</template>
        <div class="group-box">
          <a-radio-group direction="vertical" v-model="userId">
            <!-- <a-option v-for="item in personArr" :key="item.id" :value="item.id">{{ item.username }}</a-option> -->
            <a-radio v-for="item in personArr" :key="item.id" :value="item.id">{{ item.username }}</a-radio>
          </a-radio-group>
        </div>
        <template #footer>
          <a-button @click="userHandleCancel" :disabled="btnloading">取消</a-button>
          <a-button type="primary" @click="userHandleOk" :loading="btnloading">确定</a-button>
        </template>
      </a-modal>
      <!-- 批量分类调整 -->
      <a-modal v-model:visible="cateTag" :width="600">
        <template #title>调整分类</template>
        <div class="tag-box">
          <a-tree
            :data="treeData"
            class="nomral-tree"
            v-model:selected-keys="cateKey"
            :fieldNames="{
              key: 'id',
              title: 'name'
            }"
          >
            <template #icon>
              <icon-record />
            </template>
          </a-tree>
        </div>
        <template #footer>
          <a-button @click="cateHandleCancel" :disabled="btnloading">取消</a-button>
          <a-button type="primary" @click="cateHandleOk" :loading="btnloading">确定</a-button>
        </template>
      </a-modal>
      <!-- 相似度弹框 -->
      <a-modal v-model:visible="reportTag" :width="600">
        <template #title>相似度提示</template>
        <div class="report-box">
          <div>
            <div class="report-text">
              经检测，有<span class="red">{{ reportObj.total_records }}</span
              >个产品与{{ reportObj.name }}<span class="red">相似度≥70%</span>。
            </div>
            <div class="report-list-box">
              <div class="re-item" v-for="(item, key) in reportObj.list">
                <div class="item-top">
                  <div class="re-img-box">
                    <img :src="item.picurl" alt="" />
                  </div>
                  <div class="texts">
                    <a-link @click="goEdit(item.id)">{{ item.name }}</a-link>
                    <span class="red">相似度{{ item.repeat_value }}%</span>
                  </div>
                </div>
                <div class="item-bot" v-show="item.expend">
                  <p>自定义属性</p>
                  <div class="content-1 red">
                    <p v-for="(sitem, skey) in reportParse(item.repeat_attrs)" :key="skey">{{ skey }}: {{ sitem }}</p>
                  </div>
                  <p class="tit-2">产品描述</p>
                  <div class="content-2 red">
                    {{ item.repeat_remark }}
                  </div>
                </div>
                <a-button type="text" class="toggle-btn" @click="reportExpend(item)">{{
                  !item.expend ? '展开' : '收起'
                }}</a-button>
              </div>
            </div>
            <div class="time">检测时间：{{ reportObj.detect_time }}</div>
          </div>
        </div>
        <template #footer>
          <a-button type="primary" @click="reportTag = false">确定</a-button>
          <a-button @click="resetReport(reportObj.id)" style="margin-left: 10px" v-if="reportObj.redetect"
            >重新检测</a-button
          >
        </template>
      </a-modal>
      <a-modal v-model:visible="reportTag1" :width="600">
        <template #title>相似度提示</template>
        <div class="report-box">
          <div class="report-center">
            <div>{{ reportMsg }}</div>
          </div>
        </div>
        <template #footer>
          <a-button type="primary" @click="reportTag1 = false">确定</a-button>
        </template>
      </a-modal>
      <!-- 海关编码弹框 -->
      <customs-code ref="customsCodeRef" @update="()=>{getTableData()}"></customs-code>
    </div>
    <GiFooter></GiFooter>
  </div>
</template>

<script setup lang="ts" name="MainTable">
import { reactive, ref, h } from 'vue'
import { usePagination } from '@/hooks'
import {
  getProductList,
  checkSimilarity,
  similarityReport,
  getSimilarity,
  productDel,
  setHotspot,
  editUser,
  editCategory
} from '@/apis'
import type { productListItem, webSelectObj, proPersonItem, procateItem } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import GiSvgIcon from '@/components/GiSvgIcon.vue'
import customsCode from './mod/customs-code.vue'
import { getTreeDate } from '@/utils/common'
const emit = defineEmits(['update', 'changeTab'])
const router = useRouter()
const route = useRoute()
const form = reactive({
  search_name: (route.query.search_name as string) || '',
  category_id: (route.query.category_id as string) || '',
  p_uid: '',
  hs_code: (route.query.hs_code as string) || '',
  product_id: '',
  order_by: 'uptime',
  order: 'desc',
  video_id: (route.query.video_id as string) || ''
})
let personArr = reactive<proPersonItem[]>([])
const cateArr = ref([])
const loading = ref(false)
let tableData = reactive<productListItem[]>([])
const collapsed = ref(false)

const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const getTableData = async () => {
  loading.value = true
  const { search_name, category_id, p_uid, hs_code, product_id, order, order_by, video_id } = form
  const { code, data } = await getProductList({
    page_no: current.value,
    page_size: pageSize.value,
    search_name,
    category_id,
    p_uid,
    hs_code,
    product_id,
    order,
    order_by,
    video_id
  })
  if (code == 0) {
    tableData = data.list
    personArr = data.p_users
    cateArr.value = data.categories
    emit('update', data)
    setTotal(Number(data.total_records))
  }
  loading.value = false
}
const searchFn = () => {
  form.video_id = ''
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
  form.video_id = ''
  form.search_name = ''
  form.category_id = ''
  form.p_uid = ''
  form.hs_code = ''
  form.product_id = ''
  form.order_by = 'uptime'
  form.order = 'desc'
  // formRef.value && formRef.value.resetFields()
}

const goAdd = () => {
  router.push({ path: '/web/webproduct/detail' })
}
const goEdit = (id: string) => {
  router.push({ path: '/web/webproduct/detail', query: { id } })
}
const selectObj = reactive<webSelectObj>({
  keys: []
})
// 批量删除
const popup = ref(false)
const showPopFn = () => {
  if (!selectObj.keys.length) {
    return Message.warning('请选择产品')
  }
  popup.value = true
}
const batchDel = async () => {
  btnloading.value = true
  const res = await productDel({product_ids: selectObj.keys})
  btnloading.value = false
  if (res.code === 0) {
    Message.success('删除成功')
    selectObj.keys = []
    popup.value = false
    await getTableData()
  }
}
// 单个删除
const delPro = async (row) => {
  const res = await productDel({product_ids: [row.id]})
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
  }
  await getTableData()
}
// 预览
const previewFn = (url: string) => {
  window.open(url, '_blank')
}
// 复制
const copyFn = (row: productListItem) => {
  router.push({ path: '/web/webproduct/detail', query: { type: 'copy', id: row.id } })
}
/* 卖点产品 */
const proVisi = ref(false)
const proHandleOk = async () => {
  btnloading.value = true
  const res = await setHotspot({product_ids: selectObj.keys})
  btnloading.value = false
  if (res.code === 0) {
    proVisi.value = false
    Message.success('设置成功')
    selectObj.keys = []
    getTableData()
  }
}
const proHandleCancel = () => {
  proVisi.value = false
}
const showPro = () => {
  if (!selectObj.keys.length) {
    return Message.warning('请选择产品')
  }
  proVisi.value = true
}
const btnloading = ref(false)

/*  排序 */
const sortFn = (sort: string) => {
  form.order_by = sort
  form.order = form.order === 'desc' ? 'asc' : 'desc'
  getTableData()
}

// 负责人调整
const jugeUser = () => {
  if (!selectObj.keys.length) {
    return Message.warning('请选择产品')
  }
  userVisi.value = true
}
const userVisi = ref(false)
const userHandleCancel = () => {
  userVisi.value = false
}
const userId = ref('')
const userHandleOk = async () => {
  btnloading.value = true
  const res = await editUser({
    uid: userId.value,
    product_ids: selectObj.keys
  })
  btnloading.value = false
  if (res.code === 0) {
    userVisi.value = false
    Message.success('请求成功')
    selectObj.keys = []
    getTableData()
  }
}

/* 分类调整 */
const cateFn = () => {
  if (!selectObj.keys.length) {
    return Message.warning('请选择产品')
  }
  cateTag.value = true
  treeData.value = getTreeDate(cateArr.value)
}
const cateTag = ref<boolean>(false)
const cateKey = ref('')
const cateHandleCancel = () => {
  cateTag.value = false
}
const cateHandleOk = async() => {
  btnloading.value = true
  const res = await editCategory({
    category_id: cateKey.value[0],
    product_ids: selectObj.keys
  }).finally(() => {
    btnloading.value = false
    cateTag.value = false
  })
  if (res.code == 0) {
    Message.success('请求成功')
    selectObj.keys = []
    getTableData()
  }
}
const treeData = ref([])
// let currentRow = reactive({})
const reportTag = ref(false)
const reportTag1 = ref(false)
const reportMsg = ref('')
const reportObj = ref({})
const showReport = async (row: productListItem) => {
  const res = await getSimilarity({ product_id: row.id })
  if (res.code == 0) {
    reportTag.value = true
    res.data.list.forEach((item) => {
      item.expend = false
    })
    reportObj.value = res.data
    reportObj.value.name = row.name
    reportObj.value.id = row.id
  }
}
const resetReport = (id: string) => {
  reportTag.value = false
  goReport(id)
}
const reportExpend = (item) => {
  item.expend = !item.expend
}
const reportParse = (str: string) => {
  return JSON.parse(str || '{}')
}
const goReport = async (id: string) => {
  const data = await checkSimilarity({ product_id: id })
  reportMsg.value = data.message || ''
  reportTag1.value = true
  setTimeout(() => {
    similarityReportFn()
  }, 2 * 60 * 1000)
}
const similarityReportFn = async () => {
  const data = await similarityReport()
  if (data.code == 0 && data?.data.list.length) {
    Notification.clear()
    data.data.list.forEach((item) => {
      Notification.info({
        content: h(
          'div',
          {
            class: 'fia-box',
            on: {
              click: () => {
                showReport(item.id)
              }
            }
          },
          [h('div', {}, item.name), h('div', {}, '相似度检测结果已生成，点击查看。')]
        ),
        closable: true,
        id: item.id,
        position: 'bottomRight',
        duration: 0
      })
    })
    // Notification.info({
    //   title: 'Notification',
    //   content: 'This is a notification!',
    //   closable: true,
    //   closeIcon: <IconCloseCircle />
    // })
  }
}
// 查看海关编码
const customsCodeRef = ref()
const showCode = (row: productListItem) => {
  customsCodeRef.value.showDialog(row)
}

// 搜索cate
const searchCate = (cateid: string) => {
  router.push({
    path: '/web/webproduct/list',
    query: {
      category_id: String(cateid)
    }
  })
  resetFn()
  form.category_id = String(cateid)
  getTableData()
}
// 搜索关键字
const searchName = (name: string) => {
  router.push({
    path: '/web/webproduct/list',
    query: {
      search_name: name
    }
  })
  resetFn()
  form.search_name = name
  getTableData()
}
</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
