<template>
    <div class='pd'>
        <Header></Header>
        <Top></Top>
        <el-row>
            <el-col :span="16">
                <TimeTool></TimeTool>
                <el-col :span='16'>
                    <MapsContain :barDate='bar_date'></MapsContain>
                </el-col>
                <el-col :span='8'>
                    <LIneCharts :lineDate="line_date"
                        :barDate='bar_date'></LIneCharts>
                </el-col>
            </el-col>
            <el-col :span="8">
                <CateList :cateList="cate_list" @getNowCate='get_line_date'></CateList>
            </el-col>
        </el-row>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import api from '../../api/api'

import Header from '../../components/header.vue'
import Top from './top.vue'
import MapsContain from './map.vue'
import CateList from './cate-list.vue'
import TimeTool from './time.vue'
import LIneCharts from './line-charts.vue'
@Component({
    components: {
        Header,
        Top,
        MapsContain,
        CateList,
        TimeTool,
        LIneCharts
    },
})
export default class index extends Vue{
    cate_list:Array<any>=[]
    now_cate:Object
    ts:string = '201805'
    te:string = '201903'
    line_date:Array<any>=[]
    bar_date:Array<any>=[]
    area={
        "530100": "昆明市",
        "530300": "曲靖市",
        "530400": "玉溪市",
        "530500": "保山市",
        "530600": "昭通市",
        "530700": "丽江市",
        "530800": "普洱市",
        "530900": "临沧市",
        "532300": "楚雄彝族自治州",
        "532500": "红河哈尼族彝族自治州",
        "532600": "文山壮族苗族自治州",
        "532800": "西双版纳傣族自治州",
        "532900": "大理白族自治州",
        "533100": "德宏傣族景颇族自治州",
        "533300": "怒江傈僳族自治州",
        "533400": "迪庆藏族自治州",
    }

    created() {
        this.get_cate()
        this.get_bar_date()//初始查询不用绑定cate
    }
    
    @Watch('cate_list',{ immediate: true, deep: true })
    async getFirstLine(val:Array<any>) {
        if(val.length==0) {
            return
        }
        const par = {
            c1:val[0].id,
            period:2,
            ts:this.ts,
            te:this.te
        }
        const response = await api.getPubDatas(par)
        this.line_date = response.data.data
    }

    async get_cate(id: number=0) {//获取一级分类
        const response = await api.getCategory({pid:id})
        const data = response.data;
        //this.get_line_date(data[0])
        data.map(async item => {
            const children = await api.getCategory({pid:item.id})//获取二级分类
            item.children = []
            children.data.map(async child => {
                const par = {
                    c1:item.id,
                    c2: child.id,
                    period:2,
                    ts:this.ts,
                    te:this.te
                }
                const date = await api.getPubDatas(par)//获取二级分类的图表数值
                child.linedate = date.data.data
                item.children.push(child)
            })
            this.cate_list.push(item)
        })
        
    }

    async get_line_date(data:any) { //获取折线图数据
        let par
        if(data.pid ==0) {
            par = {
                c1:data.id,
                period:2,
                ts:this.ts,
                te:this.te
            }
        } else {
            par = {
                c1:data.pid,
                c2:data.id,
                period:2,
                ts:this.ts,
                te:this.te
            }
        }
        
        const response = await api.getPubDatas(par)
        this.line_date = response.data.data
        this.get_bar_date(data)
    }

    async get_bar_date(data?:any) {
        this.bar_date = []
        let response,par
        if(data) {
            if(data.pid == 0) {
                par = {
                    c1:data.id
                }
            } else {
                par = {
                    c1:data.pid,
                    c2:data.id
                }
            }
        }
        response = await api.getAllTendency(par)
        response.data.map(item => {
            this.set_color(item)
            const formateCity = item.city.substr(0, 6)
            item.area = this.area[formateCity]
            this.bar_date.push(item)
        })
        
    }

    set_color(item) {
        if(item.pct > 0.02) {
            item.color = '#FF4D00'
        } else if(item.pct > 0.01) {
            item.color = '#FF8B00'
        } else if(item.pct > 0) {
                item.color = '#FFC000'
        } else if(item.pct == 0) {
            item.color = '#B9D390'
        } else if(item.pct > -0.01) {
            item.color = '#a1b77e'
        } else  if(item.pct > -0.02) {
            item.color = '#9FC88C'
        } else if(item.pct > -0.03) {
            item.color = '#8CC8B0'
        } else {
            item.color = '#8CADC8'
        }
    }
}
</script>

<style lang="less">
    .pd {
        padding-top:1.75rem
    }
</style>