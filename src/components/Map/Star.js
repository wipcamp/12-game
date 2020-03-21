import React, { Component } from 'react'
import styled from 'styled-components'
// import teamService from '../../services/teamService'

const Aries = styled.div`
background-color: #FFDFBD;
width: 4em;
height: 4em;
position: absolute;
top: 13rem;
right: 3.5rem;
`
const Leo = styled.div`
background-color: #FCC80B;
width: 4em;
height: 4em;
position: absolute;
top: 8em;
right: 7.5em;
`
const Gemini = styled.div`
background-color: #FC8A10;
width: 4em;
height: 4em;
position: absolute;
top: 5em;
left: 2.5rem;
`
const Scorpio = styled.div`
background-color: #C4251E;
width: 4em;
height: 4em;
position: absolute;
bottom: 5em;
left: 4em;
`
const Virgo = styled.div`
background-color: #FFBDD9;
width: 4em;
height: 4em;
position: absolute;
bottom: 16em;
right: 1em;
`
const Capricorn = styled.div`
background-color: #9E55C4;
width: 4em;
height: 4em;
position: absolute;
top: 1.5em;
left: 6.5em;
z-index: -1;
`
const Taurus = styled.div`
background-color: #77B269;
width: 4em;
height: 4em;
position: absolute;
bottom: 4em;
right: 2.5em;
`
const Aquarius = styled.div`
background-color: #4EDFCF;
width: 4em;
height: 4em;
position: absolute;
bottom: 12em;
left: 4em;
`
const Pisces = styled.div`
background-color: #00439D;
width: 4em;
height: 4em;
position: absolute;
bottom: 9em;
right: 5em;
`
const Libra = styled.div`
background-color: #363636;
width: 4em;
height: 4em;
position: absolute;
top: 16em;
left: 9rem;
`

const PA = styled.p`

`

export default class Star extends Component {
    
    state = {
        name: "",
        score: 0
    }

    componentDidMount(){
        this.setState({name: this.props.name})
        this.setState({score: this.props.score})
    }
    
    render() {
        return (
            <React.Fragment>
                {
                    this.state.name === "Aries" ?
                    <React.Fragment>
                    <Aries>
                        <PA>
                        {this.state.name}
                        </PA>
                        <PA>
                            {this.state.score}
                        </PA>
                    </Aries>
                    </React.Fragment>
                    : this.state.name === "Leo" ?
                    <React.Fragment>
                    <Leo>
                        <PA>
                        {this.state.name}
                        </PA>
                        <PA>
                            {this.state.score}
                        </PA>
                    </Leo>
                    </React.Fragment>
                    : this.state.name === "Gemini" ?
                    <React.Fragment>
                    <Gemini>
                        <PA>
                        {this.state.name}
                        </PA>
                        <PA>
                            {this.state.score}
                        </PA>
                    </Gemini>
                    </React.Fragment>
                    : this.state.name === "Scorpio" ?
                    <React.Fragment>
                    <Scorpio>
                        <PA>
                        {this.state.name}
                        </PA>
                        <PA>
                            {this.state.score}
                        </PA>
                    </Scorpio>
                    </React.Fragment>
                    : this.state.name === "Virgo" ?
                    <React.Fragment>
                    <Virgo>
                        <PA>
                        {this.state.name}
                        </PA>
                        <PA>
                            {this.state.score}
                        </PA>
                    </Virgo>
                    </React.Fragment>
                    : this.state.name === "Capricorn" ?
                    <React.Fragment>
                    <Capricorn>
                        <PA>
                        {this.state.name}
                        </PA>
                        <PA>
                            {this.state.score}
                        </PA>
                    </Capricorn>
                    </React.Fragment>
                    : this.state.name === "Taurus" ?
                    <React.Fragment>
                    <Taurus>
                        <PA>
                        {this.state.name}
                        </PA>
                        <PA>
                            {this.state.score}
                        </PA>
                    </Taurus>
                    </React.Fragment>
                    : this.state.name === "Aquarius" ?
                    <React.Fragment>
                    <Aquarius>
                        <PA>
                        {this.state.name}
                        </PA>
                        <PA>
                            {this.state.score}
                        </PA>
                    </Aquarius>
                    </React.Fragment>
                    : this.state.name === "Pisces" ?
                    <React.Fragment>
                    <Pisces>
                        <PA>
                        {this.state.name}
                        </PA>
                        <PA>
                            {this.state.score}
                        </PA>
                    </Pisces>
                    </React.Fragment>
                    : this.state.name === "Libra" ?
                    <React.Fragment>
                    <Libra>
                        <PA>
                        {this.state.name}
                        </PA>
                        <PA>
                            {this.state.score}
                        </PA>
                    </Libra>
                    </React.Fragment>
                    :
                    ""
                }
            </React.Fragment>
        )
    }
}
