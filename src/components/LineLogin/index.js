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
        // let lineResponse = await LineService.lineLogin();
        //  console.log(process.env.REACT_APP_LINE_API_PATH)
        this.getGenerateCode()
        window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${loginGameUrl}&state=${Cookies.get('state')}&scope=openid%20email%20profile&nonce=${Cookies.get('nonce')}`
    }

    async getGenerateCode() {
        const stateGenerate = await LineService.getGenerateCode()
        const nonceGenerate = await LineService.getGenerateCode()
        Cookies.set('state', stateGenerate.data);
        Cookies.set('nonce', nonceGenerate.data)
    }

    async findUserGame(userId) {
        let userDataResponse = await ProfileService.getProfile(userId)
        return userDataResponse
    }

    async getTokenFromLineApi(code, nonce) {
        const token = await LineService.lineLogin(code, nonce)
        console.log('token : '+token)
    }


    checkStateLine(stateFromLine) {
        const stateInCookie = Cookies.get('state')
        if (stateInCookie.length == 32) {
            if (stateInCookie === stateFromLine) {
                return true
            } else {
                return false
            }
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
            console.log('response from line api : ' + resFromLineApi)
            if (this.checkStateLine(resFromLineApi.state)) {
                this.getTokenFromLineApi(resFromLineApi.code, Cookies.get('nonce'))
                Cookies.remove('state');
                Cookies.remove('nonce');
            } else {
                Cookies.remove('state');
                Cookies.remove('nonce');
                window.location.href = loginGameUrl
            }
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
