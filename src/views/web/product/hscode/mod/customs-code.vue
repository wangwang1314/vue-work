<template>
  <div class="customs-code">
    <a-modal v-model:visible="showTag" :width="720" class="no-border-dialog">
      <template #title>设置分类海关编码</template>
      <div class="customs-box">
        <a-form :model="form" auto-label-width>
          <a-form-item label="分类">
            {{ currentRow.name }}
            <a-button type="text" size="mini" style="margin-left: 10px" @click="recommand">智能推荐</a-button>
          </a-form-item>
          <a-form-item label="模式" style="margin-top: -20px" :hide-label="true">
            请填写&nbsp;<span class="red">8位数字</span
            >&nbsp;海关编码，可通过智能推荐找到最匹配的，也可输入数字或中英文名查询后复制填写。
          </a-form-item>
          <div class="card-wrap" style="margin-top: -12px">
            <a-row class="grid-demo">
              <a-col :span="6">
                <div class="ipt-box" v-for="(item, index) in codeNum" :key="index">
                  <a-input placeholder="" v-model.lazy="codeNum[index].value" @change="changeFn(index)" allow-clear>
                    <template #suffix>
                      <icon-close-circle-fill
                        size="18"
                        class="red"
                        v-if="codeNum[index].value && codeNum[index].check == 1"
                      />
                      <icon-check-circle-fill
                        size="18"
                        class="green"
                        v-else-if="codeNum[index].value && codeNum[index].check == 2"
                      />
                    </template>
                  </a-input>
                </div>
                <a-button type="text" size="mini" @click="addFn">添加</a-button>
              </a-col>
              <a-col :span="18" style="padding-left: 16px">
                <a-input-search v-model="searchText" placeholder="" search-button style="margin-bottom: 10px">
                  <template #button-icon>
                    <icon-search @click="searchClickFn" />
                  </template>
                </a-input-search>
                <a-card :title="text + '：'" class="card-normal">
                  <a-table
                    :data="data"
                    :pagination="false"
                    class="custom-table"
                    :scroll="{ y: 260 }"
                    :bordered="false"
                    :loading="loadingFlag"
                  >
                    <template #columns>
                      <a-table-column data-index="hscode" :width="100">
                        <template #cell="{ record }">
                          <div class="font-normal">
                            {{ record.hscode }}
                          </div>
                        </template>
                      </a-table-column>
                      <a-table-column>
                        <template #cell="{ record }">
                          <div class="font-normal">
                            <div>{{ record.name_cn }}</div>
                            <div>{{ record.name_en }}</div>
                          </div>
                        </template>
                      </a-table-column>
                    </template>
                  </a-table>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-form>
      </div>
      <template #footer>
        <div style="margin-top: -30px">
          <a-button @click="showTag = false">取消</a-button>
          <a-button type="primary" @click="confirmFn" style="margin: 0 0 6px 16px">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script setup lang="ts" name="cateCustoms">
import { ref, reactive } from 'vue'
import { cateHscode, hscodeSearch, hscodeCheck, setHscode, setCateHscode } from '@/apis'
import { throttle, debounce } from '@/utils/common'
import { Notification, Message } from '@arco-design/web-vue'
interface codeObj {
  type: string
  code: string
  name: string
  cateid: string
  hs_code: string
  id: string
}
const showTag = ref(false)
const currentRow = reactive<codeObj>({
  type: '',
  code: '',
  name: '',
  cateid: '',
  hs_code: '',
  id: ''
})
const showDialog = (obj: codeObj) => {
  const { type, code, name, hs_code, cateid, id } = obj
  currentRow.name = name
  currentRow.code = code
  currentRow.cateid = cateid
  currentRow.id = id
  showTag.value = true
  if (hs_code.length > 0) {
    codeNum.value = []
    hs_code.forEach((item) => {
      codeNum.value.push({
        value: item,
        check: 0
      })
    })
  } else {
    codeNum.value = [
      {
        value: '',
        check: 0
      }
    ]
  }
  searchFn(name)
}
const cateloading = ref(false)
const form = reactive({})

const catedata = ref([])
const data = ref([])
interface CodeItem {
  value: string
  check: number
}
const codeNum = ref<Array<CodeItem>>([
  {
    value: '',
    check: 0
  }
])
const addFn = () => {
  codeNum.value.push({
    value: '',
    check: 0
  })
}
const changeFn = debounce(async (index: number) => {
  const res = await hscodeCheck({ hs_code: codeNum.value[index].value })
  if (res.code == 0) {
    codeNum.value[index].check = res.data?.check_pass ? 2 : 1
  }
}, 30)
const searchText = ref<string>('')
const loadingFlag = ref<boolean>(false)
const searchFn = async (str?: string) => {
  const searchWord = typeof str === 'string' ? str : searchText.value
  loadingFlag.value = true
  const res = await hscodeSearch({
    keyword: searchWord
  })
  if (res.code == 0) {
    loadingFlag.value = false
    data.value = res.data?.hs_code
  }
}
const searchClickFn = () => {
  if (!searchText.value) {
    return Message.warning('请输入关键词')
  }
  text.value = '查询结果'
  searchFn()
}
const confirmFn = async () => {
  const hscode = []
  codeNum.value.forEach((item)=>{
    if (item.value && item.check !== 1) {
      hscode.push(item.value)
    }
  })
  const res = await setCateHscode({
    hs_code: hscode,
    category_id: currentRow.id
  })
  showTag.value = false
  if (res.code == 0) {
    Message.success(res.message || '请求成功')
    emit('update')
  }
}
const text = ref('查询结果')
const recommand = () => {
  text.value = '智能推荐'
  searchText.value = ''
  searchFn(currentRow.name)
}
defineExpose({
  showDialog
})
const emit = defineEmits(['update'])
</script>
<style lang="scss">
.no-border-dialog .arco-modal-footer {
  border-top: none;
}
</style>
<style lang="scss" scoped>
.empty-tips {
  text-align: center;
}

.card-wrap {
  padding-bottom: 20px;
}

.custom-table {
  :deep(.arco-table-header) {
    display: none;
  }

  .font-normal {
    font-size: 12px;
  }
}

.card-normal {
  :deep(.arco-card-body) {
    padding: 0;
  }

  :deep(.arco-card-header-title) {
    font-size: 14px;
  }
}

.red {
  color: rgb(var(--danger-6));
}

.green {
  color: rgb(var(--green-3));
}
.ipt-box {
  margin-bottom: 10px;
}
</style>
