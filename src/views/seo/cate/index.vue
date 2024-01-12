<template>
  <div class="navlink">
    <div class="top-nav-tit">
      <div class="m-left">首页分类SEO</div>
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
              <a-table-column title="触发页面" data-index="id" :width="120" align="left">
                <template #cell="{ record }">
                  <div :class="'cell-cous-lever-' + (record.level ? record.level : '')">{{ record.name }}</div>
                </template>
              </a-table-column>
              <a-table-column title="是否手动添加" data-index="id" :width="100" align="left">
                <template #cell="{ record }">
                  <div>
                    {{ !record.isadd ? '否' : '是' }}
                  </div>
                </template>
              </a-table-column>
              <a-table-column title="启用自主编辑SEO" data-index="id" :width="100" align="center">
                <template #cell="{ record }">
                  <a-switch v-model="record.isuse" @change="changeFn(record)" :unchecked-value="0" :checked-value="1" />
                </template>
              </a-table-column>
              <a-table-column title="操作" data-index="id" :width="100" align="center">
                <template #cell="{ record }">
                  <a-button type="text" @click="showseo(record)">
                    <template #icon>
                      <icon-edit :size="18" />
                    </template>
                  </a-button>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </div>
    </div>

    <!-- seo弹框 -->
    <a-modal v-model:visible="seovisi" :width="650">
      <template #title>首页SEO手动编辑</template>
      <div>
        <a-form ref="formRef" :model="form" class="init-form" layout="vertical">
          <a-form-item field="title" label="SEO标题">
            <a-input v-model="form.title" placeholder="建议在80-120个字符之间。" show-word-limit max-length="120" />
          </a-form-item>
          <a-form-item field="keyword" label="SEO关键词">
            <a-input v-model="form.keyword" placeholder="建议设置3-5个单词，以英文逗号“,”分隔。" />
          </a-form-item>
          <a-form-item field="description" label="SEO描述">
            <a-textarea
              type="textarea"
              v-model="form.description"
              placeholder="建议在140-160个字符之间。"
              show-word-limit
              max-length="160"
              :auto-size="{
                minRows: 4
              }"
            />
          </a-form-item>
        </a-form>
      </div>
      <template #footer>
        <a-button @click="seovisi = false" :disabled="btnloading">取消</a-button>
        <a-button type="primary" @click="seoconfirm" :disabled="btnloading">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts" name="Navlink">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import { Message, Form } from '@arco-design/web-vue'
import { prWebsetNav, prWebsetSaveNav, seolist, seoopseo, getSeo, setSeo } from '@/apis'
const router = useRouter()
const userStore = useUserStore()
const navTabStore = useNavTabStore()
const tableData = ref([])
const loading = ref(false)
const getTableDate = async () => {
  loading.value = true
  const res = await seolist().finally(() => {
    loading.value = false
  })
  if (res.code == 0) {
    tableData.value = res.data
  }
}
getTableDate()
const changeFn = async (item) => {
  const { isuse, sid, page } = item

  const res = await seoopseo({
    sid,
    page,
    state: isuse
  })
  if (res.code == 0) {
    Message.success(res.message || '操作成功')
  }
}

const form = reactive({
  title: '',
  keyword: '',
  description: ''
})
const seovisi = ref(false)
const currentitem = ref({})
const formRef = ref()
const showseo = async (item) => {
  formRef.value.resetFields()
  const { sid, page } = item
  currentitem.value = item
  const res = await getSeo({
    page,
    sid
  })
  if (res.code == 0 && res.data) {
    const { title, keyword, description } = res.data
    Object.assign(form, { title, keyword, description })
  }
  seovisi.value = true
}
const seoconfirm = async () => {
  const { page, sid } = currentitem.value
  const res = await setSeo({
    title: form.title,
    desc: form.description,
    keyword: form.keyword,
    page,
    sid
  })
  if (res.code == 0) {
    seovisi.value = false
    Message.success(res.message || '操作成功')
  }
}
const btnloading = ref(false)
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
