import React, { Component } from 'react';
import GageBar from './GageBar'

const liff = window.liff;

export default class MiniGame2 extends Component {

  state = {
    isLoad : false,
  }

  componentDidMount(){
    // if(liff){
      liff
        .init({
          liffId: '1653691835-vZ4GNK7z'
      })
      .then(async () => {
        if(!liff.isLoggedIn()){
          console.log("not liff")
          //รอpathเกมน้อง
          // window.location.replace("/");
        } else {
            this.setState({
              isLoad:false
            })
        }
    })
    .catch(err => {
        console.log(err);
    });
    // }
  }

  render() {
      console.log(this.state.isLoad)
      console.log("in minigame 2 in user")
      console.log(liff)
      if(this.state.isLoad){
          return <p>loading</p>
      }else{       
        return (
          <div>
              <GageBar/>
              <h1>minigame 2 page</h1>
          </div>
        );
      }
    }  
}