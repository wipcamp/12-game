import React, { Component } from 'react'
import styled from 'styled-components'

const Div = styled.div`
    display: flex;
`
const Img = styled.img`
    position: relative;
    z-index: 2;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #fff0ff;
    border: 1px;
    border-radius: 50%;
    margin: auto 0.5rem auto 0.5rem;
    `
    const H2 = styled.h2`
    position: relative;
    margin: auto 0.5rem auto 0.5rem;
`

export default class Name extends Component {
    
    state = {
        name: "",
        src: ""
    }

    componentDidMount(){
        this.setState({name: this.props.name, src: this.props.src})
    }
    
    render() {
        return (
            <Div>
              <H2>{this.state.name || "Smurf"}</H2>  
              <Img src={this.state.src} />
            </Div>
        )
    }
}
