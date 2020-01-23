import React, { Component } from 'react'
import LineService from "../../services/LineService";
import ProfileService from "../../services/profileService";
import App from "../../App.js";
import Cookies from 'js-cookie';
import styled from 'styled-components';

const loginGameUrl = 'https://game.freezer.wip.camp/login'
const gameUrl = 'https://game.freezer.wip.camp'
const clientId = '1653724802'
export default class LoginGame extends Component {

    state = {
        isLoad: false
    }



    async lineLogin() {
        const stateGenerate = await LineService.getGenerateCode()
        const nonceGenerate = await LineService.getGenerateCode()
        Cookies.set('state', stateGenerate.data, { domain: 'game.freezer.wip.camp', path: '/login' })
        Cookies.set('nonce', nonceGenerate.data, { domain: 'game.freezer.wip.camp', path: '/login' })
        // Cookies.set('state',nonceGenerate.data,{domain:})
        // Cookies.set('nonce',nonceGenerate.data,{path: '/login'})
        let stateInCookies = Cookies.get('state')
        console.log('from cookies : ' + Cookies.get('state'))
        console.log('init stateInCookies : ' + stateInCookies)
        // if (stateGenerate.data == Cookies.get('state')) {

        // } else {
        //     stateInCookies = "someThing"
        // }
        const nonceInCookies = Cookies.get('nonce')
        console.log(stateInCookies)
        console.log(nonceInCookies)
        window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${loginGameUrl}&state=${stateInCookies}&scope=openid%20email%20profile&nonce=${nonceInCookies}`
    }

    async findUserGame(userId) {
        let userDataResponse = await ProfileService.getProfile(userId)
        return userDataResponse
    }

    async getTokenFromLineApi(code, nonce) {
        const objectResponse = await LineService.lineLogin(code, nonce)
        if (objectResponse == null) {
            window.location.href = loginGameUrl
        }
        const tokenObject = {
            scope: objectResponse.data.scope,
            access_token: objectResponse.data.access_token,
            token_type: objectResponse.data.token_type,
            expires_in: objectResponse.data.expires_in,
            id_token: objectResponse.data.id_token,
            userId: objectResponse.data.userId
        }
        Cookies.set('token', JSON.stringify(tokenObject))
        window.location.href = gameUrl
    }


    checkStateLine(stateFromLine) {
        const stateInCookie = Cookies.get('state')
        console.log('state from cookies : ' + stateInCookie)
        console.log('state from line res : ' + stateFromLine)
        if (stateInCookie == stateFromLine) {
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
        console.log(search)
        if (search) {
            this.setState({
                isLoad: true
            })
            const resFromLineApi = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
            console.log('get state from response from line api : ' + resFromLineApi.state)
            if (this.checkStateLine(resFromLineApi.state)) {
                this.getTokenFromLineApi(resFromLineApi.code, Cookies.get('nonce'))
                // Cookies.remove('state', { path: loginGameUrl });
                // Cookies.remove('nonce', { path: loginGameUrl });
            } else {
                Cookies.remove('state', { path: loginGameUrl });
                Cookies.remove('nonce', { path: loginGameUrl });
                window.location.href = loginGameUrl
                console.log('check state fail')
            }
        } else {
            this.setState({
                isLoad: false
            })
            console.log('fail from line api')
        }
    }

    render() {
        let component

        const ButtonContainer  = styled.div`
            
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            
            
        `

        const Button = styled.button`
            background: #00C300;
            color: #FFFFFF;
            line-height: 1.5;
            height: 55px;
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            
            transition: all 0.4s;
            width: 100%;
            font-weight: 500;

            &:hover{
                background: #00E000;
            }

            &:active{
                background: #00B300;
            }

        `

        const LineCI = styled.img`
            height: 50px;
            width: 50px;
            margin-right: 6px;
            margin-top: 0px;
            margin-bottom: 0px;
            margin-left: -7px;
            border-right: 2px solid 00b300;
        `

        if (this.state.isLoad) {
            component = <center>LOADING...</center>
        } else {
            // component = <center><button style={lineButtonStyle} onClick={this.handleClick.bind(this)} >Log in with Line</button></center>

        }
        return (
            // <React.Fragment>
            //     {component}
            //     {/* { Cookies.get('state') } */}
            // </React.Fragment>            
            <ButtonContainer>
                <Button>
                    <LineCI src="/image/line_ci.png" /> <span>Log in with Line</span>
                </Button>
            </ButtonContainer>
        );
    }
}
