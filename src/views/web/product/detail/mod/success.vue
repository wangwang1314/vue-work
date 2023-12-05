<template>
  <div class="pub-success">
    <div class="su-top">
      <div>
        <span class="su-tit"><icon-check-circle-fill class="icon" />恭喜！产品发布成功</span>
        <a-button type="text" class="font-14" @click="preview">预览</a-button>
      </div>
      <!-- <div class="sub-tit">
        产品信息还有如下改进空间：<a-button type="text" @click="goPro('edit')">返回修改</a-button>
      </div> -->
      <!-- <div class="item-wrap">
        <div class="item" v-show="!info.reason.title">产品标题：包含卖点过少；产品标题过短；</div>
        <div class="item" v-show="!info.reason.picture">产品图片：建议您通过多张、多维度的产品图片向卖家介绍产品；</div>
        <div class="item" v-show="!info.reason.details">产品属性：建议您设置热门产品属性，方便卖家阅读；</div>
        <div class="item" v-show="!info.reason.remark">
          产品描述：建议您通过表格丰富产品描述形态；建议您在描述中增加图片；建议您增加产品描述文字；
        </div>
      </div> -->
    </div>
    <div class="su-bottom">
      <div class="edit-set">
        编辑产品： <a-button type="text" @click="goPro('copy')">以此为模板发布新产品</a-button>
        <a-button type="text" @click="goPro('add')">发布新产品</a-button>
        <a-button type="text" @click="goPro('edit')">返回修改</a-button>
      </div>
      <div class="pro-set">
        产品列表： <a-button type="text" @click="golist({})">返回产品列表</a-button>
        <a-button type="text" @click="golist(info)">返回产品所在分类</a-button>
      </div>
      <div class="tips">
        提示：统计数据显示，每多发布<span class="warning-color">20</span>条产品，可多获得<span class="warning-color"
          >5</span
        >倍 以上的买家访问机会。
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="successTpl">
import { ref, reactive, createApp, watch, defineProps, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const router = useRouter()
const baseURL = import.meta.env.VITE_ROURE_BASE_URL
interface infoObj {
  id: string
  cateid: string
  url: string
}
const props = defineProps(['info'])
const golist = (info) => {
  router.push({ path: '/web/webproduct/list', query: { category_id: info.cateid } })
}
const goPro = (type: string) => {
  const timer = String(new Date().getTime())
  if (type === 'copy') {
    router.push({
      path: '/web/webproduct/detail',
      query: {
        type: 'copy',
        id: props.info.id,
        timer
      }
    })

    // window.location.href = baseURL + '/web/webproduct/detail?type=copy&id=' + props.info.id
  } else if (type === 'edit') {
    router.push({
      path: '/web/webproduct/detail',
      query: {
        id: props.info.id,
        timer
      }
    })
    // window.location.href = baseURL + '/web/webproduct/detail?id=' + props.info.id
  } else {
    router.push({
      path: '/web/webproduct/detail',
      query: {
        timer
      }
    })
    // window.location.href = baseURL + '/web/webproduct/detail'
  }
  userStore.setShowMain(false)
  nextTick(() => {
    userStore.setShowMain(true)
  })
}
const preview = () => {
  window.open(props.info.url, '_blank')
}
</script>
<style lang="scss" scoped>
.pub-success {
  background: var(--color-bg-1);
  margin: 0 0 var(--margin) 0;
  padding: var(--padding);
  border-radius: 2px;
  font-size: 12px;
  height: calc(100vh - 166px);
}
.warning-color {
  color: var(--red-init);
}
.su-tit {
  font-size: 28px;
  .icon {
    font-size: 30px;
    position: relative;
    top: 2px;
    color: var(--orange-init);
    margin-right: 2px;
  }
}
.pub-success .arco-btn-size-medium {
  font-size: 12px;
}
.pub-success .font-14 {
  font-size: 14px;
}
.item-wrap {
  padding-left: 16px;
  .item {
    position: relative;
    color: var(--color-text-3);
    line-height: 25px;
    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      background: var(--color-text-3);
      border-radius: 50%;
      position: absolute;
      top: 10px;
      left: -11px;
    }
  }
}
.su-top {
  padding-left: 76px;
  padding-top: 50px;
}
.su-bottom {
  padding-left: 76px;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid var(--border-color-1);
}
.pro-set {
  margin-top: -5px;
}
.tips {
  margin-top: 5px;
}
</style>
