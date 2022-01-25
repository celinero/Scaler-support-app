import styled from "styled-components";

const containerSize = {
  small: 500,
  medium: 720,
  large: 970,
};

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ size = "large" }) => containerSize[size]}px;
`;
