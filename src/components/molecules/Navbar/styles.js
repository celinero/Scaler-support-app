import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background: ${({ isAdmin }) => (isAdmin ? "#32373f" : "white")};
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

export const NavLink = styled(({ isActive, isAdmin, ...rest }) => (
  <Link {...rest} />
))`
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-weight: bold;
  font-size: 18px;
  border-bottom: solid 5px transparent;
  border-top: solid 5px transparent;
  color: ${({ isAdmin }) => (isAdmin ? "#b2bec3" : "rgb(60, 67, 79)")};
  text-decoration: none;
  padding: 21px 15px;
  line-height: 20px;
  transition: all 0.2s ease-out;

  &:hover,
  &:active,
  &:focus {
    border-top-color: #02a3da;
    color: ${({ isAdmin }) => (isAdmin ? "white" : "rgb(23, 25, 29)")};
  }

  ${({ isActive, isAdmin }) =>
    isActive &&
    `
    border-top-color: ${isAdmin ? "#b2bec3" : "rgba(238,237,235,1)"};
    color: #02a3da;
  `}
`;
