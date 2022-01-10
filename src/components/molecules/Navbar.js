import React from 'react';
import { useNavigate } from 'react-router';

import { useGlobalState } from 'config/store';
import { Nav, NavLink } from 'components/atoms'

export const Navbar = (props) => {
  const { store: { user }, dispatch } = useGlobalState();
  const navigate = useNavigate();

  function handleLogOut() {
     dispatch({ type:"user:logout" })
      .then(() => {
        navigate("/")
      })
  }

  return(
    <div>
      <Nav>
          {!user.data.isLoggedIn && <>
            <NavLink to="/login">Log In</NavLink>,
            <NavLink to="/signup">Sign Up</NavLink>
          </>}

          {user.data.isLoggedIn && <>
            {user.data.email}
            <NavLink to="/user/tickets">My Dashboard</NavLink>
            {/* <StyledLink to="/user/tickets/new">Add a ticket</StyledLink> */}
            <NavLink onClick={handleLogOut} to="/">Log out</NavLink>
          </>}
      </Nav>
     </div>
  )
}