import React, { Component } from 'react'
// import styled from 'styled-components'



export default class Health extends Component {

    state = {
        health: 3,
        isAttack: false
    }

    componentDidMount(){
        if(this.props.isAttack){
            console.log('props' +this.props.isAttack)
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.isAttack !== prevProps.isAttack){
            
        }
    }

    underAttack = () => {
        // if(this.state.isAttack){
            this.setState({
                health: this.state.health-1,
                isAttack: false
            })
        // }
        console.log('health' + this.state.health)
    }

    render() {
        console.log('health: '+this.state.health)
        return (
            <div>
                <h1>Health</h1>
                <p> {this.state.health} </p>
                <button onClick={() => this.underAttack()}>
                    Attack
                </button>
                <p> props: {this.props.isAttack? 'true':'false'} </p>
            </div>
        )
    }
}
