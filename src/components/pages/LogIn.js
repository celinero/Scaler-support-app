import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGlobalState } from 'config/store';
import { logInUser } from 'services/userServices';
import { OuterContainerCenter, Form, Title, Subtitle, InputContainer, Input, Cut, Placeholder, Submit } from 'components/atoms/form'


export const LogIn = (props) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password:"" });
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

    logInUser(formValues)
      .then(response => {
        if (response.error) {
          dispatch({ type: "user:error" })
          return;
        }

        dispatch({ type: "user:login", data: {
          displayName: response.displayName,
          email: response.email,
          uid: response.uid,
          idToken: response.idToken
        }})
        navigate("/user/tickets")
      })
      .catch(() => {
        dispatch({ type: "user:error" })
      })
      
  }

  return(
    <OuterContainerCenter>
      <Form onSubmit={handleSubmit}>
      {user.error && <p>Oops something went wrong</p>}
        <Title>Welcome back</Title>
        <Subtitle>Let's log in!</Subtitle>
        <InputContainer>
        <Input onChange={handleChange} type="text" name="email" placeholder=" " value={formValues.email} />
          <Cut className="cut" />
          <Placeholder className="placeholder ">
          Email
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
          Log In
        </Submit>
      </Form>
    </OuterContainerCenter>
  )
}