import React, { Component } from 'react';
import Lottie from 'react-lottie'
import animationData from '../../Lottiesfiles/Player.json'

export default class Monster extends Component {

    state = {
        isStopped: false, 
        isPaused: false
    }

    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

        return (
            <Lottie options={defaultOptions}
              height={200}
              width={200}
              isStopped={this.state.isStopped}
              isPaused={this.state.isPaused}
              isClickToPauseDisabled={true}
            />
        );
    }
}