<template>
    <div class="center">
        <div class="baogaos" :class='index == chosed_index?"darkbg":""' @click="light(index)" v-for='(item,index) in chosed_city'>
            <p @click='back_yn' :class='$store.state.area_name && $store.state.area_name.length>0?"border-b":""'>云南省</p>
            <p v-if='$store.state.area_name && $store.state.area_name.length>0' @click='back_city'>
                ><u :class='$store.state.qu_name && $store.state.qu_name.length>0?"border-b":""'>{{$store.state.area_name}}</u>
            </p>
            <p v-if='$store.state.qu_name && $store.state.qu_name.length>0'>><u>{{$store.state.qu_name}}</u></p>
            <p>&nbsp;&nbsp;|&nbsp;&nbsp;{{ts}}-{{te}}&nbsp;&nbsp;|&nbsp;&nbsp;</p>		
            <p class="cailiaoname">{{!nowCate.name || nowCate.name.length==0? '全类型综合': nowCate.name}}</p>
            <!--p><button class="chakans">查看报告</button></p>
            <img :src='index == chosed_index?"static/assets/cha.png":"static/assets/cha2.png"' class="cha2" alt=""/-->
        </div>			
        <!--button class='adds' @click="tianjia">添加对比+</button>
        <button class='starts' @click="kaishi">开始对比</button-->
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({})
export default class top extends Vue{
    chosed_index: number=0
    title=[]
    ix: number =0
    u1: boolean=true

    get ts() {
        return this.$store.state.time.ts.substr(0,4) + '.' + this.$store.state.time.ts.substr(4,2)
    }

    get te() {
        return this.$store.state.time.te.substr(0,4) + '.' + this.$store.state.time.te.substr(4,2)
    }

    @Prop({
        type: Array,
        default() {
            return [1]
        }
    })
    chosed_city: Array<number>

    @Prop({})
    nowCate:any


    light(index:number) {
        this.chosed_index = index
    }

    tianjia() {

    }

    kaishi() {

    }

    back_yn() {
        console.log(33333333333)
        this.$store.commit('SET_AREA_CODE', '')
        this.$store.commit('SET_AREA_NAME', '')
        this.$store.commit('SET_SHOW_QU', false)
        this.$store.commit('SET_QU_NAME', '')
        this.$store.commit('SET_QU_CODE', '')
    }

    back_city() {
        this.$store.commit('SET_SHOW_QU', false)
        this.$store.commit('SET_QU_NAME', '')
        this.$store.commit('SET_QU_CODE', '')
    }
}
</script>
<style lang="less" scoped>
    u {
        text-decoration: none;
    }
     .center{
        width:100%;
        height: 1.1rem;
        background: #202f50;
        position: absolute;
        // top:1.725rem;
        display:flex;
        z-index:111;
        .baogaos {
            height: 1.1rem;
            background-color: #b0b0b0;
            padding-left: 20px;
            padding-right: 10px;
            display:flex;
            align-items:center;
            p {
                font-size:.45rem;
                color:#fff;
                
            }
            .cha2 {
                margin-left:.3rem
            }
        }
        button{
            background: #7d7e7d;
            border: none;
            margin-left: 15px;
            padding: 0 10px;
            border-radius: 3px;
            color: #dde2ee;
            outline: none;
        }
    }
    .border-b {
        border-bottom:1px solid #fff;
        cursor:pointer
    }
    .darkbg {
        background-color: #657699 !important;
        button {
            background: #8b9fc9;
            color: #dde2ee;
        }
    }
     .adds,.starts{
        padding: 2px 20px !important;
        border-radius: 15px !important;
        margin-left: 5px !important;
        border: none;
        background: #5d75a5 !important;
        color:#dde3f0 !important;
        outline: none;
        cursor:pointer;
        font-size:.45rem;
        line-height:.45rem;
    }
</style>