import React, { Component } from 'react';
import styled from 'styled-components';
import { Progress } from "reactstrap";

const Triangle = styled.div`
width: 0;
height: 0;
border-left: 1vh solid transparent;
border-right: 1vh solid transparent;
border-top: 2vh solid red;
position: relative;
animation: mymove 2s infinite linear;
animation-delay: 2s;

@keyframes mymove {
    0%   {
        transform: translateX(0);
    }
    50%  {
        transform: translateX(50vw);
    }
    100% {
        transform: translateX(0);
    }
  }
`

export default class GageBar extends Component {

    state = {
        isLoad: false,
        startTime: new Date(),
        position: 30,
        size: 40,
    }

    componentDidMount() {

    }

    attack(time) {
        let diff = (time - this.state.startTime) % 1000
        let start = this.state.position * 10 + 400;
        let end = (this.state.position + this.state.size) * 10 + 400;
        let remain = 0
        if (end % 1000 > 0) {
            remain = end % 1000;
            if ((diff >= start && diff <= end) || (diff >= 1 && diff <= remain)) {
                console.log("diff sp" + diff)
            }
        } else {
            if (diff >= start && diff <= end) {
                console.log("diff normal" + diff)
            }
        }
    }

    render() {
        console.log(this.state.startTime)
        return (
            <div>
                <Triangle />
                <Progress multi
                    style={{ marginTop: 10, height: '2vh', paddingVertical: 20, width: '50vw' }}
                >
                    <Progress bar color="warning" value={this.state.position} />
                    <Progress bar color="danger" value={this.state.size} />
                    <Progress bar color="warning" value={100 - (this.state.size + this.state.position)} />
                </Progress>
                <button onClick={() => this.attack(new Date())}>click</button>
            </div>
        );
    }
}