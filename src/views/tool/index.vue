<template>
  <div class="test">
    <a-card title="组件示例" :bordered="false" class="gi_card left">
      <div class="tab-box">
        <a-tabs position="left" hide-content v-model:active-key="selectedKey">
          <a-tab-pane :title="item.name" v-for="(item, index) in menuList" :key="index"></a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <section class="content">
      <transition name="zoom-fade" mode="out-in" appear>
        <component :is="menuList[selectedKey].value"></component>
      </transition>
    </section>
  </div>
</template>

<script lang="ts" setup name="Test">
import { ref } from 'vue'
import Button from './components/Button.vue'
import Tag from './components/Tag.vue'
import IconSelector from './components/IconSelector.vue'
import Option from './components/Option.vue'
import Dot from './components/Dot.vue'
import FlexibleBox from './components/FlexibleBox.vue'
import Area from './components/Area.vue'
import Json from './components/Json.vue'
import Editor from './components/Editor.vue'
import Loading from './components/Loading.vue'
import ImagePreview from './components/ImagePreview.vue'
import Lottie from './components/Lottie/indiex.vue'
import RowTreeTable from './components/RowTreeTable/index.vue'
import Map from './components/Map.vue'
import Logo from './components/Logo.vue'
import JSDialog from './components/JSDialog/index.vue'
import ImageView from './components/ImageView.vue'
import FnComponent from './components/FnComponent.vue'
import Mitt from './components/Mitt/index.vue'

const selectedKey = ref(0)

const menuList = [
  { name: '单选框/复选框', value: Option },
  { name: '按钮', value: Button },
  { name: 'GiTag', value: Tag },
  { name: 'GiIconSelector', value: IconSelector },
  { name: 'GiDot', value: Dot },
  { name: 'GiFlexibleBox', value: FlexibleBox },
  { name: '横向树表格', value: RowTreeTable },
  { name: '自定义加载指令', value: Loading },
  { name: '省市区', value: Area },
  { name: 'JSON查看', value: Json },
  { name: '富文本', value: Editor },
  { name: '地图', value: Map },
  { name: 'Mitt中央通信', value: Mitt },
  { name: '美化图片预览', value: ImagePreview },
  { name: 'Lottie动画', value: Lottie },
  { name: '渐变色Logo', value: Logo },
  { name: '原生模态框', value: JSDialog },
  { name: '图片放大镜', value: ImageView },
  { name: '函数式组件', value: FnComponent }
]
</script>

<style lang="scss" scoped>
:deep(.arco-tabs-nav-vertical.arco-tabs-nav-type-line .arco-tabs-tab) {
  padding: 0;
  margin: 0;
  padding: 8px 16px;

  &:hover {
    background: var(--color-fill-1);

    .arco-tabs-tab-title {
      &::before {
        display: none !important;
      }
    }
  }

  &.arco-tabs-tab-active {
    background: rgba(var(--primary-6), 0.08);
  }
}

:deep(.arco-tabs-nav-vertical::before) {
  left: 0;
  display: none;
}

:deep(.arco-tabs-nav-vertical .arco-tabs-nav-ink) {
  left: 0;
}

:deep(.arco-tabs-nav-vertical) {
  float: none;
  flex-direction: row;
}

.test {
  flex: 1;
  padding: $margin;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;

  .left {
    width: 200px;
    .tab-box {
      flex: 1;
      overflow-y: auto;
    }
  }

  .content {
    flex: 1;
    height: 100%;
    padding: $padding;
    background: var(--color-bg-1);
    margin-left: $margin;
    border-radius: $radius-box;
    box-sizing: border-box;
    overflow: auto;
    overflow-x: hidden;
  }
}
</style>
