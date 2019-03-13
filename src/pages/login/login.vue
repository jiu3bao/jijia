<template>
    <div class='main'>
        <video id="J_video_player" muted="" poster="img/login.png" class="video-player main" autoplay loop>
            <source src="static/mp4/login.mp4" type="video/mp4">
        </video>
        <div class="bg">
            <div class="login-bg">
                <div id="login">
                    <img src="static/assets/loginlogo.png">
                    <div class="login-main">
                        <p>云南省建设工程材料及设备价格监测系统</p>
                        <div class="login-input">
                            <input @focus="show=false" type="text" name="username" id="username" v-model="username" placeholder="账号" />
                            <input @focus="show=false" @keyup.enter="dologin" type="password" name="passward" placeholder="密码" v-model="passward" />
                            <div class="login-img">
                                <img src="static/assets/lgbtn.png" @click="dologin">
                            </div>
                        </div>
                        <span v-show="show" v-text="errmsg" style="color: darkred;line-height: 20px;font-size: 16px;margin-left:15px;"></span>
                    </div>
                    <div class="back-help">
                        <a @click='$router.replace("/index")'>返回主页</a>
                        <a @click='$router.replace("/help")'>帮助</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import api from '../../api/api'
import DES3 from '../../../static/des3.js'

@Component({})
export default class login extends Vue{
    show: boolean =false
    username: string=''
    passward: string =''
    errmsg:string =''
    user_info: any={}
    token: string =''

    async dologin() {
        if (this.username.trim().length == 0 ||
            this.passward.trim().length == 0) {
            this.errmsg = '请输入登录账号和口令'
            this.show = true
            return
        }

        const key = 'EA22DAB57022E2560A376749E3408196A9E287D800E068E8'
        const up = DES3.encrypt(key, this.passward)
        const un = DES3.encrypt(key, this.username)
        const postdata = {
            up,
            un,
            src: 1 //从web登录
        }
        const response = await api.userLogin(postdata)
        if(response.data.code ==1) {
            this.user_info = response.data.userinfo
            this.token = this.user_info.token
            this.$store.commit('SET_TOKEN', this.token)
            const that = this
            const timer = setTimeout(function(){
                that.token = ''
                that.$store.commit('SET_TOKEN', that.token)
            }, 1000*60*30)

            this.$store.commit('SET_CLEAR_TOKEN_TIMER', timer)
            this.$router.replace('/index')
        } else {
            this.errmsg = response.data.msg
            this.show = true
        }
    }
}
</script>

<style lang="" scoped>
    a {
        text-decoration: none;
        color: #000000;
    }

    ul,
    li {
        list-style: none;
    }

    img {
        display: block;
        width: 100%;
    }



    .main {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
        position: relative;
    }

    .video-player {
        background-color: transparent;
        width: 100%;
        min-height: 100%;
        overflow-y: hidden;
        display: block;
        z-index: 1;
    }

    #app {
        width: 100%;
        height: 100%;

    }

    .bg {
        background: rgba(0, 0, 0, .5);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index:100
    }

    .login-bg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 40px 80px;
        background: rgba(179, 179, 179, .7);
        border-radius: 10px;
    }

    #login {}

    #login>img {
        margin: 0 auto;
        width: 46.3%;
        margin-bottom: 20px;
    }

    .login-main {
        font-size: 24px;
        width: 18em;
        color: #fff;
        margin-bottom: 40px;
    }

    .login-input {
        position: relative;
        text-align: center;
    }

    .login-input input {
        background: rgba(255, 255, 255, .5);
        border: 1px solid #FFFFff;
        outline: none;
        font-size: 18px;
        line-height: 40px;
        height: 40px;
        width: 96%;
        padding: 0 2em;
        border-radius: 30px;
        margin-top: 30px;
    }

    .login-input input::-webkit-input-placeholder {

        font-size: 16px;
    }

    .login-img {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 10px;
        bottom: 0;
        cursor: pointer;
    }

    .back-help {
        margin-bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        color: #FFFFFF;
    }

    .back-help a {
        color: #FFFFFF;
        font-size: 14px;
    }

    @media screen and (max-width:1400px) {
        .login-main {
            font-size: 20px;
        }

        .login-input input {
            font-size: 16px;
            line-height: 35px;
            height: 35px;
        }

        .login-img {
            width: 35px;
            height: 35px;
            right: 8px;
        }

        .login-input input::-webkit-input-placeholder {
            font-size: 16px;
        }

    }
</style>