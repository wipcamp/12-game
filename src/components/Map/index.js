import React, { Component } from 'react'
import ContainerUpper from '../Profile_Test/Container/ContainerUpper'
import ContainerButton from '../Profile_Test/Container/ContainerButton'
import styled from 'styled-components'
import StarGroup from './StarGroup'
import teamService from '../../services/teamService'
import Star from './Star'

const Bg = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(/image/MapBG.png);
    background-size: contain;
    z-index:-1;
`

const LeoStyle = {
    backgroundColor: '#fff00f',
    top: '3em'
}

const starStyle = {
    LEO: {
        top: '5em',
        color: 'Aqua'
    }
}
const energyStyle = {
    position: 'relative',
    top: '-1em',
    left: '1.8em'
}

export default class index extends Component {

    state = {
        id: [
            {
              src: './image/logo192.png'
            },
            {
              src: './image/logo192.png'
            },
            {
              src: './image/logo192.png'
            },
            {
              src: './image/line_ci.png'
            }
          ],
        teams: []
    }

    componentDidMount(){
        this.getScore()
    }

    getScore = async () => {
        let promise;
        try {
            promise = await teamService.getTeamScore()
            console.log(promise)
            let response = promise.data
            console.log("Response: " + response.data)
            // if(response.success){
                this.setState({
                    teams: response
                })
                console.log(this.state.teams)
            // } else {
                // console.log("Error: Can 't get teams data")
            // }
        }catch (e) {
            console.log("Promise Error: " + e)
        }
    }

    render() {
        return (
            <Bg>
                <ContainerUpper />
                {
                    this.state.teams.map((data, i) => (
                        <Star key={i} name={data.teamName} score={data.score} />
                    ))
                }
                {/* <Star name="aries"/> */}
                <ContainerButton id={this.state.id}/>
            </Bg>
        )
    }
}
