import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGlobalState } from 'config/store';
import { logInUser, getUser } from 'services/userServices';
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

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "user:fetch" })

    try {
      const response = await logInUser(formValues);

      if (response.error) {
        dispatch({ type: "user:error" })
        return;
      }

      const { uid, displayName, email, idToken } = response
      const user = await getUser(uid)

      dispatch({ type: "user:login", data: {
        role: user.role,
        displayName,
        email,
        uid,
        idToken
      }})
      navigate("/user/tickets")

    }
    catch {
      dispatch({ type: "user:error" })
    }      
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