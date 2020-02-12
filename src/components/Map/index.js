import React, { Component } from 'react'
import ContainerUpper from '../Profile_Test/Container/ContainerUpper'
import ContainerButton from '../Profile_Test/Container/ContainerButton'
import styled from 'styled-components'

const Bg = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(/image/MapBG.png);
    background-size: contain;
    z-index:-1;
`

export default class index extends Component {

    state = {
        id: [
            {
              src: './image/logo192.png'
            },
            {
              src: './image/logo192.png'
            },
            {
              src: './image/logo192.png'
            },
            {
              src: './image/line_ci.png'
            }
          ]
    }

    render() {
        return (
            <Bg>
                <ContainerUpper />
                <ContainerButton id={this.state.id}/>
            </Bg>
        )
    }
}
