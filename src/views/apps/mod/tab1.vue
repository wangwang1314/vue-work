<template>
  <div class="app-tab1">
    <div class="app-list">
      <div class="app-item">
        <div class="top-box">
          <div class="img-box">
            <img src="@/assets/images/int/icon-1.png" alt="" />
          </div>
          <div class="top-text">
            <div class="tit">SSL安全认证</div>
            <div class="subtit">2000积分/年</div>
          </div>
        </div>
        <div class="center-box">
          为网站添加SSL安全证书，提高网站安全级别，同时有效提高搜索引擎友好度和访客信赖度。
          <span @click="godetail(1)">了解更多→</span>
        </div>
        <div class="btn-box">
          <div class="l-btn">申请开通</div>
        </div>
      </div>
      <div class="app-item">
        <div class="top-box">
          <div class="img-box">
            <img src="@/assets/images/int/icon-2.png" alt="" />
          </div>
          <div class="top-text">
            <div class="tit">企业邮箱</div>
            <div class="subtit">100积分/账号·年</div>
          </div>
        </div>
        <div class="center-box">
          为企业开通自身网站域名的企业邮局，提供专用后台，可灵活配置Foxmail、Exchange等客户端。
          <span @click="godetail(2)">了解更多→</span>
        </div>
        <div class="btn-box">
          <div class="l-btn">申请开通</div>
        </div>
      </div>
      <div class="app-item">
        <div class="top-box">
          <div class="img-box">
            <img src="@/assets/images/int/icon-3.png" alt="" />
          </div>
          <div class="top-text">
            <div class="tit">小语种</div>
            <div class="subtit">100积分/语言·年</div>
          </div>
        </div>
        <div class="center-box">
          英语国家以外的客户如何推广？语言障碍如何突破？我们提供一系列语言解决方案，多语言服务涵盖全球。
          <span @click="godetail(3)">了解更多→</span>
        </div>
        <div class="btn-box">
          <div class="l-btn">申请开通</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="appstab1">
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const godetail = (val) => {
  router.push({
    path: '/apps/detail' + val
  })
}
</script>

<style lang="scss" scoped>
.app-list {
  --yellow: rgb(255, 195, 74);
  display: flex;
  .app-item {
    width: calc(33.3% - 10.66px);
    margin-right: 16px;
    padding: 24px;
    border-radius: 8px;
    background: rgb(255, 255, 255);
    .top-box {
      display: flex;
      .img-box {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        margin-right: 16px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }
      .top-text {
        margin-top: 11px;
        .tit {
          color: var(--color-text-1);
          font-size: 20px;
          font-weight: 400;
          line-height: 28px;
        }
        .subtit {
          color: var(--yellow);
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
          margin-top: 8px;
        }
      }
    }
    .center-box {
      margin-top: 16px;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      min-height: 66px;
      span {
        color: rgb(var(--primary-6));
        cursor: pointer;
        user-select: none;
      }
    }
  }
  .app-item:last-child {
    margin-right: 0;
  }
}
.l-btn {
  text-align: center;
  border-radius: 2px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  background: var(--yellow);
  transition: all 0.3s;
  margin-top: 16px;
  span {
    margin-right: 10px;
  }
}
.l-btn.disabled {
  pointer-events: none;
}
.l-btn:hover {
  background: rgb(255, 172, 5);
}
.l-btn.grash {
  background: rgb(201, 205, 212);
  pointer-events: none;
}
.l-btn.grash:hover {
  opacity: 0.8;
}
</style>
