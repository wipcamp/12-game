import React, { Component } from 'react';
import styled from 'styled-components';

const Triangle = styled.div`
width: 0;
height: 0;
border-left: 10px solid transparent;
border-right: 10px solid transparent;
border-top: 20px solid red;
position: relative;
animation: mymove 2s infinite;

@keyframes mymove {
    0%   {left: 0%}
    50%  {left: 100%; !important}
    100% {left: 0%;}
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
                <Triangle/>
            </GageSize>
        );
    }
}