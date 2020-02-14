import React, { Component } from 'react'
import CharacterController from './CharacterController'
import FlareComponent from 'flare-react';
import styled from 'styled-components'

const CenterComponent = styled.div`
  margin-left: -5%;
`;


export default class Character extends Component {
    state = {
        characterController : new CharacterController(),
        image_source: [
            {
              level: 10,
              source: "/image/level1.flr"
            },
            {
              level: 20,
              source: "/image/level2.flr"
            },
            {
              level: 30,
              source: "/image/level1.flr"
            },
            {
              level: 40,
              source: "/image/level2.flr"
            },
            {
              level: 50,
              source: "/image/level1.flr"
            }
          ],
          user_level:this.props.level
    }
  
  getImageSize(){
    let size = 300;
    if(window.screen.width<=320){
      size = 230;
    }
    console.log(size)
    return size;
  }

  calculateImageLevel(userLevel) {
    if(userLevel < 20) {
      return 0
    }
    else if(userLevel >= 20 && userLevel < 30) {
      return 1
    }
    else if(userLevel >= 30 && userLevel < 40) {
      return 2
    }
    else if(userLevel >= 40 && userLevel < 50) {
      return 3
    }
    else {
      return 4
    }
  }
    
  getProfileImage() {
    console.log(this.state.user_level)
    let data = '/image/level1.flr';
    // for (let i = 0; i < this.state.image_source.length; i++) {
    //   if (this.state.user_level<this.state.image_source[i].level) {
    //     if(i!=0){
    //       data = this.state.image_source[i-1].source
    //     }else{
    //       data = this.state.image_source[i].source
    //     }
    //      i = this.state.image_source.length
    //   }
    //   else{
    //     if(i==this.state.image_source.length-1){
    //       data = this.state.image_source[i].source
    //     }
    //   }
    // }
    // console.log('this thereeee')
    // console.log(this.state.user_level % 10)
    // console.log(this.state.user_level % 10 + 1)
    // console.log('this thereeee')
    // let file = Math.floor(20 / 10)
    const sourceIndex = this.calculateImageLevel(this.state.user_level)
    console.log('sourceINdex', sourceIndex)
    if(this.state.user_level == 0) {
      return <div>Loading</div>

    }

    return (
      <CenterComponent>
        <FlareComponent 
          onChange={this.handleChange} 
          controller={this.state.characterController} 
          width={this.getImageSize()} 
          height={this.getImageSize()} 
          file={this.state.image_source[sourceIndex].source}
        />
      </CenterComponent>
    );
  }

  componentWillReceiveProps(nextProps) { 
    const { level } = this.props.level;
    if (nextProps.level !== level) {
      this.setState({ user_level: nextProps.level });
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.props.level)
  //   return this.state.level != nextState.level;
  // }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.level !== prevProps.level) {
  //     this.fetchData(this.props.level);
  //   }
  // }

    render() {
        return (
            this.getProfileImage()
        );
    }
}
