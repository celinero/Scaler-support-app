import React from 'react';
import { useGlobalState } from '../config/store';
import { Nav, StyledLink } from '../styled-components'

export const NavBar = (props) => {
  const {store, dispatch} = useGlobalState();
  const {loggedInUser} = store;

  function handleLogOut() {
    dispatch({ type:"removeLoggedInUser" })
    dispatch({ type:"removeIdToken" })
  }

  return(
    <Nav>
      <span>Hello {loggedInUser || "guest"} </span>
      {loggedInUser ? (
        <StyledLink onClick={handleLogOut} to="/">Log out</StyledLink>
      ) : (
        <StyledLink to="/login">Log In</StyledLink>
      )}
      <StyledLink to="/tickets">Home</StyledLink>
      <StyledLink to="/tickets/new">Add a post</StyledLink>
    </Nav>
  )
}