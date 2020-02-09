import React, { Component } from 'react';
import styled from 'styled-components';
import { Progress } from "reactstrap";

const Triangle = styled.div`
width: 0;
height: 0;
border-left: 10px solid transparent;
border-right: 10px solid transparent;
border-top: 20px solid red;
position: relative;
animation: mymove 2s infinite linear;

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

const GageSize = styled.div`
  width : 50vw;
`

export default class GageBar extends Component {

    state = {
        isLoad: false,
    }

    componentDidMount() {

    }

    render() {
        return (
            <GageSize>
                <Triangle />
                <Progress multi>
                    <Progress bar color="warning" value="40" />
                    <Progress bar color="danger" value="20" />
                    <Progress bar color="warning" value="40" />
                </Progress>
            </GageSize>
        );
    }
}