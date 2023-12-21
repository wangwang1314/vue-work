<template>
  <div class="navlink">
    <div class="top-nav-tit">
      <div class="m-left">导航定义</div>
      <div class="m-right"></div>
    </div>
    <div class="table-wrap">
      <div class="table-page">
        <div class="table-inner">
          <a-table
            row-key="id"
            size="small"
            page-position="br"
            :bordered="{ cell: true }"
            :loading="loading"
            :data="tableData"
            :pagination="false"
            :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
            class="coustom-table"
          >
            <template #columns>
              <a-table-column title="页面名称" data-index="id" :width="100" align="left">
                <template #cell="{ record }">
                  <div class="pro-id">{{ record.page_name }}</div>
                </template>
              </a-table-column>
              <a-table-column title="导航标题（英文）" data-index="id" :width="100" align="left">
                <template #cell="{ record }">
                  <div class="ipt-box" v-if="record.tag1">
                    <a-input size="small" style="width: 140px" v-model="record.english"></a-input>
                    <icon-check class="i-icon" size="16" @click="confirm(record, 'tag1')" />
                  </div>
                  <div class="ipt-label" v-else>
                    {{ record.english }} <icon-edit class="i-icon" size="14" @click="showtag(record, 'tag1')" />
                  </div>
                </template>
              </a-table-column>
              <a-table-column title="导航标题（中文）" data-index="id" :width="100" align="left">
                <template #cell="{ record }">
                  <div class="ipt-box" v-if="record.tag2">
                    <a-input size="small" style="width: 140px" v-model="record.china"></a-input>
                    <icon-check class="i-icon" size="16" @click="confirm(record, 'tag2')" />
                  </div>
                  <div class="ipt-label" v-else>
                    {{ record.china }} <icon-edit class="i-icon" size="14" @click="showtag(record, 'tag2')" />
                  </div>
                </template>
              </a-table-column>
              <a-table-column title="顶部导航" data-index="id" :width="80" align="left">
                <template #cell="{ record }">
                  <a-checkbox v-model="record.isheader" @change="changeFn(record)"></a-checkbox>
                </template>
              </a-table-column>
              <a-table-column title="底部导航" data-index="id" :width="80" align="left">
                <template #cell="{ record }">
                  <a-checkbox v-model="record.isfooter" @change="changeFn(record)"></a-checkbox>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Navlink">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import { Message, Form } from '@arco-design/web-vue'
import { prWebsetNav, prWebsetSaveNav } from '@/apis'
const router = useRouter()
const userStore = useUserStore()
const navTabStore = useNavTabStore()
const tableData = ref([])
const loading = ref(false)
const getTableDate = async () => {
  loading.value = true
  const res = await prWebsetNav().finally(() => {
    loading.value = false
  })
  if (res.code == 0) {
    res.data.nav.forEach((item) => {
      if (item.isfooter == 0) {
        item.isfooter = false
      } else {
        item.isfooter = true
      }
      if (item.isheader == 0) {
        item.isheader = false
      } else {
        item.isheader = true
      }
    })
    tableData.value = res.data.nav
  }
}
getTableDate()
const changeFn = (item) => {
  changeajax(item, true)
}
const showtag = (item, tag) => {
  if (tag == 'tag1') {
    item.tag1 = !item.tag1
  } else {
    item.tag2 = !item.tag2
  }
}
const confirm =  (item, tag) => {
  if (tag == 'tag1') {
    item.tag1 = !item.tag1
  } else {
    item.tag2 = !item.tag2
  }
  changeajax(item, true)
}
const changeajax = async(item, istip) => {
  const { controller, action, english, china, isfooter, isheader } = item
  const res = await prWebsetSaveNav({
    controller,
    action,
    english,
    china,
    isfooter: isfooter ? 1 : 0,
    isheader: isheader ? 1 : 0
  })
  if (res.code == 0 && istip) {
    Message.success(res.message || '操作成功')
  }
}
</script>

<style lang="scss" scoped>
@import './mod/index.scss';
.ipt-label {
  height: 28px;
  display: flex;
  align-items: center;
  .i-icon {
    display: none;
    margin-left: 6px;
    cursor: pointer;
    color: rgb(var(--primary-6));
  }
  &:hover {
    .i-icon {
      display: block;
    }
  }
}
.ipt-box {
  display: flex;
  align-items: center;
  .i-icon {
    margin-left: 6px;
    cursor: pointer;
    color: rgb(var(--primary-6));
  }
  :deep(.arco-input-size-small) {
    font-size: 12px;
  }
}
</style>
