<template>
  <div class="inner-wrap">
    <div class="tit"><i></i><span>恭喜您，上线审核通过！</span></div>
    <div class="sub-tit">请在您的***.com域名管理后台进行如下记录设置，以完成域名最终链接</div>
    <table>
      <thead>
        <tr>
          <td>记录类型</td>
          <td>主机记录</td>
          <td>解析线路</td>
          <td>记录值</td>
          <td>MX优先级</td>
          <td>TTL</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A</td>
          <td>@</td>
          <td>默认</td>
          <td>52.116.230.100</td>
          <td>--</td>
          <td>10分钟</td>
        </tr>
        <tr>
          <td>A</td>
          <td>www</td>
          <td>默认</td>
          <td>52.116.230.100</td>
          <td>--</td>
          <td>10分钟</td>
        </tr>
        <tr>
          <td>A</td>
          <td>www</td>
          <td>默认</td>
          <td>52.116.230.100</td>
          <td>--</td>
          <td>10分钟</td>
        </tr>
      </tbody>
    </table>
    <div class="e-btn"><icon-find-replace /><span>配置检测</span></div>
  </div>
</template>
<script setup lang="ts" name="exa3">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import type { LoginParams } from '@/apis'
const router = useRouter()
const userStore = useUserStore()

</script>
<style lang="scss" scoped>
@import './common.scss';
.inner-wrap {
  padding: 32px 0 0 48px;
  .tit {
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    i {
      height: 32px;
      width: 32px;
      display: inline-block;
      margin-right: 4px;
      background: url('@/assets/images/excellence.png') no-repeat;
      background-size: cover;
      vertical-align: top;
    }
  }
  .sub-tit {
    color: rgba(255, 255, 255, 0.64);
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    margin-top: 8px;
  }
  .e-btn {
    margin-top: 20px;
  }
  table {
    margin-top: 16px;
    border-collapse: collapse;
    width: 527px;
    color: #fff;
    text-align: center;
    td {
      padding: 0 4px;
    }
    thead {
      td {
        background: rgba(255, 255, 255, 0.4);
        height: 24px;
        line-height: 24px;
      }
    }
    tbody {
      td {
        background: rgba(255, 255, 255, 0.16);
        height: 24px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.64);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
    }
  }
}
</style>