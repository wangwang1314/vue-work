<template>
  <div class="start-wrap">
    <div class="s-left">
      <a-steps :current="tabCurrent" direction="vertical">
        <a-step
          >网站名称设定<template #icon><icon-more v-if="tabCurrent == 1" /></template
        ></a-step>
        <a-step
          >产品资料信息导入<template #icon><icon-more v-if="tabCurrent == 2" /></template
        ></a-step>
        <a-step
          >链接域名，上线申请
          <template #icon><icon-more v-if="tabCurrent == 3" /></template>
        </a-step>
        <a-step
          >上线完成，扬帆启航<template #icon><icon-more v-if="tabCurrent == 4" /></template
        ></a-step>
      </a-steps>
    </div>
    <div class="s-right">
      <div class="s-box" v-if="tabCurrent == 2">
        <div class="s-tit">选择信息录入方式：</div>
        <a-radio-group direction="vertical" v-model="choseType">
          <a-radio v-if="choseType == 1" :disabled="imstats == 0" class="mar-radio" :value="1"
            ><span class="label-box"><i></i><span>—键导入</span></span></a-radio
          >
          <a-radio v-else :disabled="imstats == 0" class="mar-radio" :value="2"
            ><span class="label-box"><i></i><span>—键导入</span></span></a-radio
          >
          <div class="input-wrap" v-show="choseType == 1 || choseType == 2">
            <a-input-search
              v-model="form.ali"
              @search="searchFn"
              @blur="blurFn"
              @input="valichange"
              @focus="focusFn"
              :class="{ oninput: inputTag }"
              v-show="status[choseType] == '2'"
              class="nor-input"
              placeholder="例如&nbsp;xxxx.en.alibaba.com&nbsp;&nbsp;xxxx.en.made-in-china.com"
              search-button
              :disabled="imstats == 0 || fetchloading || status[choseType] == '1'"
            >
              <template #button-default>
                <span>开始获取</span>
              </template>
              <template #icon>
                <span></span>
              </template>
            </a-input-search>
            <a-input
              v-model="form.ali"
              @blur="checkFn"
              @input="valichange"
              ref="inputtag"
              v-show="status[choseType] != '2'"
              class="nor-input"
              placeholder="例如&nbsp;xxxx.en.alibaba.com&nbsp;&nbsp;xxxx.en.made-in-china.com"
              :disabled="imstats == 0 || fetchloading || status[choseType] == '1'"
            >
            </a-input>
            <div class="status-box-wrap">
              <div class="status-box" v-if="imstats == 0">
                <div class="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>AI获取资料中</span>
              </div>
              <div class="status-box" v-else-if="status[choseType] == '1'">
                <div class="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>校验中</span>
              </div>
              <div class="status-box success" v-else-if="status[choseType] == '2'">
                <icon-check-circle-fill /><span>校验通过，该地址可用</span>
              </div>
              <div class="status-box error" v-else-if="status[choseType] == '3'">
                <icon-exclamation-circle-fill /><span>校验失败，该地址不可用</span>
              </div>
            </div>
          </div>

          <!-- <a-radio :disabled="imstats == 0 && choseType != 2" class="mar-radio" :value="2"
            ><span class="label-box"><i></i><span>Made-in-China 展厅获取</span></span></a-radio
          >
          <div class="input-wrap" v-show="choseType == 2">
            <a-input-search
              v-model="form.made"
              @search="searchFn"
              @blur="blurFn"
              @focus="focusFn"
              @input="valichange"
              :class="{ oninput: inputTag }"
              v-if="status[choseType] == '2'"
              class="nor-input"
              placeholder="填写展厅地址 例：xxxx.en.made-in-china.com"
              search-button
              :disabled="imstats == 0 || fetchloading || status[choseType] == '1'"
            >
              <template #button-default>
                <span>开始获取</span>
              </template>
              <template #icon>
                <span></span>
              </template>
            </a-input-search>
            <a-input
              v-model="form.made"
              @blur="checkFn"
              @input="valichange"
              v-else
              class="nor-input"
              placeholder="填写展厅地址 例：xxxx.en.made-in-china.com"
              :disabled="imstats == 0 || fetchloading || status[choseType] == '1'"
            >
            </a-input>
            <div class="status-box-wrap">
              <div class="status-box" v-if="imstats == 0">
                <div class="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>AI获取资料中</span>
              </div>
              <div class="status-box" v-else-if="status[choseType] == '1'">
                <div class="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>校验中</span>
              </div>
              <div class="status-box success" v-else-if="status[choseType] == '2'">
                <icon-check-circle-fill /><span>校验通过，该地址可用</span>
              </div>
              <div class="status-box error" v-else-if="status[choseType] == '3'">
                <icon-exclamation-circle-fill /><span>校验失败，该地址不可用</span>
              </div>
            </div>
          </div> -->
          <a-radio :disabled="imstats == 0 && choseType != 3" class="mar-radio" :value="3"
            ><span class="label-box">自主创建</span></a-radio
          >
        </a-radio-group>
        <div class="e-btn fix-b" @click="goNext" v-show="choseType != 3 && imstats == 0">
          <span>下一步</span><icon-arrow-right />
        </div>
        <div class="e-btn fix-b" v-show="choseType == 3" @click="goAddPro">
          <span>立即前往</span><icon-arrow-right />
        </div>
        <div class="count-box">
          <a-space :size="40" v-if="imstats == 0">
            <div class="cate-label">
              分类数量
              <span><icon-loading /></span>
            </div>
            <div class="cate-label">
              产品数量
              <span><icon-loading /></span>
            </div>
            <!-- <div class="cate-label">
              公司介绍
              <span><icon-loading /></span>
            </div> -->
          </a-space>
          <a-space :size="40" v-else>
            <div class="cate-label">
              分类数量
              <span>{{ proObj.catetotal }}</span>
            </div>
            <div class="cate-label">
              产品数量
              <span>{{ proObj.producttotal }}</span>
            </div>
            <!-- <div class="cate-label">公司介绍{{ proObj.isremark == 0 ? '未录入' : '已录入' }}</div> -->
          </a-space>
        </div>
      </div>
      <div class="s-box" v-if="tabCurrent == 3">
        <div class="s-tit">选择要让网站使用的域名：</div>
        <div class="tabs-wrap">
          <a-tabs hide-content size="large" type="capsule" v-model:active-key="activeKey">
            <a-tab-pane :key="1" v-if="isfreedomain == 1">
              <template #title>
                <div class="tab-tit"><icon-gift /><span>宜选建站赠送</span></div>
              </template>
            </a-tab-pane>
            <a-tab-pane :key="2">
              <template #title>
                <div class="tab-tit"><span>您已经拥有的域名</span></div>
              </template>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="web-box" v-if="activeKey == 1">
          <div v-loading="domainloading" gi-loading-type="circle" gi-loading-text="域名正在生成，请耐心等待。">
            <a-radio-group v-model="checkedValue" style="width: 840px; margin-top: 10px; min-height: 100px">
              <a-grid :cols="3" :colGap="24" :rowGap="12">
                <a-grid-item v-for="(item, index) in predomains" :key="index">
                  <a-radio :value="item"
                    ><div class="free-box">
                      <a-tooltip :content="item">
                        <span class="con-span">{{ item }}</span>
                      </a-tooltip>
                      <i></i></div
                  ></a-radio>
                </a-grid-item>
              </a-grid>
            </a-radio-group>
          </div>
          <div class="e-btn fix-b" style="margin-top: 20px" @click="domainsave" :class="{ grash: !checkedValue }">
            <icon-upload /><span style="margin: 0px 0px 0 8px">申请上线</span>
          </div>
        </div>
        <div class="self-web-box" v-else>
          <div class="input-wrap self-name" :class="{ nofree: isfreedomain != 1 }">
            <a-input
              class="nor-input"
              placeholder="输入您的域名 例：mydomain.com"
              @blur="selfcheckdomain"
              v-model.trim="selfdomain"
            >
            </a-input>
            <div class="status-box-wrap">
              <div class="status-box" v-if="domainCheck == '1'">
                <div class="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>校验中</span>
              </div>
              <div class="status-box success" v-else-if="domainCheck == '2'">
                <icon-check-circle-fill /><span>校验通过</span>
              </div>
              <div class="status-box error" v-else-if="domainCheck == '3'">
                <icon-exclamation-circle-fill /><span>仅支持一级域名，请重新填写</span>
              </div>
            </div>
          </div>
          <div class="self-tips">
            请在您的域名管理后台进行如下记录设置，以完成域名最终链接。
            <a-button
              @click="gocheck"
              style="margin: -6px 0 0 10px; position: relative; top: -4px"
              type="primary"
              class="btn"
              size="mini"
              :disabled="!settingbtncheck"
              v-show="!ailoading"
              >配置检测</a-button
            >
            <span
              v-show="ailoading"
              style="display: inline-block; margin: 0px 0 0 10px; position: relative; top: -4px; vertical-align: top"
            >
              <a-button type="primary" size="mini" class="btn ai_translate">
                <span class="ai_ball"></span>
                <span class="ai_ball"></span>
                <span class="ai_ball"></span>
                <span class="ai_ball"></span>
                <span class="ai_ball"></span>
              </a-button>
            </span>
          </div>
          <div class="tb-wrap">
            <table v-if="tabvalue.length">
              <thead>
                <tr>
                  <td>记录类型</td>
                  <td>主机记录</td>
                  <td>解析线路</td>
                  <td>记录值</td>
                  <td>MX优先级</td>
                  <td>TTL</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tabvalue" :key="index">
                  <td>{{ item.type || '--' }}</td>
                  <td>{{ item.route || '--' }}</td>
                  <td>{{ item.line || '--' }}</td>
                  <td>{{ item.ip || '--' }}</td>
                  <td>{{ item.mxer || '--' }}</td>
                  <td>{{ item.ttl || '--' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="e-btn fix-b" style="margin-top: 20px" @click="domainsave" :class="{ grash: !setcheck }">
            <icon-upload /><span style="margin: 0px 0px 0 8px">申请上线</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 上传图片弹框 -->
    <a-modal v-model:visible="picvise">
      <template #title>提示</template>

      <a-form ref="diaformRef" size="medium" :model="diaform" layout="horizontal" :auto-label-width="true">
        <div class="pic-text">
          <p>
            您的网站资料部分来源于
            {{ userStore.getdataurl }}，为确保知识产权得到合法保护，申请上线需要上传相关许可或证明文件照片
          </p>
          <p>可以是但不局限于：公司授权盖章文件、本人与公司关系证明、手持工牌在公司前台照片等。</p>
        </div>
        <a-form-item label="浏览图片" :hide-label="true">
          <a-upload
            :on-before-remove="picRemove"
            list-type="picture-card"
            :action="picUploadUrl"
            :data="{ type: '33' }"
            :file-list="picArr"
            image-preview
            :limit="5"
            @success="successUpload"
            @change="
              (res) => {
                picUploadChange(res)
              }
            "
          >
            <template #upload-button>
              <div class="arco-upload-picture-card">
                <div class="arco-upload-picture-card-text">
                  <IconPlus />
                  <div style="margin-top: 10px; color: var(--color-text-4); font-size: 14px">上传</div>
                </div>
              </div>
            </template>
          </a-upload>
        </a-form-item>
        <a-form-item label="图片描述" :hide-label="true">
          <a-textarea
            placeholder="备注说明"
            :auto-size="{
              minRows: 3
            }"
            v-model="diaform.webnote"
          ></a-textarea>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="picvise = false">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="startwrap">
import { reactive, ref, onMounted, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import { Message } from '@arco-design/web-vue'
import {
  guideDataurlcheck,
  guidegetdataIntro,
  guidegetdatastate,
  guideDatafrom,
  guidegetdata,
  guidegetpredomains,
  guidegetfreedomain,
  guidedomaincheck,
  guidedomainapply,
  guidecompanyapply,
  pictureDdel,
  guidedomaininfos,
  guidegetnowstep,
  guidenextsetdomain
} from '@/apis'
import { uc_login_sdk } from '@/utils/common'
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
const router = useRouter()
const userStore = useUserStore()
const tabCurrent = ref(2)
const choseType = ref(0)
const form = ref({
  ali: '',
  made: ''
})
// 0 无状态 1 校验中 2 成功 3 失败
const status = reactive({
  '1': '0',
  '2': '0',
  '3': '0'
})
const fetchloading = ref(false)
const inputTag = ref(false)
const focusFn = () => {
  inputTag.value = true
}
const blurFn = () => {
  inputTag.value = false
}
const inputtag = ref()
const valichange = () => {
  status[choseType.value] = '0'
  if (inputtag.value) {
    setTimeout(() => {
      inputtag.value.focus()
    })
  }
}
watch(fetchloading, (newval) => {
  if (newval) {
    setTimeout(() => {
      fetchloading.value = false
    }, 5000)
  }
})
const searchFn = async () => {
  fetchloading.value = true
  if (!userStore.getdataurl) {
    await savedatafrom()
  }
  const res1 = await guidegetdatastate()
  if (res1.code == 0) {
    userStore.setdatastate(res1.data)
    if (res1.data == -1) {
      const res = await guidegetdata()
      if (res.code == 0) {
        if (res.data == 1) {
          imstats.value = 0
          userStore.setdatastate(0)
        } else {
          Message.error('获取失败')
        }
      }
    }
  }
  fetchloading.value = false
}
const goNext = async () => {
  if (!userStore.getdataurl || !userStore.getdatafrom) {
    await savedatafrom()
  }
  tabCurrent.value = 3
  getfreedomain()
  guidenextsetdomain()
}
const activeKey = ref(1)

const checkedValue = ref('')
const setcheck = ref(false)
const domainCheck = ref('0')
const proObj = reactive({
  producttotal: 0,
  isremark: 0,
  catetotal: 0
})

const checkFn = async () => {
  status[choseType.value] = '0'
  if (~form.value.ali.indexOf('?')) {
    form.value.ali = form.value.ali.split('?')[0]
  }
  let url = form.value.ali
  if (!url) {
    status[choseType.value] = '0'
    return
  }
  if (~url.indexOf('alibaba.com')) {
    choseType.value = 1
  } else if (~url.indexOf('made-in-china.com')) {
    choseType.value = 2
  } else {
    status[choseType.value] = '3'
    return
  }
  status[choseType.value] = '1'
  const type = choseType.value
  const res = await guideDataurlcheck({
    url,
    datafrom: choseType.value
  })
  if (res.code == 0) {
    if (res.data == 200) {
      status[type] = '2'
    } else if (res.data == 400) {
      status[type] = '3'
    }
  } else {
    status[type] = '3'
  }
}

const getintronum = async () => {
  const res = await guidegetdataIntro()
  if (res.code == 0) {
    Object.assign(proObj, res.data)
    if (proObj.catetotal >= 2 && proObj.producttotal >= 10) {
      clearInterval(startcount.value)
      if (choseType.value == 3) {
        goNext()
      } else {
        guidenextsetdomain()
      }
    } else {
      startint()
    }
  }
}
const goAddPro = () => {
  savedatafrom()
  router.push({ path: '/web/webproduct/detail' })
}

const getnumed = async () => {
  const res = await guidegetdataIntro()
  if (res.code == 0) {
    Object.assign(proObj, res.data)
  }
}
// 数据是否获取完成
const imstats = ref(-1)
const getstate = async () => {
  const res = await guidegetdatastate()
  if (res.code == 0) {
    imstats.value = res.data // -1未开始获取 1完成 0获取中
    userStore.setdatastate(res.data)
    if (choseType.value == 3) {
      getintronum()
    }
    if (res.data == 1) {
      getnumed()
    } else if (res.data == 0) {
      getintronum()
    }
  }
}
const startcount = ref(0)
const startint = () => {
  clearInterval(startcount.value)
  startcount.value = setTimeout(() => {
    getintronum()
  }, 10000)
}
onUnmounted(() => {
  clearInterval(startcount.value)
})
// 保存状态
const savedatafrom = async () => {
  let dataurl = ''
  if (choseType.value == 1 || choseType.value == 2) {
    dataurl = form.value.ali
  }
  const res = await guideDatafrom({
    datafrom: choseType.value,
    dataurl
  })
  if (res.code == 0) {
    userStore.setdataurl(dataurl)
  }
}
// 获取可选域名
const domainloading = ref(false)
const predomains = ref([])
const getpredomainsFn = async () => {
  if (uc_login_sdk.getCookie(userStore.getcid)) {
    try {
      let domainstr = decodeURIComponent(uc_login_sdk.getCookie(userStore.getcid))
      predomains.value = JSON.parse(domainstr)
    } catch (eve) {
      // uc_login_sdk.setCookie(userStore.getcid, '', -1)
      // getpredomainsFn()
    }
    return
  }
  domainloading.value = true
  const res = await guidegetpredomains().finally(() => {
    domainloading.value = false
  })
  if (res.code == 0) {
    predomains.value = res.data || []
    if (predomains.value.length) {
      // 域名数据缓存
      uc_login_sdk.setCookie(userStore.getcid, JSON.stringify(predomains.value), 24)
    }
  }
}
const initurl = () => {
  if (choseType.value == 1) {
    form.value.ali = userStore.getdataurl
  } else {
    form.value.made = userStore.getdataurl
  }
  ischecking()
}
// 是否赠送域名
const isfreedomain = ref(1)
const getfreedomain = async () => {
  const res = await guidegetfreedomain()
  if (res.code == 0) {
    // 0不赠送1赠送
    isfreedomain.value = res.data
    if (res.data == 0) {
      activeKey.value = 2
    } else if (res.data == 1) {
      getpredomainsFn()
    }
  }
}

// 用户已有域名检测
const selfdomain = ref('')
const checkselfdomainfn = async () => {
  if (!selfdomain.value) {
    return
  }
  const res = await guidedomaincheck({
    domain: selfdomain.value
  })
  if (res.code == 0) {
    if (res.data == 1) {
      domainCheck.value = '2'
    } else if (res.data == 0) {
      domainCheck.value = '3'
    }
  }
}

// 用户上线
const domainsave = async () => {
  if (choseType.value === 3) {
    await domainajax()
  } else {
    await domainajax(true)
    picvise.value = true
  }
}
const domainajax = async (flag) => {
  let domain = ''
  if (activeKey.value == 1) {
    domain = checkedValue.value
  } else {
    domain = selfdomain.value
  }
  const res = await guidedomainapply({
    domain,
    domaintype: activeKey.value == 1 ? 2 : 1
  })
  if (res.code == 0) {
    if (flag) {
      return
    }
    userStore.setcheckstate(0)
  }
}
// 导入资料
const picvise = ref(false)
const picArr = ref([])
const diaform = reactive({
  picArr: [],
  picids: [],
  webnote: ''
})
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url
    res.picture_path = res.response.data?.picture_path
  } else {
    Message.warning(res.response.message || '上传失败')
    res.status = 'error'
  }
}
const picUploadChange = (arr, type) => {
  picArr.value = arr
}
const delPicAjax = async (id, type) => {
  if (!userStore.userInfo.homeInfo.company.id || !id) {
    return
  }
  const res = await pictureDdel({
    id,
    sid: userStore.userInfo.homeInfo.company.id,
    type: '33'
  })
}
const picRemove = (data) => {
  delPicAjax(data.id)
  return data
}
const handleBeforeOk = async () => {
  if (!picArr.value.length) {
    return Message.warning('请上传图片')
  }
  const picids = JSON.stringify(picArr.value.map((item) => item.id))
  const res = await guidecompanyapply({
    picids,
    webnote: diaform.webnote
  })
  if (res.code == 0) {
    userStore.setcheckstate(0)
    // domainajax()
  }
}
const tabvalue = ref([])
const getInfo = async () => {
  const res = await guidedomaininfos()
  if (res.code == 0) {
    Object.assign(tabvalue.value, res.data)
  }
}
getInfo()
const ailoading = ref(false)
const gocheck = async () => {
  if (!selfdomain.value) {
    return Message.warning('请填写域名')
  }
  ailoading.value = true
  const res = await guidedomaincheck({
    domain: selfdomain.value
  }).finally(() => {
    ailoading.value = false
  })
  if (res.code == 0) {
    if (res.data == 1) {
      setcheck.value = true
    } else {
      Message.error('检测不通过，请完成配置后重新检测')
    }
  }
}

const getStep = async () => {
  const res = await guidegetnowstep()
  if (res.code == 0 && res.data) {
    tabCurrent.value = res.data
    if (res.data == 2) {
      ischecking()
    } else if (res.data == 3) {
      getfreedomain()
    }
  }
}
const ischecking = () => {
  if ((choseType.value == 1 && form.value.ali) || (choseType.value == 2 && form.value.made)) {
    searchFn()
  }
}
const isstart = ref(false)
const settingbtncheck = ref(false)
const selfcheckdomain = () => {
  setcheck.value = false
  const reg = /^([a-zA-Z0-9-_]+){1,}[\\.]{1,1}([a-zA-Z]+)$/
  if (!reg.test(selfdomain.value)) {
    settingbtncheck.value = false
    domainCheck.value = '3'
  } else {
    settingbtncheck.value = true
    domainCheck.value = '0'
  }
}

userStore.$onAction(({ name }) => {
  if (name === 'hasinfo') {
    choseType.value = userStore.getdatafrom
    // 引导页第二步 不请求以下接口
    if (userStore.getdatafrom || userStore.getdataurl) {
      if (!isstart.value) {
        isstart.value = true
        getstate()
        initurl()
      }
    }
  }
})
onMounted(() => {
  choseType.value = userStore.getdatafrom
  getStep()
  // 引导页第二步 不请求以下接口
  if (userStore.getdatafrom || userStore.getdataurl) {
    if (!isstart.value) {
      isstart.value = true
      getstate()
      initurl()
    }
  }
})
</script>
<style lang="scss" scoped>
@import './common.scss';
.start-wrap {
  padding: 32px 20px;
  display: flex;
  --primary-6: 8, 90, 255 !important;
  --color-neutral-3: rgba(229, 230, 235, 0.4);
  --primary-5: 167, 86, 255;
  --color-primary-light-3: rgb(201, 205, 212);
  :deep(.arco-btn-primary.arco-btn-disabled, .arco-btn-primary[type='button'].arco-btn-disabled) {
    background: var(--color-primary-light-3);
  }
  .s-right {
    flex: 1;
    color: rgb(255, 255, 255);
    position: relative;
    height: 249px;
    :deep(.mar-radio) {
      margin-top: 10px;
    }
    .free-box {
      .con-span {
        display: inline-block;
        max-width: 210px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
      i {
        display: inline-block;
        width: 24px;
        height: 20px;
        background: url('@/assets/svgs/free_mob.svg') no-repeat;
        background-size: contain;
        vertical-align: middle;
        margin-left: 4px;
        position: relative;
        top: 2px;
      }
    }
    .tab-tit {
      svg {
        margin-right: 2px;
      }
    }
    :deep(.arco-radio) {
      .arco-icon-hover {
        width: 16px;
        height: 16px;
      }
      &.arco-radio-checked {
        .arco-radio-icon {
          width: 18px;
          height: 18px;
          &::after {
            top: 0px;
            left: 0px;
          }
        }
      }
    }
    .fix-b {
      position: absolute;
      bottom: 0;
    }
    .self-web-box {
      margin-top: 16px;
      .self-tips {
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        margin-top: 6px;
      }
      :deep(.nor-input) {
        margin: 0;
      }
    }
    .web-box {
      margin-top: 10px;
      :deep(.arco-radio-label) {
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: 400;
      }
      :deep(.arco-radio-group .arco-radio) {
        margin-right: 0;
      }
    }
    .tabs-wrap {
      height: 36px;
      margin-top: 8px;
      :deep(.arco-tabs) {
        float: left;
      }
    }
    .count-box {
      position: absolute;
      right: 0;
      bottom: 3px;
      .cate-label {
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }
    }
    .e-btn {
      margin-top: 16px;
      span {
        margin: 0px 8px 0 0;
      }
    }
    .input-wrap {
      display: flex;
      align-items: center;
    }
    :deep(.nor-input) {
      width: 400px;
      margin-left: 24px;
      border: 1px solid rgb(255, 255, 255);
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.4);
      ::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.64);
        font-size: 14px;
      }
      .arco-input-wrapper {
        // border: 1px solid rgb(255, 255, 255);
        // border-radius: 2px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 0;
      }
      &.arco-input-focus {
        // border: 1px solid rgb(38, 90, 255);
      }
    }
    .label-box {
      color: rgb(255, 255, 255);
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('@/assets/images/ai-icon.png') no-repeat;
        background-size: cover;
        vertical-align: middle;
        margin-right: 8px;
        position: relative;
        top: -2px;
      }
    }
    :deep(.arco-radio-group) {
      .arco-radio {
        // margin-top: 10px;
      }
    }
  }
  :deep(.arco-steps) {
    .arco-steps-item-content {
      float: left;
      width: 180px;
      margin-right: 24px;
      text-align: right;

      .arco-steps-item-title {
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        margin-top: 1px;
      }
    }
    .arco-steps-item-active {
      .arco-steps-item-title {
        color: rgb(255, 255, 255);
        font-size: 18px;
      }
    }
    .arco-steps-item:not(:last-child) {
      min-height: 73px;
      .arco-steps-item-tail {
        left: 217px;
        top: -6px;
        height: calc(100% + 12px);
      }
    }
    .arco-steps-item-wait .arco-steps-icon {
      color: rgb(230, 236, 255);
      background: rgb(186, 154, 255);
    }
  }
}

.status-box {
  color: rgb(38, 90, 255);
  font-size: 14px;
  font-weight: 400;
  display: flex;
  height: 20px;
  align-items: center;
  margin-left: 8px;

  span {
    font-weight: bold;
    margin-left: 4px;
  }
}
.status-box.success {
  color: rgb(var(--success-6));
}
.status-box.error {
  color: rgb(var(--danger-6));
}

.loading,
.loading > div {
  position: relative;
  box-sizing: border-box;
}

.loading {
  display: block;
  font-size: 0;
  color: rgb(38, 90, 255);
}

.loading.la-dark {
  color: rgb(38, 90, 255);
}

.loading > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading {
  // width: 54px;
  // height: 18px;
}

.loading > div:nth-child(1) {
  animation-delay: -200ms;
}

.loading > div:nth-child(2) {
  animation-delay: -100ms;
}

.loading > div:nth-child(3) {
  animation-delay: 0ms;
}

.loading > div {
  width: 4px;
  height: 4px;
  margin: 2px;
  border-radius: 100%;
  animation: ball-pulse 1s ease infinite;
}

.loading.la-sm {
  width: 26px;
  height: 8px;
}

.loading.la-sm > div {
  width: 4px;
  height: 4px;
  margin: 2px;
}

.loading.la-2x {
  width: 108px;
  height: 36px;
}

.loading.la-2x > div {
  width: 20px;
  height: 20px;
  margin: 8px;
}

.loading.la-3x {
  width: 162px;
  height: 54px;
}

.loading.la-3x > div {
  width: 30px;
  height: 30px;
  margin: 12px;
}

@keyframes ball-pulse {
  0%,
  60%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  30% {
    opacity: 0.1;
    transform: scale(0.01);
  }
}
.pic-text {
  margin-bottom: 16px;
  font-size: 12px;
  color: var(--color-text-4);
}
.self-name {
  position: absolute;
  top: 25px;
  left: 264px;
}
.nofree {
  left: 150px;
}
table {
  margin-top: 6px;
  border-collapse: collapse;
  width: 527px;
  color: #fff;
  text-align: center;
  td {
    padding: 0 4px;
  }
  thead {
    td {
      background: rgba(255, 255, 255, 0.4);
      height: 24px;
      line-height: 24px;
    }
  }
  tbody {
    td {
      background: rgba(255, 255, 255, 0.16);
      height: 24px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.64);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
  }
}
.tb-wrap {
  width: 613px;
  :deep(.btn) {
    float: right;
    position: relative;
    top: -24px;
  }
}
:deep(.arco-radio-disabled .arco-radio-icon) {
  background: rgb(201, 205, 212);
}
:deep(.arco-radio-checked.arco-radio-disabled .arco-radio-icon) {
  background-color: var(--color-bg-1);
}
:deep(.gi-loading) {
  background: rgba(255, 255, 255, 0.3);
  .circle {
    stroke: rgb(var(--primary-6));
  }
}
:deep(.oninput) {
  border-color: rgb(var(--primary-6)) !important;
}
.ai_translate {
  box-sizing: border-box;
  background: linear-gradient(90deg, rgb(43, 89, 255), rgb(187, 43, 255) 100%);
  border: 1px solid rgb(98, 54, 255);
  border-radius: 4px;
  text-align: center;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
}
.ai_translate .ai_ball {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #fff;
  margin: 0 3px;
}
.ai_translate .ai_ball:nth-child(1) {
  animation: ballBox 1000ms ease-out infinite;
}
.ai_translate .ai_ball:nth-child(2) {
  animation: ballBox 1000ms ease-out infinite 200ms;
}
.ai_translate .ai_ball:nth-child(3) {
  animation: ballBox 1000ms ease-out infinite 400ms;
}
.ai_translate .ai_ball:nth-child(4) {
  animation: ballBox 1000ms ease-out infinite 600ms;
}
.ai_translate .ai_ball:nth-child(5) {
  animation: ballBox 1000ms ease-out infinite 800ms;
}

@keyframes ballBox {
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(-5px);
  }
  75% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0px);
  }
}

:deep(.gi-loading > .wrapper) {
  flex-direction: row;
  .gi-loading-text {
    margin: 0 0 0 12px;
    color: #fff;
  }
}
</style>
