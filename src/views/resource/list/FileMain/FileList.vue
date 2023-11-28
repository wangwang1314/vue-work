<template>
  <div class="file-list">
    <a-table
      row-key="id"
      :scroll="{ x: '100%', y: '100%', minWidth: 600 }"
      :data="props.data"
      :bordered="false"
      :pagination="false"
      :row-selection="isBatchMode ? rowSelection : undefined"
    >
      <template #columns>
        <a-table-column title="序号" :width="80">
          <template #cell="{ record, rowIndex }">
            {{rowIndex + 1}}
          </template>
        </a-table-column>
        <a-table-column title="文档名称">
          <template #cell="{ record }">
            <a-trigger
              trigger="contextMenu"
              align-point
              animation-name="slide-dynamic-origin"
              auto-fit-transform-origin
              position="bl"
              update-at-scroll
            >
              <div class="file-name" @click="handleRowClick(record)">
                <span>{{ record.name }}</span>
              </div>
              <template #content>
                <FileRightMenu :file-info="record" @click="handleRightMenuItemClick($event, record)"></FileRightMenu>
              </template>
            </a-trigger>
          </template>
        </a-table-column>
        <a-table-column title="上传时间" data-index="updateTime" :width="200"></a-table-column>
        <a-table-column title="引用" data-index="extendName" :width="100"></a-table-column>
        <a-table-column title="操作" :width="200" align="center">
          <template #cell="{ record }">
            <a-popconfirm type="warning" content="您确定要删除该项吗?" @ok="delPro(record)">
              <a-button size="mini" type="text" status="danger">
                <template #icon><icon-delete :size="13" :stroke-width="3" /></template>
                <!-- <template #default>删除</template> -->
              </a-button>
            </a-popconfirm>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FileImg from './FileImg.vue'
import FileRightMenu from './FileRightMenu.vue'
import type { FileItem } from '@/apis'
import type { TableInstance, TableRowSelection } from '@arco-design/web-vue'

interface Props {
  data?: FileItem[]
  isBatchMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [], // 文件数据
  isBatchMode: false // 是否是批量模式
})

const rowSelection: TableRowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true
})

const emit = defineEmits(['click', 'right-menu-click'])

// 行点击事件
const handleRowClick = (row: FileItem) => {
  emit('click', row)
}

// 右键菜单点击事件
const handleRightMenuItemClick = (mode: string, item: FileItem) => {
  emit('right-menu-click', mode, item)
}
const delPro = (item: FileItem) => {

}
</script>

<style lang="scss">
.more-option {
  .arco-popover-content {
    margin-top: 0 !important;
  }
}
</style>

<style lang="scss" scoped>
:deep(.arco-table-td .arco-table-cell) {
  padding-top: 0;
  padding-bottom: 0;
}
.file-list {
  width: 100%;
  padding-top: 12px;
  overflow: hidden;
  .file-name {
    height: 100%;
    display: flex;
    align-items: center;
    padding-top: 6px;
    padding-bottom: 6px;
    cursor: pointer;
    .file-image {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}
</style>
