import React, { Component } from 'react'
import { Progress } from 'reactstrap'
import styled from 'styled-components'
import Bar from '../model/Bar'

const BarCon = styled.div`
    width: 40%;
    paddingLeft: 3em;

    img:nth-child(odd){
        position: relative;
        paddingTop: 1vh;
        z-index: 10;
    }

`
const energyStyle = {
    position: 'relative',
}
const expStyle = {
    position: 'relative',
    marginTop: '2vh'
}



export default class ContainerBar extends Component {

    state = {
        // valueEnergy: this.props.valueEnergy,
        valueEnergy: 100,
        // valueExp: this.props.valueExp,
        valueExp: 100
    }

    render() {
        return (
            <BarCon>
                <Bar type="level" />
                <Bar type="energy" />
            </BarCon>
        )
    }
}
