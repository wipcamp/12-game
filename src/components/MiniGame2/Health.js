import React, { Component } from 'react';
// import styled from 'styled-components'

export default class Health extends Component {
  state = {
    health: 100,
    point: 0
  };

  prevState = {
    point: 0
  };

  componentDidMount() {
    console.log('health: ' + this.props.stating.health)
    if (this.props.stating.health.point !== this.state.point) {
      this.setState({
        point: this.props.point
      });
    }
    this.check();
  }
  
  componentDidUpdate(prevProps) {
    console.log('health props: ' + this.props.stating.health)
    if (prevProps.stating !== this.props.stating) {
      this.setState({
        point: this.props.point
      });
      this.prevState = {
        point: prevProps.point
      };
    }
  }

  check = () => {
    let checking = setInterval(() => {
      if (this.prevState.point === this.state.point) {
        this.setState({
          health: this.state.health - 10
        });
        console.log('crash');
      } else {
        this.prevState = {
          point: this.state.point
        };
        console.log('not crash');
      }
      if (this.state.health === 0 || this.state.health < 0) {
        this.props.confirm(this.state)
        clearInterval(checking);
      }
    }, 2000);
  };

  render() {
    console.log('health: ' + this.state.health);
    return (
      <div>
        <h1>Health</h1>
        <h2> health: {this.state.health} </h2>
        <h2> point: {this.state.point} </h2>
        <button onClick={() => this.underAttack()}>Attack</button>
      </div>
    );
  }
}
