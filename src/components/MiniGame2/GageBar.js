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
    }

    componentDidMount() {
        
    }

    attack(time){
        console.log((time-this.state.startTime)%1000)
        let diff = (time-this.state.startTime)%1000
        //ถ้าสีแดง=20
        // if(diff>=700&&diff<=999){
        //     console.log("diff"+diff)
        // }
        //ถ้าสีแดง=40
        if((diff>=700&&diff<=999)||(diff>=1&&diff<=150)){
            console.log("diff"+diff)
        }
    }

    render() {
        console.log(this.state.startTime)
        return (
            <div>
                <Triangle />
                <Progress multi
                    style={ {marginTop: 10, height: '2vh', paddingVertical: 20, width: '50vw' } }
                >
                    <Progress bar color="warning" value="30" />
                    <Progress bar color="danger" value="40" />
                    <Progress bar color="warning" value="30" />
                </Progress>
                <button onClick={()=>this.attack(new Date())}>click</button>
            </div>
        );
    }
}