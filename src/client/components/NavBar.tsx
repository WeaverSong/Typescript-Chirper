import * as React from 'react';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

const StyledNavBar = styled.div`
    width: 50%;
    height: 50px;
    margin: 20px;
    background-color: aliceblue;
    border: solid black 2px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const LinkDiv = styled.div`
    font-size: xx-large;
`;

export const NavBar = function() {
    return (<StyledNavBar>
        <LinkDiv><Link exact activeClassName="NavLinkActive" to="/">[Chirps]</Link></LinkDiv>
        <LinkDiv><Link exact activeClassName="NavLinkActive" to="/new">[Post]</Link></LinkDiv>
    </StyledNavBar>);
}