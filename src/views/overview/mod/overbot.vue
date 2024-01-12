<template>
  <div class="over-bot">
    <div class="tab-wrap">
      <div class="left">
        <div
          class="l-item"
          @click="changeStep(index)"
          :class="{ active: step == index }"
          v-for="(item, index) in tabArr"
          :key="index"
        >
          <i></i><span>{{ item }}</span>
        </div>
      </div>
      <div class="right">
        <div class="right-content">
          <div class="content-item" v-show="step == 0">
            <div class="text">
              完善产品的多样性、差异化，定期发布高质量的产品内容，可以增加网站活跃度，更容易让爬虫光顾您的网站，达到收录的目的。
            </div>
            <div class="l-btn s" @click="goproduct"><span>产品添加</span><icon-arrow-right /></div>
          </div>
          <div class="content-item" v-show="step == 1">
            <div class="text">
              真实有效的公司信息往往更能给访客提供足够的信任感、安全感，并且有利于品牌推广，让访客对公司的产品产生好感。
            </div>
            <div class="l-btn s" @click="gocompany"><span>立即完善</span><icon-arrow-right /></div>
          </div>
          <div class="content-item" v-show="step == 2">
            <div class="text">
              利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名。目的是让其在行业内占据领先地位，获得品牌收益。所以优化SEO势在必行
            </div>
            <div class="l-btn s" @click="goai"><span>立即优化</span><icon-arrow-right /></div>
          </div>
          <div class="content-item" v-show="step == 3">
            <div class="text">
              为了您的网站吸引更多流量，被更多的目标人群所接收，建议您开通广告投放服务，让更专业的团队为您服务，从而获取更多收益。
            </div>
            <div class="l-btn s"><span>立即开通</span><icon-arrow-right /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Overbot">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import type { LoginParams } from '@/apis'
const router = useRouter()
const userStore = useUserStore()
const step = ref(0)
const tabArr = ref(['发布产品', '完善公司资料', '提升SEO效果', '广告投放'])
const changeStep = (val) => {
  step.value = val
}
const goproduct = () => {
  router.push({ path: '/web/webproduct/detail' })
}
const gocompany = () => {
  router.push({ path: '/web/company/intro' })
}
const goai = () => {
  router.push({ path: '/seo/ai' })
}
</script>
<style lang="scss" scoped>
.tab-wrap {
  border-radius: 8px;
  background: rgb(255, 255, 255);
  height: 256px;
  display: flex;
  margin-top: 16px;
  .left {
    width: 220px;
    min-width: 220px;
    box-sizing: border-box;
    background: rgb(230, 236, 255);
    padding: 16px 0px 16px 16px;
    border-radius: 8px 0px 0px 8px;
    .l-item {
      border-radius: 8px 0px 0px 8px;
      /* 填充/Fill-1 */
      display: flex;
      align-items: center;
      height: 56px;
      padding-left: 20px;
      color: var(--color-text-4);
      font-size: 16px;
      user-select: none;
      cursor: pointer;
      span {
        line-height: 24px;
      }
      i {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 16px;
      }
    }
    .l-item:nth-child(1) {
      i {
        background: url('@/assets/images/pro/addpro.png') no-repeat;
        background-size: cover;
      }
    }
    .l-item:nth-child(2) {
      i {
        background: url('@/assets/images/pro/info.png') no-repeat;
        background-size: cover;
      }
    }
    .l-item:nth-child(3) {
      i {
        background: url('@/assets/images/pro/seo.png') no-repeat;
        background-size: cover;
      }
    }
    .l-item:nth-child(4) {
      i {
        background: url('@/assets/images/pro/ads.png') no-repeat;
        background-size: cover;
      }
    }
    .l-item.active {
      background: rgb(255, 255, 255);
      color: var(--color-text-1);
      font-weight: bold;
    }
  }
  .right {
    flex: 1;
    .right-content {
      height: 100%;
      .content-item {
        height: 100%;
        padding-left: 40px;
        padding-top: 32px;
        box-sizing: border-box;
        .text {
          width: 400px;
          color: var(--color-text-4);
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
          padding-top: 28px;
          position: relative;
          &::before {
            content: '';
            display: block;
            width: 32px;
            height: 4px;
            border-radius: 2px;
            position: absolute;
            left: 0;
            top: 0;
            background: linear-gradient(
              135deg,
              rgb(43, 89, 255) 0%,
              rgb(105, 87, 255) 58.779%,
              rgb(167, 86, 255) 99.237%
            );
          }
        }
      }
      .content-item:nth-child(1) {
        background: url('@/assets/images/products.png') no-repeat;
        background-position: top right;
        background-size: auto 100%;
      }
      .content-item:nth-child(2) {
        background: url('@/assets/images/company_info.png') no-repeat;
        background-position: top right;
        background-size: auto 100%;
      }
      .content-item:nth-child(3) {
        background: url('@/assets/images/seo.png') no-repeat;
        background-position: top right;
        background-size: auto 100%;
      }
      .content-item:nth-child(4) {
        background: url('@/assets/images/ads.png') no-repeat;
        background-position: top right;
        background-size: auto 100%;
      }
    }
  }
}
.l-btn {
  text-align: center;
  border-radius: 2px;
  height: 48px;
  line-height: 48px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  background: linear-gradient(135deg, rgb(43, 89, 255) 0%, rgb(105, 87, 255) 58.779%, rgb(167, 86, 255) 99.237%);
  transition: all 0.3s;
  margin-top: 44px;
  span {
    margin-right: 10px;
  }
}
.l-btn.s {
  width: 160px;
  height: 36px;
  line-height: 36px;
}
.l-btn.disabled {
  pointer-events: none;
}
.l-btn:hover {
  background: linear-gradient(135deg, rgb(0, 53, 245) 0%, rgb(105, 87, 255) 58.779%, rgb(158, 0, 255) 99.724%);
}
.l-btn.grash {
  background: rgb(201, 205, 212);
}
.l-btn.grash:hover {
  opacity: 0.9;
}
</style>
