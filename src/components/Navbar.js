import React from 'react';
import { Nav, StyledLink } from '../styled-components'

export const NavBar = (props) => {
  return(
    <Nav>
      <StyledLink to="/tickets">Home</StyledLink>
      <StyledLink to="/tickets/new">Add a post</StyledLink>
    </Nav>
  )
}