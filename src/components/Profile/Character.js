import React, { Component } from 'react'
import CharacterController from './CharacterController'
import FlareComponent from 'flare-react';


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
              source: "/image/level3.flr"
            },
            {
              level: 40,
              source: "/image/level4.flr"
            },
            {
              level: 50,
              source: "/image/level5.flr"
            }
          ],
    }
  
    
  getProfileImage() {
    let data = null;
    for (let i = 0; i < this.state.image_source.length; i++) {
      if (this.state.level<this.state.image_source[i].level) {
        if(i!=0){
          data = this.state.image_source[i-1].source
        }else{
          data = this.state.image_source[i].source
        }
        i = this.state.image_source.length
      }else{
        if(i==this.state.image_source.length-1){
          data = this.state.image_source[i].source
        }
      }
    }
    return (
      <div>
        <FlareComponent controller={this.state.characterController} width={200} height={200} file={data}/>
      </div>
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
