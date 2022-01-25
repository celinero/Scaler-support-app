import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Container } from "components/atoms/layout";
import { useGlobalState } from "config/store";
import { Nav, NavLogo, NavInner, NavLink } from "./styles";
import logo from "./logo.png";

export const Navbar = () => {
  const {
    store: { user },
    dispatch,
  } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogOut() {
    dispatch({ type: "user:logout" }).then(() => {
      navigate("/");
    });
  }

  const { isLoggedIn } = user.data;

  return (
    <Nav>
      <Container>
        <NavInner>
          <Link to={isLoggedIn ? "/user/tickets" : "/"}>
            <NavLogo src={logo} />
          </Link>

          {!isLoggedIn && (
            <div>
              <NavLink to="/" active={location.pathname === "/"}>
                Log In
              </NavLink>
              <NavLink to="/signup" active={location.pathname === "/signup"}>
                Sign Up
              </NavLink>
            </div>
          )}

          {isLoggedIn && (
            <div>
              <NavLink
                to="/user/tickets"
                active={location.pathname === "/user/tickets"}
              >
                Dashboard
              </NavLink>
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
