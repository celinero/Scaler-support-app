import styled from "styled-components";
import { Link } from "react-router-dom";
import { Spinner } from "components/atoms/spinner";

export const StyledButton = styled.button`
  position: relative;
  display: inline-block;
  text-decoration: none;
  pointer: cursor;
  background: #02a3da;
  border: 2px solid #02a3da;
  color: white;
  border-radius: 6px;
  height: 50px;
  line-height: 50px;
  padding: 0px 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: inherit;
  transition: all 0.2s;

  &:hover,
  &:active,
  &:focus {
    border: 2px solid #007ca7;
    background: #007ca7;
  }

  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}

  ${({ secondary }) =>
    secondary &&
    `
    background: transparent;
    border: 2px solid #02a3da;
    color: #02a3da;

    &:hover,
    &:active,
    &:focus {
      background: #007ca7;
      color: white;
    }
  `}
`;

export const Button = ({ isLoading, children, ...props }) => (
  <StyledButton {...props}>
    {isLoading && (
      <Spinner
        color="white"
        size={30}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
    )}
    <span style={{ opacity: isLoading ? 0.25 : 1 }}>{children}</span>
  </StyledButton>
);

export const ButtonLink = StyledButton.withComponent(Link);

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
