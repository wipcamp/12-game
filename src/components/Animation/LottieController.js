import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData1 from '../../dist/animation/15260-pushups.json'
import animationData2 from '../../dist/animation/15307-karaoke.json'
import styled from 'styled-components'

const buttonStyle = {
    position: 'relative',
    zIndex: '1',
    margin: '3em auto 0 auto',

}

const Round = styled.div`
    position: relative;
    z-index: 0.5;
    width: 10em;
    height: 5em;
    border-radius: 50%;
    background-color: #f00000
    margin: 0 auto;
    top: -2.5rem;

`


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
        
        return (
            <React.Fragment>
                <Lottie options={defaultOptions}
                height={200}
                width={100} 
                style={buttonStyle}/>
                <Round />
            </React.Fragment>
        )
    }
}
