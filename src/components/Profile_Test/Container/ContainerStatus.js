import React, { Component } from 'react';
// import styled from 'styled-components';
import Status from '../model/Status';

export default class ContainerStatus extends Component {
  state = {
    user_str: 0,
    user_dex: 0,
    user_luk: 0,
    str: 'Strengths'
  };

  componentDidMount() {
    if (this.props.str !== this.state.str) {
      this.setState({
        user_str: 10,
        user_dex: this.props.dex,
        user_luk: this.props.luk,
        str: this.props.dex
      });
    }
  }

  componentDidUpdate(prevProps){
      if(prevProps.str !== this.props.str){
          this.setState({
              user_str: this.props.str
          })
      }
      if(prevProps.dex !== this.props.dex){
          this.setState({
              user_dex: this.props.dex
          })
      }
      if(prevProps.luk !== this.props.luk){
          this.setState({
              user_luk: this.props.luk
          })
      }
  }

  render() {
    return (
      <div>
        <Status stat='Strength' number={this.state.user_str} />
        <Status stat='Dex' number={this.state.user_dex} />
        <Status stat='Luck' number={this.state.user_luk} />
      </div>
    );
  }
}
