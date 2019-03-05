<template>
    <div class='map'>
        <DQ v-if='city == "dq"'></DQ>
        <NJ v-if='city == "nj"'></NJ>
        <DH v-if='city == "dh"'></DH>
        <DL v-if='city == "dl"'></DL>
        <BN v-if='city == "bn"'></BN>
        <WS v-if='city == "ws"'></WS>
        <HH v-if='city == "hh"'></HH>
        <CX v-if='city == "cx"'></CX>
        <LC v-if='city == "lc"'></LC>
        <PE v-if='city == "pe"'></PE>
        <LJ v-if='city == "lj"'></LJ>
        <ZT v-if='city == "zt"'></ZT>
        <BS v-if='city == "bs"'></BS>
        <YN v-if='city == "yn"'></YN>
        <KM v-if='city == "km"'></KM>
        <QJ v-if='city == "qj"'></QJ>
        <YX v-if='city == "yx"'></YX>
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
    city:string='yn'
}
</script>

<style lang="less">
    .map {
        width:80%;
        margin:0 auto;
    }
</style>