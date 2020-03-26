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
    size: 15,
    point: 0,
    health: 100,
    hit: 1,
    monsDead: false
  };

  prevState = {
    point: -1
  };

  stateForExport = {
    point: 0,
    velo: 2
  };

  componentDidMount() {
    if (this.state.velo !== this.props.velo) {
      this.setState({
        velo: this.props.velo
      });
    }
    if (this.state.health !== this.props.health) {
      this.setState({
        health: this.props.health
      });
    }
    let check = setInterval(() => {
      if (this.state.health !== 0) {
        if (this.prevState.point !== this.state.point) {
          if (this.props.confirm) {
            this.props.confirm(this.state.point);
          }
        } else {
          this.prevState = {
            point: this.state.point
          };
        }
      } else {
        clearInterval(check);
      }
    }, 2000);
    // }, this.state.velo * 1000);

    //for scope 1 hit/2second
    let hitting = setInterval(() => {
      this.setState({
        monsDead: false
      });
      if (this.state.health !== 0) {
        if (this.state.hit === 0) {
          this.setState({
            hit: 1
          });
        }
      } else {
        clearInterval(hitting);
      }
    }, 2000);
    // },this.state.velo * 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.health !== this.props.health) {
      this.setState({
        health: this.props.health
      });
    }
    if (prevProps.velo !== this.props.velo) {
      this.setState({
        velo: this.props.velo
      });
    }
    if (prevState.point !== this.state.point) {
      if (this.props.confirm) {
        this.props.confirm(this.state.point);
      }
    }
  }

  getRandom = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  attack = () => {
    if (this.state.hit === 1) {
      this.setState({
        hit: 0
      });
      let rectangle = this.atTarget.current.getBoundingClientRect();
      let mark = this.selector.current.getBoundingClientRect();
      let begin = (this.state.position * Math.floor(rectangle.width)) / 100;
      let end =
        ((this.state.position + this.state.size) *
          Math.floor(rectangle.width)) /
        100;
      if (mark.x >= begin && mark.x <= end) {
        this.setState({
          position: this.getRandom(10, 50),
          point: this.state.point + 10,
          monsDead: true
        });
      }
    }
  };

  render() {
    return (
      <div>
        <p> point: {this.state.point} </p>
        <p> health: {this.state.health} </p>
        {this.state.health !== 0 ? (
          <Triangle ref={this.selector} />
        ) : (
          <Tri ref={this.selector} />
        )}
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
