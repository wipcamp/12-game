import React, { Component } from 'react'
import Icon from '../model/Icon'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    position: absolute;
    flex-direction: row;
    width: 100vw;
    padding-bottom: 1em; 
    margin: 4.6rem auto 0 auto;
    bottom: 0;
`
export default class ContainerButton extends Component {

    state = {
        id: []
    }

    componentDidMount() {
        if(this.state.id !== this.props.id){
            this.setState({
                id: this.props.id
            })
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.id !==  this.props.id){
            this.setState({
                id: this.props.id
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Icon name={this.props.id[2].name} src={this.props.id[2].src} />
            </React.Fragment>
        )
    }
}