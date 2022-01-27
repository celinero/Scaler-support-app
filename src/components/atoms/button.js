import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled.button`
  display: inline-block;
  text-decoration: none;
  pointer: cursor;
  background: #02a3da;
  color: white;
  border-radius: 6px;
  height: 50px;
  line-height: 50px;
  border: none;
  padding: 4px 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: inherit;
  transition: all 0.2s;

  &:hover,
  &:active,
  &:focus {
    background: #007ca7;
  }

  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}
`;

export const ButtonLink = Button.withComponent(Link);

export const TextLink = styled(Link)`
  color: #02a3da;
  font-weight: 600;
  font-size: inherit;
  transition: all 0.2s;

  &:hover,
  &:active,
  &:focus {
    color: #007ca7;
  }
`;
