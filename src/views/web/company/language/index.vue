<template>
  <div class="msg-detail-out">
    <div class="top-nav-tit">
      <div class="m-left">访问设置</div>
      <div class="m-right"></div>
    </div>
    <div class="msg-detail detail">
      <a-form :model="form" layout="vertical" :auto-label-width="true">
        <a-card :bordered="false" title="网站语言">
          <a-checkbox :value="1" v-model="form.langstate" style="margin: -10px 0 16px 0"
            >是否关闭其他语言网站（关闭其他语言后，网站不可切换其他语言）</a-checkbox
          >
          <a-form-item label="网站语言" :hide-label="true" :content-flex="false">
            <a-radio-group v-model="form.defaultlang">
              <template v-for="item in form.langs" :key="item">
                <a-radio :value="item.langname">
                  <template #radio="{ checked }">
                    <a-space align="start" class="custom-radio-card" :class="{ 'custom-radio-card-checked': checked }">
                      <div className="custom-radio-card-mask">
                        <div className="custom-radio-card-mask-dot" />
                      </div>
                      <div>
                        <div className="custom-radio-card-title">{{ item.name }}</div>
                      </div>
                    </a-space>
                  </template>
                </a-radio>
              </template>
            </a-radio-group>
          </a-form-item>
        </a-card>
        <a-card :bordered="false" title="屏蔽国内">
          <a-form-item label="屏蔽国内" :hide-label="true" :content-flex="false">
            <a-radio-group v-model="form.maskchina">
              <a-radio :value="0">
                <template #radio="{ checked }">
                  <a-space align="start" class="custom-radio-card" :class="{ 'custom-radio-card-checked': checked }">
                    <div className="custom-radio-card-mask">
                      <div className="custom-radio-card-mask-dot" />
                    </div>
                    <div>
                      <div className="custom-radio-card-title">允许全球访问</div>
                    </div>
                  </a-space>
                </template>
              </a-radio>
              <a-radio :value="1">
                <template #radio="{ checked }">
                  <a-space align="start" class="custom-radio-card" :class="{ 'custom-radio-card-checked': checked }">
                    <div className="custom-radio-card-mask">
                      <div className="custom-radio-card-mask-dot" />
                    </div>
                    <div>
                      <div className="custom-radio-card-title">屏蔽国内访问</div>
                    </div>
                  </a-space>
                </template>
              </a-radio>
            </a-radio-group>
            <div class="tip-box">
              <p>说明：</p>

              <p>1、设置屏蔽国内访问，意味着从大陆地区，大部分用户、爬虫无法访问您的网站。</p>

              <p>2、设置屏蔽国内访问，会影响您网站推广效果，请慎重使用。</p>

              <p>3、屏蔽国内访问只对您的线上网站有效，您仍然可以通过 预览网站 查看您的网站。</p>
              <p>4、设置屏蔽国内访问后将在审核通过后24小时生效。</p>
            </div>
          </a-form-item>
        </a-card>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts" name="adv">
import { reactive, ref, h, nextTick } from 'vue'
import { companygetlanguage, companysavelanguage } from '@/apis'
import { Message } from '@arco-design/web-vue'
const baseURL = import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_BASE_AJAX
const picUploadUrl = baseURL + '?r=picture/upload'
import { useUserStore, useFileStore } from '@/store'


const fileStore = useFileStore()
const form = reactive({
  defaultlang: '',
  langs: [],
  langstate: 0,
  maskchina: 0
})
const saveFn = async () => {
  fileStore.setloading(true)
  const {defaultlang, langstate, maskchina} = form
  const res = await companysavelanguage({
    defaultlang,
    langstate: langstate?1:0,
    maskchina
  }).finally(() => {
    fileStore.setloading(false)
  })
  if (res.code == 0) {
    Message.success(res.message || '操作成功')
  }
}
const getData = async () => {
  const res = await companygetlanguage({})
  if (res.code == 0) {
    res.data.langstate = Boolean(res.data?.langstate)
    Object.assign(form, res.data)
  }
}
getData()

fileStore.$onAction(({ name }) => {
  if (name === 'cancel') {
    getData()
  } else if (name === 'save') {
    saveFn()
  }
})
</script>
<style lang="scss" scoped>
@import './mod/index.scss';
</style>
