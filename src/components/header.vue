<template>
    <div class="head">
        <img src="static/assets/logo.png">
        <div class="login-help">
            <div class="login">
                <p @click="login">{{token?'注销':'登录'}}</p>						
            </div>
            <p href="#" class="mima" v-if="tk" @click="tankuang">修改密码</p>
            <div class="help" @click='$router.push("/help")'>
                <p >帮助</p>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({})
export default class Header extends Vue{
    //token:string=''
    tk:boolean=false
    get token():string {
        return this.$store.state.token
    }

    login(){
        if(this.token && this.token.length>0) {
            this.$store.commit('SET_TOKEN', '')
            this.$store.commit('SET_CLEAR_TOKEN_TIMER', null)
        }else {
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less">
    .head {
        width: 100%;
        height: 1.725rem;
        position: absolute;
        // top: 0;
        // left: 0;
        display:flex;
        justify-content:space-between;
        padding: .375rem .625rem;
        box-sizing:border-box;
        z-index:1111;
        img {
            height:100%;
            width:auto;
        }
    }
    .login-help {
        display: flex;
        align-items: center;
        font-size: .4rem;
    }
    .login {
        padding-right: .375rem;
        margin-right: .375rem;
        border-right: 1px solid #2C2C2C;
    }
    .mima{
        display: flex;
        align-items: center;
        font-size: .4rem;
        padding-right: .375rem;
        margin-right: .375rem;
        border-right: 1px solid #2C2C2C;
        position: relative;
    }
</style>