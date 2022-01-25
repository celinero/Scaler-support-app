import styled from "styled-components";

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ size }) => (size === "small" ? 500 : 970)}px;
`;
