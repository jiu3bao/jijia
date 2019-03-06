<template>
    <div class="data">
        <div class="alls" style="background: rgb(83, 98, 136); color: rgb(255, 255, 255);">全类型综合</div>
        <div class="swiper-container">
            <!--@mouseleave="resumeScroll"-->
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in cateList" :key="item.id">
                    <div class="sp-title" @click="lookClpct(item,index)">
                        <!--传一个空进来是避免没传pid影响代码运行，js里面传了pid，这里用空代替pid-->
                        <div class='flex'>
                            <img :src="'static/assets/fl'+index+'.png'">
                            <span>{{item.name}}</span>
                        </div>
                        <button class="xiangqins" @click="lookFisrtDetail(item.id,item.name)">查看详情</button>
                    </div>
                    <div class="data-list" v-for="(cont,i) in item.children" :key="cont.id">
                        <div class='data-list-name' @click='lookClpct(cont,i)'>
                            <p>{{cont.name}}</p>
                            <div class='flex'>
                                <p>数值:{{cont.linedate?(cont.linedate.length>0?cont.linedate[cont.linedate.length-1].mindex:'暂无数据'):'aaa'}}</p>
                                <p>趋势:{{cont.linedate?(cont.linedate.length>0?cont.linedate[cont.linedate.length-1].idxval:''):''}}</p>
                            </div>
                        </div>
                        <div class="data-list-icon">
                            <img :src="cont.linedate?(cont.linedate.length>0?(cont.linedate[cont.linedate.length-1].idxval>0?'static/assets/up.png':(cont.linedate[cont.linedate.length-1].idxval==0?'static/assets/steady.png':'static/assets/down.png')):''):''">
                        </div>
                        <div :id="'data-list-chart'+cont.id" class="data-list-chart">
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import echarts from 'echarts'
@Component({})
export default class cateList extends Vue{
    chart:any
    cate_index:number
    @Prop({
        type: Array
    })
    cateList

    // get cate(): Array<any>{//computed
    //     return this.cateList
    // }

    @Watch('cateList',{ immediate: true, deep: true })
    catechange(val:Array<any>) {
        val.map( item => {
            item.children.map( child => {
                this.init(child.id, child.linedate)
                //this.render_charts(child.id, child.linedate)
            })
        })
        
    }

    init(id:string,res:Array<any>) {// 折线图渲染
        if(res.length==0) {
            return 
        };
        let x:Array<string> = []
		let	y:Array<any> = []
		res.map(v => {
			x.push(v.mdate)
			let obj = {
                time:v.mdate,
                value : v.mindex,
			    idxval : v.idxval
			}
			y.push(obj)
		})
        this.$nextTick(() => {
            this.chart = echarts.init(document.getElementById(`data-list-chart${id}`)as HTMLDivElement);
        let option = {
			tooltip: {
				show: true,
				trigger: 'item',
				formatter: function(p) {
					return(
						p.data['time'] + '</br>指数:&nbsp;' + p['value'] +
						'<br>涨跌:&nbsp;' + p.data['idxval']
					);
				}
			},
			xAxis: {
				type: 'category',
				data: x,
				max: 'dataMax',
				min: 'dataMin',
				show: false
			},
			yAxis: {
				type: 'value',
				show: false,
				max: 'dataMax',
				min: 'dataMin',

			},
			grid:{
                  top:"50px",
                  left:"-50px",
                  right:"-15px",
                  bottom:"50px"
            },
			series: [{
				smooth: true,
				showSymbol: false,
				data: y,
				type: 'line',
				symbol: "none", //去除折线图的圆点
				itemStyle: { //设置折线图的颜色
					normal: {
						color: 'green',
						lineStyle: {
							width:1,
							color: 'lightblue'
						}
					}
				}
			}]

		};
        this.chart.setOption(option)
        })
        
    }
    
    lookClpct(item:object,index:number) {//点选cate
        this.cate_index = index
        this.$emit('getNowCate', item)
    }
}
</script>

<style lang="less">
    .data {
        height: 100%;
    }
    .swiper-container {
        width: 100%;
        overflow-y: scroll;
        height: 100%;
    }

    .swiper-slide {
        height: auto !important;
    }

    .swiper-wrapper {
        background: #EDEDED;
        padding-bottom: 80px;
    }

    .swiper-wrapper:hover {
        animation-play-state: paused;
        -webkit-animation-play-state: paused;
    }
    .sp-title {
        display: flex;
        align-items: center;
        background: #29344f;
        padding: .25rem .5rem;
        font-size: .5rem;
        cursor: pointer;
        color: #fff;
        justify-content:space-between;
    }
    .sp-data {
	background: #525a88;
}
.data-list {
	display: flex;
	height: 70px;
	align-items: center;
	justify-content: space-between;
	font-size: .4rem;
	color: #ebedf1;
	cursor:pointer;
}
.data-list-name {
	padding:0.5rem;
    width:50%;
	line-height:1;
    height:100%;
	background-color: #536288;
    box-sizing:border-box;
    p {
        line-height:2;
    }
    div {
        display:flex;
        p {
            flex-shrink:0;
            width:50%;
        }    
    
    }
}
.data-list-number {
	margin-right: .7rem;
	width: 3.625em;
	color: #ebedf1;
}
.lists{
	background: yellow;
	color: red;
}
.data-list-icon img {
	width: .3rem;
}

.data-list-updown {
	margin-right: .375rem;
	width: 2.5em;
	color: #ebedf1;
}

.data-list-chart {
	background: rgb(82,100,140);
	width: 210px;
    height: 100%;
    /*margin-top: 10px;*/
}
.sp-title img {
    width: 1rem;
    height: 1rem;
    margin-right: .5rem;
}
.alls {
    font-size:.7rem;
    padding:15px;
}
.xiangqins,.xiangqins2{
    padding: 5px 40px;
    border-radius: 15px;
    border: none;
    background: #4c86ff;
    color: #f0f4ff;
    margin-left: auto;
    outline: none;
    cursor:pointer;
    flex-shrink:0;
}
</style>