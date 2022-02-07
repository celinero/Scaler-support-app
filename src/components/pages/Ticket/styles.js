import styled from "styled-components";

export const BubbleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  & + & {
    margin-top: 10px;
  }

  ${({ isRight }) =>
    isRight &&
    `
      justify-content: flex-end;
  `}
`;

export const Bubble = styled.div`
  background-color: white;
  border-radius: 0 12px 12px 12px;
  padding: 20px;

  max-width: 75%;

  ${({ isRight }) =>
    isRight &&
    `
    background-color: #02a3da;
    border-radius: 12px 0px 12px 12px;

    & > * {
      color: white;
    }
  `}
`;
