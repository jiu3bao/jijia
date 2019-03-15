<template>
    <div class='line' style='width:100%'>
        <div id='line' style='width:100%;height:50%'></div>
        <div id='bar' style='width:100%;height:50%;background:#000;'></div>
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
    new_linedata: Array<any>=[]//定义接收折线图的值
    new_bardata: Array<any>=[]

    @Prop()
    lineDate: Array<any>

    @Prop() 
    lineLength: number

    @Prop()
    barDate: Array<any>

    @Prop()//子组件在这里接收父组件传的值
    resize:number

    @Watch('lineDate', { deep: true })
    changeDate(val:Array<any>) {
        console.log(8989889)
        if(val[0] && val[0].name) {
            if(this.lineLength != val.length) return
            this.init_all_line(val)
        } else {
            this.init_line(val)
        }
        this.new_linedata = val//把折线图的值存起来
    }

    @Watch('barDate', { immediate: true, deep: true })
    changebar(val:Array<any>) {
        this.init_bar(val)
        this.new_bardata=val//把柱状图的值存起来
    }

    @Watch('resize')//监听这个属性
	window_res(n) {//watch传入两个参数，第一个新数据，第二个旧数据，随便传入一个参数n，重载折线图和柱状图，需要在父组件哪里处理resize这个属性
		console.log(222)
		if(this.new_linedata[0] && this.new_linedata[0].name) {
            this.init_all_line(this.new_linedata)
        } else {
            this.init_line(this.new_linedata)
        }
        this.init_bar(this.new_bardata)
	}

    init_line(val) {
        if(this.chart1) this.chart1.dispose()
        console.log(val,12121)
        let y:Array<any> = []
        let x:Array<any> = []
        this.$nextTick(() => {
            console.log(val,123123)
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

    init_all_line(val) {
        if(this.chart1) this.chart1.dispose()
        let x:Array<any> = []
        let data:Array<any> = []
        let lengend:Array<string>=[]
        val[0].line_data.map(item => { //获取x轴时间
            x.push(((item.mdate) / 100).toFixed(2))
        })
        val.map(item => {
            lengend.push(item.name)
            let y = []
            item.line_data.map(data => {
                y.push(data.mindex)//获取Y轴数据
            })
            data.push({// series
                name: item.name,
                type:'line',
                data: y,
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}}, 
            })
        })
        console.log(lengend,data, x)
        this.$nextTick(() => {
            this.chart1 = echarts.init(document.getElementById("line") as HTMLDivElement);
            let option = {
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                // legend:{
                //     data: data
                // },
                xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: x
				}],
                yAxis: [{
					type: 'value',
                    min: function(value) {
                        return value.min - 20;
                    },
                    max: function(value) {
                        return value.max + 20;
                    }
				}],
                grid: {
                    x: 60,
                    y: 70
                },
				series:data
            }
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
                    // x: 150, //左留白
                    // y: 10, //上留白
                    // x2: 10, //右留白
                    // y2: 10, //下留白
                    backgroundColor:'#999',
                    show:true,
                    // left: '3%',
                    // right: '4%',
                    bottom: '0',
                    top: '3%',
                    height:'auto',
                    containLabel: true
                },
                xAxis: [{
                    show: true,
                    type: 'value',
                    nameLocation:'end',
                    nameTextStyle:{
                        color:'#f00',
                        align:'right'
                    },
                    nameGap:'5px',
                    

                    // boundaryGap: [0, 0],
                    // position: 'top'
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
                    //barGap:"20",
                    //barCategoryGap:'20',
                    //barMinHeight: 50, //最小柱高
                    barWidth: 10, //柱宽度
                    //						barCategoryGap:100,
                    //barMaxWidth: 100, //最大柱宽度
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
        //margin-top:15px;
        height:100%;
    }

</style>