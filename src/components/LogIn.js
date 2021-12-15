import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGlobalState } from '../config/store';
import { logInUser } from '../services/userServices';
import { Block, Label, Input, InputButton } from '../styled-components'

export const LogIn = (props) => {
  const initialValues = {email: "", password:""};
  const [formValues, setFormValues] = useState(initialValues);
  const {dispatch} = useGlobalState();
  const navigate = useNavigate();

  function handleChange(event) {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    logInUser(formValues)
      .then(email => {
        dispatch({type: "setLoggedInUser", data: email})
        navigate("/")
      })
      .catch(error => console.log(error))
  }

  return(
    <form onSubmit={handleSubmit}>
      <Block>
        <Label>Email</Label>
        <Input onChange={handleChange} type="email" name="email" placeholder="Enter your email" value={formValues.email} />
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