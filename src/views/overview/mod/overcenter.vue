<template>
  <div class="over-center">
    <div class="center-top">
      <div class="c-left">
        <div class="tit">网站概况</div>
      </div>
      <div class="c-right">
        <a-space :size="32">
          <a href="" target="_blank">
            <span class="text"><icon-link></icon-link><span>网站域名：yyttllmm.com</span></span>
          </a>
          <span class="text"><icon-calendar /><span>上线时间：2023-11-23 18:00:00</span></span>
          <span class="text"><icon-schedule /><span>最近更新时间：2023-11-23 18:00:00</span></span>
        </a-space>
      </div>
    </div>
    <div class="web-card">
      <div class="w-item">
        <div class="tit">本月新增产品</div>
        <div class="count">
          <span>23</span>
          <span class="unit">个</span>
        </div>
        <i class="w-icon icon-1"></i>
      </div>
      <div class="w-item">
        <div class="tit">累计添加产品</div>
        <div class="count">
          <span>763</span>
          <span class="unit">个</span>
        </div>
        <i class="w-icon icon-2"></i>
      </div>
      <div class="w-item">
        <div class="tit">本月访问用户</div>
        <div class="count">
          <span>642</span>
          <span class="unit">次</span>
        </div>
        <i class="w-icon icon-3"></i>
      </div>
      <div class="w-item">
        <div class="tit">累计访问用户</div>
        <div class="count">
          <span>23</span>
          <span class="unit">次</span>
        </div>
        <i class="w-icon icon-4"></i>
      </div>
      <div class="w-item">
        <div class="tit">本月获得商机</div>
        <div class="count">
          <span>6</span>
          <span class="unit">条</span>
        </div>
        <i class="w-icon icon-5"></i>
      </div>
      <div class="w-item">
        <div class="tit">累计获得商机</div>
        <div class="count">
          <span>84</span>
          <span class="unit">条</span>
        </div>
        <i class="w-icon icon-6"></i>
      </div>
    </div>
    <div class="web-chart">
      <a-row :gutter="16">
        <a-col :span="12">
          <div class="chart-wrap">
            <div class="c-tit">最近15天获取商机情况</div>
            <div class="chart-box">
              <GiChart height="234px" :option="chartOption"></GiChart>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="chart-wrap">
            <div class="c-tit">最近15天获取商机情况</div>
            <div class="chart-box">
              <GiChart height="234px" :option="chartOption2"></GiChart>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="center-bot"></div>
  </div>
</template>
<script setup lang="ts" name="Overcenter">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useNavTabStore } from '@/store'
import type { LoginParams } from '@/apis'
import { graphic } from 'echarts'
import { useLoading, useChart } from '@/hooks'
const router = useRouter()
const userStore = useUserStore()
function graphicFactory(side: AnyObject) {
  return {
    type: 'text',
    bottom: '8',
    ...side,
    style: {
      text: '',
      textAlign: 'center',
      fill: '#86909C',
      fontSize: 12
    }
  }
}
const { loading, setLoading } = useLoading(true)
const xAxis = ref<string[]>([])
const chartsData = ref<number[]>([])
const graphicElements = ref([graphicFactory({ left: '2.6%' }), graphicFactory({ right: 0 })])
const { chartOption } = useChart(() => {
  return {
    grid: {
      left: '30',
      right: '20',
      top: '10',
      bottom: '30'
    },
    color: ['#265AFF'],
    xAxis: {
      type: 'category',
      offset: 2,
      data: xAxis.value,
      boundaryGap: false,
      axisLabel: {
        color: '#86909C',
        formatter(value: number, idx: number) {
          // if (idx === 0) return ''
          // if (idx === xAxis.value.length - 1) return ''
          return `${value}`
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        // show: true,
        // interval: (idx: number) => {
        //   if (idx === 0) return false
        //   if (idx === xAxis.value.length - 1) return false
        //   return true
        // },
        // lineStyle: {
        //   color: '#E5E8EF'
        // }
      },
      axisPointer: {
        show: true,
        lineStyle: {
          color: '#265AFF',
          width: 2
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        formatter(value: any, idx: number) {
          if (idx === 0) return value
          return `${value}`
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#F2F3F5'
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        const [firstElement] = params as any[]
        return `<div class="echart-tootip">
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>商机获取：</span><span class="tooltip-value">
              ${firstElement.value}条
            </span></div>
          </div>`
      },
      className: 'echarts-tooltip-diy'
    },
    series: [
      {
        data: chartsData.value,
        type: 'line',
        smooth: true,
        // symbol: 'circle',
        symbolSize: 12,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#265AFF'
          }
        },
        lineStyle: {
          width: 3,
          color: '#265AFF'
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(38, 90, 255, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(38, 90, 255, 0)'
            }
          ])
        }
      }
    ]
  }
})
const option2 = useChart(() => {
  return {
    grid: {
      left: '30',
      right: '20',
      top: '10',
      bottom: '30'
    },
    color: ['#A756FF'],
    xAxis: {
      type: 'category',
      offset: 2,
      data: xAxis.value,
      boundaryGap: false,
      axisLabel: {
        color: '#86909C',
        formatter(value: number, idx: number) {
          // if (idx === 0) return ''
          // if (idx === xAxis.value.length - 1) return ''
          return `${value}`
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        // show: true,
        // interval: (idx: number) => {
        //   if (idx === 0) return false
        //   if (idx === xAxis.value.length - 1) return false
        //   return true
        // },
        // lineStyle: {
        //   color: '#E5E8EF'
        // }
      },
      axisPointer: {
        show: true,
        lineStyle: {
          color: '#A756FF',
          width: 2
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#86909C',
        formatter(value: any, idx: number) {
          if (idx === 0) return value
          return `${value}`
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#F2F3F5'
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        const [firstElement] = params as any[]
        return `<div class="echart-tootip">
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>商机获取：</span><span class="tooltip-value">
              ${firstElement.value}条
            </span></div>
          </div>`
      },
      className: 'echarts-tooltip-diy'
    },
    series: [
      {
        data: chartsData.value,
        type: 'line',
        smooth: true,
        // symbol: 'circle',
        symbolSize: 12,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#A756FF'
          }
        },
        lineStyle: {
          width: 3,
          color: '#A756FF'
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(167, 86, 255, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(167, 86, 255, 0)'
            }
          ])
        }
      }
    ]
  }
})
const chartOption2 = option2.chartOption
const fetchData = () => {
  setLoading(true)
  try {
    const data = [
      { y: 20, x: '22-01' },
      { y: 30, x: '22-02' },
      { y: 40, x: '22-03' },
      { y: 45, x: '22-04' },
      { y: 50, x: '22-05' },
      { y: 55, x: '22-06' },
      { y: 70, x: '22-07' },
      { y: 90, x: '22-08' }
    ]
    data.forEach((item: any, index: number) => {
      xAxis.value.push(item.x)
      chartsData.value.push(item.y)
      if (index === 0) {
        graphicElements.value[0].style.text = item.x
      }
      if (index === data.length - 1) {
        graphicElements.value[1].style.text = item.x
      }
    })
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}
fetchData()
</script>
<style lang="scss" scoped>
.center-top {
  display: flex;
  margin-top: 16px;
  height: 36px;
  justify-content: space-between;
  align-items: center;
  .c-left {
    .tit {
      color: var(--color-text-1);
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
    }
  }
  .c-right {
    .text {
      color: var(--color-text-4);
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      span {
        margin-left: 4px;
      }
    }
  }
}
a {
  color: inherit;
  text-decoration: none;
}
.web-card {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  .w-item {
    margin-right: 16px;
    flex: 1;
    border-radius: 8px;
    background: rgb(230, 236, 255);
    height: 106px;
    padding: 20px 20px 16px 20px;
    box-sizing: border-box;
    position: relative;
    .w-icon {
      position: absolute;
      right: 20px;
      bottom: 16px;
      height: 44px;
      width: 44px;
    }
    .icon-1 {
      background: url('@/assets/images/web/all-1.png') no-repeat;
      background-size: cover;
    }
    .icon-2 {
      background: url('@/assets/images/web/all-2.png') no-repeat;
      background-size: cover;
    }
    .icon-3 {
      background: url('@/assets/images/web/all-3.png') no-repeat;
      background-size: cover;
    }
    .icon-4 {
      background: url('@/assets/images/web/all-4.png') no-repeat;
      background-size: cover;
    }
    .icon-5 {
      background: url('@/assets/images/web/all-5.png') no-repeat;
      background-size: cover;
    }
    .icon-6 {
      background: url('@/assets/images/web/all-6.png') no-repeat;
      background-size: cover;
    }
    .tit {
      color: var(--color-text-4);
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
    }
    .count {
      margin-top: 4px;
      color: var(--color-text-1);
      font-size: 36px;
      font-weight: 700;
      line-height: 44px;
      .unit {
        color: rgb(29, 33, 41);
        font-size: 14px;
        font-weight: 400;
        line-height: 32px;
        margin-left: 4px;
      }
    }
  }
  .w-item:last-child {
    margin-right: 0;
  }
}
.web-chart {
  margin-top: 16px;
  .chart-wrap {
    border-radius: 8px;
    background: rgb(255, 255, 255);
    height: 318.57px;
    padding: 16px 20px 24px 20px;
    box-sizing: border-box;
    .c-tit {
      color: var(--color-text-1);
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
    .chart-box {
      height: 234.57px;
      margin-top: 18px;
    }
  }
}
</style>
<style lang="scss">
.over-center {
  .echarts-tooltip-diy {
    border-radius: 4px !important;
    background: rgba(0, 0, 0, 0.8) !important;
    color: #fff !important;
    box-shadow: none !important;
  }
}
</style>
