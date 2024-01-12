<template>
  <div class="app-detail">
    <div class="app-inner">
      <div class="app-head">
        <div class="img-text">
          <div class="icon-box">
            <img src="@/assets/images/int/icon-2.png" alt="" />
          </div>
          <div class="text-wrap">
            <div class="tit">企业邮箱</div>
            <div class="sub-tit">拥有企业自身网站域名的企业邮局，提高信任度，更可灵活配置Foxmail、Exchange等客户端。</div>
          </div>
        </div>
        <div class="tip-wrap">
          <div class="tip-tit">服务内容</div>
          <div class="tip-sutit">为企业开通自身网站域名的企业邮局。</div>
        </div>
        <div class="tip-wrap">
          <div class="tip-tit">服务价格</div>
          <div class="tip-price">100积分/账号·年</div>
        </div>
        <div class="l-btn">申请开通</div>
      </div>
      <div class="list-wrap">
        <div class="list-item">
          <div class="img-inner">
            <img src="@/assets/images/int/detail2-1.png" alt="" />
          </div>
          <div class="text-wrap">
            <div class="tit">全面体现企业形象</div>
            <div class="sub-tit">
              <p>
                以企业域名为邮箱后缀，树立统一的企业形象，方便企业形象推广。有了企业邮箱，日常通信中可以毫不费力的宣传自己。
              </p>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="text-wrap">
            <div class="tit">更稳定、更安全</div>
            <div class="sub-tit">
              <p>
                优于个人邮箱的安全性、稳定性，企业邮箱在安全、稳定以及防病毒、反垃圾邮件功能方面远高于个人邮箱，更适合企业商务使用。
              </p>
            </div>
          </div>
          <div class="img-inner">
            <img src="@/assets/images/int/detail2-2.png" alt="" />
          </div>
        </div>
        <div class="list-item">
          <div class="img-inner">
            <img src="@/assets/images/int/detail2-3.png" alt="" />
          </div>
          <div class="text-wrap">
            <div class="tit">邮件收发方便</div>
            <div class="sub-tit">
              <p>
                企业邮箱可以通过WEB方式和客户端软件来收发邮件，支持POP3/EMAIL协议，支持Outlook、Foxmail等多数邮件客户端程序，满足不同用户的使用习惯，使得电子邮件的使用和管理更为方便。
              </p>
            </div>
          </div>
        </div>
        <div class="list-item">
         
          <div class="text-wrap">
            <div class="tit">专业技术服务</div>
            <div class="sub-tit">
              <p>
                Google 企业邮箱服务具有专业的技术队伍，可以是通信过程中的企业资料和商务信息得到最大程度的保护。
              </p>
            </div>
          </div>
          <div class="img-inner">
            <img src="@/assets/images/int/detail2-4.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="app-detail2">
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import { Message, Form } from '@arco-design/web-vue'
import { prWebsetNav, prWebsetSaveNav } from '@/apis'
import { usePagination } from '@/hooks'
const router = useRouter()
const userStore = useUserStore()
const navTabStore = useNavTabStore()
</script>

<style lang="scss" scoped>
@import '../mod/detail.scss';
</style>
