import React, { Component } from 'react'
import ContainerStatus from './ContainerStatus'
import ContainerProfile from './ContainerProfile'
import ContainerButton from './ContainerButton'
import ProfileImage from './ProfileImage'

import styled from 'styled-components'
import styles from './Profile.module.css'
import { Helmet } from 'react-helmet'

const Container1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Bg = styled.div`
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(180deg, #272065 0%, #841561 100%);
`


export default class Profile extends Component {
    state = {
        id: [
            {
                src: "./image/logo192.png"
            },
            {
                src: "./image/logo192.png"
            },
            {
                src: "./image/logo192.png"
            },
            {
                src: "./image/line_ci.png"
            }
        ]
    }


    render() {
        return (
            <React.Fragment>
                <Bg>
                    <Container1>
                        <ContainerStatus message="" />
                        <ContainerProfile />
                    </Container1>
                    <ProfileImage />
                    <ContainerButton id={this.state.id} />
                </Bg>
            </React.Fragment>
        )
    }
}
