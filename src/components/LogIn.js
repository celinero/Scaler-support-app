import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGlobalState } from '../config/store';
import { logInUser } from '../services/userServices';
import { Block, Label, Input, InputButton } from '../styled-components';
import { parseError } from '../config/api';

export const LogIn = (props) => {
  const [formValues, setFormValues] = useState({ email: "", password:"" });
  const [errorMessage, setErrorMessage] = useState("");
  const {dispatch} = useGlobalState();
  const navigate = useNavigate();

  function handleChange(event) {
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault();

    logInUser(formValues)
      .then(response => {
        dispatch({ type: "setLoggedInUser", data: response.email })
        dispatch({ type: "setIdToken", idToken: response.idToken  })
        navigate("/")
      })
      .catch(error => {
        const message = parseError(error)
        setErrorMessage(message);
      })
  }

  return(
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <Block>
        <Label>Login</Label>
        <Input onChange={handleChange} type="text" name="email" placeholder="Enter your email" value={formValues.email} />
      </Block>
      <Block>
        <Label>Password</Label>
        <Input onChange={handleChange} type="password" name="password" placeholder="Enter your password" value={formValues.password} />
      </Block>
      <Block>
        <InputButton type="submit" value="Log In" />
      </Block>
    </form>
  )
}