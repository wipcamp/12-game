import React, { Component } from 'react'

export default class Character extends Component {
    state = {
        user_level : this.props.level,
        image_source: [
            {
              level: 10,
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
              level: 43,
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
    const { image_source } = this.state;
    for (let i = 0; i < image_source.length; i++) {
      if (image_source[i].level == this.state.level) {
        data = image_source[i].source;
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
        )
    }
}
