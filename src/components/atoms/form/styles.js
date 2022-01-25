import styled from "styled-components";

export const Form = styled.form`
  padding: 50px;
  background: white;
  border-radius: 6px;

  & > * + * {
    margin-top: 30px;
  }
`;

export const Cut = styled.div`
  background: white;
  border-radius: 6px;
  width: 200px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
`;

export const Placeholder = styled.div`
  color: #65657b;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  background-color: rgba(238, 237, 235, 1);
  border-radius: 6px;
  border: 0;
  box-sizing: border-box;
  height: 50px;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;

  &:focus ~ .cut,
  &:not(:placeholder-shown) ~ .cut {
    transform: translateY(8px);
  }

  &:focus ~ .placeholder,
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }
`;

export const TextArea = styled.textarea`
  background-color: rgba(238, 237, 235, 1);
  border-radius: 6px;
  border: 0;
  box-sizing: border-box;
  height: 150px;
  outline: 0;
  padding: 18px 20px 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  resize: none;

  &:focus ~ .cut,
  &:not(:placeholder-shown) ~ .cut {
    transform: translateY(8px);
  }

  &:focus ~ .placeholder,
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }
`;

export const Select = styled.select`
  background-color: rgba(238, 237, 235, 1);
  border-radius: 6px;
  border: 0;
  box-sizing: border-box;
  height: 50px;
  outline: 0;
  padding: 4px 60px 0 20px;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  appearance: none;

  &:focus ~ .cut,
  &:not(:placeholder-shown) ~ .cut {
    transform: translateY(8px);
  }

  &:focus ~ .placeholder,
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }
`;
