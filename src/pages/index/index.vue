<template>
    <div class='pd'>
        <Header></Header>
        <Top></Top>
        <el-row>
            <el-col :span="18">
                <TimeTool></TimeTool>
                <el-col :span='18'>
                    <MapsContain></MapsContain>
                </el-col>
                <el-col :span='6'>
                    <LIneCharts></LIneCharts>
                </el-col>
            </el-col>
            <el-col :span="6">
                <CateList :cateList="cate_list"></CateList>
            </el-col>
        </el-row>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
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
    ts:string = '201805'
    te:string = '201903'

    created() {
        this.get_cate()
    }
    
    async get_cate(id: number=0) {//获取一级分类
        const response = await api.getCategory({pid:id})
        const data = response.data;
        data.map(async item => {
            const children = await api.getCategory({pid:item.id})//获取二级分类
            item.children = []
            children.data.map(async child => {
                const par = {
                    c1:item.id,
                    c2: child.id,
                    period:2,
                    total:0,
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
}
</script>

<style lang="less">
    .pd {
        padding-top:1.75rem
    }
</style>