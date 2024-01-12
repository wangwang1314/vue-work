<template>
  <div class="file-aside" v-if="windowWidth > 715">
    <a-card title="资源管理" :bordered="false" :body-style="{ padding: 0 }">
      <a-menu
        :selected-keys="[currentKey]"
        :style="{ width: '280px', height: '100%', 'border-radius': '2px' }"
        :default-open-keys="['0']"
        :default-selected-keys="['0']"
      >
        <a-sub-menu key="0">
          <template #icon>
            <icon-apps></icon-apps>
          </template>
          <template #title>文件类型</template>
          <a-collapse
            :active-key="[activeKey]"
            class="cuscoll"
            v-model="currentKey"
            :default-active-key="['0']"
            :expand-icon-position="'right'"
            :bordered="false"
            accordion
          >
            <a-collapse-item
              v-for="item in fileTypeList"
              :key="item.value.toString()"
              :show-expand-icon="item.value != 2"
            >
              <template #header>
                <a-menu-item @click="onClickMenuItem(item)" :key="item.value.toString()">
                  <template #icon>
                    <GiSvgIcon :size="28" :name="item.menuIcon"></GiSvgIcon>
                  </template>
                  <span>{{ item.name }}</span>
                </a-menu-item>
              </template>
              <div class="file-box" v-if="item.value != 2">
                <div
                  class="file-item"
                  v-for="(sub, ind) in fileStore.grouplist[item.value]"
                  :key="item.id"
                  @click="groupFn(item, sub)"
                  @dblclick="showEdit(item, sub)"
                  :class="{ active: sub.id == groupId }"
                >
                  {{ sub.name
                  }}<span class="close-btn" @click.stop="delFn(sub)"><icon-close v-if="sub.id != 0" /></span>
                </div>
                <div class="file-item" @click="addGroup">
                  <icon-plus /><span style="margin-left: 4px">新建分组</span>
                </div>
              </div>
            </a-collapse-item>
          </a-collapse>
        </a-sub-menu>
      </a-menu>
    </a-card>

    <a-modal v-model:visible="visible" :mask-closable="false" :width="500" :title="showtitle">
      <template #footer>
        <a-button @click="visible = false">取消</a-button>
        <a-button type="primary" @click="handleBeforeOk">确认</a-button>
      </template>
      <a-form label-align="left" ref="formRef" auto-label-width :model="form" class="form" direction="inline">
        <a-form-item
          field="name"
          label="name"
          :hide-label="true"
          :rules="[{ required: true, message: '请输入分组名称' }]"
        >
          <a-input placeholder="请输入分组名称" v-model="form.name"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { fileTypeList, type fileTypeListItem } from '@/libs/file/file-map'
import { useFileStore } from '@/store'
import { Modal } from '@arco-design/web-vue'
import { propicturedelgroup, provideodelgroup, propicturesavegroupp, provideosavegroup } from '@/apis'
const route = useRoute()
const router = useRouter()
const fileStore = useFileStore()
const { width: windowWidth } = useWindowSize()
const visible = ref(false)
const currentKey = ref('0')
const activeKey = ref('0')
const groupId = ref('0')
// 监听路由变化
watch(
  () => route.query,
  () => {
    if (route.query.fileType) {
      currentKey.value = route.query.fileType.toString()
      activeKey.value = route.query.fileType.toString()
    }
    groupId.value = (route.query.groupId && route.query.groupId.toString()) || '0'
  },
  {
    immediate: true
  }
)
const emit = defineEmits(['change'])
// 点击事件
const onClickMenuItem = (item: fileTypeListItem) => {
  if (item.value == currentKey.value) {
    if (item.value == activeKey.value) {
      activeKey.value = '-1'
    } else {
      activeKey.value = currentKey.value
    }
  }
  router.push({ path: '/resource/list', query: { fileType: item.value } })
}
const groupFn = (item: fileTypeListItem, sub) => {
  groupId.value = sub.id
  router.push({ path: '/resource/list', query: { fileType: item.value, groupId: sub.id } })
}
const delFn = (item: fileTypeListItem) => {
  Modal.confirm({
    title: '提示',
    content: `您确定要删除吗？`,
    onOk: async () => {
      if (currentKey.value == '0') {
        const res = await propicturedelgroup({
          id: item.id
        })
        if (res.code == 0) {
          router.push({ path: '/resource/list', query: { fileType: item.value } })
          emit('change')
        }
      } else if (currentKey.value == '1') {
        const res = await provideodelgroup({
          id: item.id
        })
        if (res.code == 0) {
          router.push({ path: '/resource/list', query: { fileType: item.value } })
          emit('change')
        }
      }
    }
  })
}
const formRef = ref()
const addGroup = () => {
  showtitle.value = '新增分组'
  form.name = ''
  form.id = ''
  formRef.value?.resetFields()
  visible.value = true
}
const form = reactive({
  name: '',
  id: ''
})
const handleBeforeOk = () => {
  formRef.value?.validate(async (vali) => {
    if (vali) {
      return
    }
    const params = {
      name: form.name
    }
    if (form.id) {
      params.id = form.id
    }
    if (currentKey.value == '0') {
      const res = await propicturesavegroupp(params)
      if (res.code == 0) {
        visible.value = false
        emit('change')
      }
    } else if (currentKey.value == '1') {
      const res = await provideosavegroup(params)
      if (res.code == 0) {
        visible.value = false
        emit('change')
      }
    }
  })
}
const showtitle = ref('新增分组')
const showEdit = (item, sub) => {
  if (sub.id == 0) {
    return
  }
  form.name = sub.name
  form.id = sub.id
  showtitle.value = '编辑分组'
  visible.value = true
}
</script>

<style lang="scss" scoped>
:deep(.arco-card) {
  .arco-card-header {
    margin: 0 16px;
    padding-left: 0;
    padding-right: 0;
  }
}
.file-aside {
  // height: fit-content;
  margin: $margin 0 $margin $margin;
  background: var(--color-bg-1);
  border-radius: 2px;
  overflow: auto;
}
.cuscoll {
  :deep(.arco-collapse-item) {
    border: none;
    .arco-collapse-item-header-right {
      padding: 0;
      border: none;
      display: block;
    }
    .arco-collapse-item-icon-right {
      z-index: 2;
      pointer-events: none;
    }
    .arco-menu-vertical .arco-menu-item {
      margin-bottom: 0;
    }
    .arco-collapse-item-content-box {
      padding-left: 62px;
    }
  }
}
.file-item {
  white-space: nowrap;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 24px;
  padding: 0 20px 0 4px;
  position: relative;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: var(--color-fill-2);
    .close-btn {
      display: block;
    }
  }
  .close-btn {
    display: none;
    position: absolute;
    right: 4px;
    top: 0;
  }
}
.file-item.active {
  background-color: var(--color-fill-2);
}
</style>
