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

export const FieldText = ({ label, error, ...etc }) => (
  <Field label={label}>
    <Input type="text" placeholder=" " {...etc} />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Field>
);

export const FieldTextArea = ({ label, ...etc }) => (
  <Field label={label}>
    <TextArea placeholder=" " {...etc} />
  </Field>
);

export const FieldSelect = ({ label, children, ...etc }) => (
  <Field label={label}>
    <Select required defaultValue=" " {...etc}>
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
  </Field>
);

export * from "./styles";
