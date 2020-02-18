import React, { Component } from 'react'
import styled from 'styled-components'
import ContainerBar from './Container/ContainerBar';
import ContainerStatus from './Container/ContainerStatus';
import Lottie from '../Animation/index';
import Name from './model/Name';

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default class ProfileTest extends Component {

    state = {
        data : this.props.data
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
          this.setState({
            data: this.props.data,
          });
        }
      }

    render() {
        return (
            <>
            <Upper>
              <ContainerBar />
              <Name
                name={this.state.data.user_name}
                teamName={this.state.data.user_team_name}
                src={null}
              />
            </Upper>
            <Lottie />
            <ContainerStatus
              str={this.state.data.user_str}
              dex={this.state.data.user_dex}
              luk={this.state.data.user_luk}
            />
          </>
        )
    }
}
