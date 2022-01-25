import styled from "styled-components";

export const Button = styled.button`
  background: #02a3da;
  color: white;
  border-radius: 6px;
  height: 50px;
  line-height: 50px;
  border: none;
  padding: 4px 20px;
  cursor: pointer;

  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}
`;
