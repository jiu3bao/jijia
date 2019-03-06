<template>
    <div class='line' style='width:100%'>
        <div id='line' style='width:100%;height:300px'></div>
        <div id='bar' style='width:100%;height:300px;background:#000;'></div>
    </div>
</template>

<script lang='ts'>
import echarts from 'echarts'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
})
export default class lineChart extends Vue{
    chart1:any
    chart2:any

    @Prop()
    lineDate: Array<any>

    @Prop()
    barDate: Array<any>

    @Watch('lineDate', { immediate: true, deep: true })
    changeDate(val:Array<any>) {
        this.init_line(val)
    }

    @Watch('barDate', { immediate: true, deep: true })
    changebar(val:Array<any>) {
        this.init_bar(val)
    }

    init_line(val) {
        let y:Array<any> = []
        let x:Array<any> = []
        this.$nextTick(() => {
            val.map(item => {
                y.push(item.mindex)
                x.push(((item.mdate) / 100).toFixed(2))

            })
            this.chart1 = echarts.init(document.getElementById("line") as HTMLDivElement);
            let option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    showAllSymbol: true,
                    data: x,
                    axisLabel: {
                        interval: 0,
                        rotate: 45,
                        //倾斜度 -90 至 90 默认为0  
                        margin: 2,
                        textStyle: {
                            //							                        fontWeight: "bolder",
                            color: "#333"
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    max: 'dataMax',
            		min: 'dataMin',
                },
                grid: {
                    x: 60,
                    y: 70
                },
                series: [{
                    data: y,
                    type: 'line',
                    symbol: "none", //去除折线图的圆点
                    itemStyle: { //设置折线图的颜色
                        normal: {
                            color: '#d7f6e2', //修改文本区域的颜色
                            lineStyle: {
                                color: '#36d26f' //修改线的颜色
                            }
                        }
                    }
                }],
            };
            this.chart1.setOption(option);
        })
    }

    init_bar(val) {
        this.$nextTick(() => {
            this.chart2 = echarts.init(document.getElementById('bar') as HTMLDivElement);
            let area:Array<string>=[]
            let pct: Array<string>=[]
            let color: Array<string>=[]
            val.map(item => {
                area.push(item.area)
                pct.push(item.pct)
                color.push(item.color)
            })
            let option = {
                tooltip: {
                    trigger: 'item' //悬浮提示框不显示
                },
                grid: { //绘图区调整
                    x: 150, //左留白
                    y: 10, //上留白
                    x2: 10, //右留白
                    y2: 10 //下留白
                },
                xAxis: [{
                    show: false,
                    type: 'value',
                    boundaryGap: [0, 0],
                    position: 'top'
                }],
                yAxis: [{
                    type: 'category',
                    data: area,
                    //						max:20 ,
                    axisLine: {
                        show: false
                    }, //坐标轴
                    axisTick: [{ //坐标轴小标记
                        show: false
                    }],
                    axisLabel: {
                        textStyle: {
                            fontSize: '12',
                            color: 'white',
                        }
                    }
                }],
                series: [{
                    name: '',
                    type: 'bar',
                    //						barGap:'80%',/*多个并排柱子设置柱子之间的间距*/
                    //	                    barCategoryGap:100,/*多个并排柱子设置柱子之间的间距*/
                    tooltip: {
                        show: false
                    },
                    barMinHeight: 50, //最小柱高
                    //						barWidth: 40, //柱宽度
                    //						barCategoryGap:100,
                    barMaxWidth: 100, //最大柱宽度
                    data: pct,
                    itemStyle: {
                        normal: { //柱状图颜色
                            barBorderRadius: false,
                            color: function (params) {
                                return color[params.dataIndex]
                            },
                            //color:"F00",
                            label: {
                                show: false, //显示文本
                                position: 'inside', //数据值位置
                                textStyle: {
                                    //										color: '#000',
                                    //										fontSize: '12'
                                }
                            }
                        }
                    }
                }]
            };
            this.chart2.setOption(option)
        })
        
    }
}
</script>

<style lang="less">
    .line {
        width:100%;
        
    }
</style>