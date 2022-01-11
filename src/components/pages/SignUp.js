import React, { useState }  from 'react';
import { useGlobalState } from 'config/store';
import { signUpUser } from 'services/userServices';
import { Form, Title, Subtitle, InputContainer, Input, Cut, Placeholder, Submit } from 'components/atoms/form'

export const SignUp = (props) => {
  const [formValues, setFormValues] = useState({ email: "", displayName: "", password: "" });
  const { store: { user }, dispatch } = useGlobalState();

  function handleChange(event) {
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch({ type: "user:fetch" })

    signUpUser(formValues)
      .then(response => {
        dispatch({ type: "user:login", data: {
          displayName: response.displayName,
          email: response.email,
          uid: response.uid,
          idToken: response.idToken
        }})
      })
      .catch(error => {
        dispatch({ type: "user:error" })
        console.log(error)
      })
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Title>Welcome</Title>
      <Subtitle>let's create your account</Subtitle>
      <InputContainer>
        <Input onChange={handleChange} type="email" name="email" placeholder=" " value={formValues.email} />
        <Cut className="cut" />
        <Placeholder className="placeholder ">
        Email
        </Placeholder>
      </InputContainer>
      <InputContainer>
        <Input onChange={handleChange} type="text" name="displayName" placeholder=" " value={formValues.displayName} />
        <Cut className="cut" />
        <Placeholder className="placeholder ">
        Username
        </Placeholder>
      </InputContainer>
      <InputContainer>
        <Input onChange={handleChange} type="password" name="password" placeholder=" " value={formValues.password} />
        <Cut className="cut" />
        <Placeholder className="placeholder ">
        Password
        </Placeholder>
      </InputContainer>
      <Submit type="submit" disabled={user.loading}>
        Sign Up
      </Submit>
    </Form>
  )
}