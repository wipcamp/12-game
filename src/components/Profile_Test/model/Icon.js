import React, { Component } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Img = styled.img`
  height: 7vh;
  width: 7vh;
  border: 1px solid #000000;
  border-radius: 50%;
  margin: auto;
`;

class Icon extends Component {
  state = {
    src: '',
    name: '',
    redirect: null
  };

  componentDidMount() {
    if (this.state.src !== this.props.src) {
      this.setState({
        src: this.props.src
      });
    }
    if (this.state.name !== this.props.name) {
      this.setState({
        name: this.props.name
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.setState({
        name: this.props.name
      });
    }
    if (prevProps.src !== this.props.src) {
      this.setState({
        src: this.props.src
      });
    }
  }

  handleAction() {
    const history = useHistory();
    history.push('/map');
  }

  
  render() {
    return (
      <button onClick={() => useHistory().push('/map')}>
        <Img
          src={this.state.src}
          alt={this.state.alt}
          
        />
      </button>
    );
  }
}

export default Icon;
