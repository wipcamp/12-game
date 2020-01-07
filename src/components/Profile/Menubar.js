import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
    background-color : red;
`

const Menubar = (props) => {
    return (
        <div>
            <StyledNavbar fixed="bottom" className="justify-content-center"> 
                <div className="d-flex">
                <Navbar.Brand href="#home">
                        <img
                            src="/logo512.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="#home">
                        <img
                            src="/logo512.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="#home">
                        <img
                            src="/logo512.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="#home">
                        <img
                            src="/logo512.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                </div>
            </StyledNavbar>
        </div>
    );
}

export default Menubar;