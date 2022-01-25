import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Container } from "components/atoms/layout";
import { useGlobalState } from "config/store";
import { Nav, NavLogo, NavInner, NavLink } from "./styles";
import logo from "./logo.png";

export const Navbar = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch({ type: "user:logout" }).then(() => {
      navigate("/");
    });
  }

  return (
    <Nav>
      <Container>
        <NavInner>
          <Link to="/">
            <NavLogo src={logo} />
          </Link>

          {!user.data.isLoggedIn && (
            <div>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </div>
          )}

          {user.data.isLoggedIn && (
            <div>
              <NavLink to="/user/tickets">My Dashboard</NavLink>
              <NavLink onClick={handleLogOut} to="/">
                Log out
              </NavLink>
            </div>
          )}
        </NavInner>
      </Container>
    </Nav>
  );
};
