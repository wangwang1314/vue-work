<template>
  <div class="tab1-box">
    <div class="tb-tit">发布产品，更省时，更省力</div>
    <div class="com-box">
      <div class="com-l mar-l-48">
        <div class="img-com">
          <img src="@/assets/images/ai/ai-1.png" alt="" />
        </div>
      </div>
      <div class="com-r">
        <div class="text-com">
          <div class="c-tit">AI优化发布</div>
          <div class="c-desc">
            通过对录入的原始产品资料进行分析，由AI找到核心关键词，以更贴近SEO规则、提升用户体验为目标，进行产品标题、产品属性、三要素、Tag词等维度的优化后完成发布。
          </div>
          <ul class="list-box">
            <li>
              <div class="c-icon">
                <icon-find-replace></icon-find-replace>
              </div>
              <div class="c-text">通过Ecer AI和Google Keyword Planner全面分析产品信息</div>
            </li>
            <li>
              <div class="c-icon">
                <icon-align-left></icon-align-left>
              </div>
              <div class="c-text">将精准的关键词覆盖至产品标题、三要素、Tag词中</div>
            </li>
            <li>
              <div class="c-icon">
                <icon-drive-file></icon-drive-file>
              </div>
              <div class="c-text">AI找到产品的属性和卖点，自动生成更多受买家关注的产品属性</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tb-tit">发一得N，快速有效丰富网站内容</div>
    <div class="com-box">
      <div class="com-r mar-l-48">
        <div class="text-com">
          <div class="c-tit">AI产品扩展</div>
          <div class="c-desc">
            在发布一个产品时，通过AI扩展出更多产品，丰富网站内容，同时以更多与该产品相关的关键词来优化扩展的产品，扩大排名覆盖面。
          </div>
          <ul class="list-box">
            <li>
              <div class="c-icon">
                <icon-ordered-list></icon-ordered-list>
              </div>
              <div class="c-text">多维度展示产品，多关键词覆盖搜索引擎排名</div>
            </li>
            <li>
              <div class="c-icon">
                <icon-apps></icon-apps>
              </div>
              <div class="c-text">AI有效生成具备差异化的产品内容，甚至图片也能为AI所组合或重绘</div>
            </li>
            <li>
              <div class="c-icon">
                <icon-paste></icon-paste>
              </div>
              <div class="c-text">扩展的产品与原始产品形成某一类关键词的内容矩阵，大幅提高网站权重</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="com-l">
        <div class="img-com">
          <img src="@/assets/images/ai/ai-2.png" alt="" />
        </div>
      </div>
    </div>
    <div class="tb-tit">智能提升精准关键词的排名效果</div>
    <div class="com-box">
      <div class="com-l mar-l-48">
        <div class="img-com h-450">
          <img src="@/assets/images/ai/ai-3.png" alt="" />
        </div>
      </div>
      <div class="com-r">
        <div class="text-com">
          <div class="c-tit">SEO效果提升</div>
          <div class="c-desc">
            AI发布产品时即通过大数据和Google数据设定SEO策略，日常再通过对排名结果的监控，不断迭代优化，为网站或得更多更能带来买家商机的Google/YouTube/Tiktok排名。
          </div>
          <ul class="list-box">
            <li>
              <div class="c-icon">
                <icon-find-replace></icon-find-replace>
              </div>
              <div class="c-text">Ecer AI运用谷歌官方推荐的外贸关键词技术+宜选网大数据找到更适合外贸的关键词</div>
            </li>
            <li>
              <div class="c-icon">
                <icon-align-left></icon-align-left>
              </div>
              <div class="c-text">网站的每一个产品，AI都会通过Google关键词规划师来找到更多潜力词</div>
            </li>
            <li>
              <div class="c-icon">
                <icon-drive-file></icon-drive-file>
              </div>
              <div class="c-text">每日出具的Google/YouTube/TikTok排名监控报告，持续更新，持续优化</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="l-btn" @click="gonext">立即开通</div>
  </div>
</template>

<script setup lang="ts" name="tab1server">
import { onMounted } from 'vue'
const emit = defineEmits(['update'])
const gonext = () => {
  emit('update')
}
</script>
<style lang="scss" scoped>
// @import './index.scss';
.tab1-box {
  padding-bottom: 48px;
}
.tb-tit {
  width: 100%;
  max-width: 872px;
  height: 76px;
  line-height: 76px;
  color: rgb(82, 54, 255);
  font-size: 28px;
  font-weight: 400;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(241, 239, 255, 0),
    rgb(229, 225, 255) 49.606%,
    rgba(241, 239, 255, 0) 99.571%
  );
  margin: 48px auto auto auto;
}
.com-box {
  padding: 64px 76px;
  display: flex;
  justify-content: space-between;
  .com-l {
    width: 500px;
    flex: 1;
    
    .img-com {
      height: 400px;
    }
    .h-450 {
      height: 450px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .com-r {
    width: 500px;
    flex: 1;
    .text-com {
      .c-tit {
        color: rgb(36, 35, 49);
        font-size: 36px;
        font-weight: 500;
        line-height: 50px;
        position: relative;
        margin-bottom: 54px;
        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          width: 52px;
          height: 6px;
          bottom: -22px;
          background: rgb(76, 53, 219);
        }
      }
      .c-desc {
        color: rgb(134, 144, 156);
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }
      .list-box {
        margin-top: 6px;
        li {
          margin-top: 26px;
          display: flex;
          align-items: center;
          .c-icon {
            border-radius: 8px;
            background: rgb(76, 53, 219);
            width: 52px;
            height: 52px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 32px;
            margin-right: 16px;
          }
          .c-text {
            color: var(--color-text-4);
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
          }
        }
      }
    }
  }
  .mar-l-48 {
    margin-right: 48px;
  }
}

.l-btn {
  text-align: center;
  border-radius: 8px;
  height: 60px;
  line-height: 60px;
  color: #fff;
  cursor: pointer;
  width: 480px;
  user-select: none;
  background: linear-gradient(135.00deg, rgb(43, 89, 255) 0%,rgb(105, 87, 255) 58.779%,rgb(167, 86, 255) 99.237%);
  transition: all 0.3s;
  margin: 0 auto;
  margin-top: 32px;
  span {
    margin-right: 10px;
  }
}
.l-btn.disabled {
  pointer-events: none;
}
.l-btn:hover {
  background: linear-gradient(135.00deg, rgb(0, 53, 245) 0%,rgb(105, 87, 255) 58.779%,rgb(158, 0, 255) 99.724%);
}
.l-btn.grash {
  background: rgb(201, 205, 212);
  pointer-events: none;
}
.l-btn.grash:hover {
  opacity: 0.9;
}
</style>
