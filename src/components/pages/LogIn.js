import React, { useState } from 'react';
import { useGlobalState } from 'config/store';
import { logInUser } from 'services/userServices';
import { Block, Label, Input, InputButton } from 'components/atoms';

export const LogIn = (props) => {
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
        dispatch({ type: "user:login", data: {
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
    <form onSubmit={handleSubmit}>
      <Block>
        <Label>Login</Label>
        <Input onChange={handleChange} type="text" name="email" placeholder="Enter your email" value={formValues.email} />
      </Block>
      <Block>
        <Label>Password</Label>
        <Input onChange={handleChange} type="password" name="password" placeholder="Enter your password" value={formValues.password} />
      </Block>
      <Block>
        <button type="submit" disabled={user.loading}>Log In</button>
      </Block>
    </form>
  )
}