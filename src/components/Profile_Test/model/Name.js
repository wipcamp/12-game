import React, { Component } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  position: relative;
  margin: 1rem 0 0 0;
`;

const SubDiv = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  align-item: end;
`;
const UName = styled.p`
  position: relative;
  margin: 0!important;
`;

const Team = styled.p`
  position: relative;
  margin: 0 !important;
  justify-self: end;
`;

const Img = styled.img`
  position: relative;
  z-index: 2;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #fff0ff;
  border-radius: 50%;
  margin: auto 0.5rem;
`;

export default class Name extends Component {
  state = {
    name: '',
    src: '',
    teamName: ''
  };

  componentDidMount() {
    if (this.props.name !== this.state.name) {
      this.setState({
        name: this.props.name,
        teamName: this.props.teamName,
        src: this.props.src
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.setState({
        name: this.props.name,
        teamName: this.props.teamName,
        src: this.props.src
      });
    }
  }

  render() {
    console.log('state name: ' + this.state.name);
    return (
      <Div>
        <SubDiv>
          <UName>{this.state.name}</UName>
          <Team>{this.state.teamName}</Team>
        </SubDiv>
        <Img src={this.state.src} />
      </Div>
    );
  }
}
