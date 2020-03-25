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
  animation: mymove 2s infinite linear;

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
const Tri = styled.div`
  width: 0;
  height: 0;
  border-left: 1vh solid transparent;
  border-right: 1vh solid transparent;
  border-top: 2vh solid red;
  position: relative;
  animation: mymoves 2s infinite linear;

  @keyframes mymoves {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

const Alive = styled.h1`
  color: green;
`;

const Dead = styled.h1`
  color: red;
`;

const Div = styled.div`
  background-color: red;
  width: auto;
  border: 1px solid red;
  padding-left: 0.5vw;
  display: inline-block;
`;
export default class GageBar extends Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
    this.atTarget = React.createRef();
  }

  state = {
    isLoad: false,
    startTime: new Date(),
    position: 30,
    size: 30,
    point: 0,
    health: 100,
    hit: 1,
    monsDead: false
  };

  prevState = {
    point: -1
  }

  componentDidMount() {
    console.log('checking' + this.props.stating.health)
    this.setState({
      health: this.props.stating.health.health
    })
    let check = setInterval(() => {
      if (this.state.health !== 0) {
        if(this.prevState.point !== this.state.point){
          if(this.props.confirm){
            this.props.confirm(this.state.point)
            console.log('not hit: ' + this.prevState.point)
          }
        }else {
          this.prevState = {
            point: this.state.point
          }
        }
      } else {
        clearInterval(check);
      }
    }, 2000);

    //for scope 1 hit/2second
    let hitting = setInterval(() => {
      this.setState({
        monsDead: false
      })
      if(this.state.health !== 0){
        if(this.state.hit === 0){
          this.setState({
            hit: 1,
          })
        }else{
          console.log('not stack hitting')
        }
      }else {
        clearInterval(hitting)
      }
    },2000)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.stating !== this.props.stating){
      this.setState({
        health: this.props.stating.health
      })
    }
    if(prevState.point !== this.state.point){
      if(this.props.confirm){
        this.props.confirm(this.state)
      }
    }
  }

  getRandom = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  attack = () => {
    if(this.state.hit === 1){
      this.setState({
        hit: 0
      })
      let rectangle = this.atTarget.current.getBoundingClientRect();
      let mark = this.selector.current.getBoundingClientRect();
      let begin = (this.state.position * Math.floor(rectangle.width)) / 100;
      let end =
        ((this.state.position + this.state.size) * Math.floor(rectangle.width)) /
        100;
      if (mark.x >= begin && mark.x <= end) {
        console.log('hit');
        this.setState({
          position: this.getRandom(10, 50),
          point: this.state.point + 10,
          monsDead: true
        });
      } else {
        console.log('miss');
      }
    }else {
      console.log(`can 't hit not more stack`)
    }
  };

  onConfirm = order => {
    console.log(order)
  }

  render() {
    return (
      <div>
        <p> point: {this.state.point} </p>
        <p> health: {this.state.health} </p>
        {this.state.health !== 0 ? <Triangle ref={this.selector} /> : <Tri />}
        <Div ref={this.atTarget}>
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
        </Div>
        <button onClick={() => this.attack()}>Attack</button>
        {this.state.health === 0 ? <Dead>Dead</Dead> : <Alive>Alive</Alive>}
      </div>
    );
  }
}
