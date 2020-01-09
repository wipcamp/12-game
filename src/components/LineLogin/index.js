import React, { Component } from 'react'
import LineService from "../../services/LineService";
import ProfileService from "../../services/profileService";
import App from "../../App.js";

export default class LoginGame extends Component {
    state = {
        logedIn: false,
        data: {},
        state: null,
        nonce: null,
    }

    async lineLogin() {
        // let lineResponse = await LineService.lineLogin();
        //  console.log(process.env.REACT_APP_LINE_API_PATH)
        window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653724802&redirect_uri=https://game.freezer.wip.camp/login&state=gensthandstoreincookie&scope=openid%20email%20profile&nonce=gensth`
    }

    async getGenerateCode(){
        let stateGenerate = await LineService.getGenerateCode()
        let nonceGenerate = await LineService.getGenerateCode()
        this.setState({
            state : stateGenerate.data,
            nonce : nonceGenerate.data
        })
        console.log(this.state.state)
        console.log(this.state.nonce)
    }

    async findUserGame(userId) {
        let userDataResponse = await ProfileService.getProfile(userId)
        return userDataResponse
    }

    async getTokenFromLineApi(code){
        const token = await LineService.lineLogin(code)
        console.log(token)
    }

    checkUserRouting(lineResponse) {
        if (lineResponse != null) {
            let data = this.findUserGame(lineResponse)
            if (data != null) {
                this.setState({
                    logedIn: true,
                    data: data
                })
            } else {
                window.location.href = 'https://reactjs.org/docs/conditional-rendering.html'
            }
        } else {

        }
    }


    handleClick() {
         this.lineLogin()
    }

    componentDidMount() {
        //  const codeFromLineApi = window.location.search.substr(1).split(`&`)
        this.getGenerateCode();
        const search = window.location.search.substring(1);
        if (search) {
            const codeFromLineApi = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
            console.log(codeFromLineApi)
            this.getTokenFromLineApi(codeFromLineApi.code)
        }
        // console.log(search)
        // if (codeFromLineApi[0]) {
        
        // console.log(JSON.parse(codeFromLineApi[0]))
        
        // }

    }

    render() {
        const logedIn = this.state.logedIn
        let componentDependOnLogedIn;
        if (!logedIn) {
            componentDependOnLogedIn = <div>
                {this.state.state}<br/>
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
