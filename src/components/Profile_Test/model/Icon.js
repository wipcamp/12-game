import React from 'react';
import styled from 'styled-components'

const Img = styled.img`
    height: 7vh;
    width: 7vh;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: auto;
`


const Icon = (props) => {
    
    return(
        <React.Fragment>
            <Img src={props.src} alt={props.alt}/>
        </React.Fragment>
    )
}

export default Icon