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
  
    
  getProfileImage() {
    console.log(this.state.user_level)
    let data = null;
    for (let i = 0; i < this.state.image_source.length; i++) {
      if (this.state.user_level<this.state.image_source[i].level) {
        if(i!=0){
          data = this.state.image_source[i-1].source
        }else{
          data = this.state.image_source[i].source
        }
         i = this.state.image_source.length
      }
      else{
        if(i===this.state.image_source.length-1){
          data = this.state.image_source[i].source
        }
      }
    }
    console.log(data)
    return (
      <CenterComponent>
        <FlareComponent onChange={this.handleChange} controller={this.state.characterController} width={300} height={300} file={data}/>
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
