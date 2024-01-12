<template>
  <div class="tab2-box">
    <div class="tab2-list">
      <div class="item">
        <div class="top-img-box">
          <img src="@/assets/images/ai/card-1.png" alt="" />
        </div>
        <div class="tab-bot">
          <div class="tab-tag">{{ pricelists[0]?.name }}</div>
          <div class="price-box">
            <span class="unit">￥</span>
            <span class="count">{{ pricelists[0]?.price }}</span>
            <span class="years">/年</span>
          </div>
          <div class="tab-des">在Google/YouTube/TikTok获得共计至少{{ pricelists[0]?.keyword }}个关键词首页排名</div>
          <div class="tab-tips">赠送Ecer企业主页流量{{ pricelists[0]?.flow }}个，流量来源于宜选网、谷歌广告等</div>
          <div class="tab-btn" @click="open(0)" :class="{'grash': loading}">立即开通</div>
        </div>
      </div>
      <div class="item them-2">
        <div class="top-img-box">
          <img src="@/assets/images/ai/card-2.png" alt="" />
        </div>
        <div class="tab-bot">
          <div class="tab-tag">{{ pricelists[1]?.name }}</div>
          <div class="price-box">
            <span class="unit">￥</span>
            <span class="count">{{ pricelists[1]?.price }}</span>
            <span class="years">/年</span>
          </div>
          <div class="tab-des">在Google/YouTube/TikTok获得共计至少{{ pricelists[1]?.keyword }}个关键词首页排名</div>
          <div class="tab-tips">赠送Ecer企业主页流量{{ pricelists[1]?.flow }}个，流量来源于宜选网、谷歌广告等</div>
          <div class="tab-btn" @click="open(1)" :class="{'grash': loading}">立即开通</div>
        </div>
      </div>
      <div class="item them-3">
        <div class="top-img-box">
          <img src="@/assets/images/ai/card-3.png" alt="" />
        </div>
        <div class="tab-bot">
          <div class="tab-tag">{{ pricelists[2]?.name }}</div>
          <div class="price-box">
            <span class="unit">￥</span>
            <span class="count">{{ pricelists[2]?.price }}</span>
            <span class="years">/年</span>
          </div>
          <div class="tab-des">在Google/YouTube/TikTok获得共计至少{{ pricelists[2]?.keyword }}个关键词首页排名</div>
          <div class="tab-tips">赠送Ecer企业主页流量{{ pricelists[2]?.flow }}个，流量来源于宜选网、谷歌广告等</div>
          <div class="tab-btn" @click="open(2)" :class="{'grash': loading}">立即开通</div>
        </div>
      </div>
    </div>

    <a-modal v-model:visible="singePopup" class="mod-cus-success" :maskClosable="false" :width="400">
      <template #title><span></span></template>
      <div class="mod-box">
        <div class="dia-img-box">
          <img src="@/assets/images/ai/success.png" alt="" />
        </div>
        <div class="dia-tit">恭喜您!</div>
        <div class="dia-subtit">{{ aiobj.msg }}</div>
        <div class="dia-desc">{{ aiobj.date }}</div>
        <div class="l-btn" @click="hidedialog">我知道了</div>
      </div>
      <template #footer> </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts" name="tab2server">
import { defineProps, onMounted, ref, reactive } from 'vue'
import { seogetprice, seoopenaiservice } from '@/apis'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const singePopup = ref(false)
const aiobj = reactive({
  date: '',
  msg: ''
})
const loading = ref(false)
const emit = defineEmits(['change'])
const open = async (val) => {
  const map = {
    '0': 3,
    '1': 2,
    '2': 1
  }
  loading.value = true
  const res = await seoopenaiservice({
    type: map[val]
  }).finally(() => {
    loading.value = false
  })
  if (res.code == 0) {
    singePopup.value = true
    Object.assign(aiobj, res.data)
    userStore.getHomeinfo()
    emit('change')
  }
}
const hidedialog = () => {
  singePopup.value = false
}
const pricelists = ref([
  {
    name: '基础方案',
    price: 9800,
    keyword: 50,
    flow: 3000,
    type: 3
  },
  {
    name: '标准方案',
    price: 19800,
    keyword: 100,
    flow: 6000,
    type: 2
  },
  {
    name: '商务版',
    price: 39800,
    keyword: 200,
    flow: 12000,
    type: 1
  }
])
const props = defineProps({
  pricelist: Array
})
Object.assign(pricelists.value, props.pricelist)
</script>
<style lang="scss" scoped>
.tab2-box {
  padding: 48px 32px;
}
.tab2-list {
  display: flex;
  .item.them-2 {
    --them-color: rgb(96, 74, 232);
  }
  .item.them-3 {
    --them-color: rgb(143, 24, 255);
  }
  .item {
    --them-color: rgb(36, 139, 249);
    margin-right: 24px;
    width: calc(33.3% - 16px);
    border-radius: 16px;
    border: 1px solid rgb(229, 230, 235);
    background: rgb(255, 255, 255);
    .top-img-box {
      img {
        width: 100%;
        border-radius: 16px 16px 0 0;
      }
    }
    .tab-bot {
      padding: 40px 36px;
      word-break: break-word;
      text-align: center;
      .tab-tag {
        color: rgb(34, 34, 34);
        font-size: 24px;
        font-weight: 400;
        line-height: 32px;
      }
      .price-box {
        line-height: 100px;
        white-space: nowrap;
        height: 100px;
        .unit {
          color: var(--them-color);
          font-size: 16px;
          font-weight: 400;
          line-height: 72px;
          opacity: 0.88;
          position: relative;
          top: -32px;
        }
        .count {
          color: var(--them-color);
          font-size: 64px;
          font-weight: 400;
          line-height: 100px;
        }
        .years {
          opacity: 0.88;
          color: rgb(85, 85, 85);
          font-size: 16px;
          font-weight: 400;
          line-height: 68px;
        }
      }
      .tab-des {
        margin-top: 32px;
        color: rgb(78, 89, 105);
        font-size: 18px;
        font-weight: 400;
        line-height: 28px;
      }
      .tab-tips {
        color: rgb(134, 144, 156);
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        margin-top: 32px;
      }
      .tab-btn {
        border-radius: 8px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: var(--them-color);
        cursor: pointer;
        user-select: none;
        color: #fff;
        margin-top: 32px;
        font-size: 20px;
        font-weight: 400;
        &:hover {
          opacity: 0.9;
        }
      }
      .tab-btn.grash {
        opacity: 0.6;
        pointer-events: none;
      }
    }
  }
  .item:nth-child(3n) {
    margin-right: 0;
  }
}
.l-btn {
  text-align: center;
  border-radius: 8px;
  height: 48px;
  line-height: 48px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, rgb(43, 89, 255) 0%, rgb(105, 87, 255) 58.779%, rgb(167, 86, 255) 99.237%);
  transition: all 0.3s;
  width: 240px;
  margin: 0 auto;
  margin-top: 24px;
  font-size: 20px;
  font-weight: 400;
  span {
    margin-right: 10px;
  }
}
.l-btn.disabled {
  pointer-events: none;
}
.l-btn:hover {
  background: linear-gradient(135deg, rgb(0, 53, 245) 0%, rgb(105, 87, 255) 58.779%, rgb(158, 0, 255) 99.724%);
}
.l-btn.grash {
  background: rgb(201, 205, 212);
  pointer-events: none;
}
.l-btn.grash:hover {
  opacity: 0.9;
}
.mod-box {
  .dia-desc {
    color: rgb(134, 144, 156);
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    margin-top: 8px;
    text-align: center;
  }
  .dia-subtit {
    color: rgb(29, 33, 41);
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    margin-top: 24px;
    text-align: center;
  }
  .dia-tit {
    text-align: center;
    background: linear-gradient(135deg, rgb(43, 89, 255), rgb(105, 87, 255), rgb(167, 86, 255));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-size: 36px;
    font-weight: 400;
    line-height: 44px;
    margin-top: 24px;
  }
  .dia-img-box {
    font-size: 0;
    text-align: center;
    img {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
<style lang="scss">
.mod-cus-success {
  .arco-modal-header {
    display: none;
  }
  .arco-modal {
    border-radius: 8px;
    /* shadow/down（Handle） */
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
    background: rgb(255, 255, 255);
  }
  .arco-modal-footer {
    display: none;
  }
  .arco-modal:not(.arco-modal-simple) .arco-modal-body {
    padding: 40px 32px 40px 32px;
  }
}
</style>
