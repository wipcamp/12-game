import React, { Component } from 'react'

export default class Character extends Component {
    state = {
        image_source: [
            {
              level: 1,
              source: "/image/level1.png"
            },
            {
              level: 20,
              source: "/image/level2.png"
            },
            {
              level: 30,
              source: "/image/level3.png"
            },
            {
              level: 40,
              source: "/image/level4.png"
            },
            {
              level: 50,
              source: "/image/level5.png"
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
        <img src={data} alt="Logo" />
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
