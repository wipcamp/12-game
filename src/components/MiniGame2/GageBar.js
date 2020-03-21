import React, { Component } from 'react';
import styled from 'styled-components';
import { Progress } from 'reactstrap';

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 1vh solid transparent;
  border-right: 1vh solid transparent;
  border-top: 2vh solid red;
  position: relative;
  animation: mymove 10s infinite linear;

  @keyframes mymove {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(50vw);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
export default class GageBar extends Component {
  
  state = {
    isLoad: false,
    startTime: new Date(),
    position: 30,
    size: 10
  };

  time = {
    //time init
    init: 0,
    //time start position target
    start: 0,
    //time end position target
    end: 0,
    //go or back
    goBack: 0
  };

  componentDidMount() {}

  getRandom = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  initTime = () => {
    setInterval(() => {
      let times = new Date().getMilliseconds();
      this.time = {
        init: times + 400,
        //t: s * v
        start: this.state.position * 10 + this.time.init,
        end: this.state.size * 10 + this.time.start,
        goBack: 1
      };
    }, 1000);
  };

  atk = t => {
    let check = t + this.time.init;
    if (check <= this.time.start || check >= this.time.end) {
      this.setState({
        position: this.getRandom(10, 50)
      });
      console.log('hit');
    } else {
      console.log('missed');
    }
  };

  render() {
    this.initTime()
    return (
      <div>
        <Triangle />
        <Progress
          multi
          style={{
            marginTop: 10,
            height: '2vh',
            paddingVertical: 20,
            width: '50vw'
          }}
        >
          <Progress bar color='warning' value={this.state.position} />
          <Progress bar color='danger' value={this.state.size} />
          <Progress
            bar
            color='warning'
            value={100 - (this.state.size + this.state.position)}
          />
        </Progress>
        <button onClick={() => this.atk(new Date().getMilliseconds())}>
          Attack
        </button>
        
      </div>
    );
  }
}
