import styled from "styled-components";

export const Bubble = styled.div`
  background-color: #303245;
  border-radius: 12px;
  color: white;
  padding: 20px;
  margin-right: 200px;

  & + & {
    margin-top: 10px;
  }

  ${({ isRight }) =>
    isRight &&
    `
    background-color: #15172b;
    margin-left: 200px;
    margin-right: 0;
  `}
`;
