import React, { useRef, useEffect } from 'react'
import * as echarts from 'echarts'


//封装图表Bar组件

function Bar({title,xData,yData,style}) {
  const domRef = useRef()
  //初始化echarts,封装为函数
  const chartInit = () => {
  //domRef.current为dom元素
  const myChart = echarts.init(domRef.current)
  //配置echarts
  myChart.setOption({
    title: {
      text: title
    },
    tooltip: {},
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: yData
      }
    ]
  });}
  //组件挂载时调用
  useEffect(() => {
    chartInit()
  }, [])
  return (
    <div>
      {/* 插入echarts */}
      <div ref={domRef} style={style}></div>
    </div>
  )}
export default Bar