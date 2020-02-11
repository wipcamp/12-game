import React, { Component } from 'react'
import styled from 'styled-components'

const Img = styled.img`
    position: relative;
    width: 10em;
    height: 20em;
    background-color: #0000ff;
    margin: auto;
    z-index: 1;
`
const Round =  styled.div`
    position: relative;
    width: 10em;
    height: 5em;
    z-index: -1;
    background-color: #123456;
    border-radius: 50%;
    margin: auto;
`

export default class ContainerProfileImage extends Component {

    state ={
        src: ""
    }

    componentDidMount(){
        this.setState({
            src: this.props.src
        })
    }

    render() {
        return (
            <div>
                <Img src={this.props.src} />
                <Round />
            </div>
        )
    }
}
