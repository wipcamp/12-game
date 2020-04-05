import React, { Component } from 'react';
import styled from 'styled-components';
import GageBar from './GageBar';
import MonsterTexture from './MonsterTexture';
import Player from './Player';
import Health from './Health';

// const liff = window.liff;
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

const H2 = styled.h2`
  top: 20vh;
  left: 5vw;
  background-color: ${props => props.color};
`;

H2.defaultProps = {
  color: 'red'
};

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
    velo: 2,
    monsAlive: true
  };

  prevState = {
    point: 0
  };

  keep = {
    velo: 2
  };

  onGage = order => {
    if (order) {
      console.log(order);
      this.setState({
        point: order.point,
        monsAlive: order.monsAlive
      });
    }
  };

  conHealth = order => {
    this.setState({
      health: order
    });
  };

  getMonster = velo => {
    let Mon = styled.div``;
    switch (velo) {
      case 1:
        Mon = styled.div`
          display: ${props => (props.dead ? 'none' : 'show')};
          top: 20vh;
          left: 5vw;
          position: fixed;
          background-color: aqua;
          animation: monster 1s infinite linear;
          @keyframes monster {
            0% {
              transform: translateX(100vw);
            }
            100% {
              transform: translateX(10vw);
            }
          }
        `;
        break;
      case 2:
        Mon = styled.div`
          display: ${props => (props.dead ? 'none' : 'show')};
          top: 20vh;
          left: 5vw;
          position: fixed;
          background-color: wheat;
          animation: monster 2s infinite linear;
          @keyframes monster {
            0% {
              transform: translateX(100vw);
            }
            100% {
              transform: translateX(10vw);
            }
          }
        `;
        break;
      case 3:
        Mon = styled.div`
          top: 20vh;
          left: 5vw;
          position: fixed;
          background-color: red;
          animation: monster 3s infinite linear;
          @keyframes monster {
            0% {
              transform: translateX(100vw);
            }
            100% {
              transform: translateX(10vw);
            }
          }
        `;
        break;
      case 4:
        Mon = styled.div`
          top: 20vh;
          left: 5vw;
          position: fixed;
          background-color: blue;
          animation: monster 4s infinite linear;
          @keyframes monster {
            0% {
              transform: translateX(100vw);
            }
            100% {
              transform: translateX(10vw);
            }
          }
        `;
        break;
      case 5:
        Mon = styled.div`
          top: 20vh;
          left: 5vw;
          position: fixed;
          background-color: black;
          animation: monster 5s infinite linear;
          @keyframes monster {
            0% {
              transform: translateX(100vw);
            }
            100% {
              transform: translateX(10vw);
            }
          }
        `;
        break;
      default:
        break;
    }
    if (this.state.health > 0) {
      if (this.state.monsAlive) {
        return (
          <Mon>
            <MonsterTexture />
          </Mon>
        );
      } else {
        return (
          <Mon dead>
            <MonsterTexture />
          </Mon>
        );
      }
    } else {
      return <H2 color='blue'>Dead</H2>;
    }
  };

  changeVelo = velo => {
    switch (velo) {
      case 1:
        this.setState({
          velo: 2
        });
        break;
      case 2:
        this.setState({
          velo: 3
        });
        break;
      case 3:
        this.setState({
          velo: 4
        });
        break;
      case 4:
        this.setState({
          velo: 5
        });
        break;
      case 5:
        this.setState({
          velo: 1
        });
        break;
      default:
        break;
    }
  };

  getMonsterStatus = () => {
    return this.state.monsAlive ? <H2 color='Green'>Alive</H2> : <H2>Dead</H2>;
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
            <H2 color='aqua'>You are</H2>
          )}
          {this.getMonster(this.state.velo)}
          <ControllerBar>
            <GageBar
              confirm={this.onGage}
              velo={this.state.velo}
              health={this.state.health}
            />
          </ControllerBar>
          <p>point index: {this.state.point} </p>
          <p> index health: {this.state.health} </p>
          {this.getMonsterStatus(this.state.monsAlive)}
          <button onClick={() => this.changeVelo(this.state.velo)}>
            Change Velo
          </button>
          <button
            onClick={() =>
              this.setState({ monsAlive: this.state.monsAlive ? false : true })
            }
          >
            Change alive monster
          </button>
          <Health
            point={this.state.point}
            velo={this.state.velo}
            confirm={this.conHealth}
          />
        </div>
      );
    }
  }
}
