import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background: white;
`;

export const NavLogo = styled.img`
  display: block;
  max-width: 157px;
`;

export const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLink = styled(({ isActive, ...rest }) => <Link {...rest} />)`
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-weight: bold;
  font-size: 18px;
  border-bottom: solid 5px transparent;
  border-top: solid 5px transparent;
  color: rgb(60, 67, 79);
  text-decoration: none;
  padding: 21px 15px;
  line-height: 20px;
  transition: all 0.2s ease-out;

  &:hover,
  &:active,
  &:focus {
    border-top-color: #02a3da;
    color: rgb(23, 25, 29);
  }

  ${({ isActive }) =>
    isActive &&
    `
    border-top-color: rgba(238,237,235,1);
    color: #02a3da;
  `}
`;
