import React, { Component } from 'react'
import styled from 'styled-components'

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.5em;
    margin: 2.55rem auto;
`

const Head = styled.div`
    position: relative;
    width: 1.7rem;
    height: 1.7rem;
    background: linear-gradient(180deg, #C4C4C4 0%, #808080 100%);
    padding: auto;
`
// const P = styled.p`
//     position: relative;
//     top: 50%;
//     left: 50%;
//     margin-right: -50%;
//     transform: translate(-50%, -50%)
// `
const Body = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 10em;
    height: 1.6rem;
    background: linear-gradient(180deg, #C4C4C4 0%, #808080 100%);

    p{
        font-size: 15px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
    }

    p:nth-child(odd){
        margin: auto 1em;
    }
    p:nth-child(even){
        margin: auto 1em;
        color: #ff0000
    }

`

export default class Status extends Component {
    
    state = {
        stat: "",
        number: ""
    }

    componentDidMount(){
        this.setState({
            stat: this.props.stat || "Sth",
            number: this.props.number 
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.stat !== this.props.stat){
            this.setState({
                stat: this.props.stat
            })
        }
        if(prevProps.number !== this.props.number){
            this.setState({
                number: this.props.number
            })
        }
    }

    render() {
        return (
            <Div>
                <Head></Head>
                <Body>
                    <p>{this.state.stat}</p>
                    <p>{this.state.number}</p>
                </Body>
            </Div>
        )
    }
}
