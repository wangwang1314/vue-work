<template>
  <div class="com-detail-out">
    <div class="com-detail detail">
      <a-form
        class="com-form"
        ref="formRef"
        size="medium"
        :model="form"
        layout="vertical"
        :auto-label-width="true"
        label-align="left"
      >
        <a-card :bordered="false">
          <a-form-item field="name" label="公司名称" :label-col-style="{ flex: '0 0 70px' }">
            <a-row class="full-width">
              <a-col :span="24">
                <a-input v-model="form.name"></a-input>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item field="cate" label="公司logo" :content-flex="false" :label-col-style="{ flex: '0 0 70px' }">
            <a-upload
              list-type="picture-card"
              :action="logourl"
              :file-list="fileLogo"
              image-preview
              :limit="1"
              @success="successUploadlogo"
              @change="
                (res) => {
                  picUploadChange(res, 1)
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
            <template #extra>
              <div style="line-height: 18px;margin:-29px 0 0 96px;">建议220*60尺寸，高度小于100，图片质量小于100k</div>
            </template>
          </a-form-item>
          <a-form-item field="info.remark" label="描述" :label-col-style="{ flex: '0 0 70px' }">
            <uedit v-model="form.info.remark" ref="ueditref"></uedit>
          </a-form-item>
          <a-form-item field="name" label="公司概要" class="no-bot" :label-col-style="{ flex: '0 0 70px' }">
            <a-textarea
              :auto-size="{
                minRows: 5
              }"
              :max-length="120"
              show-word-limit
              v-model="form.info.brief"
            ></a-textarea>
          </a-form-item>
        </a-card>
        <a-row :gutter="12" class="media-class">
          <a-col :span="16">
            <a-card class="item">
              <div class="label-class">
                <span>公司图片</span>
                <a-button type="primary" size="mini" @click="showPicCenter">图片中心选择</a-button>
              </div>
              <a-form-item label="公司图片" :hide-label="true">
                <a-row class="full-width">
                  <a-col :span="24">
                    <div class="arco-upload-wrapper arco-upload-wrapper-type-picture-card">
                      <draggable v-model="fileList">
                        <template #item="{ element, index }">
                          <span
                            v-if="element.status == 'error'"
                            class="arco-upload-list-picture arco-upload-list-picture-status-error"
                            ><img :src="element.url" :alt="element.name" />
                            <div class="arco-upload-list-picture-mask">
                              <div class="arco-upload-list-picture-error-tip">
                                <span class="arco-upload-icon arco-upload-icon-error"><icon-image-close /></span>
                              </div>
                              <div class="arco-upload-list-picture-operation">
                                <span class="arco-upload-icon arco-upload-icon-remove"
                                  ><icon-delete @click="picListDel(element)" />
                                </span>
                              </div>
                            </div>
                          </span>
                          <span class="arco-upload-list-picture" v-else-if="element.status == 'uploading'">
                            <a-progress size="mini" :percent="element.percent"> </a-progress>
                          </span>
                          <span class="arco-upload-list-picture" v-else>
                            <img :src="element.url" :alt="element.name" />
                            <div class="arco-upload-list-picture-mask">
                              <div class="arco-upload-list-picture-operation">
                                <span class="arco-upload-icon arco-upload-icon-preview">
                                  <icon-edit @click="picCropper(element, index)" />
                                </span>
                                <span class="arco-upload-icon arco-upload-icon-preview">
                                  <icon-eye @click="picListShow(element)" />
                                </span>
                                <span class="arco-upload-icon arco-upload-icon-remove">
                                  <icon-delete @click="picListDel(element)" />
                                </span>
                              </div>
                            </div>
                          </span>
                        </template>
                        <template #footer>
                          <a-upload
                            :show-retry-button="false"
                            list-type="picture-card"
                            :action="picUploadUrl"
                            multiple
                            :with-credentials="true"
                            @change="
                              (res) => {
                                picUploadChange(res, 2)
                              }
                            "
                            :file-list="fileList"
                            :show-file-list="false"
                            ref="uploadRef"
                            :data="{ type: picType }"
                            @success="successUpload"
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
                          <a-image-preview :src="picPreviewSrc" v-model:visible="picPrewiewVisible" />
                        </template>
                      </draggable>
                    </div>
                  </a-col>
                </a-row>
                <template #extra>
                  <div style="line-height: 18px">建议质量小于100K，长按图片拖拽可以调整顺序。</div>
                  <pic-dialog ref="picDialogRef" @change="picChange"></pic-dialog>
                </template>
              </a-form-item>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card class="item">
              <div class="label-class">
                <span>公司视频</span>
                <a-button type="primary" size="mini" @click="showVideoCenter">视频中心选择</a-button>
              </div>
              <a-form-item label="公司视频" :hide-label="true">
                <a-row class="full-width">
                  <a-col :span="24">
                    <video-dialog ref="videoDialogRef" @change="videoChange"></video-dialog>
                    <div class="video-chose-list nor-v-list" v-if="videoChosed.length">
                      <div v-for="(item, index) in videoChosed" :key="index">
                        <div class="arco-image arco-image-with-footer-inner nor-pri video-upload">
                          <img class="arco-image-img" :src="item.img_path" style="width: 100%; height: 100%" />
                          <span class="del-span" @click="delVideo(index)"><icon-close-circle /></span>
                          <div class="arco-image-footer" prefix-cls="arco-image">
                            <div class="arco-image-footer-caption">
                              <div class="arco-image-footer-caption-description">
                                {{ item.title }}
                              </div>
                            </div>
                            <div class="arco-image-footer-extra">
                              <div class="actions">
                                <span class="action" @click="showVideoDetail(item)"><icon-zoom-in size="18" /></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <video-detail ref="videoDetailRef"></video-detail>
                    </div>

                    <a-upload
                      :show-file-list="false"
                      :on-before-upload="siglebefore"
                      @progress="sigleChange"
                      @success="sigleSuccess"
                      @error="sigleError"
                      :action="baseURL + '?r=video/upload'"
                      v-else
                    >
                      <template #upload-button>
                        <div class="arco-upload-picture-card video-upload" v-if="!isuploading">
                          <div class="arco-upload-picture-card-text">
                            <IconPlus />
                            <div style="margin-top: 10px; color: var(--color-text-4); font-size: 14px">上传</div>
                          </div>
                        </div>
                        <div @click.stop class="arco-upload-picture-card video-upload" v-else>
                          <div class="arco-upload-picture-card-text">
                            <a-progress size="mini" :percent="percent" />
                          </div>
                        </div>
                      </template>
                    </a-upload>
                    <div class="arco-form-item-extra" style="line-height: 18px; margin-bottom: -15px">
                      建议尺寸为16:9，30秒以内.mp4格式
                    </div>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-card>
          </a-col>
        </a-row>
        <a-card :bordered="false" title="公司资料">
          <a-form-item
            class="input-group-box no-bot"
            :content-flex="false"
            :label-col-style="{ flex: '0 0 70px' }"
          >
            <a-row class="full-width">
              <a-col :span="15">
                <a-form-item label="Business Type" field="info.busitypename">
                  <a-select
                    placeholder="请选择"
                    multiple
                    allow-clear
                    v-model="form.info.busitypename"
                    :options="form.business_type"
                  >
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="full-width">
              <a-col :span="15">
                <a-form-item label="Main Market" field="info.marketname">
                  <a-select
                    placeholder="请选择"
                    v-model="form.info.marketname"
                    multiple
                    allow-clear
                    :options="form.market"
                  >
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="full-width">
              <a-col :span="15">
                <a-form-item label="Brands">
                  <a-input placeholder="" v-model="form.info.brands" allow-clear />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="full-width">
              <a-col :span="15">
                <a-form-item label="No. of Employees" :content-flex="false">
                  <a-row>
                    <a-col :span="11">
                      <a-input v-model="form.info.employeenumber[0]" />
                    </a-col>
                    <a-col :span="2" style="text-align: center; line-height: 30px"> - </a-col>
                    <a-col :span="11">
                      <a-input v-model="form.info.employeenumber[1]" />
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="full-width">
              <a-col :span="15">
                <a-form-item label="Annual Sales" :content-flex="false">
                  <a-row>
                    <a-col :span="11">
                      <a-input v-model="form.info.annualsales[0]"><template #append>USD</template></a-input>
                    </a-col>
                    <a-col :span="2" style="text-align: center; line-height: 30px"> - </a-col>
                    <a-col :span="11">
                      <a-input v-model="form.info.annualsales[1]"><template #append>USD</template></a-input>
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="full-width">
              <a-col :span="15">
                <a-form-item label="Year Established">
                  <a-input placeholder="" v-model="form.info.yearestablished" allow-clear />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="full-width">
              <a-col :span="15">
                <a-form-item label="Export p.c">
                  <a-select placeholder="请选择" v-model="form.info.exportper" allow-clear>
                    <a-option value="< 10%">&lt; 10%</a-option>
                    <a-option value="10% - 20%">10% - 20%</a-option>
                    <a-option value="20% - 30%">20% - 30%</a-option>
                    <a-option value="30% - 40%">30% - 40%</a-option>
                    <a-option value="40% - 50%">40% - 50%</a-option>
                    <a-option value="50% - 60%">50% - 60%</a-option>
                    <a-option value="60% - 70%">60% - 70%</a-option>
                    <a-option value="70% - 80%">70% - 80%</a-option>
                    <a-option value="80% - 90%">80% - 90%</a-option>
                    <a-option value="90% - 100%">90% - 100%</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="full-width">
              <a-col :span="15">
                <a-form-item label="Customers Served">
                  <a-input v-model="form.info.customersserved" placeholder="" allow-clear />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="full-width" v-for="(item, index) in attrArr" :key="'attr' + index">
              <a-col :span="4">
                <a-form-item label="Customers Served" :hide-label="true" >
                    <a-input placeholder="" v-model="item.name" allow-clear style="margin-right: 10px;"/>
                </a-form-item>
              </a-col>
              <a-col :span="11">
                <a-form-item label="Customers Served" :hide-label="true">
                  <a-input placeholder="" v-model="item.value" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <icon-delete class="del-icon" @click="delCous(index)"></icon-delete>
              </a-col>
            </a-row>
            <a-row class="full-width">
              <a-col :span="15">
                <a-button type="primary" size="mini" @click="addAttr">添加</a-button>
              </a-col>
            </a-row>
            <!-- <a-row class="full-width">
              <a-col :span="15">
                <div class="com-btn-box">
                  <a-space :size="12">
                    <a-button type="primary" @click="saveFn" :loading="loading">保存</a-button>
                    <a-button @click="cancelFn" :disabled="loading">取消</a-button>
                  </a-space>
                </div>
              </a-col>
            </a-row> -->
          </a-form-item>
        </a-card>
        <a-card :bordered="false">
          <a-tabs type="card" size="small" v-model:active-key="activekey" :hide-content="true">
            <a-tab-pane :key="0" title="优势一"> </a-tab-pane>
            <a-tab-pane :key="1" title="优势二"> </a-tab-pane>
            <a-tab-pane :key="2" title="优势三"> </a-tab-pane>
            <a-tab-pane :key="3" title="优势四"> </a-tab-pane>
          </a-tabs>
          <a-row v-for="(item, index) in form.advantage" :key="index" v-show="index === activekey">
            <a-form-item label="优势标题" style="margin-top: 16px">
              <a-input
                v-model="item.name"
                :max-length="{ length: 20, errorOnly: true }"
                allow-clear
                show-word-limit
              ></a-input>
            </a-form-item>
            <a-form-item label="优势内容" class="no-bot">
              <a-textarea
                :auto-size="{
                  minRows: 4
                }"
                :max-length="{ length: 350, errorOnly: true }"
                allow-clear
                show-word-limit
                v-model="item.value"
              ></a-textarea>
              <template #extra> 优势内容说明，建议<span class="warning-color">200-300</span>个字符 </template>
            </a-form-item>
          </a-row>
        </a-card>
        <a-card :bordered="false">
          <a-row>
            <a-col :span="24">
              <div class="label-class">
                <span>合作品牌</span>
                <a-button type="primary" size="mini" @click="showPicCenter2">图片中心选择</a-button>
              </div>
              <a-form-item label="品牌Logo" :hide-label="true">
                <div class="arco-upload-wrapper arco-upload-wrapper-type-picture-card">
                  <draggable v-model="fileList2">
                    <template #item="{ element }">
                      <span
                        v-if="element.status == 'error'"
                        class="arco-upload-list-picture arco-upload-list-picture-status-error"
                        ><img :src="element.url" :alt="element.name" />
                        <div class="arco-upload-list-picture-mask">
                          <div class="arco-upload-list-picture-error-tip">
                            <span class="arco-upload-icon arco-upload-icon-error"><icon-image-close /></span>
                          </div>
                          <div class="arco-upload-list-picture-operation">
                            <span class="arco-upload-icon arco-upload-icon-remove"
                              ><icon-delete @click="picListDel(element)" />
                            </span>
                          </div>
                        </div>
                      </span>
                      <span class="arco-upload-list-picture" v-else-if="element.status == 'uploading'">
                        <a-progress size="mini" :percent="element.percent"> </a-progress>
                      </span>
                      <span class="arco-upload-list-picture" v-else>
                        <img :src="element.url" :alt="element.name" />
                        <div class="arco-upload-list-picture-mask">
                          <div class="arco-upload-list-picture-operation">
                            <span class="arco-upload-icon arco-upload-icon-preview">
                              <icon-eye @click="picListShow(element)" />
                            </span>
                            <span class="arco-upload-icon arco-upload-icon-remove">
                              <icon-delete @click="picListDel2(element, '21')" />
                            </span>
                          </div>
                        </div>
                      </span>
                    </template>
                    <template #footer>
                      <a-upload
                        :show-retry-button="false"
                        list-type="picture-card"
                        :action="picUploadUrl"
                        multiple
                        :with-credentials="true"
                        @change="
                          (res) => {
                            picUploadChange(res, 4)
                          }
                        "
                        :file-list="fileList"
                        :show-file-list="false"
                        ref="uploadRef"
                        :data="{ type: '21' }"
                        @success="successUpload"
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
                      <a-image-preview :src="picPreviewSrc" v-model:visible="picPrewiewVisible" />
                    </template>
                  </draggable>
                </div>
                <template #extra>
                  <div style="line-height: 18px">建议上传238px*100px尺寸，100k以下图片，长按图片拖拽可以调整顺序。</div>
                  <pic-dialog ref="picDialogRef2" @change="picChange2"></pic-dialog>
                </template>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item label="介绍说明" field="info.partnersinfo" :hide-label="true" class="no-bot">
                <a-textarea
                  :auto-size="{
                    minRows: 3
                  }"
                  :max-length="{ length: 150, errorOnly: true }"
                  allow-clear
                  show-word-limit
                  v-model="form.info.partnersinfo"
                  placeholder="请输入合作品牌说明"
                ></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
      <!-- 图片编辑 -->
      <a-modal v-model:visible="picvise">
        <template #title>上传图片</template>
        <a-form ref="diaformRef" size="medium" :model="diaform" layout="horizontal" :auto-label-width="true">
          <a-form-item label="图片名称">
            <a-input placeholder="图片名称" v-model="diaform.title"></a-input>
          </a-form-item>
          <a-form-item label="图片描述">
            <a-textarea
              placeholder="图片描述"
              :auto-size="{
                minRows: 3
              }"
              v-model="diaform.picturedesc"
            ></a-textarea>
          </a-form-item>
          <a-form-item label="浏览图片">
            <a-upload
              :on-before-remove="picRemove"
              list-type="picture-card"
              :action="picUploadUrl"
              :data="{ type: picType }"
              :file-list="fileDia"
              image-preview
              :limit="1"
              @success="successUpload"
              @change="
                (res) => {
                  picUploadChange(res, 3)
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
        </a-form>
        <template #footer>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click="handleBeforeOk">确定</a-button>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts" name="companyTable">
import { reactive, ref, h, nextTick } from 'vue'
import { companyInfo, companySave, pictureDdel, getVideoDetail } from '@/apis'
import type {} from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { Notification, Message } from '@arco-design/web-vue'
import { getTreeDate } from '@/utils/common'
import picDialog from '@/components/commonDialog/picDialog.vue'
import videoDialog from '@/components/commonDialog/videoDialog.vue'
import lodash from 'lodash'
import draggable from 'vuedraggable'
import { useFileStore } from '@/store'
const fileStore = useFileStore()
const emit = defineEmits(['update', 'changeTab'])
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
const logourl = baseURL + '?r=picture/upload-logo'
const router = useRouter()
const route = useRoute()
import { useUserStore } from '@/store'
const userStore = useUserStore()
const picType = '0'
const form = reactive({
  name: '',
  logo_url: '',
  videoid: '',
  info: {
    brief: '',
    remark: '',
    brands: '',
    marketname: [],
    busitypename: [],
    yearestablished: '',
    exportper: '',
    customersserved: '',
    employeenumber: [],
    annualsales: [],
    partnersinfo: []
  },
  picture_info: [],
  detail: [],
  business_type: [],
  market: [],
  advantage: [
    { name: '', value: '' },
    { name: '', value: '' },
    { name: '', value: '' },
    { name: '', value: '' }
  ],
  partner_info: []
})
const loading = ref(false)
const getTableData = async () => {
  const { code, data } = await companyInfo()
  if (code == 0) {
    const { name, picture_info, logo_url, logopath, videoid, video_info } = data.company
    form.name = name
    form.market = data.market
    form.business_type = data.business_type
    picture_info.forEach((item, index) => {
      item.uid = item.id
      item.url = item.picture_url
    })
    fileList.value = picture_info
    // 合作品牌图片
    data.partner_info.forEach((item, index) => {
      item.uid = item.id
      item.url = item.picture_url
    })
    fileList2.value = data.partner_info
    if (logo_url) {
      fileLogo.value = [
        {
          url: logo_url,
          picture_path: logopath
        }
      ]
    }

    // 视频相关
    if (video_info) {
      videoChosed.value = [
        {
          img_path: video_info.img_path,
          title: video_info.title,
          id: videoid
        }
      ]
    }
    // 公司资料部分
    Object.assign(form.info, data.info)
    Object.assign(form.advantage, data.advantage)
    if (data.detail && data.detail.length > 0) {
      attrArr.value = data.detail
    } else {
      attrArr.value = [
        {
          name: '',
          value: ''
        }
      ]
    }
  }
}
getTableData()
const formRef = ref()
const fileList = ref([])
const fileLogo = ref([])
const successUploadlogo = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url + '?' + new Date().getTime()
    res.picture_path = res.response.data?.picture_path
  } else {
    Message.warning(res.response.message || '上传失败')
    res.status = 'error'
  }
}
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
  if (type == 1) {
    fileLogo.value = arr
  } else if (type == 2) {
    fileList.value = arr
  } else if (type == 3) {
    fileDia.value = arr
  } else if (type == 4) {
    fileList2.value = arr
  }
}

// 图片中心
const picDialogRef = ref()
const showPicCenter = () => {
  picDialogRef.value?.showDialog({
    group_name: ''
  })
}
// 图片中心2
const fileList2 = ref([])
const picDialogRef2 = ref()
const showPicCenter2 = () => {
  picDialogRef2.value?.showDialog({
    group_name: ''
  })
}
const picChange2 = (imgArr) => {
  imgArr.forEach((item) => {
    item.id = item.picid
    item.url = item.picture_url_l
    item.uid = item.id + Math.random()
  })
  fileList2.value = fileList2.value.concat(imgArr)
}

const picListDel = (file, type) => {
  let index = lodash.findIndex(fileList.value, function (o) {
    return o.uid == file.uid
  })
  delPicAjax(fileList.value[index]?.id, type)
  fileList.value.splice(index, 1)
}
const picListDel2 = (file, type) => {
  let index = lodash.findIndex(fileList2.value, function (o) {
    return o.uid == file.uid
  })
  delPicAjax(fileList2.value[index]?.id, type)
  fileList2.value.splice(index, 1)
}
const delPicAjax = async (id, type) => {
  const res = await pictureDdel({
    id,
    sid: userStore.userInfo.homeInfo.company.id,
    type: type || picType
  })
}
const picRemove = (data) => {
  delPicAjax(data.id)
  return data
}
const picPreviewSrc = ref<string>('')
const picPrewiewVisible = ref<boolean>(false)
const picListShow = (file) => {
  picPreviewSrc.value = file.url
  picPrewiewVisible.value = true
}
const cropperRef = ref()
const picEditIndex = ref(0)
const picCropper = (item, index) => {
  picEditIndex.value = index
  fileDia.value = []
  fileDia.value.push(item)
  diaform.title = item.title
  diaform.picturedesc = item.picturedesc
  nextTick(() => {
    picvise.value = true
  })
}
const picChange = (imgArr) => {
  imgArr.forEach((item) => {
    item.id = item.picid
    item.url = item.picture_url_l
    item.uid = item.id + Math.random()
  })
  fileList.value = fileList.value.concat(imgArr)
}

const diaform = reactive({
  title: '',
  picturedesc: ''
})
const picvise = ref(false)
const fileDia = ref([])
const handleCancel = () => {
  picvise.value = false
}
const handleBeforeOk = () => {
  const { title, picturedesc } = diaform
  fileList.value[picEditIndex.value].title = title
  fileList.value[picEditIndex.value].picturedesc = picturedesc
  if (fileDia.value.length) {
    fileList.value[picEditIndex.value].id = fileDia.value[0].id
    fileList.value[picEditIndex.value].url = fileDia.value[0].url
  }
  picvise.value = false
}
// 视频中心
const videoDialogRef = ref()
const showVideoCenter = () => {
  videoDialogRef.value?.showDialog({
    group_name: ''
  })
}
const videoChosed = ref([])
const videoChange = (data) => {
  videoChosed.value = data
}
const visiblePrew = ref(false)
const showVideoDetail = (item) => {
  videoDetailRef.value.showDialog(item)
}
const delVideo = (index) => {
  videoChosed.value.splice(index, 1)
}
const videoDetailRef = ref()

// 自定义属性
const attrArr = ref([
  {
    name: '',
    value: ''
  }
])
const addAttr = () => {
  attrArr.value.push({
    name: '',
    value: ''
  })
}
const delCous = (index: number) => {
  attrArr.value.splice(index, 1)
}

// 保存
const saveFn = async () => {
  fileStore.setloading(true)
  const { name, info, advantage } = form
  fileList.value.forEach((item, index) => {
    item.sort = index
  })
  const picArr = fileList2.value.map((item, index) => ({ id: item.id, sort: index }))
  const { code, data, message } = await companySave({
    name,
    info,
    logopath: fileLogo.value.length ? fileLogo.value[0].picture_path : '',
    detail: attrArr.value,
    videoid: videoChosed.value.length ? videoChosed.value[0].id : '',
    picture_info: fileList.value,
    partner_info: picArr,
    advantage
  }).finally(() => {
    fileStore.setloading(false)
  })
  if (code == 0) {
    Message.success(message || '操作成功')
  }
}
const cancelFn = () => {
  getTableData()
}

const isuploading = ref(false)
const percent = ref(0)
const siglebefore = (res) => {
  isuploading.value = true
  return res
}
const sigleChange = (res) => {
  // isuploading.value = true
  percent.value = res.percent
}
const sigleError = () => {
  isuploading.value = false
}
const sigleSuccess = async (result) => {
  if (result.response?.data.id) {
    const res = await getVideoDetail({ id: result.response?.data.id })
    if (res.code === 0) {
      videoChosed.value.push(res.data.video)
    }

    isuploading.value = false
  }
}

const activekey = ref(0)

fileStore.$onAction(({name}) => {
  if (name === 'cancel') {
    cancelFn()
  } else if (name === 'save') {
    saveFn()
  }
})
</script>

<style lang="scss" scoped>
@import './mod/list.scss';
</style>
