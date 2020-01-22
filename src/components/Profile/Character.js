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
    }
  
    
  getProfileImage() {
    console.log(this.props.level)
    let data = null;
    for (let i = 0; i < this.state.image_source.length; i++) {
      if (this.props.level<this.state.image_source[i].level) {
        if(i!=0){
          data = this.state.image_source[i-1].source
        }else{
          data = this.state.image_source[i].source
          console.log(data)
        }
        i = this.state.image_source.length
      }else{
        if(i==this.state.image_source.length-1){
          data = this.state.image_source[i].source
        }
      }
    }
    
    return (
      <CenterComponent>
        <FlareComponent controller={this.state.characterController} width={300} height={300} file={data}/>
      </CenterComponent>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { level } = this.props.level;
    if (nextProps.level !== level) {
      this.setState({ level: nextProps.level });
    }
  }

    render() {
        return (
            this.getProfileImage()
        );
    }
}
