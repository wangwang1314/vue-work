<template>
  <div class="detail-wrap-out">
    <div class="top-nav-tit">
      <div class="m-left">设置产品信息</div>
      <div class="m-right"></div>
    </div>
    <div class="detail" id="detailbox" ref="containerRef">
      <div class="detail-wrap">
        <a-form
          ref="formRef"
          size="medium"
          :model="form"
          @submit="handleSubmit"
          layout="vertical"
          :auto-label-width="true"
        >
          <a-row :gutter="16">
            <a-col :span="16">
              <div ref="step1div">
                <a-card title="产品名称&描述" :bordered="false" class="item" id="step1">
                  <a-form-item field="name" label="产品名称" :rules="rules.name">
                    <a-row class="full-width">
                      <a-col :span="24">
                        <a-input
                          placeholder="请输入"
                          v-model="form.name"
                          :max-length="120"
                          allow-clear
                          show-word-limit
                        />
                      </a-col>
                    </a-row>
                  </a-form-item>
                  <a-form-item label="描述内容" field="remark" :content-flex="false">
                    <a-row class="full-width" style="margin-top: 10px">
                      <a-col :span="24">
                        <uedit v-model="form.remark"></uedit>
                      </a-col>
                    </a-row>
                  </a-form-item>
                </a-card>
                <a-row :gutter="12" class="media-class">
                  <a-col :span="16">
                    <a-card class="item">
                      <div class="label-class">
                        <span>产品图片</span>
                        <a-button type="primary" size="mini" @click="showPicCenter">图片中心选择</a-button>
                      </div>
                      <a-form-item label="产品图片" :hide-label="true">
                        <a-row class="full-width">
                          <a-col :span="24">
                            <div class="arco-upload-wrapper arco-upload-wrapper-type-picture-card">
                              <draggable v-model="fileList">
                                <template #item="{ element }">
                                  <span
                                    v-if="element.status == 'error'"
                                    class="arco-upload-list-picture arco-upload-list-picture-status-error"
                                    ><img :src="element.url" :alt="element.name" />
                                    <div class="arco-upload-list-picture-mask">
                                      <div class="arco-upload-list-picture-error-tip">
                                        <span class="arco-upload-icon arco-upload-icon-error"
                                          ><icon-image-close
                                        /></span>
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
                                          <icon-edit @click="picCropper(element)" />
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
                                    :action="baseURL + '?r=picture/upload'"
                                    multiple
                                    :with-credentials="true"
                                    @change="picUploadChange"
                                    :file-list="fileList"
                                    :show-file-list="false"
                                    ref="uploadRef"
                                    :data="{ type: '4' }"
                                    @success="successUpload"
                                  >
                                    <template #upload-button>
                                      <div class="arco-upload-picture-card">
                                        <div class="arco-upload-picture-card-text">
                                          <IconPlus />
                                          <div style="margin-top: 10px; color: var(--color-text-4); font-size: 14px">
                                            上传
                                          </div>
                                        </div>
                                      </div>
                                    </template>
                                  </a-upload>
                                  <a-image-preview :src="picPreviewSrc" v-model:visible="picPrewiewVisible" />
                                  <!-- 图片剪裁 -->
                                  <cropper ref="cropperRef" @change="cropperChange"></cropper>
                                </template>
                              </draggable>
                            </div>
                          </a-col>
                        </a-row>
                        <template #extra>
                          <div style="line-height: 18px">建议尺寸比例为1:1，小于100K，长按图片拖拽可以调整顺序。</div>
                          <pic-dialog ref="picDialogRef" @change="picChange"></pic-dialog>
                        </template>
                      </a-form-item>
                    </a-card>
                  </a-col>
                  <a-col :span="8">
                    <a-card class="item">
                      <div class="label-class">
                        <span>产品视频</span>
                        <a-button type="primary" size="mini" @click="showVideoCenter">视频中心选择</a-button>
                      </div>
                      <a-form-item label="产品视频" :hide-label="true">
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
                                        <span class="action" @click="showVideoDetail(item)"
                                          ><icon-zoom-in size="18"
                                        /></span>
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
                             v-else>
                              <template #upload-button>
                                <div class="arco-upload-picture-card video-upload" v-if="!isuploading">
                                  <div class="arco-upload-picture-card-text">
                                    <IconPlus />
                                    <div style="margin-top: 10px; color: var(--color-text-4); font-size: 14px">
                                      上传
                                    </div>
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
              </div>
              <div ref="step2div">
                <a-card title="产品属性" :bordered="false" class="item" id="step2">
                  <a-row class="full-width" :gutter="12">
                    <a-col :span="12">
                      <a-form-item label="品牌">
                        <a-input placeholder="请输入品牌" v-model="form.details[0]['Brand Name'].value" allow-clear />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="认证证书">
                        <a-input
                          placeholder="请输入认证证书"
                          v-model="form.details[0]['Certification'].value"
                          allow-clear
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="full-width" :gutter="12">
                    <a-col :span="12">
                      <a-form-item label="型号">
                        <a-input
                          placeholder="请输入型号"
                          v-model="form.details[0]['Model Number'].value"
                          allow-clear
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="原产地">
                        <a-input
                          placeholder="请输入原产地"
                          v-model="form.details[0]['Place of Origin'].value"
                          allow-clear
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="full-width">
                    <a-col :span="24">
                      <a-form-item label="自定义属性" :content-flex="false" class="no-bot">
                        <a-row class="full-width" :gutter="10">
                          <a-col :span="24">
                            <a-space :size="16">
                              <a-button size="mini" type="primary" @click="showTableFn2"
                                ><template #icon><icon-thumb-up-fill /></template> 智能推荐</a-button
                              >
                              <div style="padding-top: 4px; color: var(--color-text-4); font-size: 12px">
                                属性名和属性值必须同时填写，例：Color:Red；长按左侧锚点可调整顺序。
                              </div>
                            </a-space>
                          </a-col>
                        </a-row>
                        <a-modal v-model:visible="showTable2" :width="700">
                          <template #title> 智能推荐 </template>
                          <template #footer>
                            <a-button @click="handleCancel2">取消</a-button>
                            <a-button type="primary" @click="handleOk2">确定</a-button>
                          </template>
                          <div style="height: 500px; overflow: auto">
                            <a-table
                              :data="attrData"
                              :loading="reloading"
                              style="width: 100%"
                              
                              :pagination="false"
                              class="select-table"
                              height="400"
                            >
                              <template #columns>
                                <a-table-column title="推荐属性名" data-index="attr_name" align="center" :width="200">
                                  <template #cell="{ record }">
                                    <!-- <div
                                      class="padding-cell cursor"
                                      @click="selectCellFn(record.attr_name, record.attr_value)"
                                      :class="selectKeyFn(record.attr_name)"
                                    >
                                      {{ record.attr_name }}
                                      <a-input v-model="record.attr_name"></a-input>
                                    </div> -->
                                    <a-input v-model="record.attr_name" style="margin: 8px;width: 200px;"></a-input>
                                  </template>
                                </a-table-column>
                                <a-table-column title="推荐属性值" data-index="value" align="center" :width="200">
                                  <template #cell="{ record }">
                                    <!-- <div class="padding-cell">
                                        <span
                                          class="cursor"
                                          :class="selectValue(record.attr_name, record.attr_value)"
                                          @click="selectValClick(record.attr_name, record.attr_value)"
                                          >{{ record.attr_value }}</span
                                        >
                                    </div> -->
                                    <a-input v-model="record.attr_value" style="margin: 0 8px;"></a-input>
                                  </template>
                                </a-table-column>
                                <a-table-column title="操作" data-index="value" align="center" :width="100">
                                  <template #cell="{ record, rowIndex }">
                                    <icon-close-circle-fill class="del-class" size="16" @click="delaiCous(rowIndex)" />
                                  </template>
                                </a-table-column>
                              </template>
                            </a-table>
                            <div class="cus-btn-wrap">
                              <a-button @click="addaiCou()"><Icon-plus></Icon-plus></a-button>
                              <span>属性名和属性值必须同时填写，例如、：Color:Red</span>
                           </div>
                          </div>
                         
                        </a-modal>
                        <a-table
                          :data="couArr"
                          :pagination="false"
                          @change="handleChange"
                          :draggable="{ type: 'handle', width: 40 }"
                          class="dra-table"
                          v-show="couArr.length"
                        >
                          <template #empty>
                            <div style="text-align: center; padding: 10px 0; color: #666">请添加自定义属性</div>
                          </template>
                          <template #columns>
                            <a-table-column title="属性名称" align="center" :width="140">
                              <template #cell="{ record, rowIndex }">
                                <a-input placeholder="Material" :key="rowIndex" v-model="record.keys" allow-clear />
                              </template>
                            </a-table-column>
                            <a-table-column title="属性值" align="center">
                              <template #cell="{ record }">
                                <a-input placeholder="Blank or Printed" v-model="record.value" allow-clear />
                              </template>
                            </a-table-column>
                            <a-table-column align="left" :width="60">
                              <template #title>
                                <div>
                                  <a-space>
                                    <a-button size="mini" type="primary" @click="addCou(-1)"
                                      ><icon-plus size="12"
                                    /></a-button>
                                    <!-- <a-button size="mini" status="danger" type="primary" @click="delCous(couArr.length - 1)"><icon-delete size="12" /></a-button> -->
                                  </a-space>
                                </div>
                              </template>
                              <template #cell="{ record, rowIndex }">
                                <a-space>
                                  <!-- <a-button size="mini" type="primary" @click="addCou(rowIndex)"
                                  ><icon-plus size="12"
                                /></a-button> -->
                                  <icon-close-circle-fill class="del-class" size="16" @click="delCous(rowIndex)" />
                                  <!-- <a-button size="mini" status="danger" type="primary" @click="delCous(rowIndex)"
                                  ><icon-delete size="12"
                                /></a-button> -->
                                </a-space>
                              </template>
                            </a-table-column>
                          </template>
                        </a-table>
                        <template #extra> </template>
                        <div class="table-add">
                          <a-button @click="addCou(-1)"><Icon-plus></Icon-plus></a-button><span>请添加自定义属性</span>
                        </div>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-card>
              </div>
              <div ref="step3div">
                <a-card title="交易信息" :bordered="false" class="item" id="step3">
                  <a-row class="full-width" :gutter="16">
                    <a-col :span="8">
                      <a-form-item field="detail[1]['Minimum Order Quantity']" label="最小起订量">
                        <a-input
                          placeholder="请同时填写数值和单位"
                          v-model="form.details[1]['Minimum Order Quantity'].value"
                          allow-clear
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="16">
                      <a-form-item field="detail[1]['Price']" label="价格">
                        <a-input
                          placeholder="请同时填写数值和单位。建议填写 货币类型+价格区间+计量单位"
                          v-model="form.details[1]['Price'].value"
                          allow-clear
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="full-width" :gutter="16">
                    <a-col :span="8">
                      <a-form-item field="detail[1]['Payment Terms'].value" label="付款方式">
                        <a-select
                          :options="selectList2"
                          v-model="form.details[1]['Payment Terms'].value"
                          placeholder="请选择"
                          multiple
                          allow-clear
                        ></a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="16">
                      <a-form-item field="detail[1]['Supply Ability'].value" label="供货能力">
                        <a-input
                          placeholder="请同时填写数值和单位。建议填写 数量+计量单位+per时间单位"
                          v-model="form.details[1]['Supply Ability'].value"
                          allow-clear
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="full-width" :gutter="16">
                    <a-col :span="8">
                      <a-form-item class="no-bot" field="details[1]['Delivery Time'].value" label="发货期限">
                        <a-input
                          placeholder="5-8 work days"
                          v-model="form.details[1]['Delivery Time'].value"
                          allow-clear
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="16">
                      <a-form-item class="no-bot" field="details[1]['Packaging Details'].value" label="常规包装">
                        <a-input
                          placeholder="建议填写包装形式、尺寸，各类集装箱能装载的产品件数等信息"
                          v-model="form.details[1]['Packaging Details'].value"
                          allow-clear
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-card>
              </div>
              <div ref="step4div">
                <a-card :bordered="false" class="item" id="step4">
                  <div class="label-class">
                    <span>产品附件</span>
                    <a-button size="mini" class="chose-btn" type="primary" @click="showFileDialog"
                      >文件中心选择</a-button
                    >
                  </div>
                  <a-row class="full-width">
                    <a-col :span="24">
                      <a-form-item :hide-label="true" :content-flex="false" class="no-bot">
                        <div style="margin-top: 6px; position: relative; width: 100%">
                          <a-upload
                            :action="baseURL + '?r=document/upload'"
                            size="mini"
                            class="drag-upload"
                            draggable
                            :file-list="defaultfilelist"
                            :custom-icon="getCustomIcon()"
                            @success="fileSuccess"
                            @change="fileUploadChange"
                          >
                            <template #upload-button>
                              <div class="arco-upload-drag">
                                <div><Icon-plus></Icon-plus></div>
                                <div class="arco-upload-drag-text" style="margin-top: -10px">
                                  点击或拖拽文件到此处上传
                                </div>
                                <div
                                  class="arco-upload-drag-text"
                                  style="padding: 0 16px; margin-top: 6px; color: var(--color-text-6); font-size: 12px"
                                >
                                  Only pdf can be uploaded, and the size does not exceed
                                  100MB（不能上传含有中文名的文件）
                                </div>
                              </div>
                            </template>
                          </a-upload>

                          <file-dialog ref="filedialogRef" @change="fileChange"></file-dialog>
                        </div>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-card>
              </div>
            </a-col>
            <a-col :span="8">
              <div ref="step1div">
                <a-card title="分类" :bordered="false" class="item" id="step1">
                  <a-form-item field="category_id" label="产品分类" :hide-label="true" class="no-bot">
                    <a-row class="full-width">
                      <a-col :span="24">
                        <a-cascader
                          id="cate"
                          :options="cateOptions"
                          v-model="form.category_id"
                          :field-names="{ value: 'id', label: 'name' }"
                          default-value=""
                          expand-trigger="hover"
                          placeholder="请选择"
                          check-strictly
                          value-key="id"
                        />
                      </a-col>
                    </a-row>
                  </a-form-item>
                </a-card>
                <a-card title="SEO" :bordered="false" class="item">
                  <a-form-item label="SEO标题" field="seo.title">
                    <a-textarea
                      v-model="form.seo.title"
                      :auto-size="{ minRows: 4 }"
                      placeholder="建议在60 - 120个字符之间。"
                      :min-length="{ length: 60, errorOnly: true }"
                      :max-length="{ length: 120, errorOnly: true }"
                      allow-clear
                    />
                  </a-form-item>
                  <a-form-item label="SEO关键词" field="seo.keyword">
                    <a-textarea
                      v-model="form.seo.keyword"
                      :auto-size="{ minRows: 5 }"
                      placeholder="建议设置3-5个单词，以英文逗号“,”分隔。"
                      allow-clear
                    />
                  </a-form-item>
                  <a-form-item label="SEO描述" field="seo.description">
                    <a-textarea 
                    v-model="form.seo.description"
                    :auto-size="{ minRows: 6 }" placeholder="建议在140 - 160个字符之间。" allow-clear />
                  </a-form-item>
                  <a-form-item label="Tag词" field="tags.0">
                    <a-input placeholder="请输入TAG词1" v-model="form.tags[0]"></a-input>
                  </a-form-item>
                  <a-form-item :hide-label="true" field="tags.1">
                    <a-input placeholder="请输入TAG词2" v-model="form.tags[1]"></a-input>
                  </a-form-item>
                  <a-form-item :hide-label="true" field="tags.2" class="no-bot">
                    <a-input placeholder="请输入TAG词3" v-model="form.tags[2]"></a-input>
                  </a-form-item>
                </a-card>
              </div>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="productadd">
import { ref, reactive, h, createApp, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconUpload from '@arco-design/web-vue/es/icon/icon-upload'
import IconFileAudio from '@arco-design/web-vue/es/icon/icon-file-audio'
import IconClose from '@arco-design/web-vue/es/icon/icon-close'
import IconFaceFrownFill from '@arco-design/web-vue/es/icon/icon-face-frown-fill'
import uedit from '@/components/editor/uedit.vue'
import ueditorTemp from '@/components/editor/ueditor-temp.vue'
import { throttle, debounce } from '@/utils/common'
import { Notification, Message, Space, Button } from '@arco-design/web-vue'
import picDialog from '@/components/commonDialog/picDialog.vue'
import videoDialog from '@/components/commonDialog/videoDialog.vue'
import fileDialog from '@/components/commonDialog/fileDialog.vue'
import videoDetail from '@/components/commonDialog/videoDetail.vue'
import draggable from 'vuedraggable'
import lodash from 'lodash'
import cropper from './mod/cropper.vue'
import {
  proPublishInit,
  progetTplContent,
  progethotKeyword,
  progetAttr,
  proEditProduct,
  qualityControl,
  pictureDdel,
  getVideoDetail,
  addCategory
} from '@/apis'
import { useUserStore, useFileStore } from '@/store'
import successTpl from './mod/success.vue'
import { getTreeDate } from '@/utils/common'
const userStore = useUserStore()
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const route = useRoute()
const router = useRouter()
const fileStore = useFileStore()
const containerRef = ref<HTMLElement | null>()
const step1div = ref<HTMLElement | null>()
const step2div = ref<HTMLElement | null>()
const step3div = ref<HTMLElement | null>()
const step4div = ref<HTMLElement | null>()

fileStore.$onAction(({ name }) => {
  if (name === 'cancel') {
    if (pid.value) {
      initProduct()
    } else {
      formRef.value.resetFields()
      defaultfilelist.value = []
      videoChosed.value = []
      fileList.value = []
      form.details = {
        '0': {
          'Brand Name': {
            id: '',
            value: ''
          },
          'Model Number': {
            id: '',
            value: ''
          },
          Certification: {
            id: '',
            value: ''
          },
          'Place of Origin': {
            id: '',
            value: ''
          }
        },
        '1': {
          'Minimum Order Quantity': {
            value: '',
            id: ''
          },
          Price: {
            value: '',
            id: ''
          },
          'Payment Terms': {
            value: [],
            id: ''
          },
          'Supply Ability': {
            value: '',
            id: ''
          },
          'Delivery Time': {
            value: '',
            id: ''
          },
          'Packaging Details': {
            value: '',
            id: ''
          }
        },
        '2': {}
      }
      form.tags = ['', '', '']
      fileStore.setCheckdata([])
    }
  } else if (name === 'confirm') {
    saveFn('pro')
  }
})
// 产品名称事件
const proNameType = ref<string>('0')
const prodoctNameChange = () => {
  // switch (proNameType.value) {
  //   case '0':
  //     form.name = form.name.split(' ').map(lodash.capitalize).join(' ')
  //     break
  //   case '1':
  //     form.name = lodash.toUpper(form.name)
  //     break
  //   case '2':
  //     form.name = lodash.toLower(form.name)
  //     break
  // }
}
// 图片中心
const picDialogRef = ref()
const showPicCenter = () => {
  picDialogRef.value?.showDialog({
    group_name: getLabelItem()
  })
}
// 视频中心
const videoDialogRef = ref()
const showVideoCenter = () => {
  videoDialogRef.value?.showDialog({
    group_name: getLabelItem()
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
// 保存模板
const ueditorTempRef = ref()
const showUeditor = () => {
  ueditorTempRef.value?.showDialog(form.remark)
}
const back = () => {
  router.back()
}
// 校验
const handleSubmit = ({ values, errors }) => {
  console.log('values:', values, '\nerrors:', errors)
}
const form = reactive({
  id: '',
  name: '',
  category_id: '',
  details: {
    '0': {
      'Brand Name': {
        id: '',
        value: ''
      },
      'Model Number': {
        id: '',
        value: ''
      },
      Certification: {
        id: '',
        value: ''
      },
      'Place of Origin': {
        id: '',
        value: ''
      }
    },
    '1': {
      'Minimum Order Quantity': {
        value: '',
        id: ''
      },
      Price: {
        value: '',
        id: ''
      },
      'Payment Terms': {
        value: [],
        id: ''
      },
      'Supply Ability': {
        value: '',
        id: ''
      },
      'Delivery Time': {
        value: '',
        id: ''
      },
      'Packaging Details': {
        value: '',
        id: ''
      }
    },
    '5': {}
  },
  checked: true,
  remark: '',
  seo: {
    title: '',
    keyword: '',
    description: ''
  },
  tags: [
    '',
    '',
    ''
  ]
})
fileStore.setCheckdata([])
const rules = reactive({
  name: [{ required: true, message: '请输入产品名称' }]
})

// 表格数据
const keywordData = ref<Array<any>>([])
const showTable = ref(false)
const showtabFn = () => {
  showTable.value = !showTable.value
  getkeyword()
}
const getLabelItem = () => {
  if (form.category_id) {
    const arr = $('#cate .arco-select-view-value').html().split(' / ')
    return arr[0]
  } else {
    return ''
  }
}
const getkeyword = async () => {
  reloading.value = true
  const res = await progethotKeyword({
    category: getLabelItem(),
    desc: form.remark
  }).finally(() => {
    reloading.value = false
  })
  if (res.code == 0) {
    keywordData.value = res.data.keywords
  }
}
const handleOk = () => {
  showTable.value = false
}
const handleCancel = () => {
  showTable.value = false
}
// 图片上传

const fileList = ref([])
const picChange = (imgArr) => {
  imgArr.forEach((item) => {
    item.id = item.picid
    item.url = item.picture_url_l
    item.uid = item.id + Math.random()
  })
  fileList.value = fileList.value.concat(imgArr)
}
const picUploadChange = (file) => {
  fileList.value = file
  // fileList.value.push(file[file.length - 1])
}
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url
  } else {
    Message.warning(res.response.message || '操作失败')
    res.status = 'error'
  }
}
const picListDel = (file) => {
  let index = lodash.findIndex(fileList.value, function (o) {
    return o.uid == file.uid
  })
  delPicAjax(fileList.value[index].id)
  fileList.value.splice(index, 1)
}
const picPreviewSrc = ref<string>('')
const picPrewiewVisible = ref<boolean>(false)
const picListShow = (file) => {
  picPreviewSrc.value = file.url
  picPrewiewVisible.value = true
}
const cropperRef = ref()
const picCropper = (item) => {
  cropperRef.value?.showDialog({ url: item.url, uid: item.uid, name: item.name })
}
const uploadRef = ref()
const cropperChange = (data) => {
  let index = lodash.findIndex(fileList.value, function (o) {
    return o.uid == data.uid
  })
  fileList.value[index].status = 'init'
  fileList.value[index].percent = 0
  fileList.value[index].url = data.url
  fileList.value[index].file = data.file
  nextTick(() => {
    uploadRef.value?.submit()
  })
}
const delPicAjax = async (id) => {
  if (!route.query.id) {
    return
  }
  const res = await pictureDdel({
    id,
    sid: route.query.id,
    type: '4'
  })
}
// 文件上传
const getCustomIcon = () => {
  return {
    cancelIcon: () => h(''),
    fileIcon: () => h(IconFileAudio),
    errorIcon: () => h(IconFaceFrownFill)
  }
}
// 文件默认列表
const defaultfilelist = ref([])
// 产品标识
const selectList = [
  { label: '首页置顶产品', value: '1', tagProps: { color: 'red' } },
  { label: 'Top Products', value: '2', tagProps: { color: 'green' } },
  { label: '页脚产品', value: '3', tagProps: { color: 'cyan' } }
  // { label: '页脚中部', value: '4', tagProps: { color: 'arcoblue' } },
  // { label: '页脚右侧', value: '5', tagProps: { color: 'purple' } }
]

// 自定义属性
const couArr = ref<Array<any>>([])
const handleChange = (data) => {
  couArr.value = data
}
const addCou = (index: number) => {
  const itemObj = {
    keys: '',
    value: ''
  }
  if (index >= 0) {
    couArr.value.splice(index + 1, 0, itemObj)
  } else {
    couArr.value.push(itemObj)
  }
}
const delCous = (index: number) => {
  couArr.value.splice(index, 1)
}
const showTable2 = ref(false)
const showTableFn2 = () => {
  showTable2.value = !showTable2.value
  getAttrData()
}

const attrData = ref([])
const reloading = ref(false)
const getAttrData = async () => {
  reloading.value = true
  const res = await progetAttr({
    category: getLabelItem()
  }).finally(() => {
    reloading.value = false
  })
  if (res.code == 0) {
    attrData.value = res.data.attrs
  }
}
const handleCancel2 = () => {
  showTable2.value = false
  selectedArr.value = []
}
const delaiCous = (index) => {
  attrData.value.splice(index, 1)
}
const addaiCou = () => {
  attrData.value.push({
    attr_name: '',
    attr_value: ''
  })
}
const handleOk2 = () => {
  showTable2.value = false
  console.log(attrData.value, '3333')
  attrData.value.forEach((item) => {
    const index = lodash.findIndex(couArr.value, { keys: item.attr_name })
    if (index == -1) {
      couArr.value.push({ keys: item.attr_name, value: item.attr_value?.toString() })
    }
  })
}
// 交易信息模块 付款方式
const selectList2 = [
  { label: 'L/C', value: 'L/C', tagProps: { color: 'red' } },
  { label: 'D/A', value: 'D/A', tagProps: { color: 'green' } },
  { label: 'D/P', value: 'D/P', tagProps: { color: 'cyan' } },
  { label: 'T/T', value: 'T/T', tagProps: { color: 'arcoblue' } },
  { label: 'Western Union', value: 'Western Union', tagProps: { color: 'purple' } },
  { label: 'MoneyGram', value: 'MoneyGram', tagProps: { color: 'orange' } }
]
const selectMod = ref([])
const tplId = ref('')
const tplPrevId = ref('')
const tplvise = ref(false)
const tplChange = (value) => {
  if (value) {
    if (form.remark) {
      tplvise.value = true
    } else {
      getTplStr()
    }
  }
}
const tplhandleCancel = () => {
  tplId.value = tplPrevId.value
  tplvise.value = false
}
const tplhandleBeforeOk = () => {
  tplvise.value = false
  getTplStr()
}
watch(tplId, (newValue, oldValue) => {
  tplPrevId.value = oldValue || ''
})
const getTplStr = async () => {
  const res = await progetTplContent({
    id: tplId.value
  })
  if (res.code == 0) {
    form.remark = res.data.content
  }
}
// 提交
const loading = ref(false)
const formRef = ref()
const goScrollTop = (vali) => {
  if (vali.name) {
    const top = step1div.value?.offsetTop
    $('#detailbox').animate({
      scrollTop: top
    })
  }
}
const getSubObj = () => {
  const { name, id, category_id, remark, details, seo, tags } = form
  details[5] = revesKey(couArr)
  details[1]['Payment Terms'].value = details[1]['Payment Terms'].value?.toString()
  const picture_ids = fileList.value.map((item) => {
    return item.id
  })
  let video_id
  videoChosed.value.map((item) => {
    video_id = item.id
  })
  const document_ids = defaultfilelist.value.map((item) => {
    return item.id
  })
  let obj = {
    name,
    product_id: id,
    category_id,
    remark,
    details,
    picture_ids,
    document_ids,
    video_id,
    ai_optimization: fileStore.checkdata.indexOf(1)!=-1?1:0,
    ai_extend: fileStore.checkdata.indexOf(2)!=-1?1:0,
    seo,
    tags
  }
  if (!obj.product_id) {
    delete obj.product_id
  }
  return obj
}
const revesKey = (couArr) => {
  const obj = {}
  couArr.value.forEach((item) => {
    obj[item.keys] = {}
    obj[item.keys].value = item.value
    obj[item.keys].id = item.id || ''
  })
  return obj
}
const saveFn = (priview) => {
  formRef.value.validate((vali) => {
    if (vali) {
      // goScrollTop(vali)
      return
    }
    if (!form.id || route.query.type == 'copy') {
      form.id = ''
      addProSub(priview)
    } else {
      editProSub(priview)
    }
  })
}
const addProSub = async (priview: string) => {
  priview == 'priview' ? (loading1.value = true) : (loading.value = true)
  if (!cateOptions.value.length) {
    const result = await addCategory({
      name: 'Unnamed Category'
    })
    if (result.code == 0) {
      form.category_id = result.data.category_id
    }
  }
  const res = await proEditProduct(getSubObj()).finally(() => {
    priview == 'priview' ? (loading1.value = false) : (loading.value = false)
  })
  if (res.code == 0) {
    Message.success(res.message || '提交成功')
    if (priview == 'priview') {
      window.open(res.data.preview_url, '_blank')
    } else {
      setTimeout(() => {
        router.push({ path: '/web/webproduct/list' })
      })
    }
  }
}
const editProSub = async (priview: string) => {
  priview == 'priview' ? (loading1.value = true) : (loading.value = true)
  if (!cateOptions.value.length) {
    const result = await addCategory({
      name: 'Unnamed Category'
    })
    if (result.code == 0) {
      form.category_id = result.data.category_id
    }
  }
  const res = await proEditProduct(getSubObj()).finally(() => {
    priview == 'priview' ? (loading1.value = false) : (loading.value = false)
  })
  if (res.code == 0) {
    Message.success(res.message || '提交成功')
    if (priview == 'priview') {
      window.open(res.data.preview_url, '_blank')
    } else {
      setTimeout(() => {
        router.push({ path: '/web/webproduct/list' })
      })
    }
  }
}
const proInfo = reactive({
  id: '',
  cateid: '',
  url: '',
  reason: {}
})
const loading1 = ref(false)

const tabValue = ref('1')
const scrollFn = debounce(() => {
  const top = containerRef.value?.scrollTop || 0
  const offsetTop1 = step1div.value?.offsetTop || 0
  const offsetTop2 = step2div.value?.offsetTop || 0
  const offsetTop3 = step3div.value?.offsetTop || 0
  const offsetTop4 = step4div.value?.offsetTop || 0
  const des = 120
  let setVal = ''
  if (top + des > offsetTop4) {
    setVal = '4'
  } else if (top + des > offsetTop3) {
    setVal = '3'
  } else if (top + des > offsetTop2) {
    setVal = '2'
  } else if (top + des > offsetTop1) {
    setVal = '1'
  }
  nextTick(() => {
    tabValue.value = setVal
  })
}, 20)
onMounted(() => {
  containerRef.value?.addEventListener('scroll', scrollFn)
})
onUnmounted(() => {
  containerRef.value?.removeEventListener('scroll', scrollFn)
})

// 文件中心
const showFileDialog = () => {
  filedialogRef.value?.showDialog()
}
const filedialogRef = ref()
const fileChange = (arr) => {
  arr.forEach((item) => {
    item.name = item.docname
    item.uid = item.cid + Math.random()
    defaultfilelist.value.push(item)
  })
}
const fileSuccess = (res) => {
  if (res.response?.code == 0) {
    res.id = res.response?.data.document.id
    res.uid = res.response?.data.document.cid
    defaultfilelist.value.push(res)
  } else {
    Message.warning(res.response.message || '操作失败')
    res.status = 'error'
  }
}
const fileUploadChange = (arr) => {
  defaultfilelist.value = arr
}
// 产品初始化
const pid = ref(route.query.id || '')
const pdata = ref({})
const initProduct = async () => {
  // userStore.setLoading(true)
  const res = await proPublishInit({
    product_id: pid.value
  }).finally(() => {
    // userStore.setLoading(false)
  })
  if (res.code == 0) {
    pdata.value = res.data
    cateOptions.value = getTreeDate(res.data.categories)
    form.category_id = cateOptions.value[0]?.id
    selectMod.value = res.data.remark_template
    if (res.data.product && res.data.product.id) {
      reverdetail(res.data.product)
    }
  } else if (res.code == 403) {
    router.push({ path: '/web/webproduct/list' })
  }
}
initProduct()
const reverdetail = (product) => {
  const { cateid, id, details, name, remark, ai_optimization, ai_extend, tags, seo } = product
  form.category_id = product.cateid
  form.id = id
  fileStore.setCheckdata([ai_optimization?1:'', ai_extend?2:''])
  if (details) {
    Object.assign(form.details['0'], details['0'])
    Object.assign(form.details['1'], details['1'])
    Object.assign(form.details['5'], details['5'])
  }
  Object.assign(form.tags, tags)
  if (seo) {
      form.seo = {
      title: seo.title,
      keyword: seo.keyword,
      description: seo.description
    }
  }
  if (form.details['5']) {
    let arr = []
    for (const key in form.details['5']) {
      arr.push({
        ...form.details['5'][key],
        keys: key,
        value: form.details['5'][key].value
      })
    }
    couArr.value = arr
  }
  // 付款方式
  if (form.details['1'] && form.details['1']['Payment Terms']?.value.indexOf(',') != -1) {
    let payArr = form.details['1']['Payment Terms'].value.split(',')
    form.details['1']['Payment Terms'].value = payArr.map((item) => {
      return item.trim()
    })
  }
  form.name = name
  form.remark = remark
  // 图片
  if (product.associate && product.associate.length) {
    product.associate.forEach((item) => {
      item.uid = item.picture_id
      item.url = item.picture_url
      item.id = item.picture_id
    })
    fileList.value = product.associate
  }
  // 文档
  if (product.document && product.document.length) {
    product.document.forEach((item) => {
      item.name = item.docname
      item.id = item.picture_id
    })
    defaultfilelist.value = product.document
  }
  // 视频
  if (product.video_info) {
    product.video_info.id = product.video_info.videoid
    videoChosed.value = [product.video_info]
  }
}
// 分类option
const cateOptions = ref([])
const delEmptyChild = (tree) => {
  tree &&
    tree.forEach((item) => {
      if (!item.children.length) {
        delete item.children
      } else {
        return delEmptyChild(item.children)
      }
    })
  return tree
}

const checkTab = ref(false)
const checkObj = ref({ star: 1, reason: {} })
const goCheck = async () => {
  checkTab.value = false
  const res = await qualityControl(getSubObj()).finally(() => {
    nextTick(() => {
      checkTab.value = true
    })
  })
  if (res.code == 0) {
    checkObj.value = res.data
  }
}


// 选择的数组
const selectedArr = ref([])
const selectKeyFn = (val: string) => {
  const index = lodash.findIndex(selectedArr.value, { keys: val })
  return index >= 0 ? 'cell-active' : ''
}
const selectCellFn = (val: string, value) => {
  const index = lodash.findIndex(selectedArr.value, { keys: val })
  if (index == -1) {
    selectedArr.value.push({
      keys: val,
      value: value
    })
  } else {
    selectedArr.value.splice(index, 1)
  }
}
const selectValue = (key, value) => {
  if (!selectedArr.value) {
    return
  }
  const index = lodash.findIndex(selectedArr.value, { keys: key })
  if (index == -1) {
    return ''
  } else {
    const valuechose = selectedArr.value[index].value
    if (valuechose == value) {
      return 'active-span'
    }
  }
}
const selectValClick = (key, value) => {
  const index = lodash.findIndex(selectedArr.value, { keys: key })
  if (index == -1) {
    selectedArr.value.push({ keys: key, value: value })
  } else {
    const valueArr = selectedArr.value[index].value
    const valueIndex = valueArr.indexOf(value)
    if (valueIndex != -1) {
      valueArr.splice(valueIndex, 1)
    } else {
      valueArr.push(value)
    }
  }
}
const isuploading = ref(false)
const percent = ref(0)
const siglebefore = (res) => {
  isuploading.value = true
  return res
}
const sigleChange = (res) => {
  percent.value = res.percent
}
const sigleError = () => {
  isuploading.value = false
}
const sigleSuccess = async(result) => {
  if (result.response?.data.id) {
    const res = await getVideoDetail({id: result.response?.data.id})
    if (res.code === 0) {
      videoChosed.value.push(res.data.video)
    } else {
      Message.warning(res.response.message || '操作失败')
    }
    
  }
  isuploading.value = false
}

</script>
<style lang="scss" scoped>
@import './mod/index.scss';
</style>
