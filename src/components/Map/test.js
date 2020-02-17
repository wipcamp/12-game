import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  position: absolute;
  width: 5em;
  height: 5em;
  background-color: aqua;
  top: 10em;
  left: ${props => props.starStyle.top || 0}em;
`;

const starStyle = {
  top: '',
  right: '',
  left: '',
  bottom: ''
};

const test = props => {
  return (
    <div
      style={{
        top: this.props.starStyle.top ,

      }}
    >
      Star
    </div>
  );
};

export default test;
