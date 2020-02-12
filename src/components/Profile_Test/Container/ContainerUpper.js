import React, { Component } from 'react'
import styled from 'styled-components'
import ContainerBar from './ContainerBar'
import Name from '../model/Name'

const Upper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default class ContainerUpper extends Component {
    render() {
        return (
            <Upper>
                <ContainerBar />
                <Name />
            </Upper>
        )
    }
}
