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
    dispatch({ type: "user:logout" });
    navigate("/");
  }

  const { isLoggedIn, role } = user;
  const isAdmin = role === "admin";

  return (
    <Nav isAdmin={isAdmin}>
      <Container>
        <NavInner>
          <Link to={isLoggedIn ? "/user/tickets" : "/"}>
            <NavLogo src={logo} />
          </Link>

          {!isLoggedIn && (
            <div>
              <NavLink
                isAdmin={isAdmin}
                to="/"
                isActive={location.pathname === "/"}
              >
                Log In
              </NavLink>
              <NavLink
                isAdmin={isAdmin}
                to="/signup"
                isActive={location.pathname === "/signup"}
              >
                Sign Up
              </NavLink>
            </div>
          )}

          {isLoggedIn && (
            <div>
              <NavLink
                isAdmin={isAdmin}
                to="/user/tickets"
                isActive={location.pathname === "/user/tickets"}
              >
                Dashboard
              </NavLink>
              <NavLink isAdmin={isAdmin} onClick={handleLogOut} to="/">
                Log out
              </NavLink>
            </div>
          )}
        </NavInner>
      </Container>
    </Nav>
  );
};
