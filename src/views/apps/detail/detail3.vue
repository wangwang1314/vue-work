<template>
  <div class="app-detail">
    <div class="app-inner">
      <div class="app-head">
        <div class="img-text">
          <div class="icon-box">
            <img src="@/assets/images/int/icon-3.png" alt="" />
          </div>
          <div class="text-wrap">
            <div class="tit">小语种</div>
            <div class="sub-tit">含英语、法语、德语、西班牙语、葡萄牙语、俄语、日语、韩语等20+多个语种的网站</div>
          </div>
        </div>
        <div class="tip-wrap">
          <div class="tip-tit">服务内容</div>
          <div class="tip-sutit">包含 法语、德语、西班牙语、葡萄牙语、俄语、日语、韩语、希腊语、意大利语、荷兰语、阿拉伯语、印地语、土耳其语、印度尼西亚语、泰语、越南语、波兰语</div>
        </div>
        <div class="tip-wrap">
          <div class="tip-tit">服务价格</div>
          <div class="tip-price">100积分/1语言·年</div>
          <div class="tip-price">900积分/语言包A（10种语言）·年</div>
          <div class="tip-price">1580积分/语言包B（20种语言）·年</div>
        </div>
        <div class="l-btn">申请开通</div>
      </div>
      <div class="list-wrap">
        <div class="list-item">
          <div class="img-inner">
            <img src="@/assets/images/int/detail3-1.png" alt="" />
          </div>
          <div class="text-wrap">
            <div class="tit">覆盖主流语种国家</div>
            <div class="sub-tit">
              <p>
                宜选提供法语、德语、西班牙语、葡萄牙语、俄语、日语、韩语、希腊语、意大利语、荷兰语，覆盖了主流外贸经济体区。
              </p>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="text-wrap">
            <div class="tit">布局“一带一路”经济区域</div>
            <div class="sub-tit">
              <p>
                我国“一带一路”的战略布局，为这些经济体的外贸经济发展迎来了千载难逢的契机，宜选也推出了阿拉伯语、印地语、土耳其语、印度尼西亚语、泰语、越南语、波兰语、波斯语、孟加拉语。
              </p>

            </div>
          </div>
          <div class="img-inner">
            <img src="@/assets/images/int/detail3-2.png" alt="" />
          </div>
        </div>
        <div class="list-item">
          <div class="img-inner">
            <img src="@/assets/images/int/detail3-3.png" alt="" />
          </div>
          <div class="text-wrap">
            <div class="tit">翻译精准度高，表达无障碍</div>
            <div class="sub-tit">
              <p>
                专业的各类语种翻译，精准度可高达98.8%，让产品表达更加准确流畅。
              </p>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="text-wrap">
            <div class="tit">一切只为精准投放目标市场</div>
            <div class="sub-tit">
              <p>
                对的地方遇到对的买家，各语种网站能让更多的买家轻松了解您和您的产品，同时也大大降低网站推广和运营成本。
              </p>
            </div>
          </div>
          <div class="img-inner">
            <img src="@/assets/images/int/detail3-4.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="app-detail3">
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
