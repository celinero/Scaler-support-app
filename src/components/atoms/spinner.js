import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = ({ height, size = 50 }) => (
  <SpinnerWrapper style={{ height }}>
    <ReactLoading type="bubbles" color="#02a3da" height={size} width={size} />
  </SpinnerWrapper>
);
