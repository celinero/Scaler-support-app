import { InputContainer, Cut, Placeholder } from "./styles";

export const Field = ({ children, label }) => (
  <InputContainer>
    {children}
    <Cut className="cut" />
    <Placeholder className="placeholder">{label}</Placeholder>
  </InputContainer>
);

export * from "./styles";
