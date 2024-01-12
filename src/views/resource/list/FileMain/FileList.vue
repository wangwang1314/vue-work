<template>
  <div class="file-list">
    <a-table
      row-key="id"
      size="small"
      :scroll="{ x: '100%', y: '100%', minWidth: 600 }"
      :data="props.data"
      :bordered="false"
      :pagination="false"
      :row-selection="rowSelection"
      @selection-change="selectionChange"
    >
      <template #columns>
        <!-- <a-table-column title="序号" :width="80">
          <template #cell="{ record, rowIndex }">
            {{rowIndex + 1}}
          </template>
        </a-table-column> -->
        <a-table-column title="文档名称" :width="200" align="left">
          <template #cell="{ record }">
            <a-link class="file-name" style="font-size: 12px;" :href="prefix + record.docpath + '/' + record.docname">
              {{ record.docname }}
            </a-link>
          </template>
        </a-table-column>
        <a-table-column title="文档大小" data-index="updateTime" :width="100">
          <template #cell="{ record }">
            {{ record.docsize }}
          </template>
        </a-table-column>
        <a-table-column title="引用次数" data-index="extendName" :width="80">
          <template #cell="{ record }">
            {{ record.usedcnt }}
          </template>
        </a-table-column>
        <a-table-column title="上传时间" data-index="updateTime" :width="200">
          <template #cell="{ record }">
            {{ record.addtime }}
          </template>
        </a-table-column>
       
        <a-table-column title="操作" :width="120" align="center">
          <template #cell="{ record }">
            <a-button size="mini" type="text" @click="downloadSign(record)">
              <icon-download :size="13" :stroke-width="3" />
              </a-button>
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
import { proDocumentDel } from '@/apis'
import { Message, Modal } from '@arco-design/web-vue'
const prefix = import.meta.env.VITE_API_PREFIX
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

const emit = defineEmits(['click', 'right-menu-click', 'update', 'selectchange'])

// 行点击事件
const handleRowClick = (row: FileItem) => {
  emit('click', row)
}

// 右键菜单点击事件
const handleRightMenuItemClick = (mode: string, item: FileItem) => {
  emit('right-menu-click', mode, item)
}
const delPro = (item: FileItem) => {
  const tips = '删除文档后，插入文档超链接处不能再选择此文档，确认删除吗？'
  Modal.warning({
    title: '提示',
    content: tips,
    hideCancel: false,
    onClose: function () {
      // console.log('关闭')
    },
    onOk: async () => {
      // console.log('确定')
      const res = await proDocumentDel({ids: [item.id]})
      if (res.code == 0) {
        emit('update')
      }
    }
  })
}
const selectionChange = (list) => {
  emit('selectchange', list)
}
const downloadSign = (item) => {
  location.href = prefix + item.docpath + '/' + item.docname
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
