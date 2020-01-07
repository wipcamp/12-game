import React, { Component } from 'react'
import LineService from "./services/LineService";
import ProfileService from "./services/profileService";
import App from "./App.js";

export default class LoginGame extends Component {
    state = {
        logedIn : false,
        data : {}
    }
  
    async lineLogin() {
        // let lineResponse = await LineService.lineLogin();
        //  console.log(process.env.REACT_APP_LINE_API_PATH)
        window.location.href=`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653724802&redirect_uri=https://game.freezer.wip.camp/login&state=gensthandstoreincookie&scope=openid%20email%20profile&nonce=gensth`
      }

    async findUserGame(userId){
          let userDataResponse = await ProfileService.getProfile(userId)
          return userDataResponse
      }

    checkUserRouting(lineResponse){
        if(lineResponse!=null){
          let data = this.findUserGame(lineResponse)
          if(data!=null){
                this.setState({
                    logedIn : true,
                    data : data
                })
            }else{
            window.location.href='https://reactjs.org/docs/conditional-rendering.html'
            }
        }else{
            
        }
      }

    handleClick(){
          this.lineLogin()
      }

      componentDidMount(){
         const codeFromLineApi = window.location.search.substr(1).split(`&`)
         if(codeFromLineApi[0]){
            //  console.log(codeFromLineApi)
        console.log(JSON.parse(codeFromLineApi[0]))
        LineService.lineLogin(JSON.parse(codeFromLineApi[0]))
         }

      }

    render() {
        const logedIn = this.state.logedIn
        let componentDependOnLogedIn;
        if(!logedIn){
            componentDependOnLogedIn = <div>
                        <center><button onClick={this.handleClick.bind(this)} >login line</button></center>
                        </div>
        }else{
            componentDependOnLogedIn = <App data={this.state.data}/>
        }

        return (
            componentDependOnLogedIn
           );
        }
}
