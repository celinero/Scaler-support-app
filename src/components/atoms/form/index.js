import { forwardRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ErrorMessage } from "components/atoms/typo";
import {
  InputContainer,
  Cut,
  Placeholder,
  Input,
  TextArea,
  Select,
} from "./styles";

export const Field = ({ children, label }) => (
  <InputContainer>
    {children}
    <Cut className="cut" style={{ width: `${label.length + 1}ch` }} />
    <Placeholder className="placeholder">{label}</Placeholder>
  </InputContainer>
);

export const FieldText = forwardRef(({ label, error, ...etc }, ref) => (
  <Field label={label}>
    <Input type="text" placeholder=" " {...etc} ref={ref} />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Field>
));

export const FieldTextArea = forwardRef(({ label, error, ...etc }, ref) => (
  <Field label={label}>
    <TextArea placeholder=" " {...etc} ref={ref} />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Field>
));

export const FieldSelect = forwardRef(
  ({ label, children, error, ...etc }, ref) => (
    <Field label={label}>
      <Select required defaultValue=" " {...etc} ref={ref}>
        <option disabled hidden value=" "></option>
        {children}
      </Select>
      <MdKeyboardArrowDown
        size={30}
        color="rgb(88,96,105)"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          pointerEvents: "none",
        }}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Field>
  )
);

export * from "./styles";
