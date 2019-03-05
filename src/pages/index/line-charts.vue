<template>
    <div class='line'>
        <div id='line' style='width:300px;height:300px;'></div>
    </div>
</template>

<script lang='js'>
import echarts from 'echarts'
// import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

// @Component({
// })
export default {
    mounted() {
        console.log(123)
        console.log($("#line"))
        let myChart = echarts.init(document.getElementById("line"));
        let option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
      };
      myChart.setOption(option);
    }
}
</script>

<style lang="less">
    .line {
        width:100%;
        
    }
</style>