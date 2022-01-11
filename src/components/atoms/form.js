import styled from 'styled-components'

export const OuterContainerCenter = styled.div `
    background-color: #000;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const OuterContainerWhite = styled.div `
  
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`


export const Form = styled.form`
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  width: 50%;
  padding: 30px;
`

export const FormTicket = styled.form`
  background-color: white;
  border-radius: 20px;
  box-sizing: border-box;
  width: 80%;
  padding: 30px;
`

export const Title = styled.h1`
  color: #096b75;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
  text-align: center;
`

export const Subtitle = styled.h2`
  color: #096b75;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  text-align: center;
`

export const InputContainer = styled.div`
  height: 50px;
  position: relative;
  width: 100%;
  margin-top: 40px;
`

export const Input = styled.input`
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
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

  &:not(:placeholder-shown) ~ .placeholder {
    color: #808097;
  }
  
  &:focus ~ .placeholder {
    color: #dc2f55;
  }
`

export const InputTicket = styled.input`
  background-color: #d1e0e0;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: black;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 20px 20px;
  width: 100%;

  &:focus ~ .cut,
  &:not(:placeholder-shown) ~ .cut {
    transform: translateY(8px);
  }

  &:focus ~ .placeholder,
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }

  &:not(:placeholder-shown) ~ .placeholder {
    color: #808097;
  }
  
  &:focus ~ .placeholder {
    color: #dc2f55;
  }
`

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

  &:focus ~ .cut,
  &:not(:placeholder-shown) ~ .cut {
    transform: translateY(8px);
  }

  &:focus ~ .placeholder,
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }

  &:not(:placeholder-shown) ~ .placeholder {
    color: #808097;
  }
  
  &:focus ~ .placeholder {
    color: #dc2f55;
  }
`
export const Option = styled.option`
    font-size: 1.2em;
    
`

export const TextArea = styled.textarea`
  background-color: #d1e0e0;
  height: 200px;

  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: black;
  font-size: 18px;
  outline: 0;
  padding: 20px 20px;
  width: 100%;


  &:focus ~ .cutTicket,
  &:not(:placeholder-shown) ~ .cutTicket {
  transform: translateY(8px);
  }

  &:focus ~ .placeholder,
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }

  &:not(:placeholder-shown) ~ .placeholder {
    color: #808097;
  }
  
  &:focus ~ .placeholder {
    color: #dc2f55;
  }
`


export const Cut = styled.div`
  background-color: #15172b;
  border-radius: 10px; 
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
`

export const CutTicket = styled.div`
  background-color: white;
  border-radius: 10px; 
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
`

export const Placeholder = styled.div`
  color: black;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
`

export const Submit = styled.button`
  background-color: #096b75;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  margin-bottom: 30px;
  outline: 0;
  text-align: center;
  width: 100%;
  &:active {
    background-color: #def7fa;
    color: #096b75;
  }
`

