import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Proptypes from 'prop-types'
import profileService from '../../services/profileService';

const stars = {
    ARIES: "aries",
    LEO: "leo",
    GEMINI: "gemini",
    SCORPIO: "scorpio",
    VIRGO: "virgo",
    CAPRICORN: "capricorn",
    TAURUS: "taurus",
    AQUARIUS: "aquarius",
    PISCES: "pisces",
    LIBRA: "libra",
}

const Img = styled.img`
    width: 3em;
    height: 3em;
`

const P = styled.p`
    position: relative;
    margin: auto;
`

const Div = styled.div`
    width: 5em;
    height: 5em;
    position: absolute;    
`



export default class StarGroup extends Component {
    
    state = {
        name: "",
        score: 0
    }

    static propTypes = {
        // name: Proptypes.oneOf(Object.keys(stars)).isRequired,
        name: Proptypes.string.isRequired,
        score: Proptypes.any.isRequired

    }

    componentDidMount(){
        switch(this.props.name.toLowerCase() ){
            case stars.ARIES:
                this.setState({
                    name: stars.ARIES.toUpperCase()
                })
                break
            case stars.LEO:
                this.setState({
                    name: stars.LEO.toUpperCase()
                })
                break
            case stars.GEMINI:
                this.setState({
                    name: stars.GEMINI.toUpperCase()
                })
                break
            case stars.SCORPIO:
                this.setState({
                    name: stars.SCORPIO.toUpperCase()
                })
                break
            case stars.VIRGO:
                this.setState({
                    name: stars.VIRGO.toUpperCase()
                })
                break
            case stars.CAPRICORN:
                this.setState({
                    name: stars.CAPRICORN.toUpperCase()
                })
                break
            case stars.TAURUS:
                this.setState({
                    name: stars.TAURUS.toUpperCase()
                })
                break
            case stars.AQUARIUS:
                this.setState({
                    name: stars.AQUARIUS.toUpperCase()
                })
                break
            case stars.PISCES:
                this.setState({
                    name: stars.PISCES.toUpperCase()
                })
                break
            case stars.LIBRA:
                this.setState({
                    name: stars.LIBRA.toUpperCase()
                })
                break
            default:
                break
        }
        this.setState({score: this.props.score})
    }

    async getTeamData(){
        let data = await profileService
    }

    render() {
        return (
            <Div>
                <P>{this.state.name || "Stars"}</P>
                <P>{this.state.score}</P>
            </Div>
        )
    }
}