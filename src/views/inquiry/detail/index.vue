<template>
  <div class="detail-wrap-out">
    <div class="top-nav-tit">
      <div class="m-left">商机详情</div>
      <div class="m-right">
        <a-space :size="32">
          <div class="item" v-if="iq_source == 1">
            <icon-email />
            在线询盘
          </div>
          <div class="item" v-if="iq_source == 2">
            <icon-message />
            智能询盘
          </div>
          <div class="item">
            <icon-select-all />
            编号：{{ detailData.iid }}
          </div>
        </a-space>
      </div>
    </div>
    <div class="detail" id="detailbox" ref="containerRef">
      <div class="detail-wrap">
        <a-row :gutter="16" class="top-list">
          <a-col :span="16">
            <a-card :bordered="false" hoverable>
              <div class="title">{{ detailData.topic }}</div>
              <div class="time">发生时间：{{ detailData.sendtime }}</div>
              <div class="product" v-if="detailData.product?.name">
                <a-image width="64" height="64" :src="detailData.product?.pic_url" />
                <div class="text" @click="previewFn(detailData.product?.url)">
                  <div class="top">
                    {{ detailData.product?.name }}
                  </div>
                  <div class="bottom">关注产品</div>
                </div>
              </div>
            </a-card>
          </a-col>
          <a-col :span="8">
            <div ref="step1div">
              <a-card title="买家信息" :bordered="false" class="item">
                <a-descriptions :column="1">
                  <a-descriptions-item v-if="detailData.senderphone" label="买家电话">{{
                    detailData.senderphone
                  }}</a-descriptions-item>
                  <a-descriptions-item v-if="detailData.sendercountry" label="买家国家">{{
                    detailData.sendercountry
                  }}</a-descriptions-item>
                  <a-descriptions-item label="发件IP">{{ detailData.ip }}</a-descriptions-item>
                  <a-descriptions-item label="发件时所在地">{{ detailData.city }}</a-descriptions-item>
                </a-descriptions>
              </a-card>
            </div>
          </a-col>
        </a-row>

        <a-card :bordered="false" class="message" title="详情内容" v-if="iq_source == 1">
          <template #extra>
            <a-space :size="8">
              <a-button type="secondary" v-if="detailData.can_reply == 1" size="small" @click="reSendAction()">
                <template #icon><icon-loop /></template>
                <template #default>重发询盘邮件</template>
              </a-button>
              <a-button
                type="primary"
                size="small"
                v-if="detailData.can_reply == 1"
                @click="goReply(detailData.iid, detailData.subject, detailData.reply_msg)"
              >
                <template #icon><icon-reply /></template>
                <template #default>回复买家</template>
              </a-button>
              <a-button
                type="primary"
                size="small"
                v-if="detailData.can_reply == 2"
                @click="delPro({ iid: detailData.iid, iq_source: detailData.iq_source })"
              >
                <template #icon><icon-reply /></template>
                <template #default>恢复询盘</template>
              </a-button>
            </a-space>
          </template>
          <div class="from">
            <div class="left">
              From {{ detailData.from_name }}
              <a-typography-text type="secondary" v-if="detailData.from_email">
                &lt;{{ detailData.from_email }}>
              </a-typography-text>
              <div class="bottom">
                To
                {{ detailData.to }}
              </div>
              <a-space :size="12" v-if="detailData.attfile" class="showFile">
                <template v-for="(file, index) in detailData.attfile" :key="index">
                  <a-button type="text" size="small" @click="download(file)" v-if="file.attfileUrl">
                    <div class="left">
                      <icon-file />
                    </div>
                    <div class="text">
                      {{ file.attfileName }}
                    </div>
                    <div class="right">
                      <icon-download />
                    </div>
                  </a-button>
                </template>
              </a-space>
            </div>
            <div class="right">
              {{ detailData.from_time }}
            </div>
          </div>
          <div v-html="detailData.message"></div>
          <template #actions>
            <a-button
              type="primary"
              v-show="!visible"
              size="small"
              class="aibtn"
              @click="handleClick(detailData.message)"
            >
              <template #icon>
                <AIIconWhite></AIIconWhite>
              </template>
              <template #default>AI智能翻译</template>
            </a-button>
            <a-button type="primary" v-show="visible" class="ai_translate">
              <span class="ai_ball"></span>
              <span class="ai_ball"></span>
              <span class="ai_ball"></span>
              <span class="ai_ball"></span>
              <span class="ai_ball"></span>
            </a-button>
          </template>
          <div class="translate" v-if="detailData.translation.message" v-html="detailData.translation.message"></div>
        </a-card>
        <a-card :bordered="false" class="email" title="邮件跟进" v-if="iq_source == 1">
          <a-card
            :bordered="false"
            class="itemlist"
            title=""
            v-for="(item, index) in detailData.mail_info"
            :key="index"
            :class="item.type == '1' ? 'buy' : 'sale'"
          >
            <a-row class="wrap" :wrap="false">
              <a-col flex="48px">
                <a-avatar :size="48"> {{ item.type == '1' ? '买' : '卖' }} </a-avatar>
              </a-col>
              <a-col flex="auto" class="content">
                <a-row class="from" justify="space-between">
                  <a-col :span="12">
                    <div class="left">
                      From {{ item.fromname }}
                      <a-typography-text type="secondary" v-if="item.frommail">
                        &lt;{{ item.frommail }}>
                      </a-typography-text>
                      <template v-if="item.is_ai">
                        <div class="aitext">
                          <AIIcon></AIIcon>
                          <span>AI智能回复</span>
                        </div>
                      </template>
                      <div class="bottom">
                        To
                        {{ item.toname }}
                      </div>
                    </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="right">
                      {{ item.sendtime }}
                      <div class="bottom" v-if="item.sendtip">
                        <a-typography-text :type="sendlog[item.sendlog]">
                          <icon-check-circle-fill v-if="item.sendlog == 'success'" />
                          {{ item.sendtip }}
                        </a-typography-text>
                      </div>
                    </div>
                  </a-col>
                </a-row>
                <a-row class="grid-demo">
                  <a-col :span="24">
                    <div class="title">{{ item.subject }}</div>
                  </a-col>
                </a-row>
                <a-row class="grid-demo">
                  <a-col :span="24">
                    <div class="description" v-html="item.message" :class="item.less ? 'more' : ''"></div>
                  </a-col>
                </a-row>
                <a-row class="grid-demo">
                  <a-col :span="24">
                    <a-space :size="12" v-if="item.attfile" v-show="item.less" class="showFile">
                      <template v-for="(file, index) in item.attfile" :key="index">
                        <a-button type="text" size="small" @click="download(file)" v-if="file.attfileUrl">
                          <div class="left">
                            <icon-file />
                          </div>
                          <div class="text">
                            {{ file.attfileName }}
                          </div>
                          <div class="right">
                            <icon-download />
                          </div>
                        </a-button>
                      </template>
                    </a-space>
                  </a-col>
                </a-row>
                <a-row class="grid-demo">
                  <a-col :span="24">
                    <a-button
                      class="shwomorebtn"
                      type="primary"
                      size="small"
                      shape="round"
                      v-show="!item.less"
                      @click="showMore(index)"
                    >
                      <template #icon><icon-double-down /></template>
                      <template #default>展开</template>
                    </a-button>
                    <a-button
                      class="shwomorebtn"
                      type="primary"
                      size="small"
                      shape="round"
                      v-show="item.less == true"
                      @click="showMore(index)"
                    >
                      <template #icon><icon-double-up /></template>
                      <template #default>收起</template>
                    </a-button>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
        </a-card>
        <a-card :bordered="false" title="日志" v-if="iq_source == 1">
          <a-steps type="dot" direction="vertical" small>
            <a-step :description="item.actiontime" v-for="(item, index) in detailData.log" :key="index" status="finish">
              <div class="log_title" v-html="item.actionname + item.actionextr"></div>
            </a-step>
          </a-steps>
        </a-card>
        <a-card :bordered="false" class="chat" title="详情内容" v-if="iq_source == 2">
          <template #extra>
            <a-space :size="8">
              <a-button
                type="primary"
                size="small"
                v-if="detailData.can_reply == 1"
                @click="previewFn(detailData.jump_url)"
              >
                <template #icon><icon-message /></template>
                <template #default>继续聊天</template>
              </a-button>
              <a-button
                type="primary"
                size="small"
                v-if="detailData.can_reply == 2"
                @click="delPro({ iid: detailData.iid, iq_source: detailData.iq_source })"
              >
                <template #icon><icon-reply /></template>
                <template #default>恢复询盘</template>
              </a-button>
            </a-space>
          </template>
          <section class="table-box">
            <a-pagination
              :total="total"
              :current="current"
              :pageSize="pageSize"
              show-total
              show-jumper
              show-page-size
              @change="changeCurrent"
              @page-size-change="changePageSize"
            />
            <div class="table-inner">
              <a-table
                row-key="id"
                size="small"
                page-position="br"
                :bordered="false"
                :loading="loading"
                :data="tableData"
                :show-header="false"
                :hoverable="false"
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
                @page-size-change="changePageSize"
                class="coustom-table"
              >
                <template #columns>
                  <a-table-column>
                    <template #cell="{ record }">
                      <div :class="record.both == '1' ? 'sale wrap' : 'buy wrap'">
                        <a-avatar :size="48"> {{ record.both == '1' ? '卖' : '买' }} </a-avatar>
                        <div class="from">
                          <div class="left">
                            {{ record.im_name }}
                            <a-typography-text type="secondary" v-if="record.both != '1' && record.im_mail">
                              &lt;{{ record.im_mail }}>
                            </a-typography-text>

                            <template v-if="record.ai">
                              <div class="aitext">
                                <AIIcon></AIIcon>
                                <span>AI智能回复</span>
                              </div>
                            </template>
                          </div>
                          <div class="right">
                            {{ record.date }}
                          </div>
                          <div v-html="record.content"></div>
                          <div>
                            <a-button
                              style="margin-top: 8px"
                              v-if="record.file"
                              type="text"
                              size="small"
                              @click="download2(record.file)"
                            >
                              <div class="left">
                                <icon-file />
                              </div>
                              <div class="text">
                                {{ record.file_name }}
                              </div>
                              <div class="right">
                                <icon-download />
                              </div>
                            </a-button>
                            <a-image style="margin-top: 8px" v-if="record.img" width="200" :src="record.img" />
                          </div>
                        </div>
                      </div>
                    </template>
                  </a-table-column>
                </template>
              </a-table>
            </div>
          </section>
        </a-card>
      </div>
    </div>
    <!-- 外贸邮提示 -->
    <a-modal v-model:visible="singePopupTip" :width="286">
      <template #title>提示</template>
      <div v-html="replyMsg"></div>
      <template #footer>
        <a-button type="primary" @click="singePopupTip = false">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts" name="inquiryDetail">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { useFileStore } from '@/store'
import { Notification, Modal } from '@arco-design/web-vue'
import { chatLists, translateInquiry, detailInquiry, delInquiry, setindexflag, reSend } from '@/apis'
import AIIcon from './AIIcon.vue'
import AIIconWhite from './AIIconWhite.vue'
import { usePagination } from '@/hooks'
const route = useRoute()
const router = useRouter()
const fileStore = useFileStore()
const containerRef = ref<HTMLElement | null>()
const step1div = ref<HTMLElement | null>()
const iq_source = ref()
const loading = ref(false)
const tableData = ref<any[]>([])
const translateMessage = ref()
const singePopupTip = ref(false)
const replyMsg = ref('')
const detailData = ref<any>({
  iid: '',
  topic: '',
  from_time: '',
  sendtime: '',
  to: '',
  product: {
    name: '',
    url: '',
    pic_url: ''
  },
  indexflag: '',
  can_reply: '',
  reply_msg: '',
  senderphone: '',
  sendercountry: '',
  ip: '',
  city: '',
  from_name: '',
  message: '',
  from_email: '',
  jump_url: '',
  mail_info: [],
  log: [],
  translation: '',
  status: '',
  attfile: ''
})
const form = reactive({
  iid: route.query.iid || '',
  iq_source: route.query.iq_source || ''
})

const visible = ref(false)
const sendlog = ref({
  reject: 'warning',
  nochecked: 'warning',
  sending: 'primary',
  success: 'success',
  fail: 'danger'
})
const goReply = (iid: string, topic: string, reply_msg: string) => {
  if (reply_msg != '') {
    replyMsg.value = detailData.value.reply_msg
    singePopupTip.value = true
  } else {
    router.push({ path: '/web/inquiry/reply', query: { topic, iid } })
  }
}

const previewFn = (url: string) => {
  window.open(url, '_blank')
}
const download2 = (url: any) => {
  window.open(url, '_blank')
}
// 单个恢复
const delPro = async (row: any) => {
  const res = await delInquiry({ iid: row.iid, iq_source: row.iq_source, status: 0 })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
  }
  await getDetail()
}
const download = (url: any) => {
  window.open(url.attfileUrl, '_blank')
}
const showMore = (index: number) => {
  detailData.value.mail_info[index].less = !detailData.value.mail_info[index].less
}

const handleClick = (message: string) => {
  gettranslate(message)
  visible.value = true
}

const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())
current.value = 999
const getDetail = async () => {
  if (route.query.iq_source == '2') {
    getTableData()
  }

  const { code, data } = await detailInquiry({
    iq_source: form.iq_source,
    iid: form.iid
  })
  if (code == 0) {
    // fileStore.setloading(false)
    detailData.value = data
    iq_source.value = data.iq_source
    fileStore.setloading(data.indexflag == 1)
    fileStore.setStatus(data.status == 0)
  }
}
const gettranslate = async (message: string) => {
  const { code, data } = await translateInquiry({
    iid: route.query.iid,
    message
  })
  if (code == 0) {
    translateMessage.value = data.message.text
    Message.success('操作成功')
    await getDetail()
    visible.value = false
  }
}
const reSendAction = async () => {
  const { code } = await reSend({
    iid: route.query.iid
  })
  if (code == 0) {
    Message.success('操作成功')
  }
}
const getTableData = async () => {
  loading.value = true

  const { code, data } = await chatLists({
    page: current.value,
    pagesize: pageSize.value,
    iid: form.iid
  })
  if (code == 0) {
    tableData.value = data.lists
    setTotal(Number(data.total))
    current.value = data.page
  }
  loading.value = false
}
// 置顶
const setindexflagAction = async (row: { iid: any; iq_source: any; indexflag: any }) => {
  const res = await setindexflag({ iid: row.iid, iq_source: row.iq_source, indexflag: row.indexflag == 1 ? '0' : '1' })
  if (res.code === 0) {
    detailData.value.indexflag = detailData.value.indexflag == 1 ? '0' : '1'
    fileStore.setloading(row.indexflag == 1 ? false : true)
    Message.success(res.message || '操作成功')
  }
}
fileStore.$onAction(({ name }) => {
  if (name === 'save') {
    setindexflagAction({ iid: form.iid, iq_source: form.iq_source, indexflag: detailData.value.indexflag })
  }
})
getDetail()
</script>
<style lang="scss" scoped>
@import './mod/index.scss';
</style>
