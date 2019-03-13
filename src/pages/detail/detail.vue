<template>
    <div>
        <Header></Header>
        <el-row class='pd'>
            <el-col :span='4'>
                <div class="menu-head">
                    <div class="goback" @click="$router.back()">

                    </div>
                    <span @click="reload">{{cname}}</span>
                </div>
                <div :class="{'active': chooselist==index}" class="menu-list" v-for="(item,index) in menulist" @click="chooseCatagroy(item.pid,item.id,index,item.name)">
                    {{item.name}}
                </div>
            </el-col>
            <el-col :span='20'>
                <div class="box col-md-12">
                    <div class="box-inner" style="padding: 0;">
                        <div class="new-box">
                            <h2><img src="static/assets/sc.png">快速检索</h2>
                            <el-select v-model="nowPeriod" placeholder="请选择">
                                <el-option
                                label="按周查询"
                                :value="1">
                                </el-option>
                                <el-option
                                label="按月查询"
                                :value="2">
                                </el-option>
                                <el-option
                                label="按季度查询"
                                :value="3">
                                </el-option>
                                <el-option
                                label="按年度查询"
                                :value="4">
                                </el-option>
                            </el-select>
                            <el-button type="primary"  @click="query" style='margin-left:10px;'>查询</el-button>
                        </div>
                    </div>
                </div>
                <div class="box col-md-12">
                    <div class="box-inner">
                        <div class="new-head">
                            <h2><img src="static/assets/qs.png"> 材料指数动态趋势图</h2>
                        </div>
                        <div class="box-content">
                            <div id="Chart" v-if="!nodata"></div>
                            <div class="">
                                {{nodata}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box col-md-12">
                    <div class="box-inner">
                        <div class="new-head">
                            <h2><img src="static/assets/table.png"> 材料指数</h2>
                        </div>
                        <el-table
                            :data="nowData"
                            border
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="price"
                            label="材料"
                            width="180">
                                <template slot-scope="scope">
                                    {{nowname}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="price"
                            label="价格"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="mindex"
                            label="指数">
                            </el-table-column>
                            <el-table-column
                            prop="idxval"
                            label="较上期涨跌(点)</"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="idxpct"
                            label="环比（%）"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="mdate"
                            :label="'报价'+ nowptext"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="地区"
                            width="180">
                                <template slot-scope="scope">
                                    {{address}}
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--table class="table table-bordered table-striped" style="background-color: white">
                            <tr>
                                <th>材料</th>
                                <th>价格(元)</th>
                                <th>指数</th>
                                <th>较上期涨跌(点)</th>
                                <th>环比（%）</th>
                                <th>报价{{nowptext}}</th>
                                <th>地区</th>
                            </tr>
                            <tr v-for="(item,index) in nowData" :key="item.id">
                                <td>{{nowname}}</td>
                                <td>{{item.price}}</td>
                                <td>{{item.mindex}}</td>
                                <td>{{item.idxval}}</td>
                                <td>{{item.idxpct}}</td>
                                <td>{{item.mdate}}</td>
                                <td>{{address}}</td>
                            </tr>
                        </table-->
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Header from '../../components/header.vue'
import echarts from 'echarts'
import api from '../../api/api'

@Component({
    components : {
        Header
    }
    
})
export default class detail extends Vue{
    menulist: Array<any>=[]
    nowPeriod: number=2
    nodata: string = ''
    nowname: string=''
    nowData: Array<any>=[]
    cname: string=''
    myChart: any
    c1:string =''
    c2:string=''
    c3:string=''
    nowptext: string ='月份'
    address: string = ''
    chooselist: number =-1

    get token(): string  {
        //return '0dba12e9e12acbc409085eb7b6f4a2aa'
        return this.$store.state.token
    }

    created() {
        this.c1 = this.$route.query.c1.toString()
        this.c2 = this.$route.query.c2.toString()
        this.cname= this.$route.query.name.toString()
 
        this.getLeftmenu()
        this.get_data()
    }

    reload() {
        this.c1 = this.$route.query.c1.toString()
        this.c2 = this.$route.query.c2.toString()
        this.c3 = ''
        this.cname= this.$route.query.name.toString()
        this.chooselist =-1
        this.getLeftmenu()
        this.get_data()
    }

    query() {
        this.nowptext = this.nowPeriod == 1 ? '日期' : (this.nowPeriod == 2 ? '月份' : (this.nowPeriod == 3 ? '季度' : '年度'))
        this.get_data()
    }

    chartDataSingle(title, subtxt, spec, xdata, ydata) {
        this.myChart = echarts.init(document.getElementById('Chart') as HTMLDivElement);
        const option = {
            title: {
                text: title,
                subtext: subtxt
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [spec]
            },
            toolbox: {
                right: '2%',
                show: true,
                feature: {
                    saveAsImage: {
                        show: true
                    }
                }
            },
            grid: {
                top: '15%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: xdata
            }],
            yAxis: [{
                type: 'value',
                min: function(value) {
                    return Math.ceil(value.min - 200);
                },
                max: function(value) {
                    return Math.ceil(value.max + 200)
                }
            }],
            series: [{
                name: spec,
                type: 'line',
                stack: '指数',
                data: ydata,
                symbol: "none", //去除折线图的圆点
                itemStyle: { //设置折线图的颜色
                    normal: {
                        color: 'green',
                        lineStyle: {
                            color: 'lightblue'
                        }
                    }
                }
            }]
        }
        this.myChart.setOption(option);
    }

    //获得3级分类
    async getLeftmenu() {
        // this.cname = this.detail_cate.name
        this.nowname = this.cname
        const par = {
            pid: this.c2
        }
        const res = await api.getCategory(par)
        this.menulist = res.data
        
    }

    async get_data() {
        let par:any
        par = {
            tk: this.token,
            c1:this.c1,
            c2:this.c2,
            c3: this.c3,
            city: this.$store.state.area_code,
            area: this.$store.state.qu_code,
            period: this.nowPeriod
        }
        
        const res = await api.getIndexDatas(par)
        
        if(res.data.code == 3) {
            this.$store.commit('SET_TOKEN', '')
            this.$store.commit('SET_CLEAR_TOKEN_TIMER', null)
            this.$confirm('是否重新登录', '登录已过期', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                this.$router.push('/login')
            }).catch(()=>{
                this.$router.push('/index')
            })
        }
        //请求成功 重置token时间
        const that = this
        this.$store.commit('SET_CLEAR_TOKEN_TIMER', null)
        const timer = setTimeout(function(){
            that.$store.commit('SET_TOKEN', '')
        }, 1000*60*30)

        this.$store.commit('SET_CLEAR_TOKEN_TIMER', timer)

       if(res.data.data.length>0) {
            this.nowData = res.data.data
            this.nodata = ''
            let xdata = []
            let ydata = []
            let title =
               `${res.data.parms.ctname==''?'全省':res.data.parms.ctname}${res.data.parms.atname?'>'+res.data.parms.atname:''}"${this.nowname}"趋势`
            let subtxt = '基期指数值1000';
            let spec = `${this.nowname}`;
            this.address = `${res.data.parms.ctname==''?'全省':res.data.parms.ctname}${res.data.parms.atname?'>'+res.data.parms.atname:''}`
            res.data.data.forEach(item => {
                xdata.push(item.mdate)
                ydata.push(item.mindex)
            })
            this.chartDataSingle(title, subtxt, spec, xdata, ydata);
       } else {
            this.myChart?this.myChart.dispose(): ''
            this.nodata = '暂无数据'
            this.nowData = []
        }
    }

    chooseCatagroy(pid,id, index, name) {
        this.chooselist = index
        this.nowname = name

        if (this.c2) {
            this.c3 = id
        } else {
            this.c2 = id
        }
        this.get_data()
    }
}
</script>

<style type="less" scoped>
    .pd {
        padding-top:1.725rem;
    }
    .left-menu {
        width: 200px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }

    .menu-head {
        
        height: 42px;
        display: flex;
        align-items: center;

        font-size: 16px;
        font-weight: 600;
    }

    .goback {
        border-right: 1px solid #FFFFff;
        height: 42px;
        width: 29px;
        background: url(../../../static/assets/nback.png) no-repeat center;
        background-size: 100%;
    }

    .goback:hover {
        opacity: .5;
    }

    .goback img {
        width: 8px;
        vertical-align: top;
    }

    .menu-head span {
        display: block;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        height: 41px;
        line-height: 42px;
        background: #3A6BC9;
        text-align: center;
        color:#fff;
    }

    .menu-head span:hover {
        opacity: .5;
    }

    .menu-list {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #3A6BC9;
        border-top: 1px solid #fff;
        display: block;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size:14px;
        color:#fff;
    }

    .menu-list:hover,
    .menu-list.active {
        opacity: .5;
    }

    .right-data {
        flex: 1;
        background: #EDEDED;
        padding: 30px 40px;
    }

    .address {
        margin-bottom: 40px;
        font-size: 14px;
        color: #666;
    }

    .address span:hover {
        color: #3A6BC9;
    }

    .address span {
        color: #333333;
        cursor: pointer;
    }

    #Chart {
        height: 500px;
    }

    .box {
        margin-bottom: 2px;
    }

    .box-inner {
        border: 1px solid #DEDEDE;
        border-radius: 3px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        box-shadow: 0 0 10px rgba(189, 189, 189, 0.4);
        -webkit-box-shadow: 0 0 10px rgba(189, 189, 189, 0.4);
        -moz-box-shadow: 0 0 10px rgba(189, 189, 189, 0.4);
        background: #ffffff;
        padding: 20px;
    }

    .box-header {
        border: none;
        padding-top: 5px;
        border-bottom: 1px solid #DEDEDE;
        border-radius: 3px 3px 0 0;
        -webkit-border-radius: 3px 3px 0 0;
        -moz-border-radius: 3px 3px 0 0;
        height: 36px;
        min-height: 36px !important;
        margin-bottom: 0;
        font-weight: bold;
        font-size: 16px;
        background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(255, 255, 255, 0)), color-stop(100%, rgba(0, 0, 0, 0.1)));
        background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
        background: -o-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
        background: -ms-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff', endColorstr='#1a000000', GradientType=0);
    }

    .box-header h2 {
        font-size: 16px;
        width: auto;
        clear: none;
        float: left;
        line-height: 30px;
        white-space: nowrap;
        font-weight: bold;
        margin-top: 0;
        margin-bottom: 0;
        color: #000;
        display: flex;
        align-items: center;
        margin-right: 100px;
    }

    .new-box {
        display: flex;
        align-items: center;
        padding: 20px;
    }

    .new-box h2,
    .new-head h2 {
        font-size: 16px;
        width: auto;
        clear: none;
        float: left;
        line-height: 30px;
        white-space: nowrap;
        font-weight: bold;
        margin-top: 0;
        margin-bottom: 0;
        color: #000;
        display: flex;
        align-items: center;
        margin-right: 100px;
    }

    .new-head {
        height: 32px;
    }

    .new-head h2 {
        margin-bottom: 20px;
    }

    .new-box h2>img,
    .new-head h2>img {
        margin-top: 1px;
        width: 28px;
    }

    .box-header h2>img {
        margin-top: 1px;
        width: 24px;
    }

    .box-content {
        padding: 10px;
    }
    .table-bordered {
        border: 1px solid #dddddd;
    }
    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
    }
</style>