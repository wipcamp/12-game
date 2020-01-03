import React, { Component } from "react";
import styled from 'styled-components'
import { Nav } from "reactstrap";

const StyledMenu = styled.nav`
  flex-direction: column;
  justify-content: center;
  background: red;
  transform: ${({ open }) => open ? 'translateX(73em)' : 'translateX(100em)'};
  height: 100vh;
  width: 300px;
  padding: 2rem;
  position: absolute;
  transition: transform 0.3s ease-in-out;

    &:hover {
      color: #343078;
    }

    a{
      display : inline-block;
    }
  }
  
  @media (max-width: 420px) {
    transform: ${({ open }) => open ? 'translateX(0em)' : 'translateX(100em)'};
    width: 100vw;
  }

`

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <a href="/">
        Profile
      </a>
      <a href="/">
        Scoreboard
        </a>
      <a href="/">
        History
        </a>
    </StyledMenu>
  )
}

const StyledBurger = styled.button`
  position: absolute;
  top: 5%;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => open ? '#0D0C1D' : '#EFFFFA'};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}


const SideNavbar = () => {
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();
  return (
    <div>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </div>
  )  
}


export default SideNavbar;