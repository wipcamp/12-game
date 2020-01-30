import React from 'react';
import styled from 'styled-components'

const Img = styled.img`
    height: 50px;
    width: 50px;
    border: 1px solid #000000;
    border-radius: 50%;
    margin-left: 10%;
    margin-top: 5%;
    margin-bottom: 5%;

    :first-child  {
        margin-left: 5%
    }

    :last-child {
        margin-right: 5%
    }

`


const Icon = (props) => {
    
    return(
        <React.Fragment>
            <Img class="icon" src={props.src} alt={props.alt}/>
        </React.Fragment>
    )
}

export default Icon