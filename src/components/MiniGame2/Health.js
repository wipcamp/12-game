import React, { Component } from 'react';
import { ThemeConsumer } from 'styled-components';
// import styled from 'styled-components'

export default class Health extends Component {
  state = {
    health: 100,
    point: 0,
    velo: 2
  };

  prevState = {
    point: 0
  };

  componentDidMount() {
    if (this.props.point !== this.state.point) {
      this.setState({
        point: this.props.point
      });
    }
    if (this.props.velo !== this.state.velo) {
      this.setState({
        velo: this.props.velo
      });
    }
    let checking = setInterval(() => {
      if (this.state.health !== 0 || this.state.health < 0) {
        if (this.prevState.point === this.state.point) {
          this.setState({
            health: this.state.health - 10
          });
          if (this.state.velo !== this.props.velo) {
            this.setState({
              velo: this.props.velo
            });
          }
        } else {
          this.prevState = {
            point: this.state.point
          };
        }
        if (this.props.confirm) {
          this.props.confirm(this.state.health);
        }
      } else {
        if (this.props.confirm) {
          this.props.confirm(this.state.health);
          console.log(this.state.health);
        }
      }
    }, 2000);
      // }, this.state.velo * 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.point !== this.props.point) {
      this.setState({
        point: this.props.point
      });
      this.prevState = {
        point: prevProps.point
      };
    }
    if (prevProps.velo !== this.props.velo) {
      this.setState({
        velo: this.props.velo
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Health</h1>
        <h2> health: {this.state.health} </h2>
        <h2> point: {this.state.point} </h2>
      </div>
    );
  }
}
