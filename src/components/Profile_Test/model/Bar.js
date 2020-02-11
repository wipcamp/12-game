import React, { Component } from 'react'
import { Progress } from 'reactstrap'
import styled from 'styled-components'

const Bars = styled.div`
    display: relative;
    position: flex;
    margin-bottom: -1em;
`

const energyStyle = {
    position: 'relative',
    top: '-1em',
    left: '1.8em'

}

const Img = styled.img`
    position: relative;
    width: 2em;
    z-index: 2;
    top: 0.9rem;
    left: -2.8rem;
`

const types = {
    Level: 'level',
    Energy: 'energy'
}

const colors = {
    Warning: 'warning',
    Danger: 'danger'
}

export default class Bar extends Component {

    state = {
        src: "",
        color: ""
    }
    
    componentDidMount(){
        
        // eslint-disable-next-line default-case
        switch(this.props.type){
            case types.Level:
                this.setState({src: "image/Level.png", color: colors.Warning})
                break;
            case types.Energy:
                this.setState({src: "image/Energy.png", color: colors.Danger})
                break;
        }
    }

    render() {
        return (
            <Bars>
                <Img src={this.state.src}/>
                <Progress
                style={energyStyle}
                animated
                value={100} 
                color={this.state.color}/>
            </Bars>
        )
    }
}
