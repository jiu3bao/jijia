<template>
    <div style='height:100%'>
        <Header></Header>
        <Top :nowCate='now_cate' class='af-head'></Top>
        <el-row class='pd' style='over-flow:hidden'>
            <el-col :span="6" style='height:100%'>
                <CateList :cateList="cate_list" @getNowCate='get_now_cate'></CateList>
            </el-col>
            <el-col :span="18" style='height:100%;position:relative'>
                <TimeTool @changeTime='changeTime' class='timer'></TimeTool>
                <el-col :span='16' style='height:100%;
                display:flex;
                flex-direction:column;
                justify-content:space-around;
                align-items:center' class='af-head1'>
                    <MapsContain></MapsContain>
                    <img src='static/assets/trend.png' style='margin:0 auto;width:350px'/>
                </el-col>
                <el-col :span='8' v-if='!this.code.qu || this.code.qu.length ==0 ' style='height:100%' class='af-head1'>
                    <LIneCharts :lineDate="line_date" :lineLength='cate_list_length'
                        :barDate='bar_date' :resize="resize"></LIneCharts>
                </el-col>
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
    loading:any
    resize:number=0
    cate_list:Array<any>=[]
    cate_list_length:number = 0
    now_cate:any={}
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
    area_code: string=''
    citycode:any = {
			"530000": {
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
				"533400": "迪庆藏族自治州"
			},
			"530100": {
				"530101": "市辖区",
				"530102": "五华区",
				"530103": "盘龙区",
				"530111": "官渡区",
				"530112": "西山区",
				"530113": "东川区",
				"530114": "呈贡区",
				"530122": "晋宁县",
				"530124": "富民县",
				"530125": "宜良县",
				"530126": "石林彝族自治县",
				"530127": "嵩明县",
				"530128": "禄劝彝族苗族自治县",
				"530129": "寻甸回族彝族自治县",
				"530181": "安宁市"
			},
			"530300": {
				"530301": "市辖区",
				"530302": "麒麟区",
				"530303": "沾益区",
				"530321": "马龙县",
				"530322": "陆良县",
				"530323": "师宗县",
				"530324": "罗平县",
				"530325": "富源县",
				"530326": "会泽县",
				"530381": "宣威市"
			},
			"530400": {
				"530401": "市辖区",
				"530402": "红塔区",
				"530403": "江川区",
				"530422": "澄江县",
				"530423": "通海县",
				"530424": "华宁县",
				"530425": "易门县",
				"530426": "峨山彝族自治县",
				"530427": "新平彝族傣族自治县",
				"530428": "元江哈尼族彝族傣族自治县"
			},
			"530500": {
				"530501": "市辖区",
				"530502": "隆阳区",
				"530521": "施甸县",
				"530523": "龙陵县",
				"530524": "昌宁县",
				"530581": "腾冲市"
			},
			"530600": {
				"530601": "市辖区",
				"530602": "昭阳区",
				"530621": "鲁甸县",
				"530622": "巧家县",
				"530623": "盐津县",
				"530624": "大关县",
				"530625": "永善县",
				"530626": "绥江县",
				"530627": "镇雄县",
				"530628": "彝良县",
				"530629": "威信县",
				"530630": "水富县"
			},
			"530700": {
				"530701": "市辖区",
				"530702": "古城区",
				"530721": "玉龙纳西族自治县",
				"530722": "永胜县",
				"530723": "华坪县",
				"530724": "宁蒗彝族自治县"
			},
			"530800": {
				"530801": "市辖区",
				"530802": "思茅区",
				"530821": "宁洱哈尼族彝族自治县",
				"530822": "墨江哈尼族自治县",
				"530823": "景东彝族自治县",
				"530824": "景谷傣族彝族自治县",
				"530825": "镇沅彝族哈尼族拉祜族自治县",
				"530826": "江城哈尼族彝族自治县",
				"530827": "孟连傣族拉祜族佤族自治县",
				"530828": "澜沧拉祜族自治县",
				"530829": "西盟佤族自治县"
			},
			"530900": {
				"530901": "市辖区",
				"530902": "临翔区",
				"530921": "凤庆县",
				"530922": "云县",
				"530923": "永德县",
				"530924": "镇康县",
				"530925": "双江拉祜族佤族布朗族傣族自治县",
				"530926": "耿马傣族佤族自治县",
				"530927": "沧源佤族自治县"
			},
			"532300": {
				"532301": "楚雄市",
				"532322": "双柏县",
				"532323": "牟定县",
				"532324": "南华县",
				"532325": "姚安县",
				"532326": "大姚县",
				"532327": "永仁县",
				"532328": "元谋县",
				"532329": "武定县",
				"532331": "禄丰县"
			},
			"532500": {
				"532501": "个旧市",
				"532502": "开远市",
				"532503": "蒙自市",
				"532504": "弥勒市",
				"532523": "屏边苗族自治县",
				"532524": "建水县",
				"532525": "石屏县",
				"532527": "泸西县",
				"532528": "元阳县",
				"532529": "红河县",
				"532530": "金平苗族瑶族傣族自治县",
				"532531": "绿春县",
				"532532": "河口瑶族自治县"
			},
			"532600": {
				"532601": "文山市",
				"532622": "砚山县",
				"532623": "西畴县",
				"532624": "麻栗坡县",
				"532625": "马关县",
				"532626": "丘北县",
				"532627": "广南县",
				"532628": "富宁县"
			},
			"532800": {
				"532801": "景洪市",
				"532822": "勐海县",
				"532823": "勐腊县"
			},
			"532900": {
				"532901": "大理市",
				"532922": "漾濞彝族自治县",
				"532923": "祥云县",
				"532924": "宾川县",
				"532925": "弥渡县",
				"532926": "南涧彝族自治县",
				"532927": "巍山彝族回族自治县",
				"532928": "永平县",
				"532929": "云龙县",
				"532930": "洱源县",
				"532931": "剑川县",
				"532932": "鹤庆县"
			},
			"533100": {
				"533102": "瑞丽市",
				"533103": "芒市",
				"533122": "梁河县",
				"533123": "盈江县",
				"533124": "陇川县"
			},
			"533300": {
				"533301": "泸水市",
				"533323": "福贡县",
				"533324": "贡山独龙族怒族自治县",
				"533325": "兰坪白族普米族自治县"
			},
			"533400": {
				"533401": "香格里拉市",
				"533422": "德钦县",
				"533423": "维西傈僳族自治县"
			},
		}
    //area_name:string = ''

    
    get city_code():string {
        return this.$store.state.area_code.toString()
    }

    get time() {
        return this.$store.state.time
    }


    get code() {
        return {city:this.$store.state.area_code.toString(), qu: this.$store.state.qu_code.toString()}
    }

    beforeUpdate() {
        // this.loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });
    }

    updated() {
        //this.loading.close()
    }

    @Watch('code', {deep:true})
        watch_code(val) {
            if(val.qu&&val.qu.length>0) {
                this.area_code = val.qu
            } else if(val.city&&val.city.length>0) {
                this.area_code = val.city
                this.get_bar_date()
            } else {
                this.area_code = ''
                this.get_bar_date()
            }
        }

    @Watch('area_code', {deep:true}) 
        watch_area(val) {
            this.get_line_date()
            this.get_cate()
        }

    @Watch('time', {deep: true}) //页面初始化
        watch_time(val) {
            this.cate_list=[]
            this.get_cate()
            this.get_bar_date()
            this.get_line_date()
        }

    changeTime(data) {
        const ts = data.ts.replace('-', '')
        const te = data.te.replace('-','')
        this.$store.commit('SET_TIME', {te,ts})
    }
    
    created() {
    }
    
    
    @Watch('cate_list',{deep: true })
    async getFirstLine(val:Array<any>) {
        // if(val.length==0) {
        //     return
        // }
        // if(this.now_cate && this.now_cate.length>0) return
        // //this.now_cate = val[0]
        // const par = {
        //     c1:val[0].id,
        //     period:2,
        //     ts:this.time.ts,
        //     te:this.time.te,
        //     city: this.area_code
        // }
        // const response = await api.getPubDatas(par)
        // this.line_date = response.data.data
        // const par1 = {
        //     c1:val[0].id
        // }
        // const response1 = await api.getAllTendency(par1)
        //     response1.data.map(item => {
        //         this.set_color(item)
        //         const formateCity = item.city.substr(0, 6)
        //         item.area = this.area[formateCity]
        //         this.bar_date.push(item)
        //     })
    }
    

    async get_cate(id: number=0) {//获取一级分类
        this.cate_list =[]
        this.line_date = []
        const response = await api.getCategory({pid:id})
        const data = response.data;
        this.cate_list_length = data.length
        data.filter(item => {
            item.children = []
            item.line_data = []
        })
        //this.cate_list = data
        data.filter(async item => {
            const par1 = {
                c1:item.id,
                period:2,
                ts:this.time.ts,
                te:this.time.te,
                city: this.area_code
            }
            const line = await api.getPubDatas(par1)//获取一级分类的图表数值
            item.line_data = line.data.data
            
            if(!this.now_cate || !this.now_cate.pid) {
                this.line_date.push({
                    name:item.name,
                    line_data: item.line_data
                })
            } else {
                console.log(this.now_cate)
            }
            const children = await api.getCategory({pid:item.id})//获取二级分类
            item.children = []
            children.data.filter(async child => {
                const par = {
                    c1:item.id,
                    c2: child.id,
                    period:2,
                    ts:this.time.ts,
                    te:this.time.te,
                    city: this.area_code
                }
                const date = await api.getPubDatas(par)//获取二级分类的图表数值
                child.linedate = date.data.data
                item.children.push(child)
            })
            //this.cate_list.push(item)
        })
        this.cate_list = data
        
        //console.log(this.now_cate,123)
        //this.get_bar_date()
    }

    get_now_cate(data: any) {
        this.now_cate = data
        if(this.now_cate && this.now_cate.id) {
            this.get_line_date()
        } else {
            this.line_date = []
            this.cate_list.map(item =>
                this.line_date.push({
                    name:item.name,
                    line_data: item.line_data
                })
            )
        }
        
        this.get_bar_date()
    }

    async get_line_date() { //获取折线图数据
        const default_par = {
            period:2,
            ts:this.time.ts,
            te:this.time.te,
            city: this.area_code
        } 
        let par
        if(this.now_cate && this.now_cate.pid) {
            console.log(this.now_cate.pid)
            if(this.now_cate.pid ==0) {
                par = {
                    c1:this.now_cate.id,
                    ...default_par
                }
            } else {
                par = {
                    c1:this.now_cate.pid,
                    c2:this.now_cate.id,
                    ...default_par
                }
            }
            const response = await api.getPubDatas(par)
            this.line_date = response.data.data
        } else {
            console.log(this.now_cate,123)
        }
        
    }

    async get_bar_date() {
        this.bar_date = []
        let response,par
        if(this.now_cate) {
            if(this.now_cate.pid == 0) {
                par = {
                    c1:this.now_cate.id
                }
            } else {
                par = {
                    c1:this.now_cate.pid,
                    c2:this.now_cate.id
                }
            }
        }
        if(this.area_code == '') {
            response = await api.getAllTendency(par)
            response.data.map(item => {
                this.set_color(item)
                const formateCity = item.city.substr(0, 6)
                item.area = this.area[formateCity]
                this.bar_date.push(item)
            })
        } else {
            const par1 = {
                city: this.area_code,
                ...par
            }
            const nowCity = this.citycode[this.city_code.substr(0, 6)]
            response = await api.getTendencyByCity(par1)
            response.data.map(item => {
                this.set_color(item)
                const formateCity = item.area.substr(0, 6)
                item.area = nowCity[formateCity]
                this.bar_date.push(item)
            })
        }
        
        
    }

    @Watch('bar_date',{immediate:true, deep:true})
    watch_bar(val) {
        this.$store.commit('SET_BAR_DATA', val)
    }

    set_color(item:any) {
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

    window_resize() {
    	const that=this;
			//当浏览器窗口大小改变时，设置显示内容的高度
		window.onresize=function(){//窗口变化时resize发生变化，子组件才能监听
			that.resize+=1
		}
    }
    
	mounted(){
		this.window_resize()
	}
}
</script>

<style lang="less">
    .pd {
        padding-top:2.85rem;
        height:100%;
    }
    .af-head {
        margin-top:1.75rem
    }
    .af-head1 {
        padding-top:2.5rem;
        box-sizing:border-box;
    }
    .timer {
        position:absolute;
        top:0;
    }
</style>