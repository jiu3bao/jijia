<template>
    <div class="data">
        <div class="alls" style="background: rgb(83, 98, 136); color: rgb(255, 255, 255);">全类型综合</div>
        <div class="swiper-container">
            <!--@mouseleave="resumeScroll"-->
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in cateList" :key="item.id">
                    <div class="sp-title" @click="lookClpct(item.id,'',index)">
                        <!--传一个空进来是避免没传pid影响代码运行，js里面传了pid，这里用空代替pid-->
                        <div class='flex'>
                            <img :src="'static/assets/fl'+index+'.png'">
                            <span>{{item.name}}</span>
                        </div>
                        <button class="xiangqins" @click="lookFisrtDetail(item.id,item.name)">查看详情</button>
                    </div>
                    <div class="data-list" v-for="(cont,i) in item.children" :key="cont.id">
                        <div class='data-list-name'>
                            <p>{{cont.name}}</p>
                            <div class='flex'>
                                <p>数值:{{cont.linedate?(cont.linedate.length>0?cont.linedate[cont.linedate.length-1].mindex:'暂无数据'):'aaa'}}</p>
                                <p>趋势:{{cont.linedate?(cont.linedate.length>0?cont.linedate[cont.linedate.length-1].idxval:''):''}}</p>
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
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class cateList extends Vue{
    

    @Prop({
        type: Array
    })
    cateList

    // get cate(): Array<any>{//computed
    //     return this.cateList
    // }

    @Watch('cate')
    catechange(val) {
        console.log(val,'1111')
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
	//height: 70px;
	align-items: center;
	justify-content: space-between;
	font-size: .4rem;
	color: #ebedf1;
	cursor:pointer;
}
.data-list-name {
	padding:0 .125rem 0 0.5rem;
	width: 10em;
	line-height:70px;
	background-color: #536288;
    .div {
        display:flex;
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
    height: 60px;
    margin-left: .5rem;
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