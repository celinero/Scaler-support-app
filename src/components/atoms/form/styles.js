import styled from "styled-components";

export const OuterContainerCenter = styled.div`
  background-color: #000;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const OuterContainerWhite = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormTicket = styled.form`
  background-color: white;
  border-radius: 20px;
  box-sizing: border-box;
  width: 80%;
  padding: 30px;
`;

export const Title = styled.h1`
  color: #096b75;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
  text-align: center;
`;

export const Subtitle = styled.h2`
  color: #096b75;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  text-align: center;
`;

export const InputTicket = styled.input`
  background-color: #d1e0e0;
  color: black;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 20px 20px;
  margin-bottom: 20px;
  width: 100%;

  &:focus ~ .cutTicket,
  &:not(:placeholder-shown) ~ .cutTicket {
    transform: translateY(8px);
    background-color: #d1e0e0;
  }

  &:focus ~ .placeholder,
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }

  &:not(:placeholder-shown) ~ .placeholder {
    color: #096b75;
  }

  &:focus ~ .placeholder {
    color: #096b75;
  }
`;

export const Select = styled.select`
  background-color: #d1e0e0;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  font-size: 1.2em;
  width: 100%;
  height: 100%;

  &:focus ~ .cutTicket,
  &:not(:placeholder-shown) ~ .cutTicket {
    transform: translateY(8px);
    background-color: #d1e0e0;
  }

  &:focus ~ .placeholder,
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }

  &:not(:placeholder-shown) ~ .placeholder {
    color: #096b75;
  }

  &:focus ~ .placeholder {
    color: #096b75;
  }
`;
export const Option = styled.option`
  font-size: 1.2em;
`;

export const TextArea = styled.textarea`
  background-color: #d1e0e0;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: black;
  font-size: 18px;
  outline: 0;
  padding: 20px 20px;
  width: 100%;
  min-height: 100px;

  &:focus ~ .cutTicket,
  &:not(:placeholder-shown) ~ .cutTicket {
    transform: translateY(8px);
    background-color: #d1e0e0;
  }

  &:focus ~ .placeholder,
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }

  &:not(:placeholder-shown) ~ .placeholder {
    color: #096b75;
  }

  &:focus ~ .placeholder {
    color: #096b75;
  }
`;

export const CutTicket = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 76px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
`;

export const Submit = styled.button`
  background-color: #096b75;
  color: #eee;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 18px;
  margin-top: 38px;
  margin-bottom: 30px;
  outline: 0;
  text-align: center;

  &:active {
    background-color: #def7fa;
    color: #096b75;
  }
`;

//----------------
//----------------
//----------------
//----------------
//----------------
//----------------

export const Form = styled.form`
  padding: 50px;
  background: white;
  border-radius: 6px;

  & > * + * {
    margin-top: 40px;
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
  font-size: 18px;
  height: 50px;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;

  &:focus ~ .cut,
  &:not(:placeholder-shown) ~ .cut {
    transform: translateY(8px);
  }

  &:focus ~ .placeholder,
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }
`;
