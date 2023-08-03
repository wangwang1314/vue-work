<template>
  <div class="detail" id="detailbox" ref="containerRef">
    <div v-show="!publish" class="detail-wrap">
      <a-affix class="mao-box">
        <a-anchor :scroll-container="containerRef" :style="{ backgroundColor: 'var(--color-bg-1)' }" :smooth="true">
          <a-anchor-link href="#step1">基本信息</a-anchor-link>
          <a-anchor-link href="#step2">产品属性</a-anchor-link>
          <a-anchor-link href="#step3">交易信息</a-anchor-link>
          <a-anchor-link href="#step4">产品描述</a-anchor-link>
        </a-anchor>
      </a-affix>
      <a-form
        ref="formRef"
        size="medium"
        :model="form"
        @submit="handleSubmit"
        layout="horizontal"
        :auto-label-width="true"
      >
        <div ref="step1div">
          <a-card title="基本信息" :bordered="false" class="item" id="step1">
            <a-form-item field="cate" label="产品分类">
              <a-row class="full-width">
                <a-col :span="15">
                  <!-- <a-select v-model="form.cate" placeholder="请选择" allow-clear>
                  <a-option>Manual Heads</a-option>
                  <a-option>Filter&Softener Systems</a-option>
                  <a-option>Stretch Corduroy Fabric</a-option>
                </a-select> -->
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
                <a-col :span="10">
                  <!-- <a-button type="primary" class="mar-l-10" size="small" style="margin-top: 2px">新建分类</a-button> -->
                </a-col>
              </a-row>
              <template #extra>
                <div class="cate-wrap">
                  请先选择分类，若还没有分类，请到“<span class="go-cate">分类管理</span>”处先新增分类。
                </div>
              </template>
            </a-form-item>
            <a-form-item field="name" label="产品名称" :rules="rules.name">
              <a-row class="full-width">
                <a-col :span="15">
                  <a-input
                    placeholder="请输入"
                    v-model="form.name"
                    :max-length="120"
                    allow-clear
                    show-word-limit
                    @input="prodoctNameChange"
                  />
                </a-col>
                <a-col :span="6">
                  <a-form-item :no-style="true">
                    <a-space class="mar-l-10">
                      <a-radio-group type="button" v-model.trim="proNameType" @change="prodoctNameChange">
                        <a-radio value="0">Aa</a-radio>
                        <a-radio value="1">AA</a-radio>
                        <a-radio value="2">aa</a-radio>
                      </a-radio-group>
                    </a-space>
                  </a-form-item>
                </a-col>
              </a-row>
              <template #extra>
                <div>
                  产品名称建议包含产品分类名或者精准的产品叫法，并包含
                  <span class="warning-color">2-3</span> 个产品本身的特点：规格、材质、颜色，用途，重要参数等
                </div>
                <a-row class="full-width" style="margin-top: 2px">
                  <a-col :span="24">
                    <a-space>
                      <a-button type="text" size="mini" @click="showtabFn"
                        ><icon-thumb-up-fill /> 卖点词智能推荐</a-button
                      >
                      <span style="font-size: 12px; color: var(--color-text-7)">(产品描述完成可用)</span>
                      <a-modal v-model:visible="showTable" @ok="handleOk" @cancel="handleCancel" :width="500">
                        <template #title> 智能推荐 </template>
                        <div style="min-height: 200px; max-height: 400px; overflow: hidden">
                          <a-table
                            style="width: 100%"
                            :data="keywordData"
                            :scroll="{ y: '400px' }"
                            :pagination="false"
                            :loading="reloading"
                          >
                            <template #columns>
                              <a-table-column title="推荐卖点词" data-index="word" align="center"></a-table-column>
                              <a-table-column title="推荐指数" data-index="ids" align="center">
                                <template #cell="{ record }">
                                  <div style="color: var(--orange-init)">
                                    <icon-star-fill v-for="item in record.weight" />
                                  </div>
                                </template>
                              </a-table-column>
                              <a-table-column title="已使用次数" data-index="count" align="center"></a-table-column>
                            </template>
                          </a-table>
                        </div>

                        <template #footer>
                          <a-button @click="handleCancel">取消</a-button>
                        </template>
                      </a-modal>
                    </a-space>
                  </a-col>
                </a-row>
              </template>
            </a-form-item>
            <a-form-item label="产品图片">
              <a-row class="full-width">
                <a-col :span="24">
                  <a-button type="primary" size="mini" style="margin: 8px 0 8px 0" @click="showPicCenter"
                    >图片中心选择</a-button
                  >
                  <div class="arco-upload-wrapper arco-upload-wrapper-type-picture-card">
                    <draggable v-model="fileList">
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
                                <div style="margin-top: 10px; color: var(--color-text-4); font-size: 14px">上传</div>
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
                <div style="line-height: 18px">
                  1、建议上传大于<span class="warning-color">600</span>像素图片，尺寸比例为<span class="warning-color"
                    >1:1</span
                  >；2.JPEG、JPG格式，并小于<span class="warning-color">100K</span>；3、长按图片拖拽可以调整顺序。
                </div>
                <pic-dialog ref="picDialogRef" @change="picChange"></pic-dialog>
              </template>
            </a-form-item>
            <a-form-item label="产品视频">
              <a-row class="full-width">
                <a-col :span="15">
                  <a-button type="primary" size="mini" @click="showVideoCenter" style="margin-top: 4px"
                    >视频中心选择</a-button
                  >
                  <video-dialog ref="videoDialogRef" @change="videoChange"></video-dialog>
                  <div class="video-chose-list nor-v-list">
                    <div class="item" v-for="(item, index) in videoChosed" :key="index">
                      <div
                        class="arco-image arco-image-with-footer-inner nor-pri"
                        data-v-ea8150a6=""
                        style="width: 220px; height: 220px; margin-left: -14px; vertical-align: top"
                      >
                        <img class="arco-image-img" :src="item.img_path" style="width: 220px; height: 220px" />
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
                    <div class="arco-form-item-extra" style="line-height: 18px">
                      建议使用<span class="warning-color">30秒以内.mp4</span
                      >格式的产品简介视频，视频尺寸建议为16:9，例如640x360像素、853x480像素、1138x640像素、1280x720像素。一个产品仅能设置一个头图视频。
                    </div>
                    <video-detail ref="videoDetailRef"></video-detail>
                  </div>
                </a-col>
              </a-row>
            </a-form-item>
            <a-row class="full-width">
              <a-col :span="16">
                <a-form-item label="产品附件" :content-flex="false">
                  <a-button size="mini" class="chose-btn" type="primary" @click="showFileDialog">文件中心选择</a-button>
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
                          <div class="arco-upload-drag-text" style="margin-top: -10px">点击或拖拽文件到此处上传</div>
                          <div
                            class="arco-upload-drag-text"
                            style="padding: 0 16px; margin-top: 6px; color: var(--color-text-6); font-size: 12px"
                          >
                            Only pdf, png, jpg can be uploaded, and the size does not exceed
                            100MB（不能上传含有中文名的文件）
                          </div>
                        </div>
                      </template>
                    </a-upload>

                    <file-dialog ref="filedialogRef" @change="fileChange"></file-dialog>
                  </div>
                </a-form-item>
                <a-form-item label="产品标识">
                  <a-select
                    :options="selectList"
                    v-model="form.product_flag"
                    placeholder="请选择"
                    multiple
                    allow-clear
                  ></a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </div>
        <div ref="step2div">
          <a-card title="产品属性" :bordered="false" class="item" id="step2">
            <a-row class="full-width">
              <a-col :span="16">
                <a-form-item label="品牌">
                  <a-input placeholder="请输入品牌" v-model="form.details[0]['Brand Name'].value" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="16">
                <a-form-item label="认证证书">
                  <a-input placeholder="请输入认证证书" v-model="form.details[0]['Model Number'].value" allow-clear />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="full-width">
              <a-col :span="16">
                <a-form-item label="型号">
                  <a-input placeholder="请输入型号" v-model="form.details[0]['Certification'].value" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="16">
                <a-form-item label="原产地">
                  <a-input placeholder="请输入原产地" v-model="form.details[0]['Place of Origin'].value" allow-clear />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="full-width">
              <a-col :span="16">
                <a-form-item label="自定义属性" :content-flex="false">
                  <a-row class="full-width" :gutter="10">
                    <a-col :span="16">
                      <a-space style="margin-top: 6px">
                        <a-button size="mini" type="text" @click="showTableFn2"
                          ><icon-thumb-up-fill /> 智能推荐</a-button
                        >

                        <a-modal v-model:visible="showTable2" :width="700">
                          <template #title> 智能推荐 </template>
                          <template #footer>
                            <a-button @click="handleCancel2">取消</a-button>
                            <a-button type="primary" @click="handleOk2">确定</a-button>
                          </template>
                          <div style="height: 500px; overflow: hidden">
                            <a-table
                              :data="attrData"
                              :loading="reloading"
                              style="width: 100%"
                              :scroll="{ y: '100%' }"
                              :pagination="false"
                              class="select-table"
                            >
                              <template #columns>
                                <a-table-column title="推荐属性名" data-index="attr_name" align="center" :width="120">
                                  <template #cell="{ record }">
                                    <div
                                      class="padding-cell cursor"
                                      @click="selectCellFn(record.attr_name)"
                                      :class="selectKeyFn(record.attr_name)"
                                    >
                                      {{ record.attr_name }}
                                    </div>
                                  </template>
                                </a-table-column>
                                <a-table-column title="推荐属性值" data-index="value" align="center">
                                  <template #cell="{ record }">
                                    <div class="padding-cell">
                                      <span v-for="(item, index) in record.attr_value" :key="item"
                                        ><span
                                          class="cursor"
                                          :class="selectValue(record.attr_name, item)"
                                          @click="selectValClick(record.attr_name, item)"
                                          >{{ item }}</span
                                        ><template v-if="index != record.attr_value.length - 1">,</template>
                                      </span>
                                      <!-- {{ record.attr_value && record.attr_value.toString() }} -->
                                    </div>
                                  </template>
                                </a-table-column>
                              </template>
                            </a-table>
                          </div>
                        </a-modal>
                      </a-space>
                    </a-col>
                    <a-col :span="24">
                      <div style="padding-top: 4px; color: var(--color-text-7); font-size: 12px">
                        属性名和属性值必须同时填写，例：Color:Red；长按左侧锚点可调整顺序。
                      </div>
                    </a-col>
                  </a-row>
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
            <a-row class="full-width">
              <a-col :span="16">
                <a-form-item field="detail[1]['Minimum Order Quantity']" label="最小起订量">
                  <a-input placeholder="请输入" v-model="form.details[1]['Minimum Order Quantity'].value" allow-clear />
                  <template #extra>
                    <div>请同时填写数值和单位</div>
                  </template>
                </a-form-item>
                <a-form-item field="detail[1]['Price']" label="价格">
                  <a-input
                    placeholder="货币类型 + 价格区间 + 计量单位"
                    v-model="form.details[1]['Price'].value"
                    allow-clear
                  />
                  <template #extra>
                    <div>请同时填写数值和单位。建议填写方位为：货币类型 + 价格区间 + 计量单位</div>
                  </template>
                </a-form-item>
                <a-form-item field="detail[1]['Payment Terms'].value" label="付款方式">
                  <a-select
                    :options="selectList2"
                    v-model="form.details[1]['Payment Terms'].value"
                    placeholder="请选择"
                    multiple
                    allow-clear
                  ></a-select>
                </a-form-item>
                <a-form-item field="detail[1]['Supply Ability'].value" label="供货能力">
                  <a-input
                    placeholder="数量 + 计量单 + per 时间单位"
                    v-model="form.details[1]['Supply Ability'].value"
                    allow-clear
                  />
                  <template #extra>
                    <div>请同时填写数值和单位。建议填写方式为：数量 + 计量单位 + per 时间单位</div>
                  </template>
                </a-form-item>
                <a-form-item field="details[1]['Delivery Time'].value" label="发货期限">
                  <a-input placeholder="5-8 work days" v-model="form.details[1]['Delivery Time'].value" allow-clear />
                </a-form-item>
                <a-form-item field="details[1]['Packaging Details'].value" label="常规包装">
                  <a-input placeholder="" v-model="form.details[1]['Packaging Details'].value" allow-clear />
                  <template #extra>
                    <div>建议填写包装形式、尺寸，各类集装箱能装载的产品件数等信息，便于买家了解。</div>
                  </template>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </div>
        <div ref="step4div">
          <a-card
            title="产品描述"
            :bordered="false"
            class="item"
            id="step4"
            style="margin-bottom: -20px; position: static"
          >
            <a-form-item label="描述内容" :content-flex="false">
              <a-row class="full-width" style="margin-bottom: 10px">
                <a-col :span="16">
                  <a-select v-model="tplId" placeholder="选择内容模板" allow-clear @change="tplChange">
                    <a-option v-for="(item, index) in selectMod" :key="item.id" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-col>
                <a-col :span="16">
                  <div class="w-tips">说明：选择你想要的【内容模板】覆盖到编辑框；变更模板会覆盖原编辑框的内容！</div>
                </a-col>
              </a-row>
              <a-row class="full-width">
                <a-col :span="22">
                  <uedit v-model="form.remark"></uedit>
                </a-col>
              </a-row>
              <a-row class="full-width" style="margin-top: 10px">
                <a-col :span="6">
                  <a-button type="primary" size="mini" @click="showUeditor">保存模板</a-button>
                  <ueditor-temp ref="ueditorTempRef"></ueditor-temp>
                </a-col>
              </a-row>
            </a-form-item>
          </a-card>
        </div>
        <div class="info-box">
          <a-button type="text" size="mini" @click="goCheck"
            ><template #default><icon-find-replace size="16" />去检测</template></a-button
          >高质量的产品信息将更容易获得曝光和询盘！想知道产品内容是否需要优化吗？ 马上检测一下吧。
        </div>
        <transition name="fade-mask" mode="out-in">
          <div class="check-tab" v-if="checkTab">
            <a-typography>
              <a-typography-title :heading="6" :style="{ fontSize: '14px' }"
                >您的产品质量检测评分为<a-rate
                  class="cou-rate"
                  v-model="checkObj.star"
                  readonly
                />产品信息还有如下改进空间：</a-typography-title
              >
              <a-typography-paragraph>
                <ul class="check-ul">
                  <li v-show="!checkObj.reason.title">
                    产品标题：包含卖点过少；<a-link href="#step1">现在改进</a-link>
                  </li>
                  <li v-show="!checkObj.reason.picture">
                    产品图片：建议您通过多张、多维度的产品图片向卖家介绍产品；<a-link href="#step1">现在改进</a-link>
                  </li>
                  <li v-show="!checkObj.reason.details">
                    产品属性：建议您设置热门产品属性，方便卖家阅读；<a-link href="#step2">现在改进</a-link>
                  </li>
                  <li v-show="!checkObj.reason.remark">
                    产品描述：建议您通过表格丰富产品描述形态；建议您在描述中增加图片；建议您增加产品描述文字；<a-link
                      href="#step4"
                      >现在改进</a-link
                    >
                  </li>
                </ul>
              </a-typography-paragraph>
            </a-typography>
          </div>
        </transition>

        <div class="btn-wrap">
          <a-button type="primary" @click="saveFn('pub')" :loading="loading" :disabled="!form.checked || loading1"
            >完成</a-button
          >
          <a-button
            style="margin-left: 10px"
            @click="saveFn('priview')"
            :disabled="!form.checked || loading"
            :loading="loading1"
            >保存并预览</a-button
          >
        </div>
        <div class="agree-box">
          <a-checkbox value="1" v-model="form.checked">我已阅读并接受</a-checkbox>
          <a-link href="http://uc.ecer.com/index.php?r=uc/agreement" target="_black">《宜选网用户使用协议》</a-link>
        </div>
      </a-form>
    </div>
    <success-tpl v-if="publish" :info="proInfo"></success-tpl>

    <!-- 确认对话框 -->
    <a-modal v-model:visible="tplvise">
      <template #title> 提示 </template>
      <div>编辑框内已有内容，是否确定使用模板内容覆盖？</div>
      <template #footer>
        <a-button @click="tplhandleCancel">取消</a-button>
        <a-button type="primary" @click="tplhandleBeforeOk">确定</a-button>
      </template>
    </a-modal>
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
  proAddProduct,
  proEditProduct,
  qualityControl
} from '@/apis'
import { useUserStore } from '@/store'
import successTpl from './mod/success.vue'
import { getTreeDate } from '@/utils/common'
const userStore = useUserStore()
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const route = useRoute()
const router = useRouter()

const containerRef = ref<HTMLElement | null>()
const step1div = ref<HTMLElement | null>()
const step2div = ref<HTMLElement | null>()
const step3div = ref<HTMLElement | null>()
const step4div = ref<HTMLElement | null>()

// 产品名称事件
const proNameType = ref<string>('0')
const prodoctNameChange = () => {
  switch (proNameType.value) {
    case '0':
      form.name = form.name.split(' ').map(lodash.capitalize).join(' ')
      break
    case '1':
      form.name = lodash.toUpper(form.name)
      break
    case '2':
      form.name = lodash.toLower(form.name)
      break
  }
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
  product_flag: [],
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
    '2': {}
  },
  checked: true,
  remark: ''
})
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
  // console.log(file, file[2].status, file[2].percent)
  // fileList.value.push(file[file.length - 1])
}
const successUpload = (res) => {
  if (res.response.code == 0) {
    res.id = res.response.data?.picture_id
    res.url = res.response.data?.picture_url
  } else {
    res.status = 'error'
  }
}
const picListDel = (file) => {
  let index = lodash.findIndex(fileList.value, function (o) {
    return o.uid == file.uid
  })
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
// 文件上传
const getCustomIcon = () => {
  return {
    retryIcon: () => h(IconUpload),
    cancelIcon: () => h(IconClose),
    fileIcon: () => h(IconFileAudio),
    removeIcon: () => h(IconClose),
    errorIcon: () => h(IconFaceFrownFill),
    fileName: (file) => {
      return `文件名： ${file.name}`
    }
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
const handleOk2 = () => {
  showTable2.value = false
  selectedArr.value.forEach((item) => {
    const index = lodash.findIndex(couArr.value, { keys: item.keys })
    if (index == -1) {
      couArr.value.push({ keys: item.keys, value: item.value.toString() })
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
  const { name, id, category_id, remark, details, product_flag } = form
  const flag = product_flag.toString()
  details[2] = revesKey(couArr)
  details[1]['Payment Terms'].value = details[1]['Payment Terms'].value.toString()
  const picture_ids = fileList.value.map((item) => {
    return item.id
  })
  let videoId
  videoChosed.value.map((item) => {
    videoId = item.id
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
    flag,
    picture_ids,
    document_ids,
    videoId
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
      return goScrollTop(vali)
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
  const res = await proAddProduct(getSubObj()).finally(() => {
    priview == 'priview' ? (loading1.value = false) : (loading.value = false)
  })
  if (res.code == 0) {
    Message.success(res.message || '提交成功')
    if (priview == 'priview') {
      window.open(res.data.preview_url, '_blank')
    } else {
      // router.push({ path: '/web/webproduct/list' })
      proInfo.id = res.data.id
      proInfo.cateid = res.data.cateid || form.category_id
      proInfo.url = res.data.preview_url
      proInfo.star = res.data.star
      proInfo.reason = res.data.reason
      publish.value = true
    }
  }
}
const editProSub = async (priview: string) => {
  priview == 'priview' ? (loading1.value = true) : (loading.value = true)
  const res = await proEditProduct(getSubObj()).finally(() => {
    priview == 'priview' ? (loading1.value = false) : (loading.value = false)
  })
  if (res.code == 0) {
    Message.success(res.message || '提交成功')
    if (priview == 'priview') {
      window.open(res.data.preview_url, '_blank')
    } else {
      // router.push({ path: '/web/webproduct/list' })
      proInfo.id = res.data.id
      proInfo.cateid = res.data.cateid || form.category_id
      proInfo.url = res.data.preview_url
      proInfo.star = res.data.star
      proInfo.reason = res.data.reason
      publish.value = true
    }
  }
}
const proInfo = reactive({
  id: '',
  cateid: '',
  url: ''
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
  const { cateid, id, details, name, remark, product_flag } = product
  form.category_id = product.cateid
  form.id = id
  if (details) {
    Object.assign(form.details['0'], details['0'])
    Object.assign(form.details['1'], details['1'])
    Object.assign(form.details['2'], details['2'])
  }
  if (form.details['2']) {
    let arr = []
    for (const key in form.details['2']) {
      arr.push({
        ...form.details['2'][key],
        keys: key,
        value: form.details['2'][key].value
      })
    }
    couArr.value = arr
  }
  // 付款方式
  if (form.details['1'] && form.details['1']['Payment Terms']?.value.indexOf(',') != -1) {
    let payArr = form.details['1']['Payment Terms'].value.split(',')
    form.details['1']['Payment Terms'].value = payArr.map((item) => { return item.trim() })
  }
  form.name = name
  form.remark = remark
  form.product_flag = product_flag
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

// 发布成功页面
const publish = ref(false)

// 选择的数组
const selectedArr = ref([])
const selectKeyFn = (val: string) => {
  const index = lodash.findIndex(selectedArr.value, { keys: val })
  return index >= 0 ? 'cell-active' : ''
}
const selectCellFn = (val: string) => {
  const index = lodash.findIndex(selectedArr.value, { keys: val })
  if (index == -1) {
    selectedArr.value.push({
      keys: val,
      value: []
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
    const valueArr = selectedArr.value[index].value
    if (valueArr.indexOf(value) != -1) {
      return 'active-span'
    }
  }
}
const selectValClick = (key, value) => {
  const index = lodash.findIndex(selectedArr.value, { keys: key })
  if (index == -1) {
    selectedArr.value.push({ keys: key, value: [value] })
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
</script>
<style lang="scss" scoped>
@import './mod/index.scss';
</style>
