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
    // <Topbar>
    <div>
      <Nav>
        <div className="topbar__logo-wrapper">
          <img className="topbar__logo" src="scaler2-logo.png" alt="logo" />
        </div>
        <div>
          <span>Hello {loggedInUser || "guest"} </span>
          {loggedInUser ? (
            <StyledLink onClick={handleLogOut} to="/">Log out</StyledLink>,
            <StyledLink to="/tickets/new">Add a post</StyledLink>
          ) : (
            <StyledLink to="/login">Log In</StyledLink>,
            <StyledLink to="/signup">Sign Up</StyledLink>
          )}
          <StyledLink to="/">Home</StyledLink>
          
        </div>
        

      </Nav>

    </div> 
    // </Topbar>
  )
}