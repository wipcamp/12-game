import React, { Component } from 'react'
import LineService from "../../services/LineService";
import ProfileService from "../../services/profileService";
import App from "../../App.js";
import Cookies from 'js-cookie';

const loginGameUrl = 'https://game.freezer.wip.camp/login'
const clientId = '1653724802'
export default class LoginGame extends Component {
    state = {
        logedIn: false,
        data: {},
    }

    async lineLogin() {
        const stateGenerate = await LineService.getGenerateCode()
        const nonceGenerate = await LineService.getGenerateCode()
        Cookies.set('state', stateGenerate.data, { path: loginGameUrl });
        Cookies.set('nonce', nonceGenerate.data, { path: loginGameUrl })
        const stateInCookies = Cookies.get('state')
        const nonceInCookies = Cookies.get('nonce')
        console.log(stateInCookies)
        console.log(nonceInCookies)
        // window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${loginGameUrl}&state=${Cookies.get('state')}&scope=openid%20email%20profile&nonce=${Cookies.get('state')}`
    }

    async findUserGame(userId) {
        let userDataResponse = await ProfileService.getProfile(userId)
        return userDataResponse
    }

    async getTokenFromLineApi(code, nonce) {
        const token = await LineService.lineLogin(code, nonce)
        console.log('token : ' + token)
    }


    checkStateLine(stateFromLine) {
        const stateInCookie = Cookies.get('state')
        console.log('state from cookies : ' + stateInCookie)
        console.log('state from line res : ' + stateFromLine)
        if (stateInCookie === stateFromLine) {
            return true
        } else {
            return false
        }
    }


    handleClick() {
        this.lineLogin()
    }

    componentDidMount() {
        const search = window.location.search.substring(1);
        if (search) {
            const resFromLineApi = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
            console.log('get state from response from line api : ' + resFromLineApi.state)
            if (this.checkStateLine(resFromLineApi.state)) {
                this.getTokenFromLineApi(resFromLineApi.code, Cookies.get('nonce'))
                Cookies.remove('state', { path: loginGameUrl });
                Cookies.remove('nonce', { path: loginGameUrl });
            } else {
                Cookies.remove('state', { path: loginGameUrl });
                Cookies.remove('nonce', { path: loginGameUrl });
                // window.location.href = loginGameUrl
                console.log('check state fail')
            }
        } else {
            console.log('fail from line api')
        }
    }

    render() {
        const logedIn = this.state.logedIn
        let componentDependOnLogedIn;
        if (!logedIn) {
            componentDependOnLogedIn = <div>
                {this.state.state}<br />
                {this.state.nonce}
                <center><button onClick={this.handleClick.bind(this)} >login line</button></center>
            </div>
        } else {
            componentDependOnLogedIn = <App data={this.state.data} />
        }

        return (
            componentDependOnLogedIn
        );
    }
}
