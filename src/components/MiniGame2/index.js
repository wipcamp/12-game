import React, { Component } from 'react';
import styled from 'styled-components';


import GageBar from './GageBar'
// import Monster_Test from './Monster_Test'
import MonsterTexture from './MonsterTexture'
import Player from './Player'
import Health from './Health'

// const liff = window.liff;

const MonsterMovement = styled.div`
top: 20vh;
left: 5vw;
position: fixed;
animation: monster 2s infinite linear;

@keyframes monster {
  0%   {
      transform: translateX(100vw);
  }
  100% {
      transform: translateX(0);
  }
}
`

const ControllerBar = styled.div`
  position : fixed;
  bottom: 0vh;
  height: 30vh;
  width: 100vh;
  background-color: powderblue;
`

const PlayerMoveMent = styled.div`
  top: 20vh;
  left: 5vw;
  position: fixed;
  animation: player 2s infinite linear;

@keyframes player {
    0%   {
        transform: translateY(0);
    }
    50%  {
        transform: translateY(20vw);
    }
    100% {
        transform: translateY(0);
    }
  }
`

export default class MiniGame2 extends Component {

  state = {
    isAttack: false,
    isClicked: true
  }

  // constructor() {
  //   super();
  //   this.state = {
  //     isLoad: false,
  //   }
  //   this.player = [];
  //   this.monsters = [];
  // }

  componentDidMount() {
    // if(liff){
    //   liff
    //     .init({
    //       liffId: '1653691835-vZ4GNK7z'
    //   })
    //   .then(async () => {
    //     if(!liff.isLoggedIn()){
    //       console.log("not liff")
    //       //รอpathเกมน้อง
    //       // window.location.replace("/");
    //     } else {
    //         this.setState({
    //           isLoad:false
    //         })
    //     }
    // })
    // .catch(err => {
    //     console.log(err);
    // });
    // }
    // this.intervalId = setInterval(this.createObject.bind(this), 1000);
  }

  render() {
    if (this.state.isLoad) {
      return <p>loading</p>
    } else {
      return (
        <div>
          <p>attack:  {this.state.isAttack? 'true': 'false'} </p>
          <PlayerMoveMent>
            <Player />
          </PlayerMoveMent>
          <MonsterMovement>
            {/* <Monster_Test/> */}
            <MonsterTexture />
          </MonsterMovement>
          <ControllerBar>
            <GageBar />
          </ControllerBar>
          <Health isAttack={this.state.isAttack}/>
          <button onClick={() => this.state.isClicked? this.setState({isClicked: false}) : this.setState({isClicked: true})} >under</button>
        </div>
      );
    }
  }
}