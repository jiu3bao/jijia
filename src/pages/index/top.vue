<template>
    <div class="center" v-cloak>
        <div class="baogaos" :class='index == chosed_index?"darkbg":""' @click="light(index)" v-for='(item,index) in chosed_city'>
            <p>云南省</p>
            <p>><u>aa市</u></p>
            <p>><u>bb区</u></p>
            <p>&nbsp;&nbsp;|&nbsp;&nbsp;2018.9-2019.2&nbsp;&nbsp;|&nbsp;&nbsp;</p>		
            <p class="cailiaoname">材料名</p>
            <p><button class="chakans">查看报告</button></p>
            <img :src='index == chosed_index?"static/assets/cha.png":"static/assets/cha2.png"' class="cha2" alt=""/>
        </div>			
        <button class='adds' @click="tianjia">添加对比+</button>
        <button class='starts' @click="kaishi">开始对比</button>
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

    @Prop({
        type: Array,
        default() {
            return [1]
        }
    })
    chosed_city: Array<number>


    light(index:number) {
        this.chosed_index = index
    }

    tianjia() {

    }

    kaishi() {

    }
}
</script>
<style lang="less" scoped>
     .center{
        width:100%;
        height: 30px;
        background: #202f50;
        // position: relative;
        // top:1.725rem;
        display:flex;
        .baogaos {
            height: 30px;
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