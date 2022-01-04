import React from 'react';
import { useGlobalState } from 'config/store';
import { Nav, StyledLink } from 'components/atoms'

export const Navbar = (props) => {
  const { store: { user }, dispatch } = useGlobalState();

  function handleLogOut() {
     dispatch({ type:"user:logout" })
  }

  return(
     <Nav>
        {!user.data.isLoggedIn && <>
          <StyledLink to="/login">Log In</StyledLink>,
          <StyledLink to="/signup">Sign Up</StyledLink>
        </>}

        {user.data.isLoggedIn && <>
          {user.data.displayName} | {user.data.email}
          <StyledLink to="/user/tickets">Tickets</StyledLink>
          <StyledLink to="/user/tickets/new">Add a ticket</StyledLink>
          <StyledLink onClick={handleLogOut} to="/">Log out</StyledLink>
        </>}
     </Nav>
  )
}