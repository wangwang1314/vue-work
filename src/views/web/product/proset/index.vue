<template>
  <div class="proset detail">
    <div class="proset-head">
      <a-alert type="warning" class="top-alert"
        >提示：选中分类后可以批量设置选中分类下所有产品的产品属性和交易信息</a-alert
      >
    </div>
    <a-form :model="cusform" label-align="left">
      <div class="cont-box">
        <div class="left">
          <div class="left-tit">
            <a-checkbox v-model="cusform.allCheck" @change="checkChange">分类选择</a-checkbox>
          </div>
          <a-tree
            :checkable="true"
            class="tree-list"
            v-model:checked-keys="cusform.checkedKeys"
            :check-strictly="true"
            :data="treeData"
            :fieldNames="{
              key: 'id',
              title: 'name'
            }"
            ref="tree"
            @select="onSelect"
          />
        </div>
        <div class="right">
          <div class="arco-card-header"><div class="arco-card-header-title">属性修改</div></div>
          <div class="right-content">
            <a-form-item :label="item.name" v-for="(item, index) in cusform.itemList" :key="item.name">
              <div class="item">
                <a-radio-group v-model="item.checked">
                  <a-radio :value="false">不处理</a-radio>
                  <a-radio :value="true">修改</a-radio>
                </a-radio-group>
                <a-input class="ipt-with" :disabled="!item.checked" v-model="item.value"></a-input>
                <icon-delete class="del-icon" @click="delRow(item)"></icon-delete>
              </div>
            </a-form-item>
            <div class="arco-card-header"><div class="arco-card-header-title">自定义属性</div></div>
            <a-form-item label="自定义属性" :content-flex="false" :hide-label="true" style="position: relative">
              <div class="loading-wrap" v-show="ailoading">
                <div class="loading">
                  <div class="shape shape-1"></div>
                  <div class="shape shape-2"></div>
                  <div class="shape shape-3"></div>
                  <div class="shape shape-4"></div>
                </div>
              </div>
              <a-row class="full-width" :gutter="10">
                <a-col :span="16">
                  <a-space style="margin-top: 6px">
                    <a-button size="mini" type="text" @click="getAiFn">AI计算自定义属性</a-button>
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
                size="small"
                v-show="couArr.length"
              >
                <template #empty>
                  <div style="text-align: center; padding: 10px 0; color: #666">请添加自定义属性</div>
                </template>
                <template #columns>
                  <a-table-column title="属性名称" align="center" :width="140">
                    <template #cell="{ record, rowIndex }">
                      <a-input placeholder="Material" :key="rowIndex" v-model="record.attr_key" allow-clear />
                    </template>
                  </a-table-column>
                  <a-table-column title="属性值" align="center">
                    <template #cell="{ record }">
                      <a-input placeholder="Blank or Printed" v-model="record.attr_val" allow-clear />
                    </template>
                  </a-table-column>
                  <a-table-column align="left" :width="30">
                    <template #title>
                      <div>
                        <a-space>
                          <a-button size="mini" type="primary" @click="addCou(-1)"><icon-plus size="12" /></a-button>
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
            <div class="btn-wrap">
              <a-space>
                <a-button type="primary" @click="confirmFn" :loading="btnloading">确定</a-button>
                <a-button :disabled="btnloading" @click="cancelFn">取消</a-button>
              </a-space>
            </div>
          </div>
        </div>
      </div>
    </a-form>
    <GiFooter bgcolor="#fff"></GiFooter>
    <!-- 二次确认弹框 -->
    <a-modal v-model:visible="popup" :width="286">
      <template #title>提示</template>
      <div><icon-exclamation-circle-fill size="16" style="color: rgb(var(--orangered-5))" /> 确认要对 {{ cateName }}, 分类产品 {{ currentProp.name }} 属性进行批量删除吗？</div>
      <template #footer>
        <a-button @click="popup = false" :disabled="btnloading">取消</a-button>
        <a-button type="primary" @click="batchDel" :loading="btnloading">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="proset">
import type { setform, listItem } from './type'
import { ref, reactive, h, createApp, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { Message } from '@arco-design/web-vue'
import { getCategoryList, aiRecommend, prBatchSet, prBatchDel } from '@/apis'
import { getTreeDate } from '@/utils/common'
const checkedKeys = ref<Array<string>>([])
const allCheck = ref(false)
const cusform = reactive<setform>({
  allCheck: false,
  checkedKeys: [],
  itemList: [
    {
      name: '原产地',
      checked: false,
      value: '',
      key: 'Place of Origin'
    },
    {
      name: '品牌',
      checked: false,
      value: '',
      key: 'Brand Name'
    },
    {
      name: '认证证书',
      checked: false,
      value: '',
      key: 'Certification'
    },
    {
      name: '型号',
      checked: false,
      value: '',
      key: 'Model Number'
    },
    {
      name: '最小起订量',
      checked: false,
      value: '',
      key: 'Minimum Order Quantity'
    },
    {
      name: '价格',
      checked: false,
      value: '',
      key: 'Price'
    },
    {
      name: '常规包装',
      checked: false,
      value: '',
      key: 'Packaging Details'
    },
    {
      name: '发货期限',
      checked: false,
      value: '',
      key: 'Delivery Time'
    },
    {
      name: '付款方式',
      checked: false,
      value: '',
      key: 'Payment Terms'
    },
    {
      name: '供货能力',
      checked: false,
      value: '',
      key: 'Supply Ability'
    }
  ]
})
const treeData = ref<Array<any>>([])
const allTree = ref<Array<string>>([])
const tree = ref()
const getTableDate = async () => {
  const res = await getCategoryList()
  if (res.code === 0) {
    allTree.value = res.data?.list.map((item) => {
      return item.id
    })
    treeData.value = getTreeDate(res.data?.list)
  }
}
getTableDate()
const checkChange = (value: boolean) => {
  if (value) {
    tree.value.checkAll()
  } else {
    cusform.checkedKeys = []
  }
}
const onSelect = (ids) => {
  const index = cusform.checkedKeys.indexOf(ids[0])
  if (!~index) {
    cusform.checkedKeys.push(ids[0])
  } else {
    cusform.checkedKeys.splice(index, 1)
  }
}
// 自定义属性
const ailoading = ref(false)
const getAiFn = async () => {
  if (cusform.checkedKeys.length <= 0) {
    return Message.warning('请选择分类！')
  }
  ailoading.value = true
  const res = await aiRecommend({ category_id: cusform.checkedKeys[0] }).finally(() => {
    ailoading.value = false
  })
  if (res.code === 0) {
    couArr.value = res.data?.attr
  }
}
const couArr = ref<Array<any>>([])
const handleChange = (data) => {
  couArr.value = data
}
const addCou = (index: number) => {
  const itemObj = {
    attr_key: '',
    attr_val: ''
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

// 删除
const cateName = ref('')
const currentProp = ref({ name: '', key: ''})
const popup = ref(false)
const btnloading = ref(false)
const batchDel = async () => {
  btnloading.value = true
  const res = await prBatchDel({
    ids: cusform.checkedKeys,
    type: 1,
    attr_key: currentProp.value.key
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code === 0) {
    popup.value = false
    Message.success(res.message || '操作成功')
  }
}
const delRow = (row: listItem) => {
  const arrTreeObj = tree.value.getCheckedNodes()
  cateName.value = arrTreeObj.map((item) => { return item.name }).toString()
  if (cusform.checkedKeys.length <= 0) {
    return Message.warning('请选择分类！')
  }
  currentProp.value.name = row.name
  currentProp.value.key = row.key
  popup.value = true
}

// 点击保存
const confirmFn = async () => {
  if (cusform.checkedKeys.length <= 0) {
    return Message.warning('请选择分类！')
  }
  btnloading.value = true
  const currentObj = {}
  couArr.value.forEach((item) => {
    currentObj[item.attr_key] = item.attr_val
  })
  cusform.itemList.forEach((item) => {
    currentObj[item.key] = item.value
  })
  const res = await prBatchSet({
    ids: cusform.checkedKeys,
    type: 1, // 1以分类维度，2品牌维度
    ...currentObj
  }).finally(() => {
    btnloading.value = false
  })
  if (res.code === 0) {
    Message.success(res.message || '操作成功')
  }
}
const cancelFn = () => {
  cusform.checkedKeys = []
}
</script>
<style lang="scss" scoped>
@import './mod/index.scss';
</style>
