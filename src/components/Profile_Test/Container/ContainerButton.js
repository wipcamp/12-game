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
        id: [ ]
    }

    componentDidMount() {
        this.setState({
            id: this.props.id
        })
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                {
                this.state.id.map((data, i) => (
                    <Icon key={i} src={data.src} />
                    )
                    )
                }
                </Container>
            </React.Fragment>
        )
    }
}