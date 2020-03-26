import React, { Component } from 'react';
import styled from 'styled-components';
import GageBar from './GageBar';
import MonsterTexture from './MonsterTexture';
import Player from './Player';
import Health from './Health';

// const liff = window.liff;

const MonsterMovement = styled.div`
  top: 20vh;
  left: 5vw;
  position: fixed;
  background-color: red;
  animation: monster 10s infinite linear;
  @keyframes monster {
    0% {
      transform: translateX(100vw);
    }
    100% {
      transform: translateX(10vw);
    }
  }
`;

const ControllerBar = styled.div`
  position: fixed;
  bottom: 0vh;
  height: 30vh;
  width: 100vh;
  background-color: powderblue;
`;

const PlayerMoveMent = styled.div`
  top: 20vh;
  left: 5vw;
  position: fixed;
  background-color: blue;
  @keyframes player {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20vw);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default class MiniGame2 extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.monster = React.createRef();
    this.selector = React.createRef();
    this.atTarget = React.createRef();
  }

  state = {
    isAttack: false,
    isClicked: true,
    point: 0,
    position: 30,
    size: 30,
    health: 100,
    velo: 2
  };

  prevState = {
    point: 0
  };

  keep = {
    velo: 2
  }

  componentDidMount() {
  }
  componnentDidUpdate() {}

  onGage = order => {
    if (order) {
      console.log('point from gagebar: ' + order);
      this.setState({
        point: order
      });
    }
  };

  conHealth = order => {
    this.setState({
      health: order
    });
  };

  getMonster = () => {
    const Mon = styled.div`
      top: 20vh;
      left: 5vw;
      position: fixed;
      background-color: red;
      animation: monster ${this.state.velo}s infinite linear;
      @keyframes monster {
        0% {
          transform: translateX(100vw);
        }
        100% {
          transform: translateX(10vw);
        }
      }
    `;
    if(this.state.health > 0) {
      return (<Mon><MonsterTexture /></Mon>);
    }else {
      return ( <h2>Dead</h2> )
    }
  };

  render() {
    if (this.state.isLoad) {
      return <p>loading</p>;
    } else {
      return (
        <div>
          {this.state.health > 0 ? (
            <PlayerMoveMent ref={this.player}>
              <Player />
            </PlayerMoveMent>
          ) : (
            <h2>You are</h2>
          )}
          {this.getMonster()}
          <ControllerBar>
            <GageBar confirm={this.onGage} health={this.state.health} />
          </ControllerBar>
          <p>point index: {this.state.point} </p>
          <p> index health: {this.state.health} </p>
          <Health point={this.state.point} velo={this.state.velo} confirm={this.conHealth} />
        </div>
      );
    }
  }
}
