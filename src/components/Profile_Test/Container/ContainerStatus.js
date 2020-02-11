import React, { Component } from 'react'
import styled from 'styled-components'
import Status from '../model/Status'


export default class ContainerStatus extends Component {
    
    state = {
        items: [
            {
                stat: 'Straight',
                num: 15
            },
            {
                stat: 'Dexterity',
                num: 20
            },
            {
                stat: 'Luck',
                num: 25
            }
        ]
    }

    render() {
        return (
            <div>
                {
                this.state.items.map((data, i) => (
                    <Status key={i} stat={data.stat} num={data.num} />
                    )
                    )
                }
            </div>
        )
    }
}
