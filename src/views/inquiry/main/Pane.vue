<template>
  <div class="table-wrap">
    <div class="table-page">
      <a-form label-align="right" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
        <a-row :gutter="16" wrap>
          <a-col :xs="6" :md="8" :lg="7" :xl="5" :xxl="4">
            <a-form-item field="iid" label="阅读状态">
              <a-select placeholder="全部" v-model="form.isread">
                <a-option
                  v-for="item in isreadArr"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="8" :xl="5" :xxl="6">
            <a-form-item field="search_kw" label="买家信息">
              <a-input v-model="form.search_kw" placeholder="买家邮箱/号码" :allow-clear="true" />
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="8" :xl="5" :xxl="6">
            <a-form-item field="iid" label="询盘ID">
              <a-input v-model="form.iid" placeholder="请输入询盘ID" :allow-clear="true" />
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
              <a-table-column title="询盘标题" :width="230">
                <template #cell="{ record }">
                  <a-link
                    @click="goEdit(record.iid, record.iq_source, record.indexflag)"
                    class="link-class normal-link"
                  >
                    <a-button size="mini" type="text" status="warning" class="inline-block" v-if="record.isread == 0">
                      <template #icon><icon-email :size="13" :stroke-width="3" /></template>
                    </a-button>
                    <a-button size="mini" disabled type="text" class="inline-block" v-else-if="record.isread == 1">
                      <template #icon><icon-empty :size="13" :stroke-width="3" /></template>
                    </a-button>

                    <GiTag type="dark" size="mini" status="warning" v-if="record.indexflag">置顶</GiTag>
                    {{ record.topic }}
                  </a-link>
                </template>
              </a-table-column>

              <a-table-column title="询盘类型" :width="160">
                <template #cell="{ record }">
                  <div class="cell-box" v-if="record.iq_source == 1">在线询盘</div>
                  <div class="cell-box" v-else-if="record.iq_source == 2">智能询盘</div>
                  <div class="cell-box">ID:{{ record.iid }}</div>
                  <div class="cell-box" v-if="record.points != 0">积分:{{ record.points }}</div>
                </template>
              </a-table-column>
              <a-table-column title="卖家信息" :width="160">
                <template #cell="{ record }">
                  <div class="cell-box">{{ record.sendername }}</div>
                  <div class="cell-box">{{ record.sendermail }}</div>
                  <div class="cell-box">{{ record.senderphone }}</div>
                  <div class="cell-box">{{ record.sendercountry }}</div>
                </template>
              </a-table-column>
              <a-table-column title="产品图片" data-index="name" :width="100" align="center">
                <template #cell="{ record }">
                  <div class="img-cell-box" v-if="record.p_picture">
                    <img :src="record.p_picture" alt="" />
                  </div>
                </template>
              </a-table-column>

              <a-table-column data-index="sendtime" :width="96" align="left">
                <template #title>
                  <div @click="sortFn()">
                    {{ '发布时间' }}
                    <icon-arrow-down v-if="form.sort == 'desc'" />
                    <icon-arrow-up v-else />
                  </div>
                </template>
                <template #cell="{ record }">
                  <div>
                    {{ record.sendtime }}
                  </div>
                </template>
              </a-table-column>

              <a-table-column title="操作" :width="200" align="center" fixed="right">
                <template #cell="{ record }">
                  <a-space :size="4">
                    <a-button
                      size="mini"
                      v-if="form.status == '0'"
                      @click="goEdit(record.iid, record.iq_source, record.indexflag)"
                      type="text"
                    >
                      <template #icon><icon-eye :size="13" :stroke-width="3" /></template>
                      <template #default>查看</template>
                    </a-button>
                    <a-button
                      size="mini"
                      v-if="form.status == '0'"
                      @click="
                        record.iq_source == 1
                          ? goReply(record.iid, record.topic, record.reply_msg)
                          : previewFn(record.jump_url)
                      "
                      type="text"
                      status="warning"
                    >
                      <template #icon><icon-reply :size="13" :stroke-width="3" /></template>
                      <template #default>回复</template>
                    </a-button>
                    <a-button
                      size="mini"
                      v-if="form.status == '0'"
                      @click="setindexflagAction(record)"
                      type="text"
                      :class="record.indexflag == 0 ? 'success' : 'normal'"
                      status="success"
                    >
                      <template #icon v-if="record.indexflag == 0"
                        ><icon-to-top :size="13" :stroke-width="3"
                      /></template>
                      <template #default>{{ record.indexflag == 0 ? '置顶' : '取消置顶' }}</template>
                    </a-button>

                    <a-popconfirm
                      type="warning"
                      :content="form.status == '0' ? '您确定要删除吗?' : '您确定要恢复吗?'"
                      @ok="delPro(record)"
                    >
                      <a-button size="mini" v-if="form.status == '0'" type="text" status="danger">
                        <template #icon><icon-delete :size="13" :stroke-width="3" /></template>
                      </a-button>
                      <a-button size="mini" v-if="form.status != '0'" type="text" status="warning">
                        <template #icon><icon-undo :size="13" :stroke-width="3" /></template>
                        <template #default>恢复</template>
                      </a-button>
                    </a-popconfirm>
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
        <a-row :gutter="16" wrap style="margin-bottom: 16px">
          <a-col :span="12">
            <a-space>
              <a-button size="small" status="danger" type="text" @click="showPopFn">
                <template #default>{{ form.status == '0' ? '批量删除' : '批量恢复' }}</template>
              </a-button>
            </a-space>
            <a-space>
              <a-button size="small" type="text" @click="goDelete" v-if="form.status == '0'">
                已删除询盘({{ del_total }})
              </a-button>
              <a-button size="small" type="text" @click="goAll" v-if="form.status == '1'">全部询盘 </a-button>
            </a-space>
          </a-col>
        </a-row>
      </section>

      <!-- 批量删除弹框 -->
      <a-modal v-model:visible="popup" :width="286">
        <template #title>提示</template>
        <div><icon-exclamation-circle-fill size="16" style="color: rgb(var(--orangered-5))" /> 您确定要删除吗？</div>
        <template #footer>
          <a-button @click="popup = false" :disabled="btnloading">取消</a-button>
          <a-button type="primary" @click="batchDel" :loading="btnloading">确定</a-button>
        </template>
      </a-modal>

      <!-- 外贸邮提示 -->
      <a-modal v-model:visible="singePopupTip" :width="286">
        <template #title>提示</template>
        <div v-html="replyMsg"></div>
        <template #footer>
          <a-button type="primary" @click="singePopupTip = false">确定</a-button>
        </template>
      </a-modal>
    </div>
    <GiFooter></GiFooter>
  </div>
</template>

<script setup lang="ts" name="MainTable">
import { reactive, ref, defineProps, watch } from 'vue'
import { usePagination } from '@/hooks'
import { getInquiryList, delInquiry, setindexflag } from '@/apis'
import type { webSelectObj } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'

const router = useRouter()
const route = useRoute()
const props = defineProps({
  tab: String
})
const { tab } = props
const singePopupTip = ref(false)
const replyMsg = ref('')
// 默认status为1删除显示逻辑
const form = reactive({
  search_kw: (route.query.search_kw as string) || '',
  iid: (route.query.iid as string) || '',
  status: '0',
  isread: '2',
  sort: '',
  tab
})
watch(props, (newValue: any) => {
  form.tab = newValue.tab
  searchFn()
})

const isreadArr = ref([
  { label: '全部', value: '2' },
  { label: '已读', value: '1' },
  { label: '未读', value: '0' }
])
const loading = ref(false)
const del_total = ref(0)
const selectRowData = ref<any[]>([])
const tableData = ref<any[]>([])
const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
const getTableData = async () => {
  loading.value = true
  const { search_kw, iid, sort, isread, tab, status } = form

  const { code, data } = await getInquiryList({
    page: current.value,
    pagesize: pageSize.value,
    search_kw,
    iid,
    sort,
    isread,
    tab,
    status
  })
  if (code == 0) {
    tableData.value = data.lists
    del_total.value = data.del_total
    setTotal(Number(data.total))
  }
  loading.value = false
}
const searchFn = () => {
  getTableData()
}
const previewFn = (url: string) => {
  window.open(url, '_blank')
}
const rowSelection: any = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  selectedRowKeys: [],
  onlyCurrent: false
})
getTableData()

const formRef = ref()
const resetFn = () => {
  form.search_kw = ''
  form.iid = ''
  form.sort = ''
  form.isread = ''
  form.tab = ''
}

const selectObj = reactive<webSelectObj>({
  keys: []
})

// 批量删除
const popup = ref(false)
const showPopFn = () => {
  if (!selectObj.keys.length) {
    return Message.warning('请选择询盘')
  }
  popup.value = true
}
const batchDel = async () => {
  btnloading.value = true
  const iidArr: any[] = []
  const iq_sourceArr: any[] = []
  tableData.value.map((v) => {
    if (selectObj.keys.includes(v.id)) {
      iidArr.push(v.iid)
      iq_sourceArr.push(v.iq_source)
    }
  })

  const res = await delInquiry({
    iid: iidArr.join(','),
    iq_source: iq_sourceArr.join(','),
    status: form.status == '0' ? 1 : 0
  })
  btnloading.value = false
  if (res.code === 0) {
    Message.success('操作成功')
    selectObj.keys = []
    selectRowData.value = []
    popup.value = false
    await getTableData()
  }
}
// 单个删除
const delPro = async (row: any) => {
  const res = await delInquiry({ iid: row.iid, iq_source: row.iq_source, status: form.status == '0' ? 1 : 0 })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
  }
  await getTableData()
}
// 预览
const goEdit = (iid: string, iq_source: string, indexflag: string) => {
  router.push({ path: '/web/inquiry/detail', query: { iq_source, iid, indexflag: indexflag } })
}
// 预览
const goDelete = () => {
  form.status = '1'
  searchFn()
}
const goAll = () => {
  form.status = '0'
  searchFn()
}

// 预览
const goReply = (iid: string, topic: string, reply_msg: string) => {
  if (reply_msg != '') {
    replyMsg.value = reply_msg
    singePopupTip.value = true
  } else {
    router.push({ path: '/web/inquiry/reply', query: { topic, iid } })
  }
}

// 置顶
const setindexflagAction = async (row: { iid: any; iq_source: any; indexflag: any; id: any }) => {
  const res = await setindexflag({ iid: row.iid, iq_source: row.iq_source, indexflag: row.indexflag == 1 ? '0' : '1' })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
  }
  await getTableData()
}

const btnloading = ref(false)

/*  排序 */
const sortFn = () => {
  form.sort = form.sort === 'desc' ? 'asc' : 'desc'
  getTableData()
}
</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
