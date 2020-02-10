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
        user_level: 20,
        animationData: '',
        animationDatas: [
            {
                level: 10,
                animationData: animationData1
            },
            {
                level: 20,
                animationData: animationData2
            }
        ]
    }

    componentDidMount(){
        this.getProfileAnimation(this.state.user_level)
    }
    
    getProfileAnimation(level){
        this.setState({animationData: this.state.animationDatas[Math.floor(level/10)-1].animationData})
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
        
        console.log(Math.floor(15/10))
        console.log(defaultOptions.animationData)

        return (
            <React.Fragment>
                <Lottie options={defaultOptions}
                height={100}
                width={100} 
                style={buttonStyle}/>
                {/* // isStopped={this.state.isStopped}
                // isPause={this.state.isPause} /> */}
                {/* <button style={buttonStyle} onClick={this.handleAnimationData.bind(this)}>Change</button> */}
                <button style={buttonStyle} onClick={() => this.setState({isStopped: false})}>Play</button>
                <button style={buttonStyle} onClick={() => this.setState({isStopped: !this.state.isPause})}>Pause</button>
            </React.Fragment>
        )
    }
}
