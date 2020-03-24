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
  animation: mymove 5s infinite linear;

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

const Div = styled.div`
  background-color: red;
  width: auto;
  border: 1px solid red;
  padding-left: 1vw;
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
    size: 10,
    point: 0
  };

  componentDidMount() { }

  getRandom = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  attack = () => {
    let rectangle = this.atTarget.current.getBoundingClientRect()
    let mark = this.selector.current.getBoundingClientRect()
    let begin = (this.state.position * Math.floor(rectangle.width))/100
    let end = ((this.state.position + this.state.size) * Math.floor(rectangle.width))/100
    if(mark.x >= begin && mark.x <= end){
      console.log('hit')
      this.setState({
        position: this.getRandom(10, 50),
        point: this.state.point+10
      })
    }else{
      console.log('miss')
    }
  }

  render() {
    return (
      <div>
        <p> point: {this.state.point} </p>
        <Triangle ref={this.selector} />
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
        <button onClick={() => this.attack()}>
          Attack
        </button>
      </div>
    );
  }
}
