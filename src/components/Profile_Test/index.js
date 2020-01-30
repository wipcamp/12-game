import React, { Component } from 'react'
import ContainerStatus from './ContainerStatus'
import ContainerProfile from './ContainerProfile'
import ContainerButton from './ContainerButton'
import styled from 'styled-components'
import styles from './Profile.module.css'

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
            <div className={styles.bg}>
                <ContainerStatus message="" />
                <ContainerProfile />
                <ContainerButton id={this.state.id}/>
            </div>  
        )
    }
}
