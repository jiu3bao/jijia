<template>
    <div class='map'>
        <div v-show='!show_qu' style='height:100%'>
            <DQ v-if='city_code == "533400000000"' @showIfra = 'show_ifra'></DQ>
            <NJ v-if='city_code == "533300000000"' @showIfra = 'show_ifra'></NJ>
            <DH v-if='city_code == "533100000000"' @showIfra = 'show_ifra'></DH>
            <DL v-if='city_code == "532900000000"' @showIfra = 'show_ifra'></DL>
            <BN v-if='city_code == "532800000000"' @showIfra = 'show_ifra'></BN>
            <WS v-if='city_code == "532600000000"' @showIfra = 'show_ifra'></WS>
            <HH v-if='city_code == "532500000000"' @showIfra = 'show_ifra'></HH>
            <CX v-if='city_code == "532300000000"' @showIfra = 'show_ifra'></CX>
            <LC v-if='city_code == "530900000000"' @showIfra = 'show_ifra'></LC>
            <PE v-if='city_code == "530800000000"' @showIfra = 'show_ifra'></PE>
            <LJ v-if='city_code == "530700000000"' @showIfra = 'show_ifra'></LJ>
            <ZT v-if='city_code == "530600000000"' @showIfra = 'show_ifra'></ZT>
            <BS v-if='city_code == "530500000000"' @showIfra = 'show_ifra'></BS>
            <YN v-if='city_code == ""'  @choseMap='chose_map'></YN>
            <KM v-if='city_code == "530100000000"' @showIfra = 'show_ifra'></KM>
            <QJ v-if='city_code == "530300000000"' @showIfra = 'show_ifra'></QJ>
            <YX v-if='city_code == "530400000000"' @showIfra = 'show_ifra'></YX>
        </div>
        
        <iframe width="100%" height="600px" frameborder="no" border="0" v-show='show_qu' :src='qu_url' class='iframe'></iframe>
    </div>
</template>

<script lang='ts'>
import YN from './maps/ynMap.vue'//云南省
import KM from './maps/kunming.vue'//昆明
import QJ from './maps/qujing.vue'//曲靖
import YX from './maps/yuxi.vue'//玉溪
import BS from './maps/baoshan.vue'//保山
import ZT from './maps/zhaotong.vue'//昭通
import LJ from './maps/lijiang.vue'//丽江
import PE from './maps/puer.vue'//普洱
import LC from './maps/lincang.vue'//临沧
import CX from './maps/chuxiong.vue'//楚雄
import HH from './maps/honghe.vue'//红河
import WS from './maps/wenshan.vue'//文山
import BN from './maps/banna.vue'//版纳
import DL from './maps/dali.vue'//大理
import DH from './maps/dehong.vue'//德宏
import NJ from './maps/nujiang.vue'//怒江
import DQ from './maps/diqin.vue'//迪庆
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
    components: {
        YN,
        KM,
        QJ,
        YX,
        BS,
        ZT,
        LJ,
        PE,
        LC,
        CX,
        HH,
        WS,
        BN,
        DL,
        DH,
        NJ,
        DQ
    },
    
})

export default class mapContain extends Vue{
    qu_url: string = ''

    get city_code(): string {
        return this.$store.state.area_code
    }

    get show_qu(): boolean {
        return this.$store.state.show_qu
    }
    // @Watch('barDate', {immediate:true, deep:true}) 
    //     watchBar(val) {
    //         if(val.length == 0) {
    //             return
    //         }
    //         this.mapData= this.barDate
    //         console.log(val,1111111111)
    //     }

    chose_map(data:any) {
        console.log(222222222222)
        this.$store.commit('SET_AREA_CODE', data.id)
        this.$store.commit('SET_AREA_NAME',data.city)
    }

    show_ifra(url: string) {
        this.$store.commit('SET_SHOW_QU', true)
        console.log(url)
        this.qu_url = url
    }
}
</script>

<style lang="less">
    .map {
        width:80%;
        margin:0 auto;
        position:relative;
        height:80%;
        div{
            height:100%;
            display:flex;
            justify-content:center;
            align-items:center
        }
    }
    .iframe {
        position:absolute;
        top:80px;

    }
</style>