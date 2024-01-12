<template>
  <div class="app-detail">
    <div class="app-inner">
      <div class="app-head">
        <div class="img-text">
          <div class="icon-box">
            <img src="@/assets/images/int/icon-1.png" alt="" />
          </div>
          <div class="text-wrap">
            <div class="tit">SSL安全认证</div>
            <div class="sub-tit">为网站添加SSL安全证书，提高网站安全级别，同时有效提高搜索引擎友好度和访客信赖度。</div>
          </div>
        </div>
        <div class="tip-wrap">
          <div class="tip-tit">服务内容</div>
          <div class="tip-sutit">对网站主站和移动站添加SSL安全证书，支持https访问。</div>
        </div>
        <div class="tip-wrap">
          <div class="tip-tit">服务价格</div>
          <div class="tip-price">2000积分/年</div>
        </div>
        <div class="l-btn">申请开通</div>
      </div>
      <div class="list-wrap">
        <div class="list-item">
          <div class="img-inner">
            <img src="@/assets/images/int/detail1-1.png" alt="" />
          </div>
          <div class="text-wrap">
            <div class="tit">SSL证书有效进行网站数据保护</div>
            <div class="sub-tit">
              <p>
                SSL可在用户和服务器之间实现加密通信。可以有效降低黑客和身份窃贼盗取或篡改敏感信息（如，信用卡号、用户名、密码、电子邮件、交易金额等）的风险。
              </p>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="text-wrap">
            <div class="tit">保障用户隐私信息安全</div>
            <div class="sub-tit">
              <p>
                所有的
                SSL证书都使用256位的点对点加密技术让网站实现加密传输，可以很好的防止用户隐私信息如用户名、密码、交易记录、居住信息等被窃取和纂改。
              </p>
              <p>
                比如电商网站安装SSL证书，就可以有效保障你登录电商网站支付时提交的用户名密码的安全。用户会觉得在您的网站上购物。
              </p>
            </div>
          </div>
          <div class="img-inner">
            <img src="@/assets/images/int/detail1-2.png" alt="" />
          </div>
        </div>
        <div class="list-item">
          <div class="img-inner">
            <img src="@/assets/images/int/detail1-3.png" alt="" />
          </div>
          <div class="text-wrap">
            <div class="tit">提升公司品牌形象和客户信任度</div>
            <div class="sub-tit">
              <p>
                所有的 口碑就是企业的所有，如果您想在网络上成功，那么您的企业口碑需要被保护起来。网站部署 SSL
                证书，让您的网站与其他网站与众不同。
              </p>
              <p>
                通过 SSL
                证书这一方式，可告诉用户其访问的是安全、可信的站点，可以放心的进行操作和交易，有效提升公司的品牌信息。
              </p>
            </div>
          </div>
        </div>
        <div class="list-item">
         
          <div class="text-wrap">
            <div class="tit">谷歌浏览器地址栏显示网站安全</div>
            <div class="sub-tit">
              <p>
                Google Chrome把没有使用HTTPS连接的网站标识为“不安全”的。这些网站包括那些没有使用加密的网站和提供不安全链接下载的网站。
              </p>
            </div>
          </div>
          <div class="img-inner">
            <img src="@/assets/images/int/detail1-4.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="app-detail1">
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
