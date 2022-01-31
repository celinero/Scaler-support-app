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

export const Card = styled.div`
  padding: 50px;
  background: white;
  border-radius: 6px;

  & > * + * {
    margin-top: 30px;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  padding-left: 50px;
  border-left: 1px solid rgba(238, 237, 235, 1);
`;

export const PageHeader = ({ children, cta, style }) => (
  <Card style={{ marginTop: 50, ...style }}>
    <StyledHeader>
      <div style={{ flexGrow: 1 }}>{children}</div>
      <ButtonWrapper>{cta}</ButtonWrapper>
    </StyledHeader>
  </Card>
);
