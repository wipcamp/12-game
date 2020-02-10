import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData1 from '../../dist/animation/15260-pushups.json'
import animationData2 from '../../dist/animation/15307-karaoke.json'


const buttonStyle = {
    display: 'block',
    margin: '10px auto'
}


export default class LottieController extends Component {
    
    state = {
        isStopped: false,
        isPause: false,
        animationData: animationData1
    }
    
    handleAnimationData(){
        if(this.state.animationData === animationData1){
            this.setState({animationData: animationData2})
        }else {
            this.setState({animationData: animationData1})
        }
    }

    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: this.state.animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }
        
        console.log(defaultOptions.animationData)

        return (
            <React.Fragment>
                <Lottie options={defaultOptions}
                height={400}
                width={800} />
                {/* // isStopped={this.state.isStopped}
                // isPause={this.state.isPause} /> */}
                <button style={buttonStyle} onClick={this.handleAnimationData.bind(this)}>Change</button>
                <button style={buttonStyle} onClick={() => this.setState({isStopped: false})}>Play</button>
                <button style={buttonStyle} onClick={() => this.setState({isStopped: !this.state.isPause})}>Pause</button>
            </React.Fragment>
        )
    }
}
